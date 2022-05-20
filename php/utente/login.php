<?php
try {
    session_start();
    $dbconn = pg_connect ($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    if(isset($_GET['email']) and isset($_GET['psw'])) {

        $email = $_GET['email'];
        $psw = $_GET['psw'];

        $q2 = "select * from utente where email=$1";
        $result = pg_query_params($dbconn, $q2, array($email));
        if($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
            if(!password_verify($psw, $line['psw']))
                throw new Exception('Password errata', 400);
            
            $line['admin'] = $line['admin'] == 't' ? true : false;
            $_SESSION['user'] = $line;
            // if(isset($_GET['remeberFlag']) and $_GET['remeberFlag'])
            //     $_COOKIE['user'] = ? TODO

            echo json_encode($line);

        } else
            throw new Exception('Utente non trovato', 400);
    } else
        throw new Exception('Inserire dati', 400);

} catch (Exception $e) {
    header('HTTP/1.1 '.$e->getCode().' Bad error');
    echo json_encode(array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    );
}

?>