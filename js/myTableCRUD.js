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
      console.log("serverData: " + serverData);
      let resultObj = JSON.parse(serverData);
      if (resultObj.issuccess === false) {
        alert("Insertion Error!");
        return;
      }
      let lastidx = lstRowId.length-1;
      console.log("last index: " + lastidx);
      let nextid = lstRowId[lastidx] + 1;
      let record = JSON.parse(resultObj.json);
      record["GIHS"] = resultObj.gihs;      
      //console.log("record: " + resultObj.json);
      let temp = "<tr id='row_" + nextid + "' class='accordion-toggle'>";
      temp += "<td>" + resultObj.gihs + "</td>";
	    temp += "<td>" + record["District_en"] + "</td>";
	    temp += "<td>" + record["Name_en"] + "</td>";
	    temp += "<td>" + record["Facilities_en"] + "</td>";
      temp += "<td><img src='./images/info.png' width=30 data-bs-toggle='collapse' data-bs-target='#demo" + nextid + "' /></td>";
      temp += "<td><img src='./images/gmap.png' width=30 onclick='tryFillGMap(&quot;" + resultObj.gihs + "&quot;)' data-bs-toggle='modal' title='google map' data-bs-target='#GMapModal' /></td>";
      temp += "<td><img src='./images/bin.png' width=30 onclick='tryFillModal(&quot;" + resultObj.gihs + "&quot;," + nextid + ", &quot;delete&quot;)' data-bs-toggle='modal' title='delete' data-bs-target='#confirmDeleteModal' /></td>";	            
      temp += "<td><img src='./images/edit.png' width=30 onclick='tryFillModal(&quot;" + resultObj.gihs + "&quot;," + nextid + ", &quot;edit&quot;)' data-bs-toggle='modal' title='edit' data-bs-target='#confirmEditModal' /></td>";
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
      //lstRowId.push(nextid);
      // push to first position
      lstRowId.unshift(nextid);
      // push to first position 
      resultArray.unshift(record);
      // close the Add Facilities modal / dialog
      //document.getElementById("btnModalCancel3").click();
      $('#btnModalCancel3').click();
      flashRow(0);
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
      // remove from list
      resultArray.splice(foundidx, 1);
      // delete the row
      $('#displaytable tr#row_' + currRowId).remove(); 
      $('#displaytable tr#subrow_' + currRowId).remove(); 
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
      temp += "<td>" + record["GIHS"] + "</td>";
	    temp += "<td>" + record["District_en"] + "</td>";
	    temp += "<td>" + record["Name_en"] + "</td>";
	    temp += "<td>" + record["Facilities_en"] + "</td>";
      temp += "<td><img src='./images/info.png' width=30 data-bs-toggle='collapse' data-bs-target='#demo" + currRowId + "' /></td>";
      temp += "<td><img src='./images/gmap.png' width=30 onclick='tryFillGMap(&quot;" + record["GIHS"] + "&quot;)' data-bs-toggle='modal' title='google map' data-bs-target='#GMapModal' /></td>";
      temp += "<td><img src='./images/bin.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + currRowId + ", &quot;delete&quot;)' data-bs-toggle='modal' title='delete' data-bs-target='#confirmDeleteModal' /></td>";	            
      temp += "<td><img src='./images/edit.png' width=30 onclick='tryFillModal(&quot;" + record["GIHS"] + "&quot;," + currRowId + ", &quot;edit&quot;)' data-bs-toggle='modal' title='edit' data-bs-target='#confirmEditModal' /></td>";
	    temp += "</tr>";
      let subtemp = "<tr id='subrow_" + currRowId + "'><td style='padding-bottom: 5px;' colspan='8' class='hiddenRow'>";
      subtemp += "<div class='accordian-body collapse p-3' id='demo" + currRowId + "'>";
      subtemp += "<div class='col-md-2' style='float: left; justify-content: space-between; align-items: center; margin-bottom: 10px;'>";
      subtemp += "Ancillary Facilities: <span>" + record["Ancillary_facilities_en"] + "</span></div>";
      subtemp += "<div class='col-md-4' style='float: left; margin-bottom: 10px;'>";
      subtemp += "Address: <span>" + record["Address_en"] + "</span><br/>";
      subtemp += "Phone: <span>" + record["Phone"] + "</span><br/>";
      subtemp += "Opening hours: <span>" + record["Opening_hours_en"] + "</span></div>";    
      subtemp += "<div class='col-md-5' style='float: left; margin-bottom: 10px;'>";
      subtemp += "Remarks: <br/><span>" + record["Remarks_en"] + "</span>";
      subtemp += "</div></div></td></tr>";

      let foundidx = lstRowId.indexOf(currRowId);
      if (foundidx == -1) {
        alert("current row index: " + currRowId + " NOT found!");
        return;
      }      
      // replace the row with new row
      $('#displaytable tr#row_' + currRowId).replaceWith(temp);
      // replace the sub row (i.e. hidden row) with new sub row
      $('#displaytable tr#subrow_' + currRowId).replaceWith(subtemp);
      // update the resultArray
      resultArray.splice(foundidx, 1, record);
      // close the Edit Facilities modal / dialog
      $('#btnModalCancel2').click();
      // hightlight the updated row for a while
      flashRow(foundidx);
    }
  }
}

// flash effect for edited row or added row
function flashRow(i_id) {
  $('table#displaytable tr#row_' + i_id).addClass("selectrow");
  $('table#displaytable tr#row_' + i_id).addClass("highlightrow");
  setInterval(
    () => {
      $('table#displaytable tr#row_' + i_id).removeClass("highlightrow");
      clearInterval();
    }, 750
  );
  setInterval(
    () => {
      $('table#displaytable tr#row_' + i_id).removeClass("selectrow");
      clearInterval();
    }, 2000
  );
}
