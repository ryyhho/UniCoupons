<?php
try {
    session_start();
    $dbconn = pg_connect($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if (isset($request->email) and isset($request->psw) and isset($request->nome) and isset($request->cognome)) {

        $email = $request->email;
        $psw = password_hash($request->psw, PASSWORD_DEFAULT);
        $nome = $request->nome;
        $cognome = $request->cognome;

        $q2 = 'INSERT INTO utente
        (email, psw, nome, cognome) VALUES ($1, $2, $3, $4)';
        $result = pg_query_params($dbconn, $q2, array($email, $psw, $nome, $cognome));
        if (pg_affected_rows($result) <= 0)
            throw new Exception('Errore nella creazione di un nuovo utente', 500);

        $q2 = "select * from utente where email=$1 and psw=$2";
        $result = pg_query_params($dbconn, $q2, array($email, $psw));
        if ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {

            $line['admin'] = $line['admin'] == 't' ? true : false;
            $_SESSION['user'] = $line;

            echo json_encode($line);
        } else
            throw new Exception('Utente non trovato', 400);
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
