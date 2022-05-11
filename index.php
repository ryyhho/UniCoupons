<?php
    session_start();
    
    $db_details = "host=localhost port=5432 dbname=uni_coupons user=postgres password=1234";

    $_SESSION['db_details'] = $db_details;

    $dbconn = pg_connect ($db_details) or die('Impossibile connetersi: ' . preg_last_error());

?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- css -->
    <link href="libs\bootstrap-5.1.3-dist\css\bootstrap.min.css" rel="stylesheet">

    <!-- js -->
    <script src="libs\jquery-3.6.0\jquery-3.6.0.min.js"></script>
    <script src="libs\angular\angular.min.js"></script>
    <script src="libs\bootstrap-5.1.3-dist\js\bootstrap.bundle.min.js"></script> 

</head>
<body>
    <div class="container-fluid">
        <nav class="navbar navbar-light bg-light justify-content-between">
            <!-- <div class="container-fluid"> -->
                <a class="navbar-brand" href="#">
                <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
                UniCoupons
                </a>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </button>
                    <div class="dropdown-menu">
                        <form class="px-4 py-3">
                        <div class="mb-3">
                            <label for="exampleDropdownFormEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
                        </div>
                        <div class="mb-3">
                            <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="dropdownCheck">
                            <label class="form-check-label" for="dropdownCheck">
                                Remember me
                            </label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Sign in</button>
                        </form>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">New around here? Sign up</a>
                        <a class="dropdown-item" href="#">Forgot password?</a>
                    </div>
            <!-- </div> -->
        </nav>
    </div> 
</body>
</html>