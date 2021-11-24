var request = new XMLHttpRequest();
//make resultArray as global variables
var resultArray;
var htmlString;
            
function onLoadHandler(){
    // link - http://localhost/ATWD_Project_2021/controller.php/dbinit
    var url2 = "./controller.php/dbinit";		
	request.open("GET", url2, true);	
	request.onreadystatechange = loadingPage;  // callback	
	request.send(null);
    // fetch the weather icon
    fetchWeather();
} 

function onUpdatedHandler(){
    if (request.readyState==4) {
		if (request.status==200) {
            var respData = request.responseText;
            //alert(respData);
            //return;
            var objResp = JSON.parse(respData);
            //alert(objResp.issuccess);
            //return;
            console.log(objResp.issuccess);
            if (objResp.issuccess == true) {
                console.log("operation: " + objResp.operation);
                //close the dialog
                switch (objResp.operation) {
                    case 'delete':
                        document.getElementById("btnModalCancel").click();
                        break;
                    case 'put':
                        document.getElementById("btnModalCancel2").click();
                        break;
                    case 'add':
                        document.getElementById("btnModalCancel3").click();
                        break;
                }
                //refresh the page
                // link - http://localhost/ATWD_Project_2021/controller.php/barbecue
                var url2 = "./controller.php/barbecue";		
	            request.open("GET", url2, true);	
	            request.onreadystatechange = loadingPage;  // callback
	            request.send(null);
            }                        
        }
    }                
}

function loadingPage(){
    if (request.readyState==4) {
		if (request.status==200) {
			var serverData = request.responseText;
			var area = document.getElementById("displayArea");
			//area.innerHTML = serverData;
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
			htmlString += "<th>district</th>";
			htmlString += "<th>district_cn</th>";
			htmlString += "<th>address</th>";
			htmlString += "<th>longitude</th>";
            htmlString += "<th>latitude</th><th></th><th></th></tr>"			
			resultArray.forEach(showRowRecord); 
            htmlString += "</ul>"
			area.innerHTML = htmlString;
        }
    }
}
            
function showRowRecord(record) {
	htmlString += "<tr>";
	htmlString += "<td>" + record["GIHS"] + "</td>";
	htmlString += "<td>" + record["district"] + "</td>";
	htmlString += "<td>" + record["district_cn"] + "</td>";
	htmlString += "<td>" + record["address"] + "</td>";
	htmlString += "<td>" + record["longitude"] + "</td>";
    htmlString += "<td>" + record["latitude"] + "</td>";
    htmlString += "<td><img src='./images/gmap.png' width=30 onclick='tryFillGMap(&quot;" + record["latitude"] + "&quot;, &quot;" + record["longitude"] + "&quot;)' data-bs-toggle='modal' title='google map' data-bs-target='#GMapModal' /></td>";
    htmlString += "<td><img src='./images/bin.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;, &quot;delete&quot;)' data-bs-toggle='modal' title='delete' data-bs-target='#confirmDeleteModal' /></td>";	            
    htmlString += "<td><img src='./images/edit.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;, &quot;edit&quot;)' data-bs-toggle='modal' title='edit' data-bs-target='#confirmEditModal' /></td>";
	htmlString += "</tr>";
}

function tryFillGMap(_lat, _long) {
    //var lat = position.coords.latitude;
    //var lon = position.coords.longitude;
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

//try fill the pop up the modal
function tryFillModal(gihs, operation){

    if (operation == 'add') {
        return;
    }
    console.log("input gihs: " + gihs);
    let m_GIHS, m_name, m_dist, mdist_cn, m_addr, m_long, m_lat;
	//alert(gihs);
    if (resultArray == undefined) {
        return;
    }                
    // iterating the array to find gihs	
	for (item of resultArray) {
		if (item['GIHS']==gihs) {
			m_GIHS = item['GIHS'];
			m_name = item['name'];	
			m_dist = item['district'];
			m_dist_cn = item['district_cn'];
			m_addr = item['address'];	
			m_long = item['longitude'];
            m_lat = item['latitude'];
            console.log("found!");
			break;
		}
	}	
    //fill the corresponding values into UI
    switch (operation) {
        case 'delete':
            document.getElementById("modalGIHS").value = m_GIHS;
	        document.getElementById("modalName").value = m_name;
	        document.getElementById("modalDistrict").value = m_dist;
	        document.getElementById("modalDistrictCN").value = m_dist_cn;
	        document.getElementById("modalAddress").value = m_addr;
	        document.getElementById("modalLongitude").value = m_long;
	        document.getElementById("modalLatitude").value = m_lat;
            break;
        case 'edit':
            document.getElementById("modalGIHS2").value = m_GIHS;
	        document.getElementById("modalName2").value = m_name;
	        document.getElementById("modalDistrict2").value = m_dist;
	        document.getElementById("modalDistrictCN2").value = m_dist_cn;
	        document.getElementById("modalAddress2").value = m_addr;
	        document.getElementById("modalLongitude2").value = m_long;
	        document.getElementById("modalLatitude2").value = m_lat;
            break;
    }
}
            
function goDelete(){
    let gihs = document.getElementById("modalGIHS").value;
    // link - http://localhost/ATWD_Project_2021/controller.php/barbecue/GIHS/" + gihs;
    let url2 = "./controller.php/barbecue/GIHS/" + gihs;
	request.open("DELETE", url2, true);	
	request.onreadystatechange = onUpdatedHandler;  // callback
	//request.send('sendingdata=' + JSON.stringify(objParams));
    request.send(null);
}

function goEdit(){
    // retrieve the UI into an object for sending (i.e. PUT)
    let objSend = {
        GIHS: document.getElementById("modalGIHS2").value,
        Name_en: document.getElementById("modalName2").value,
        District_en: document.getElementById("modalDistrict2").value,
        District_cn: document.getElementById("modalDistrictCN2").value,
        Address_en: document.getElementById("modalAddress2").value,
        Longitude: document.getElementById("modalLongitude2").value,
        Latitude: document.getElementById("modalLatitude2").value
    }
    let url2 = "./controller.php/barbecue";
    request.open("PUT", url2, true);
    request.onreadystatechange = onUpdatedHandler; //callback
    request.send(JSON.stringify(objSend));
}

function goAdd(){
    // retrieve the UI into an object for sending (i.e. POST)
    // The unique key GIHS would be created in REST API but not from UI
    let objSend = {
        Name_en: document.getElementById("modalName3").value,
        District_en: document.getElementById("modalDistrict3").value,
        District_cn: document.getElementById("modalDistrictCN3").value,
        Address_en: document.getElementById("modalAddress3").value,
        Longitude: document.getElementById("modalLongitude3").value,
        Latitude: document.getElementById("modalLatitude3").value
    }
    let url2 = "./controller.php/barbecue";
    request.open("POST", url2, true);
    request.onreadystatechange = onUpdatedHandler; //callback
    request.send(JSON.stringify(objSend));
}

//var loading;
//var iconurl;

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
        "<ul><li>Temp: " + avgOfTemp + "&deg;C</li>" +
        "<li>Humid: " + humid + "%</li>" +
        "<li>Rainfail: " + avgOfRain + "mm</li></ul></div>";
    //this.loading = false;
  }
}