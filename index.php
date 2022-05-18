<?php
    session_start();
    
    $db_details = "host=localhost port=5432 dbname=uni_coupons user=postgres password=1234";

    $_SESSION['db_details'] = $db_details;

    $dbconn = pg_connect ($db_details) or die('Impossibile connetersi: ' . preg_last_error());

?>
<!DOCTYPE html>
<html ng-app="uniCoupons.app" lang="it">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- css -->
    <link href="libs\bootstrap-5.1.3-dist\css\bootstrap.min.css" rel="stylesheet">

    <!-- js libs -->
    <script src="libs\jquery-3.6.0\jquery-3.6.0.min.js"></script>
    <script src="libs\angular-1.3.15\angular.min.js"></script>
    <script src="libs\angular-1.3.15\i18n\angular-locale_it-it.js"></script>
    <script src="libs\angular-1.3.15\angular-filter.js"></script>
    <script src="libs\angular-1.3.15\libs\angular-ui-router.min.js"></script>
    <script src="libs\angular-1.3.15\libs\ui-utils.min.js"></script>
    <script src="libs\angular-1.3.15\libs\ngStorage.min.js"></script>
    <script src="libs\angular-1.3.15\libs\smart-table.min.js"></script>
    <script src="libs\angular-1.3.15\libs\jquery.form.min.js"></script>
    <script src="libs\angular-1.3.15\libs\jquery.form.min.js"></script>
    <script src="libs\angular-1.3.15\libs\ui-bootstrap-tpls-0.12.1.min.js"></script>
    <script src="libs\bootstrap-5.1.3-dist\js\bootstrap.bundle.min.js"></script>

    <!-- js -->
    <script src="js\common.js"></script>

    <!-- angular -->
    <script src="js\app.js"></script>
    <script src="js\controllers\home.js"></script>
    <script src="js\controllers\login.js"></script>
    <script src="js\controllers\coupons.js"></script>

    <script src="js\services\utenteFactory.js"></script>

</head>

<body>
    <div class="container-fluid">
        <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand" href="#">
                <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24"
                    class="d-inline-block align-text-top">
                UniCoupons
            </a>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <!-- view login -->
            <div ui-view="login"></div>
        </nav>
    </div>

    <!-- view login -->
    <div ui-view></div>
</body>

</html>