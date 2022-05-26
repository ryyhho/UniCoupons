<?php
try {
    session_start();
    $dbconn = pg_connect($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if (isset($_SESSION['user']) and $_SESSION['user']['admin'] and isset($request->nome)) {

        $nome = $request->nome;
        $descrizione = isset($request->descrizione) ? $request->descrizione : '';

        $q2 = 'INSERT INTO ente
        (nome, descrizione) 
        VALUES ($1, $2) RETURNING id_ente';
        $result = pg_query_params($dbconn, $q2, array($nome, $descrizione));
        if($line = pg_fetch_array($result, null, PGSQL_ASSOC)){
            echo json_encode($line);
        } else
            throw new Exception('Errore nella creazione di un nuovo ente', 500);
        
    } else
        throw new Exception('Inserire dati', 400);
} catch (Exception $e) {
    header('HTTP/1.1 ' . $e->getCode() . ' Bad error');
    echo json_encode(
        array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    );
}
