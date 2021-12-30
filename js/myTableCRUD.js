// this javascript functions try to append, remove and replacewith html table rather than 
// refresh the whole table after row is inserted, deleted and updated

// row id is NOT index of array but it is in accending order 
let lstRowId = [];

// record is associated array while idx is running index
function addBatchRows(record, idx) {
    lstRowId.push(idx);
	  let temp = "<tr id='row_" + idx + "' class='accordion-toggle'>";
	  temp += "<td>" + record["GIHS"] + "</td>";
	  temp += "<td>" + record["District_en"] + "</td>";
	  temp += "<td>" + record["Name_en"] + "</td>";
	  temp += "<td>" + record["Facilities_en"] + "</td>";
    temp += "<td><img src='./images/info.png' width=30 data-bs-toggle='collapse' data-bs-target='#demo" + idx + "' /></td>";
    temp += "<td><img src='./images/gmap.png' width=30 data-bs-toggle='modal' title='google map' data-bs-target='#GMapModal' onclick='tryFillGMap(&quot;" + record["GIHS"] + "&quot;)'/></td>";
    temp += "<td><img src='./images/bin.png' width=30 data-bs-toggle='modal' title='delete' data-bs-target='#confirmDeleteModal' onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + idx + ", &quot;delete&quot;)'/></td>";	            
    temp += "<td><img src='./images/edit.png' width=30 data-bs-toggle='modal' title='edit' data-bs-target='#confirmEditModal' onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + idx + ", &quot;edit&quot;)'/></td>";
	  temp += "</tr>";
    temp += "<tr id='subrow_" + idx + "'><td style='padding-bottom: 5px;' colspan='8' class='hiddenRow'>";
    temp += "<div class='accordian-body collapse p-3' id='demo" + idx + "'>";
    temp += "<div class='col-md-2' style='float: left; justify-content: space-between; align-items: center; margin-bottom: 10px;'>";
    temp += "Ancillary Facilities: <span>" + record["Ancillary_facilities_en"] + "</span></div>";
    temp += "<div class='col-md-4' style='float: left; margin-bottom: 10px;'>";
    temp += "Address: <span>" + record["Address_en"] + "</span><br/>";
    temp += "Phone: <span>" + record["Phone"] + "</span><br/>";
    temp += "Opening hours: <span>" + record["Opening_hours_en"] + "</span></div>";    
    temp += "<div class='col-md-5' style='float: left; margin-bottom: 10px;'>";
    temp += "Remarks: <br/><span>" + record["Remarks_en"] + "</span>";
    temp += "</div></div></td></tr>";
    return temp;
}
// handler of single row is inserted
function onSingleRowInsertedHandler() {
  if (request.readyState==4) {
		if (request.status==200) {
      console.log("addSingleRow")
			var serverData = request.responseText;
      let resultObj = JSON.parse(serverData);
      if (resultObj.issuccess === false) {
        alert("Insertion Error!");
        return;
      }
      let lastidx = lstRowId.length-1;
      console.log("last index: " + lastidx);
      let nextid = lstRowId[lastidx] + 1;
      let record = JSON.parse(resultObj.json);
      let temp = "<tr id='row_" + nextid + "' class='accordion-toggle'>";
      temp += "<td>" + resultObj.gihs + "</td>";
	    temp += "<td>" + record["District_en"] + "</td>";
	    temp += "<td>" + record["Name_en"] + "</td>";
	    temp += "<td>" + record["Facilities_en"] + "</td>";
      temp += "<td><img src='./images/info.png' width=30 data-bs-toggle='collapse' data-bs-target='#demo" + nextid + "' /></td>";
      temp += "<td><img src='./images/gmap.png' width=30 onclick='tryFillGMap(&quot;" + record["GIHS"] + "&quot;)' data-bs-toggle='modal' title='google map' data-bs-target='#GMapModal' /></td>";
      temp += "<td><img src='./images/bin.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + nextid + " &quot;delete&quot;)' data-bs-toggle='modal' title='delete' data-bs-target='#confirmDeleteModal' /></td>";	            
      temp += "<td><img src='./images/edit.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + nextid + " &quot;edit&quot;)' data-bs-toggle='modal' title='edit' data-bs-target='#confirmEditModal' /></td>";
	    temp += "</tr>";
      temp += "<tr id='subrow_" + nextid + "'><td style='padding-bottom: 5px;' colspan='8' class='hiddenRow'>";
      temp += "<div class='accordian-body collapse p-3' id='demo" + nextid + "'>";
      temp += "<div class='col-md-2' style='float: left; justify-content: space-between; align-items: center; margin-bottom: 10px;'>";
      temp += "Ancillary Facilities: <span>" + record["Ancillary_facilities_en"] + "</span></div>";
      temp += "<div class='col-md-4' style='float: left; margin-bottom: 10px;'>";
      temp += "Address: <span>" + record["Address_en"] + "</span><br/>";
      temp += "Phone: <span>" + record["Phone"] + "</span><br/>";
      temp += "Opening hours: <span>" + record["Opening_hours_en"] + "</span></div>";    
      temp += "<div class='col-md-5' style='float: left; margin-bottom: 10px;'>";
      temp += "Remarks: <br/><span>" + record["Remarks_en"] + "</span>";
      temp += "</div></div></td></tr>";
      // insert at second row
      $('#displaytable tr:first').after(temp);
      // push to list
      lstRowId.push(nextid);
      // close the Add Facilities modal / dialog
      //document.getElementById("btnModalCancel3").click();
      $('#btnModalCancel3').click();
    }
  }    
}
// handler of single row is deleted
function onSingleRowDeletedHandler() {
  if (request.readyState==4) {
		if (request.status==200) {
      console.log("deleteSingleRow")
			var serverData = request.responseText;
      let resultObj = JSON.parse(serverData);
      if (resultObj.issuccess === false) {
        alert("Delete Error!");
        return;
      }
      let foundidx = lstRowId.indexOf(currRowId);
      if (foundidx == -1) {
        console.log("row id: " + currRowId + " is NOT found!");
        return;
      }      
      // remove from list
      lstRowId.splice(foundidx, 1);
      // delete the row
      $('#displaytable tr#row_' + currRowId).remove(); 
      // close the Delete Facilities modal / dialog
      $('#btnModalCancel').click();     
    }  
  }
}
// handler of single row is updated
function onSingleRowUpdatedHandler() {
  if (request.readyState==4) {
		if (request.status==200) {
      var respData = request.responseText;
      //alert(respData);
      //return;
      var resultObj = JSON.parse(respData);
      //alert(objResp.issuccess);
      //return;
      console.log(resultObj.issuccess);
      if (resultObj.issuccess == false) {
        alert("Update Error!");
        return;
      }
      let record = JSON.parse(resultObj.json);
      let temp = "<tr id='row_" + currRowId + "' class='accordion-toggle'>";
      temp += "<td>" + resultObj.gihs + "</td>";
	    temp += "<td>" + record["District_en"] + "</td>";
	    temp += "<td>" + record["Name_en"] + "</td>";
	    temp += "<td>" + record["Facilities_en"] + "</td>";
      temp += "<td><img src='./images/info.png' width=30 data-bs-toggle='collapse' data-bs-target='#demo" + currRowId + "' /></td>";
      temp += "<td><img src='./images/gmap.png' width=30 onclick='tryFillGMap(&quot;" + record["GIHS"] + "&quot;)' data-bs-toggle='modal' title='google map' data-bs-target='#GMapModal' /></td>";
      temp += "<td><img src='./images/bin.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + currRowId + " &quot;delete&quot;)' data-bs-toggle='modal' title='delete' data-bs-target='#confirmDeleteModal' /></td>";	            
      temp += "<td><img src='./images/edit.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + currRowId + " &quot;edit&quot;)' data-bs-toggle='modal' title='edit' data-bs-target='#confirmEditModal' /></td>";
	    temp += "</tr>";
      temp += "<tr id='subrow_" + currRowId + "'><td style='padding-bottom: 5px;' colspan='8' class='hiddenRow'>";
      temp += "<div class='accordian-body collapse p-3' id='demo" + currRowId + "'>";
      temp += "<div class='col-md-2' style='float: left; justify-content: space-between; align-items: center; margin-bottom: 10px;'>";
      temp += "Ancillary Facilities: <span>" + record["Ancillary_facilities_en"] + "</span></div>";
      temp += "<div class='col-md-4' style='float: left; margin-bottom: 10px;'>";
      temp += "Address: <span>" + record["Address_en"] + "</span><br/>";
      temp += "Phone: <span>" + record["Phone"] + "</span><br/>";
      temp += "Opening hours: <span>" + record["Opening_hours_en"] + "</span></div>";    
      temp += "<div class='col-md-5' style='float: left; margin-bottom: 10px;'>";
      temp += "Remarks: <br/><span>" + record["Remarks_en"] + "</span>";
      temp += "</div></div></td></tr>";
      // replace the row with new row
      $('#displaytable tr#row_' + currRowId).replaceWith(temp);
      // close the Edit Facilities modal / dialog
      $('#btnModalCancel2').click();
    }
  }
}
