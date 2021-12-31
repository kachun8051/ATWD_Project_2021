<?php
    require_once "getSqlString.php";
    class clsDbInit {
        
        private $objSqlString;

        function __construct() {            
            $this->objSqlString = new sqlString();
        }

        function checkDbExist() {
            $isexist = false;
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn2(); // new mysqli($this->server, $this->dbuser, $this->dbpassword);
            if ($conn->connect_error) {                
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"401", "msg"=>"database connection error"));
                die ("database connection failed");
                exit;
            }
            $dbname_1 = $this->objSqlString->dbname;
            $sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" . $dbname_1 . "'";
            $result = mysqli_query($conn, $sql);
            if ($result) {
                $row = mysqli_num_rows($result);
                if ($row) {
                    $isexist = true;                    
                } else {
                    $isexist = false;
                }
            }   
            $conn->close();                       
            return $isexist;
        }

        function createDb() {
            $iscreated = false;
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn2(); // new mysqli($this->server, $this->dbuser, $this->dbpassword);
            $dbname_2 = $this->objSqlString->dbname;
            // If database is not exist create one
            if (!mysqli_select_db($conn, $dbname_2)){
                $sql = "CREATE DATABASE IF NOT EXISTS " . $dbname_2 . " DEFAULT CHARSET utf8";
                //echo($sql."<br/>");
                if ($conn->query($sql) === TRUE) {
                    //echo "Database created successfully";
                    $iscreated = true;
                } else {
                    //die("Error creating database: " . $conn->error);
                    $iscreated = false;
                }            
            } else {
                $iscreated = true;
            }
            $conn->close();
            return $iscreated;
        }

        function checkTableExist() {
            $isexist = false;
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            // First, establish a new connection for creating table if not exists
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $tablename_1 = $this->objSqlString->tablename;
            if ($conn->connect_error) {                
                $isexist = false;
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"401", "msg"=>"database connection error"));
                die ("database connection failed");
                exit;                
            } else {
                $sql = "SELECT COUNT(*) FROM `" . $tablename_1 . "`";
                if (!$result=$conn->query($sql)) {
                    $isexist = false;
                } else {
                    $isexist = true;
                }
            }
            $conn->close();   
            return $isexist; 
        }

        function createTable() {
            $iscreated = false;
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
                $isexist = false;
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"401", "errmsg"=>"database connection failed"));
                die ("database connection failed");
                exit();
            } else {
                // Second, create table if not exists 
                if ($this->objSqlString == null) {
                    $this->objSqlString = new sqlString();
                }
                $sql_1 = $this->objSqlString->sqlcreate;
                if (!$result=$conn->query($sql_1)){
                    //die ("failed to create table");
                    $iscreated = false;
                } else {
                    $iscreated = true;
                }
            }
            return $iscreated;
        }

        function checkTableEmpty() {
            $isempty = true;
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $tablename_2 = $this->objSqlString->tablename;
            if ($conn->connect_error) {
                $isempty = false;
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"401", "errmsg"=>"database connection error"));
                die ("database connection failed");
                exit;
            } else {
                $sql = "SELECT COUNT(*) FROM `" . $tablename_2 . "`";
                $result = $conn->query($sql);                
                if (!$result) {
                    $isempty = false;
                    echo json_encode(
                        array("issuccess"=>false, "errcode"=>"402", "msg"=>"database query error"));
                    die ("database query failed");
                    exit;
                } else {
                    $rows = mysqli_fetch_row($result);                
                    if ($rows[0] > 0) {
                        $isempty = false;
                    } else {
                        $isempty = true;
                    }
                }
            }
            $conn->close();
            return $isempty;
        }

        function insertRecords() {
            
            $jsonFile = file_get_contents('https://www.lcsd.gov.hk/datagovhk/facility/facility-bbqs.json');
            if (!isset($jsonFile)) {                
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"405", "errmsg"=>"Url is invalid"));
                die ("Url is invalid. Json file not found!");
                return false;
            }
            $isinserted = true;
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $bbqs = json_decode($jsonFile, true);
            foreach ($bbqs as $bbq) {                
                $sql_2 = $this->objSqlString->getSqlInsert($bbq);
                if (!$result=$conn->query($sql_2)) {                    
                    $isinserted = false;
                    echo json_encode(
                        array("issuccess"=>false, "errcode"=>"403", "errmsg"=>"insertion error"));
                    die ("insertion failed");
                    exit;
                }
            }
            $conn->close();
            return $isinserted;
        }

        function deleteAllRecords() {
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $tablename_3 = $this->objSqlString->tablename;
            if ($conn->connect_error) {
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"401", "msg"=>"database connection failed"));
                die ("database connection failed");
                return false;
            }
            $isdeleted = true;
            $sql = "DELETE FROM `" . $tablename_3 . "`";
            //echo ($sql."<br/>");
            if ($conn->query($sql) === FALSE) {                
                $isdeleted = false;
                echo json_encode(
                    array("issuccess"=>false, "errcode"=>"404", "errmsg"=>"deletion failed"));    
                die ("failed to delete table");
                exit;
            }
            $conn->close();
            return $isdeleted;
        }

        function fetchAllRecords(){   
            if ($this->objSqlString == null) {
                $this->objSqlString = new sqlString();
            }         
            $conn = $this->objSqlString->getConn(); // new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
                //$successArray = array();
                //die ("database connection failed");
                return array("issuccess"=>false, "errcode"=>"401", "errmsg"=>"database connection error");
                exit;
            }
            $resultArray = array();
            //$sql = "SELECT GIHS, Name_en, District_en, District_cn, Address_en, Longitude, Latitude FROM tblbbq";
			if ($dbresult=$conn->query($this->objSqlString->sqlSelect_en)) {
                $dataArray = array();
				// records retrieved
				while ( $row=$dbresult->fetch_assoc()) {
					$dataArray[] = $row;
				}
				//echo json_encode($resultArray);
                $resultArray = array("issuccess"=>true, "data"=>$dataArray);
			}
            $conn->close();
            return json_encode($resultArray);
        }
    }
?>