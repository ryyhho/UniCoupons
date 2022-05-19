<?php
try {
    session_start();

    if(isset($_SESSION['user'])) {

            echo json_encode($_SESSION['user']);

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