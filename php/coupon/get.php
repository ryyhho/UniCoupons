<?php
try {
    session_start();
    $dbconn = pg_connect($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    $q1 = "select * from coupon order by data_inizio";
    $result = pg_query($dbconn, $q1);
    $array = array();
    while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
        $line['euro_perc'] = isset($line['euro_perc']) ? ($line['euro_perc'] == 't' ? true : false) : null;
        $array[] = $line;
    } 
    echo json_encode($array);
} catch (Exception $e) {
    header('HTTP/1.1 ' . $e->getCode() . ' Bad error');
    echo json_encode(
        array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    );
}
