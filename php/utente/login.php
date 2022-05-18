<?php
try {
    session_start();
    $dbconn = pg_connect ($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    if(isset($_GET['email']) and isset($_GET['psw'])) {

        $email = $_GET['email'];
        $psw = $_GET['psw'];

        $q2 = "select * from utente where email=$1 and psw=$2";
        $result = pg_query_params($dbconn, $q2, array($email, $psw));
        if($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
            
            echo json_encode($line);

        } else
            throw new Exception('Utente non trovato', 400);
    }

} catch (Exception $e) {
    header('HTTP/1.1 '.$e->getCode().' Bad error');
    echo json_encode(array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    );
}

?>