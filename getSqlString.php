<?php
    class sqlString {

        private $server = "localhost";
        private $dbuser = "root";
        private $dbpassword = "";
        public $dbname = "bbq";
        public $tablename = "tblbbq";
        public $sqlcreate;
        public $sqlSelect_en;

        function __construct() {             
            $temp = "CREATE TABLE IF NOT EXISTS `tblbbq`(";
            $temp .= "GIHS VARCHAR(20), District_en VARCHAR(50), District_cn VARCHAR(50), ";
            $temp .= "Name_en VARCHAR(50), Name_cn VARCHAR(50), Address_en VARCHAR(200), Address_cn VARCHAR(100), ";
            $temp .= "Facilities_en TEXT, Facilities_cn TEXT, Ancillary_facilities_en TEXT, Ancillary_facilities_cn TEXT, ";
            $temp .= "Opening_hours_en VARCHAR(50), Opening_hours_cn TEXT, Phone VARCHAR(20), ";
            $temp .= "Remarks_en TEXT, Remarks_cn TEXT, Longitude TEXT, Latitude TEXT, ";
            $temp .= "PRIMARY KEY (GIHS)) "; 
            $temp .= "DEFAULT CHARSET=utf8";
            $this->sqlcreate = $temp;
            $temp = "Select GIHS, District_en, Name_en, Address_en, Facilities_en, Ancillary_facilities_en, ";
            $temp .= "Opening_hours_en, Phone, Remarks_en, Longitude, Latitude ";
            $temp .= "From `tblbbq` Order By District_en, Name_en";
            $this->sqlSelect_en = $temp;
        }
        
        public function getConn() {
            return new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
        }

        public function getConn2() {
            return new mysqli($this->server, $this->dbuser, $this->dbpassword);
        }

        // input $paramobj is an object
        function getSqlUpdate($paramobj) {

            $arrColValPair = array();

            $name_en = '';
            if (isset($paramobj->Name_en)) {
                $name_en = str_replace("'", "&apos;", $paramobj->Name_en);
                array_push($arrColValPair, "`Name_en`='$name_en'"); 
            }
            $dist_en = '';
            if (isset($paramobj->District_en)) {
                $dist_en = str_replace("'", "&apos;", $paramobj->District_en);
                array_push($arrColValPair, "`District_en`='$dist_en'");
            }
            $addr_en = '';
            if (isset($paramobj->Address_en)) {
                $addr_en = str_replace("'", "&apos;", $paramobj->Address_en);
                array_push($arrColValPair, "`Address_en`='$addr_en'");
            }
            $faci_en = '';
            if (isset($paramobj->Facilities_en)) {
                $faci_en = str_replace("'", "&apos;", $paramobj->Facilities_en);
                array_push($arrColValPair, "`Facilities_en`='$faci_en'");
            }
            $anci_en = '';
            if (isset($paramobj->Ancillary_facilities_en)) {
                $anci_en = str_replace("'", "&apos;", $paramobj->Ancillary_facilities_en);
                array_push($arrColValPair, "`Ancillary_facilities_en`='$anci_en'");
            }
            $open_en = '';
            if (isset($paramobj->Opening_hours_en)) {
                $open_en = str_replace("'", "&apos;", $paramobj->Opening_hours_en);
                array_push($arrColValPair, "`Opening_hours_en`='$open_en'");
            }
            $phone = '';
            if (isset($paramobj->Phone)) {
                $phone = str_replace("'", "&apos;", $paramobj->Phone);
                array_push($arrColValPair, "`Phone`='$phone'");
            }
            $remk_en = '';
            if (isset($paramobj->Remarks_en)) {
                $remk_en = str_replace("'", "&apos;", $paramobj->Remarks_en);
                array_push($arrColValPair, "`Remarks_en`='$remk_en'"); 
            }
            $long = '';
            if (isset($paramobj->Longitude)) {
                $long = $paramobj->Longitude;
                array_push($arrColValPair, "`Longitude`='$long'");
            }
            $lat = '';
            if (isset($paramobj->Latitude)) {
                $lat = $paramobj->Latitude;
                array_push($arrColValPair, "`Latitude`='$lat'");
            }            
            $gihs = $paramobj->GIHS;

            if (count($arrColValPair) > 0) {
                $param = implode(', ', $arrColValPair);
                $sqlUpd = "UPDATE `tblbbq` SET " . $param . " WHERE `GIHS`='$gihs'";
            }
            else {
                $sqlUpd = "";
            }
            /*
            $sqlUpd = "UPDATE `tblbbq` SET `Name_en`='$name_en', `District_en`='$dist_en', `Address_en`='$addr_en', "; 
            $sqlUpd .= "`Facilities_en`='$faci_en', `Ancillary_facilities_en`='$anci_en', `Opening_hours_en`='$open_en', ";
            $sqlUpd .= "`Phone`='$phone', `Remarks_en`='$remk_en', `Longitude`='$long', `Latitude`='$lat' "; 
            $sqlUpd .= "WHERE `GIHS`='$gihs'";
            */
            return $sqlUpd;
        }

        // input $paramobj is an object
        // this function is used when user input
        function getSqlInsert2($paramobj) {
            $name_en = '';
            if (isset($paramobj->Name_en)) {
                $name_en = str_replace("'", "&apos;", $paramobj->Name_en);    
            }
            $dist_en = '';
            if (isset($paramobj->District_en)) {
                $dist_en = str_replace("'", "&apos;", $paramobj->District_en);
            }
            $addr_en = '';
            if (isset($paramobj->Address_en)) {
                $addr_en = str_replace("'", "&apos;", $paramobj->Address_en);
            }
            $faci_en = '';
            if (isset($paramobj->Facilities_en)) {
                $faci_en = str_replace("'", "&apos;", $paramobj->Facilities_en);
            }
            $anci_en = '';
            if (isset($paramobj->Ancillary_facilities_en)) {
                $anci_en = str_replace("'", "&apos;", $paramobj->Ancillary_facilities_en);
            }
            $open_en = '';
            if (isset($paramobj->Opening_hours_en)) {
                $open_en = str_replace("'", "&apos;", $paramobj->Opening_hours_en);
            }
            $phone = '';
            if (isset($paramobj->Phone)) {
                $phone = str_replace("'", "&apos;", $paramobj->Phone);
            }
            $remk_en = '';
            if (isset($paramobj->Remarks_en)) {
                $remk_en = str_replace("'", "&apos;", $paramobj->Remarks_en);
            }
            $long = '';
            if (isset($paramobj->Longitude)) {
                $long = $paramobj->Longitude;
            }
            $lat = '';
            if (isset($paramobj->Latitude)) {
                $lat = $paramobj->Latitude;
            }            
            do {
                $gihs = $this->keygen();
            } 
            while($this->isGihsFound($gihs) == true);
            $sqlIns = "INSERT INTO `tblbbq`(`GIHS`, `Name_en`, `District_en`, `Address_en`, `Facilities_en`, ";
            $sqlIns .= "`Ancillary_facilities_en`, `Opening_hours_en`, `Phone`, `Remarks_en`, `Longitude`, `Latitude`) "; 
            $sqlIns .= "VALUES ('$gihs', '$name_en', '$dist_en', '$addr_en', '$faci_en', "; 
            $sqlIns .= "'$anci_en', '$open_en', '$phone', '$remk_en', '$long', '$lat')";
            return array("gihs"=>$gihs, "sql"=>$sqlIns);
        }

        // input $paramobj is an associated array
        // this function is used by looping json string
        function getSqlInsert($paramobj) {                        
            $gihs = $paramobj['GIHS'];            
            $dist_en = str_replace("'", "&apos;", $paramobj['District_en']);
            $dist_cn = str_replace("'", "&apos;", $paramobj['District_cn']);
            $name_en = str_replace("'", "&apos;", $paramobj['Name_en']);
            $name_cn = str_replace("'", "&apos;", $paramobj['Name_cn']);
            $addr_en = str_replace("'", "&apos;", $paramobj['Address_en']);
            $addr_cn = str_replace("'", "&apos;", $paramobj['Address_cn']);
            $faci_en = str_replace("'", "&apos;", $paramobj['Facilities_en']);
            $faci_cn = str_replace("'", "&apos;", $paramobj['Facilities_b5']);
            $anci_en = str_replace("'", "&apos;", $paramobj['Ancillary_facilities_en']);
            $anci_cn = str_replace("'", "&apos;", $paramobj['Ancillary_facilities_cn']);
            $open_en = str_replace("'", "&apos;", $paramobj['Opening_hours_en']);
            $open_cn = str_replace("'", "&apos;", $paramobj['Opening_hours_cn']);
            $phone = str_replace("'", "&apos;", $paramobj['Phone']);
            $remk_en = str_replace("'", "&apos;", $paramobj['Remarks_en']);
            $remk_cn = str_replace("'", "&apos;", $paramobj['Remarks_cn']);
            $long = str_replace("'", "&apos;", $paramobj['Longitude']);
            $lat = str_replace("'", "&apos;", $paramobj['Latitude']);
            $sqlIns = "INSERT INTO tblbbq VALUES ('$gihs', '$dist_en', '$dist_cn', '$name_en', '$name_cn', '$addr_en', '$addr_cn', ";
            $sqlIns .= "'$faci_en', '$faci_cn', '$anci_en', '$anci_cn', '$open_en', '$open_cn', '$phone', '$remk_en', '$remk_cn',";
            $sqlIns .= "'$long', '$lat')";
            return $sqlIns;
        }
        
        // input $paramobj is an associated array
        // this function is used by looping json string
        function getSqlEnglishInsert($paramobj) {                        
            $gihs = $paramobj['GIHS'];            
            $dist_en = str_replace("'", "&apos;", $paramobj['District_en']);
            $name_en = str_replace("'", "&apos;", $paramobj['Name_en']);
            $addr_en = str_replace("'", "&apos;", $paramobj['Address_en']);
            $faci_en = str_replace("'", "&apos;", $paramobj['Facilities_en']);
            $anci_en = str_replace("'", "&apos;", $paramobj['Ancillary_facilities_en']);
            $open_en = str_replace("'", "&apos;", $paramobj['Opening_hours_en']);
            $phone = str_replace("'", "&apos;", $paramobj['Phone']);
            $remk_en = str_replace("'", "&apos;", $paramobj['Remarks_en']);
            $long = str_replace("'", "&apos;", $paramobj['Longitude']);
            $lat = str_replace("'", "&apos;", $paramobj['Latitude']);
            $sqlIns = "INSERT INTO `tblbbq`(`GIHS`, `District_en`, `Name_en`, `Address_en`, "; 
            $sqlIns .= "`Facilities_en`, `Ancillary_facilities_en`, `Opening_hours_en`, `Phone`, `Remarks_en`, "; 
            $sqlIns .= "`Longitude`, `Latitude`) "; 
            $sqlIns .= "VALUES ('$gihs', '$dist_en', '$name_en', '$addr_en', ";
            $sqlIns .= "'$faci_en', '$anci_en', '$open_en', '$phone', '$remk_en', ";
            $sqlIns .= "'$long', '$lat')";
            return $sqlIns;
        }

        private function keygen() {
            $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $input_length = strlen($permitted_chars);
            $random_string = '';
            for($i = 0; $i < 10; $i++) {
                $random_character = $permitted_chars[mt_rand(0, $input_length-1)];
                $random_string .= $random_character;
            }
            return $random_string;
        }

        private function isGihsFound($i_key) {
            if ( strlen($i_key) != 10) {
                // non 10-digit string is not allowed 
                return true;
            }
            $conn = new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"102", "errmsg"=>"Database connection failure"));
                exit;
            }
            $sql = "Select Count(*) as howmany From tblbbq Where GIHS='" . $i_key . "'";
            $dbresult=$conn->query($sql);            
            $data = $dbresult->fetch_assoc();
            $conn->close();
            if ($data["howmany"]>0) {
                return true;
            } else {
                return false;
            }
        }

    }
?>