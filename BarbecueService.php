<?php
    class BarbecueService{

        private $server = "localhost";
        private $dbuser = "root";
        private $dbpassword = "";
        private $dbname = "bbq";

        function restGet() {
            //echo "abc";
            //exit;
            $conn = new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"102", "errmsg"=>"Database connection failure"));
                exit;
            }
            $resultArray = array();
            $sql = "SELECT GIHS, name, district, district_cn, address, longitude, latitude FROM tblbbq";
            //echo $sql;
            //exit;
			if ($dbresult=$conn->query($sql)) {
                $dataArray = array();
				// records retrieved
				while ( $row=$dbresult->fetch_object()  ) {
					$record = array();
                    $record['GIHS'] = $row->GIHS;
					$record['name'] = $row->name;
					$record['district'] = $row->district;
					$record['district_cn'] = $row->district_cn;
					$record['address'] = $row->address;
					$record['longitude'] = $row->longitude;
					$record['latitude'] = $row->latitude;
					$dataArray[] = $record;
				}
				//echo json_encode($resultArray);
                $resultArray = array("issuccess"=>true, "data"=>$dataArray);
			}
            $conn->close();
            //echo "test";
            //exit;
            echo json_encode($resultArray);
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

        function restPost($params) {
            if ($params === null) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"301", "errmsg"=>"No params provided"));
                exit;
            }
            $uniqueKey = $this->keygen();
            if (strlen($uniqueKey) != 10 ) {
                echo json_encode(array("issuccess"=>false, "errcode"=>"303", "errmsg"=>"key gen not valid"));
                exit;
            }
            $conn = new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $sql = "INSERT INTO `tblbbq`(`GIHS`, `name`, `district`, `district_cn`, `address`, `longitude`, `latitude`) VALUES ('$uniqueKey', '$params->Name_en', '$params->District_en', '$params->District_cn', '$params->Address_en', '$params->Longitude', '$params->Latitude')";
			if ($dbresult=$conn->query($sql)) {
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
            $conn = new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            $sql = "UPDATE `tblbbq` SET `name`='$params->Name_en', `district`='$params->District_en', `district_cn`='$params->District_cn', `address`='$params->Address_en', `longitude`='$params->Longitude', `latitude`='$params->Latitude' WHERE `GIHS`='$params->GIHS'";
            if ($dbresult=$conn->query($sql)){
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
			$conn = new mysqli($this->server, $this->dbuser, $this->dbpassword, $this->dbname);
            if ($conn->connect_error) {
	            //die ("Database failed");
                echo json_encode(array("issuccess"=>false, "errcode"=>"102", "errmsg"=>"Database connection failure"));
                exit;
            }
            //echo $params;
            //exit;
            $GIHS = $params[1];
			$sql = "DELETE FROM tblbbq where GIHS='$GIHS'";
			if ($dbresult=$conn->query($sql)) {
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