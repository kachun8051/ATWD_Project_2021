<?php
    require_once "getSqlString.php";
    class BarbecueService{

        private $objSqlString;

        function __construct() {            
            $objSqlString = new sqlString();
        }

        function restGet($param) {
            
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn(); //new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"102", "errmsg"=>"Database connection failure"));
                exit;
            }
            $resultArray = array();       
            if ($param !== null) {
                $colname = $param[0];
                $tempSql = "SELECT " . $colname . " FROM `tblbbq` GROUP BY " . $colname;
                $dbresult = $conn->query($tempSql);
                if ($dbresult) {
                    $dataArray = array();
                    // records retrieved
                    while ( $row=$dbresult->fetch_assoc()) {					
                        $dataArray[] = $row["District_en"];
                    }
                    //echo json_encode($resultArray);
                    $resultArray = array("issuccess"=>true, "data"=>$dataArray);
                } else {
                    echo json_encode(array("issuccess"=>false, "errcode"=>"103", "errmsg"=>"query failure"));
                    exit;
                }
            } else {
                $dbresult = $conn->query($this->objSqlString->sqlSelect_en); 
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
            }            
            $conn->close();
            echo json_encode($resultArray);
        }

        function restPost($params) {
            if ($params === null) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"301", "errmsg"=>"No params provided"));
                exit;
            }    
            // get the insert sql string before next connection
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }            
            //$sql_3 = $this->objSqlString->getSqlInsert2($params);
            // the return value is an associate array
            // {sql, gihs}
            $objSql_3 = $this->objSqlString->getSqlInsert2($params);
            $conn =  $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);            
            $dbresult=$conn->query($objSql_3["sql"]);     
            $jStr = json_encode($params);       
			if ($dbresult) {
				echo json_encode(
                    array("issuccess"=>true, "operation"=>"add", "msg"=>"record created", 
                        "gihs"=>$objSql_3["gihs"], "json"=>$jStr));
			} else {
				echo json_encode(array("issuccess"=>false, "errcode"=>"302", "errmsg"=>"SQL failed to create facility record"));
			}
            $conn->close();
        }

        function restPut($params) {
            if ($params === null) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"201", "errmsg"=>"No params provided"));
                exit;
            }            
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $sql = $this->objSqlString->getSqlUpdate($params);
            $dbresult = $conn->query($sql);
            $jStr = json_encode($params);
            $conn->close();
            if ($dbresult){
                echo json_encode(
                    array("issuccess"=>true, "operation"=>"put", "msg"=>"record updated", "json"=>$jStr));
            } else {
                echo json_encode(array("issuccess"=>false, "errcode"=>"202", "errmsg"=>"SQL failed to update facility record"));
            }
        }

        //$params is array
        function restDelete($params) {
            if ($params === null) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"101", "errmsg"=>"No params provided"));
                exit;
            }    
            if ($params[0] !== 'GIHS' || count($params) !== 2) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"102", "errmsg"=>"No GIHS provided", "input"=> json_encode($params)));
                exit;
            }
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
			$conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"103", "errmsg"=>"Database connection failure"));
                exit;
            }
            //echo $params;
            //exit;
            $GIHS = $params[1];
			$sql = "DELETE FROM tblbbq where GIHS='$GIHS'";
            $dbresult=$conn->query($sql);
            $conn->close();
			if ($dbresult) {
				echo json_encode(array("issuccess"=>true, "operation"=>"delete", "msg"=>"bbq facility is deleted"));
				exit;
			} else {
				$arr = array();
				//$arr["status"] = "error";
                $arr["issuccess"]=false;
				$arr["errcode"] = "103";
				$arr["errmsg"] = "SQL failed to delete facility record";
				echo json_encode($arr);
				exit;
			}			
		}        
    }
?>