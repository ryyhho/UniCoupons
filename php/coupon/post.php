<?php
try {
    session_start();
    $dbconn = pg_connect($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if (isset($_SESSION['user']) and isset($request->id_ente) 
    and isset($request->codice) and isset($request->titolo) and isset($request->titolo)) {

        $email = $_SESSION['user']['email'];
        $id_ente = $request->id_ente;
        $codice = $request->codice;
        $titolo = $request->titolo;
        $descrizione = isset($request->descrizione) ? $request->descrizione : '';
        $data_inizio = $request->data_inizio;
        $data_fine = isset($request->data_fine) ? $request->data_fine : null;
        $euro_perc = isset($request->euro_perc) ? ($request->euro_perc ? 'true' : 'false') : null;

        $q2 = 'INSERT INTO coupon
        (email, id_ente, codice, titolo, descrizione, data_inizio, data_fine, euro_perc) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        $result = pg_query_params($dbconn, $q2, 
            array($email, 
            $id_ente,
            $codice, 
            $titolo, 
            $descrizione, 
            $data_inizio,
            $data_fine,
            $euro_perc));
        if (pg_affected_rows($result) <= 0)
            throw new Exception('Errore nella creazione di un nuovo coupon', 500);
            echo pg_affected_rows($result);
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
