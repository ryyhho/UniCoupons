<?php
session_start();

$db_details = "host=localhost port=5432 dbname=uni_coupons user=postgres password=1234";

$_SESSION['db_details'] = $db_details;

$dbconn = pg_connect($db_details) or die('Impossibile connetersi: ' . preg_last_error());

?>
<!DOCTYPE html>
<html ng-app="uniCoupons.app" lang="it">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- css -->
    <link href="libs\bootstrap-5.1.3-dist\css\bootstrap-custom.css" rel="stylesheet">
    <link href="libs\bootstrap-icons-1.8.2\font\bootstrap-icons.css" rel="stylesheet">

    <link href="css\style.css" rel="stylesheet">

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
    <script src="libs\moment\moment-with-locales.js"></script>

    <!-- js -->
    <script src="js\common.js"></script>

    <!-- angular -->
    <script src="js\directives.js"></script>
    <script src="js\app.js"></script>
    <script src="js\controllers\home.js"></script>
    <script src="js\controllers\login.js"></script>
    <script src="js\controllers\register.js"></script>
    <script src="js\controllers\coupons.js"></script>
    <script src="js\controllers\searchCoupons.js"></script>
    <script src="js\controllers\nuovoCoupon.js"></script>
    <script src="js\controllers\nuovoEnte.js"></script>

    <script src="js\services\utenteFactory.js"></script>
    <script src="js\services\enteFactory.js"></script>
    <script src="js\services\couponFactory.js"></script>
    <script src="js\services\imageFactory.js"></script>

</head>

<body>
    <div class="container-fluid">
        <nav id="nav" class="navbar navbar-expand-lg nav-transition fixed-top navbar-light bg-light px-2 res-nav">
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" ui-sref="home.coupons">
                <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
                UniCoupons
            </a>
            <div class="collapse navbar-collapse justify-content-end" id="navbar">
                <form class="d-flex mx-auto">
                    <input class="form-control me-2 rounded-start" ng-model="search" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-dark mt-auto " type="submit" ui-sref="home.searchCoupons({v: search})">Search</button>
                </form>
                <ul class="navbar-nav">
                    <!-- view login -->
                    <div ui-view="login"></div>
                </ul>
            </div>
        </nav>
    </div>
    <div ui-view="register"></div>
    <!-- view -->
    <div ui-view class="py-5"></div>
</body>

</html>