<?php
try {
    session_start();
    $dbconn = pg_connect($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    if(isset($_GET['v'])) {
        $v = '%'.$_GET['v'].'%';

        $q1 = "select * from coupon 
        where LOWER(titolo) like LOWER($1)
        or LOWER(descrizione) like LOWER($1)
        or LOWER(codice) like LOWER($1)
        order by data_fine desc";
        $result = pg_query_params($dbconn, $q1, array($v));
    } else {
        $q1 = "select * from coupon order by data_fine desc";
        $result = pg_query($dbconn, $q1);
    }
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
