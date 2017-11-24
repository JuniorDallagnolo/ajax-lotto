<?php
error_reporting(E_ALL);

function respond($data, $code, $msg) {
    header("Content-type: application/json");
	echo '{"code":' . $code . ',"message":"'. $msg .'", "numbers":';
    echo json_encode($data);
	echo '}';
	exit();
}

if(isset($_REQUEST['digits']) && ctype_digit($_REQUEST['digits']) && isset($_REQUEST['max']) && ctype_digit($_REQUEST['max']) ){
    $digits = trim($_REQUEST['digits']);
    $max = trim($_REQUEST['max']);
    $digits = intval($digits);
    $max = intval($max);
    
    //check ranges
    if( ($digits >= 0 && $digits<=10) && ($max>0 && $max<100)){
        //ok
        $data = array();
        for($i=0; $i<$digits; $i++){
            $data[] = mt_rand(1, $max);
        }
        sort($data, SORT_NUMERIC);
        
        respond($data, 0, "Here are your numbers");
    }else{
        //digits or max out of range
        respond(array(), 534, "Numbers are out of valid range.");
    }
}else{
    //missing digits or max value
    respond(array(), 522, "Missing required parameters.");
}
?>