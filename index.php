<?php
    session_start();
    
    $db_details = "host=localhost port=5432 dbname=uni_coupons user=postgres password=1234";

    $_SESSION['db_details'] = $db_details;

    $dbconn = pg_connect ($db_details) or die('Impossibile connetersi: ' . preg_last_error());
 

    $q1 = "select * from utente";
    $result = pg_query ($dbconn, $q1);


    while($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {

        foreach ($line as $col_value){
            echo $col_value." ";
        }
    }


    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>
<script>
        var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.body.innerHTML = this.responseText;
      }
    };
    xmlhttp.open("GET", "prova.php" , true);
    xmlhttp.send();
    </script>
</body>
</html>