<?php
    require_once "getSqlString.php";
    class BbqService {
        // http://localhost/controller.php/bbq/:keyword        
        private $objSqlString;

        function __construct() {            
            $objSqlString = new sqlString();
        }

        function restGet($param){
            if ($param == null) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"501", "errmsg"=>"Parameter not found!"));
                exit;
            }
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $conn = $this->objSqlString->getConn(); 
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"502", "errmsg"=>"Database connection failure"));
                exit;
            }
            $resultArray = array();
            $keyword = $param[0];
            $tempSql = "Select GIHS, District_en, Name_en, Address_en, Facilities_en, Ancillary_facilities_en, ";
            $tempSql .= "Opening_hours_en, Phone, Remarks_en, Longitude, Latitude ";
            $tempSql .= "From `tblbbq` ";
            $tempSql .= "WHERE LOWER(Name_en) LIKE LOWER('%" . $keyword . "%') or ";
            $tempSql .= "LOWER(Address_en) LIKE LOWER('%" . $keyword . "%') or ";
            $tempSql .= "LOWER(Facilities_en) LIKE LOWER('%" . $keyword . "%') or ";
            $tempSql .= "LOWER(Ancillary_facilities_en) LIKE LOWER('%" . $keyword . "%') or ";
            $tempSql .= "LOWER(Opening_hours_en) LIKE LOWER('%" . $keyword . "%') or ";
            $tempSql .= "LOWER(Remarks_en) LIKE LOWER('%" . $keyword . "%') ";
            $tempSql .= "Order By District_en, Name_en";
            $dbresult = $conn->query($tempSql);
            if ($dbresult) {
                $dataArray = array();
                // records retrieved
                while ( $row=$dbresult->fetch_object()) {					
                    $dataArray[] = $row;
                }
                //echo json_encode($resultArray);
                $resultArray = array("issuccess"=>true, "data"=>$dataArray);
            } else {
                echo json_encode(array("issuccess"=>false, "errcode"=>"103", "errmsg"=>"query failure"));
                exit;
            }
            $conn->close();
            echo json_encode($resultArray);
        }
    }
?>