var request = new XMLHttpRequest();
// make resultArray as global variables
var resultArray = [];
// array of district
var districtArray = [];
// current row id of selection for edition and delete
var currRowId = -1;
// global string of html table
var htmlString;
// body onload function
function onLoadHandler(){    
    // fetch the weather icon
    fetchWeather();    
    // fetch the bbq facilities
    fetchFacilities();
} 
// init the database if no database is found
function fetchFacilities() {
    // link - http://localhost/ATWD_Project_2021/controller.php/dbinit
    var url2 = "./controller.php/dbinit";		
	request.open("GET", url2, true);	
	request.onreadystatechange = loadingPage;  // callback	
	request.send(null);
}
// loading the district list
function loadingDistrict() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var serverData = request.responseText;
            let resultObj = JSON.parse(serverData);
            if (resultObj.issuccess === false) {
                return;
            }
            districtArray = resultObj.data;
            if (districtArray == undefined) {

                return;
            }
            htmlString = "<li><a class='dropdown-item' href='#'>ALL</a></li>";
            districtArray.forEach(
                (item) => {
                    htmlString += "<li><a class='dropdown-item' href='#'>" + item + "</a></li>";
                }
            )            
            console.log("district: " + htmlString);
            let elem = document.getElementById("districtArea");
            elem.innerHTML = htmlString;       
        }
    }
}
// loading the data from database and fill the table
function loadingPage(){
    //alert("loadingPage");
    if (request.readyState==4) {
		if (request.status==200) {
			var serverData = request.responseText;
			var area = document.getElementById("displayArea");
			//area.innerHTML = serverData;
            //console.log(serverData);
            //return;
			let resultObj = JSON.parse(serverData);
            if (resultObj.issuccess === false) {
                return;
            }
            resultArray = resultObj.data;
            //console.log("resultArray: " & $resultArray);
            if (resultArray == undefined) {
                return;
            }
            htmlString = "<table id='displaytable' class='table table-hover'>";
			htmlString += "<tr><th>GIHS</th>";
			htmlString += "<th>District</th>";
			htmlString += "<th>Name</th>";
			htmlString += "<th>Facilities</th>";
            htmlString += "<th>Details</th><th>Map</th><th>Delete</th><th>Edit</th></tr>"			
			resultArray.forEach((rec, i) => {
                console.log("forEach: " + i);
                htmlString += addBatchRows(rec, i);
            }); 
            htmlString += "</table>"
			area.innerHTML = htmlString;
            // fetch the district list after the facilities loading completed
            fetchDistrict();
        }
    }
}
// fetch the district list from database
function fetchDistrict() {
    var url1 = "./controller.php/barbecue/District_en";
    request.open("GET", url1, true);	
	request.onreadystatechange = loadingDistrict;  // callback	
	request.send(null);
}
// fill the google map dialog
function tryFillGMap(_gihs) {
    console.log("tryFillGMap: " + _gihs);
    let objFound = findRowByGIHS(_gihs);
    if (objFound == null) {
        return;
    }
    //var lat = position.coords.latitude;
    //var lon = position.coords.longitude;
    let _lat = objFound.Latitude;
    let _long = objFound.Longitude;
    document.getElementById("modalLatLong").value = "(" + formatGeoLoc(_lat) +", " + formatGeoLoc(_long) + ")";
    document.getElementById("modalName_1").value = objFound.Name_en;
    document.getElementById("modalAddress_1").value = objFound.Address_en;
    document.getElementById("modalPhone_1").value = objFound.Phone;
    let lat = convertGeoLoc(_lat);
    let lon = convertGeoLoc(_long);
    var latlon = new google.maps.LatLng(lat, lon)
    var mapholder = document.getElementById('mapholder')    
    mapholder.style.height = '250px';
    mapholder.style.width = '500px';  
    var myOptions = {
      center:latlon,zoom:14,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }      
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});    
}

function convertGeoLoc(i_str) {  
    const arr = i_str.split("-");
    if (arr.length != 3) {
        console.log("arr's length: " + arr.length);
        return 0;
    }      
    let loc = parseFloat(arr[0]) + parseFloat(arr[1])/60 + parseFloat(arr[2])/3600;
    console.log("loc: " + loc);
    return loc;
}

function formatGeoLoc(i_str){
    console.log("format geoloc: " + i_str);
    const arr = i_str.split("-");
    if (arr.length != 3) {
        console.log("arr's length: " + arr.length);
        return i_str;
    } 
    let deg2 = arr[0].toString() + decodeURI('%C2%B0') + " ";
    let min2 = arr[1].toString() + "'  ";
    let sec2 = arr[2].toString() + "\"";
    return deg2 + min2 + sec2;
}

function findRowByGIHS(gihs){
    let isfound = false;
    if (resultArray == undefined) {
        console.log("findRowByGIHS: resultArray is undefined!");
        return null;
    }
    let obj = {};
    // iterating the array to find gihs	
    for (item of resultArray) {
        if (item['GIHS']==gihs) {
            obj.GIHS = item['GIHS'];
            obj.Name_en = item['Name_en'];	
            obj.District_en = item['District_en'];
            obj.Address_en = item['Address_en'];
            obj.Phone = item['Phone'];
            obj.Facilities_en = item['Facilities_en'];
            obj.Ancillary_facilities_en = item['Ancillary_facilities_en'];
            obj.Opening_hours_en = item['Opening_hours_en'];
            obj.Remarks_en = item['Remarks_en'];
            obj.Latitude = item['Latitude'];
            obj.Longitude = item['Longitude'];            
            console.log("found!");
            isfound = true;
            break;
        }
    }	
    if (isfound == false) {
        console.log("findRowByGIHS: not found!");
        return null;
    } else {
        return obj;
    }
}
// clear the add modal upon onclick
function resetAddModal() {
    //document.getElementById("modalGIHS3").value = "";
	document.getElementById("modalName3").value = "";
	document.getElementById("modalDistrict3").value = "";
    document.getElementById("modalAddress3").value = "";
	document.getElementById("modalPhone3").value = "";
    document.getElementById("modalFacilities3").value = "";
    document.getElementById("modalAncillary3").value = "";
    document.getElementById("modalHours3").value = "";
    document.getElementById("modalRemark3").value = "";
    document.getElementById("modalLat3").value = "";
	document.getElementById("modalLong3").value = "";
}

//try fill the pop up the modal
function tryFillModal(gihs, rowid, operation){

    if (operation == 'add') {
        resetAddModal();
        return;
    }
    console.log("row index: " + rowid + " is selected");
    console.log("input gihs: " + gihs);
    // record the selected rowid to global variable
    currRowId = parseInt(rowid);
    let objRow = findRowByGIHS(gihs);
    if (objRow == null) {
        return;
    }    	
    //fill the corresponding values into UI
    switch (operation) {
        case 'delete':
            document.getElementById("modalGIHS").value = objRow.GIHS;
	        document.getElementById("modalName").value = objRow.Name_en;
	        document.getElementById("modalDistrict").value = objRow.District_en;
            document.getElementById("modalAddress").value = objRow.Address_en;
	        document.getElementById("modalPhone").value = objRow.Phone;
            document.getElementById("modalFacilities").value = objRow.Facilities_en;
            document.getElementById("modalAncillary").value = objRow.Ancillary_facilities_en;
            document.getElementById("modalHours").value = objRow.Opening_hours_en;
            document.getElementById("modalRemark").value = objRow.Remarks_en;
            document.getElementById("modalLat").value = objRow.Latitude;
	        document.getElementById("modalLong").value = objRow.Longitude;	        
            break;
        case 'edit':
            document.getElementById("modalGIHS2").value = objRow.GIHS;
	        document.getElementById("modalName2").value = objRow.Name_en;
	        document.getElementById("modalDistrict2").value = objRow.District_en;
            document.getElementById("modalAddress2").value = objRow.Address_en;
            document.getElementById("modalPhone2").value = objRow.Phone;
	        document.getElementById("modalFacilities2").value = objRow.Facilities_en;
            document.getElementById("modalAncillary2").value = objRow.Ancillary_facilities_en;
            document.getElementById("modalHours2").value = objRow.Opening_hours_en;
            document.getElementById("modalRemark2").value = objRow.Remarks_en;
	        document.getElementById("modalLat2").value = objRow.Latitude;
	        document.getElementById("modalLong2").value = objRow.Longitude;	        
            break;
    }
}
            
function goDelete(){
    let gihs = document.getElementById("modalGIHS").value;
    // link - http://localhost/ATWD_Project_2021/controller.php/barbecue/GIHS/" + gihs;
    let url2 = "./controller.php/barbecue/GIHS/" + gihs;
	request.open("DELETE", url2, true);	
	request.onreadystatechange = onSingleRowDeletedHandler; // callback
	//request.send('sendingdata=' + JSON.stringify(objParams));
    request.send(null);
}

function goEdit(){
    // retrieve the UI into an object for sending (i.e. PUT)
    let objSend = {
        GIHS: document.getElementById("modalGIHS2").value,
        Name_en: document.getElementById("modalName2").value,
        District_en: document.getElementById("modalDistrict2").value,
        Address_en: document.getElementById("modalAddress2").value,
        Phone: document.getElementById("modalPhone2").value,
        Facilities_en: document.getElementById("modalFacilities2").value,
        Ancillary_facilities_en: document.getElementById("modalAncillary2").value,
        Opening_hours_en: document.getElementById("modalHours2").value,
        Remarks_en: document.getElementById("modalRemark2").value,
        Latitude: document.getElementById("modalLat2").value,        
        Longitude: document.getElementById("modalLong2").value        
    }
    let url2 = "./controller.php/barbecue";
    request.open("PUT", url2, true);
    request.onreadystatechange = onSingleRowUpdatedHandler; //callback
    request.send(JSON.stringify(objSend));
}

function goAdd(){    
    // retrieve the UI into an object for sending (i.e. POST)
    // The unique key GIHS would be created in REST API but not from UI
    let objSent = {
        Name_en: document.getElementById("modalName3").value,
        District_en: document.getElementById("modalDistrict3").value,
        Address_en: document.getElementById("modalAddress3").value,
        Phone: document.getElementById("modalPhone3").value,        
        Facilities_en: document.getElementById("modalFacilities3").value,
        Ancillary_facilities_en: document.getElementById("modalAncillary3").value,
        Opening_hours_en: document.getElementById("modalHours3").value,
        Remarks_en: document.getElementById("modalRemark3").value,
        Latitude: document.getElementById("modalLat3").value,
        Longitude: document.getElementById("modalLong3").value        
    }
    let url2 = "./controller.php/barbecue";
    request.open("POST", url2, true);
    request.onreadystatechange = onSingleRowInsertedHandler; //callback
    request.send(JSON.stringify(objSent));
}

// fetch the weather from hksar api since user would concern weather when go to bbq
async function fetchWeather() {
  //this.loading = true;
  const mylink = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
  console.log('mylink: ' + mylink);     
  const res = await fetch(mylink); 
  const data = await res.json();
  if (Array.isArray(data.icon)) {
    let iconurl = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${data.icon[0]}.png`;       
    console.log('icon fetched');
    let sumOfTemp = 0.0;
    let countOfTemp = 0;
    data.temperature.data.forEach(
        (item) => {
            sumOfTemp += item.value;
            countOfTemp += 1;
        }
    );
    let avgOfTemp = (sumOfTemp / countOfTemp).toFixed(1);
    let humid = data.humidity.data[0].value;
    let sumOfRain = 0.0;
    let countOfRain = 0;
    data.rainfall.data.forEach(
        (item) => {
            sumOfRain += item.max;
            countOfRain += 1;
        }
    );
    let avgOfRain = (sumOfRain / countOfRain).toFixed(1);
    document.getElementById("weather").innerHTML = 
        "<div class='d-flex justify-content-between'><img src='" + 
        iconurl + "' style='width: 80px; max-width: 80px; max-height: 80px; margin-left:15px;' />" +
        "<ul style='color: beige;'><li>Temp: " + avgOfTemp + "&deg;C</li>" +
        "<li>Humid: " + humid + "%</li>" +
        "<li>Rainfail: " + avgOfRain + "mm</li></ul></div>";
  }
}