<?php
try {
    session_start();
    $dbconn = pg_connect($_SESSION['db_details']) or die('Impossibile connetersi: ' . preg_last_error());

    if (isset($_SESSION['user']) and isset($_FILES['image']['name']) and isset($_POST['path'])) {

        if($_FILES['image']['type'] != "image/jpeg")
            throw new Exception('Il file non è di tipo jpeg', 400);

        $path = $_POST['path'];
        $info = pathinfo($_FILES['image']['name']);
        $ext = $info['extension']; // get the extension of the file
        $newname = $path . "." . $ext;

        $target = '../../src/' . $newname;

        echo $_FILES['image']['tmp_name'] . " -> " . $target;

        if(!move_uploaded_file($_FILES['image']['tmp_name'], $target))
            throw new Exception('Errore nel salvataggio dell\'immagine', 400);

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
