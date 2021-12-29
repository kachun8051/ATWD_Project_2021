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
                $tempSql = "SELECT " . $param[0] . " FROM `tblbbq` GROUP BY " . $param[0];
                $dbresult = $conn->query($tempSql);
                if ($dbresult) {
                    $dataArray = array();
                    // records retrieved
                    while ( $row=$dbresult->fetch_assoc()) {					
                        $dataArray[] = $row[$param[0]];
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
            $sql_3 = $this->objSqlString->getSqlInsert2($params);
            $conn =  $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);            
            $dbresult=$conn->query($sql_3);
            $conn->close();
			if ($dbresult) {
				echo json_encode(array("issuccess"=>true, "operation"=>"add", "msg"=>"record created"));
			} else {
				echo json_encode(array("issuccess"=>false, "errcode"=>"302", "errmsg"=>"SQL failed to create facility record"));
			}
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
            $conn->close();
            if ($dbresult){
                echo json_encode(array("issuccess"=>true, "operation"=>"put", "msg"=>"record updated"));
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
            if ($params[0] !== 'GIHS') {
                echo json_encode(array("issuccess"=>false, "errcode"=>"101", "errmsg"=>"No GIHS provided", "input"=> json_encode($params)));
                exit;
            }
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
			$conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"102", "errmsg"=>"Database connection failure"));
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