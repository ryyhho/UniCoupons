<?php
try {
    session_start();

    if(isset($_SESSION['user'])) {

        unset($_SESSION['user']);

    } else
        throw new Exception('Utente non loggato', 400);

} catch (Exception $e) {
    header('HTTP/1.1 '.$e->getCode().' Bad error');
    echo json_encode(array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    );
}

?>