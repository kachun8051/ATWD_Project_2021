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
                die ("database connection failed");
                exit;
            }
            $sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'bbq'";
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
            // If database is not exist create one
            if (!mysqli_select_db($conn, $this->dbname)){
                $sql = "CREATE DATABASE IF NOT EXISTS " . $this->dbname . " DEFAULT CHARSET utf8";
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
            if ($conn->connect_error) {                
                $isexist = false;
                die ("database connection failed");                
            } else {
                $sql = "SELECT COUNT(*) FROM `tblbbq`";
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
                die ("database connection failed");
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
            if ($conn->connect_error) {
                $isempty = false;
                die ("database connection failed");
            } else {
                $sql = "SELECT COUNT(*) FROM `tblbbq`";
                $result = $conn->query($sql);                
                if (!$result) {
                    $isempty = false;
                    die ("database query failed");
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
                    die ("insertion failed");
                    $isinserted = false;
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
            if ($conn->connect_error) {
                die ("database connection failed");
                return false;
            }
            $isdeleted = true;
            $sql = "DELETE FROM `tblbbq`";
            //echo ($sql."<br/>");
            if ($conn->query($sql) === FALSE) {
                die ("failed to delete table");
                $isdeleted = false;    
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
                return array("issuccess"=>false);
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