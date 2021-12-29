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
        // phone 2
        let phone2Error = true;
        $('#phonevalid2').hide();        
        $('#modalPhone2').keyup(()=>validatephone2());
        // facilities 2
        let facilities2Error = true;
        $('#facilitiesvalid2').hide();        
        $('#modalFacilities2').keyup(()=>validatefacilities2());        
        // hours 2
        let hours2Error = true;
        $('#hoursvalid2').hide();        
        $('#modalHours2').keyup(()=>validatehours2());
        // lat 2
        let lat2Error = true;
        $('#latvalid2').hide();
        $('#modalLat2').keyup(()=>validatelat2());
        // long 2
        let long2Error = true;
        $('#longvalid2').hide();
        $('#modalLong2').keyup(()=>validatelong2());

        function validatename2() {
            console.log("validatename2");
            name2Error = true;
            let name2Value = $('#modalName2').val();
            if (name2Value.length == '') {
                $('#namevalid2').show();
                $('#namevalid2').html('** Name is missing');
                name2Error = false;
                return false;
            }
            if (name2Value.length < 5) {
                $('#namevalid2').show();
                $('#namevalid2').html('** Length of name must be greater than 5');
                name2Error = false;
                return false;
            }
            $('#namevalid2').hide();
        }

        function validatedistrict2() {
            dist2Error = true;
            let dist2Value = $('#modalDistrict2').val();
            if (dist2Value.length == '') {
                $('#districtvalid2').show();
                $('#districtvalid2').html('** District is missing');
                dist2Error = false;
                return false;
            }
            if (dist2Value.length < 5) {
                $('#districtvalid2').show();
                $('#districtvalid2').html('** Length of district must be greater than 5');
                dist2Error = false;
                return false;
            }
            $('#districtvalid2').hide();
        }

        function validateaddress2() {
            addr2Error = true;
            let addr2Value = $('#modalAddress2').val();
            if (addr2Value.length == '') {
                $('#addressvalid2').show();
                $('#addressvalid2').html('** Address is missing');
                addr2Error = false;
                return false;
            }
            if (addr2Value.length < 10) {
                $('#addressvalid2').show();
                $('#addressvalid2').html('** Length of address must be greater than 10');
                addr2Error = false;
                return false;
            }
            $('#addressvalid2').hide();
        }

        function validatephone2() {
            phone2Error = true;
            let phone2Value = $('#modalPhone2').val();
            if (phone2Value.length == '') {
                $('#phonevalid2').show();
                $('#phonevalid2').html('** Phone is missing');
                phone2Error = false;
                return false;
            }
            let patPhone = /^[0-9]{4}[ ]{1}[0-9]{4}$/;
            let result = patPhone.test(phone2Value);
            if (result == false) {
                $('#phonevalid2').show();
                $('#phonevalid2').html('** format of phone incorrect');
                phone2Error = false;
                return false;
            }
            $('#phonevalid2').hide();
        }

        function validatefacilities2() {
            facilities2Error = true;
            let facili2Value = $('#modalFacilities2').val();
            if (facili2Value.length == '') {
                $('#facilitiesvalid2').show();
                $('#facilitiesvalid2').html('** Facilities are missing');
                facilities2Error = false;
                return false;
            }
            if (facili2Value.length < 3) {
                $('#facilitiesvalid2').show();
                $('#facilitiesvalid2').html('** Length of facilities must be greater than 3');
                facilities2Error = false;
                return false;
            }
            $('#facilitiesvalid2').hide();
        }

        function validatehours2() {
            hours2Error = true;
            let hours2Value = $('#modalHours2').val();
            if (hours2Value.length == '') {
                $('#hoursvalid2').show();
                $('#hoursvalid2').html('** Opening hours are missing');
                hours2Error = false;
                return false;
            }
            if (hours2Value.length < 5) {
                $('#hoursvalid2').show();
                $('#hoursvalid2').html('** Length of Opening hours must be greater than 5');
                hours2Error = false;
                return false;
            }
            $('#hoursvalid2').hide();
        }

        function validatelat2() {
            lat2Error = true;
            let lat2Value = $('#modalLat2').val();
            if (lat2Value.length == '') {
                $('#latvalid2').show();
                $('#latvalid2').html('** Latitude is missing');
                lat2Error = false;
                return false;
            }
            let patLat = /^-{0,1}[0-9]{1,3}-[0-9]{1,2}-[0-9]{1,2}$/;
            let result = patLat.test(lat2Value);
            if (result == false) {
                $('#latvalid2').show();
                $('#latvalid2').html('** format of latitude incorrect');
                lat2Error = false;
                return false;
            }
            $('#latvalid2').hide();
        }

        function validatelong2() {
            long2Error = true;
            let long2Value = $('#modalLong2').val();
            if (long2Value.length == '') {
                $('#longvalid2').show();
                $('#longvalid2').html('** Longitude is missing');
                long2Error = false;
                return false;
            }
            let patLong = /^-{0,1}[0-9]{1,3}-[0-9]{1,2}-[0-9]{1,2}$/;
            let result = patLong.test(long2Value);
            if (result == false) {
                $('#longvalid2').show();
                $('#longvalid2').html('** format of Longitude incorrect');
                long2Error = false;
                return false;
            }
            $('#longvalid2').hide();
        }

        // onclick button
        $('#EditIt').click(
            () => {
                console.log('try adding ...');
                validatename2();
                console.log("name2Error: " + name2Error);
                validatedistrict2();
                console.log("dist2Error: " + dist2Error);
                validateaddress2();
                console.log("addr2Error: " + addr2Error);
                validatephone2();
                console.log("phone2Error: " + phone2Error);
                validatefacilities2();
                console.log("facilities2Error: " + facilities2Error);
                validatehours2();
                console.log("hours2Error: " + hours2Error);
                validatelat2();
                console.log("lat2Error: " + lat2Error);
                validatelong2();
                console.log("long2Error: " + long2Error);
                if (name2Error == false || dist2Error == false || addr2Error == false || phone2Error == false || facilities2Error == false || hours2Error == false || lat2Error == false || long2Error == false) {
                    return;
                }
                goEdit();
                console.log('edited.');
            }
        )

    }
)