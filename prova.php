<?php
    session_start();
    $db_details = $_SESSION['db_details'];

    $dbconn = pg_connect ($db_details) or die('Impossibile connetersi: ' . preg_last_error());
 
    $q1 = "select * from utente";
    $result = pg_query ($dbconn, $q1);


    while($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {

        foreach ($line as $col_value){
            echo $col_value." ";
        }
    }


?>