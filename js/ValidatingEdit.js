$(document).ready(
    function() {
        // name2
        let name2Error = true;
        $('#namevalid2').hide();        
        $('#modalName2').keyup(()=>validatename2());
        // district2
        let dist2Error = true;
        $('#districtvalid2').hide();        
        $('#modalDistrict2').keyup(()=>validatedistrict2());
        // address 2
        let addr2Error = true;
        $('#addressvalid2').hide();        
        $('#modalAddress2').keyup(()=>validateaddress2());
        // phone 3
        let phone3Error = true;
        $('#phonevalid3').hide();        
        $('#modalPhone3').keyup(()=>validatephone3());
        // facilities 3
        let facilities3Error = true;
        $('#facilitiesvalid3').hide();        
        $('#modalFacilities').keyup(()=>validatefacilities3());        
        // hours 3
        let hours3Error = true;
        $('#hoursvalid3').hide();        
        $('#modalHours3').keyup(()=>validatehours3());
        // lat 3
        let lat3Error = true;
        $('#latvalid3').hide();
        $('#modalLat3').keyup(()=>validatelat3());
        // long 3
        let long3Error = true;
        $('#longvalid3').hide();
        $('#modalLong3').keyup(()=>validatelong3());

        function validatename3() {
            name3Error = true;
            let name3Value = $('#modalName3').val();
            if (name3Value.length == '') {
                $('#namevalid3').show();
                $('#namevalid3').html('** Name is missing');
                name3Error = false;
                return false;
            }
            if (name3Value.length < 5) {
                $('#namevalid3').show();
                $('#namevalid3').html('** Length of name must be greater than 5');
                name3Error = false;
                return false;
            }
            $('#namevalid3').hide();
        }

        function validatedistrict3() {
            dist3Error = true;
            let dist3Value = $('#modalDistrict3').val();
            if (dist3Value.length == '') {
                $('#districtvalid3').show();
                $('#districtvalid3').html('** District is missing');
                dist3Error = false;
                return false;
            }
            if (dist3Value.length < 5) {
                $('#districtvalid3').show();
                $('#districtvalid3').html('** Length of district must be greater than 5');
                dist3Error = false;
                return false;
            }
            $('#districtvalid3').hide();
        }

        function validateaddress3() {
            addr3Error = true;
            let addr3Value = $('#modalAddress3').val();
            if (addr3Value.length == '') {
                $('#addressvalid3').show();
                $('#addressvalid3').html('** Address is missing');
                addr3Error = false;
                return false;
            }
            if (addr3Value.length < 10) {
                $('#addressvalid3').show();
                $('#addressvalid3').html('** Length of address must be greater than 10');
                addr3Error = false;
                return false;
            }
            $('#addressvalid3').hide();
        }

        function validatephone3() {
            phone3Error = true;
            let phone3Value = $('#modalPhone3').val();
            if (phone3Value.length == '') {
                $('#phonevalid3').show();
                $('#phonevalid3').html('** Phone is missing');
                phone3Error = false;
                return false;
            }
            let patPhone = /^[0-9]{4}[ ]{1}[0-9]{4}$/;
            let result = patPhone.test(phone3Value);
            if (result == false) {
                $('#phonevalid3').show();
                $('#phonevalid3').html('** format of phone incorrect');
                phone3Error = false;
                return false;
            }
            $('#phonevalid3').hide();
        }

        function validatefacilities3() {
            facilities3Error = true;
            let facili3Value = $('#modalFacilities3').val();
            if (facili3Value.length == '') {
                $('#facilitiesvalid3').show();
                $('#facilitiesvalid3').html('** Facilities are missing');
                facilities3Error = false;
                return false;
            }
            if (facili3Value.length < 3) {
                $('#facilitiesvalid3').show();
                $('#facilitiesvalid3').html('** Length of facilities must be greater than 3');
                facilities3Error = false;
                return false;
            }
            $('#facilitiesvalid3').hide();
        }

        function validatehours3() {
            hours3Error = true;
            let hours3Value = $('#modalHours3').val();
            if (hours3Value.length == '') {
                $('#hoursvalid3').show();
                $('#hoursvalid3').html('** Opening hours are missing');
                hours3Error = false;
                return false;
            }
            if (hours3Value.length < 5) {
                $('#hoursvalid3').show();
                $('#hoursvalid3').html('** Length of Opening hours must be greater than 5');
                hours3Error = false;
                return false;
            }
            $('#hoursvalid3').hide();
        }

        function validatelat3() {
            lat3Error = true;
            let lat3Value = $('#modalLat3').val();
            if (lat3Value.length == '') {
                $('#latvalid3').show();
                $('#latvalid3').html('** Latitude is missing');
                lat3Error = false;
                return false;
            }
            let patLat = /^-{0,1}[0-9]{1,3}-[0-9]{1,2}-[0-9]{1,2}$/;
            let result = patLat.test(lat3Value);
            if (result == false) {
                $('#latvalid3').show();
                $('#latvalid3').html('** format of latitude incorrect');
                lat3Error = false;
                return false;
            }
            $('#latvalid3').hide();
        }

        function validatelong3() {
            long3Error = true;
            let long3Value = $('#modalLong3').val();
            if (long3Value.length == '') {
                $('#longvalid3').show();
                $('#longvalid3').html('** Longitude is missing');
                long3Error = false;
                return false;
            }
            let patLong = /^-{0,1}[0-9]{1,3}-[0-9]{1,2}-[0-9]{1,2}$/;
            let result = patLong.test(long3Value);
            if (result == false) {
                $('#longvalid3').show();
                $('#longvalid3').html('** format of Longitude incorrect');
                long3Error = false;
                return false;
            }
            $('#longvalid3').hide();
        }

        // onclick button
        $('#AddIt').click(
            () => {
                console.log('try adding ...');
                validatename3();
                console.log("name3Error: " + name3Error);
                validatedistrict3();
                console.log("dist3Error: " + dist3Error);
                validateaddress3();
                console.log("addr3Error: " + addr3Error);
                validatephone3();
                console.log("phone3Error: " + phone3Error);
                validatefacilities3();
                console.log("facilities3Error: " + facilities3Error);
                validatehours3();
                console.log("hours3Error: " + hours3Error);
                validatelat3();
                console.log("lat3Error: " + lat3Error);
                validatelong3();
                console.log("long3Error: " + long3Error);
                if (name3Error == false || dist3Error == false || addr3Error == false || phone3Error == false || facilities3Error == false || hours3Error == false || lat3Error == false || long3Error == false) {
                    return;
                }
                goAdd();
                console.log('added.');
            }
        )

    }
)