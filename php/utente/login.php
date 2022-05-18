<?php
session_start();
$dbconn = pg_connect ($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

if(isset($_GET['email']) and isset($_GET['psw'])) {

    $email = $_GET['email'];
    $psw = $_GET['psw'];

    $q2 = "select * from utente where email=$1 and psw=$2";
    $result = pg_query_params($dbconn, $q2, array($email, $psw));
    if($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
        
        echo json_encode($line);

    }
}

?>