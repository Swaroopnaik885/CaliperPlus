<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $conn = new mysqli("localhost", "root", "", "caliper_db");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name       = $_POST['name'];
    $email      = $_POST['email'];
    $phone      = $_POST['phone'];
    $state      = $_POST['state'];
    $city       = $_POST['city'];
    $pin_code    = $_POST['pinCode'];
    $vehicle_registration_number      = $_POST['VRN'];
    $car_make    = $_POST['carMake'];
    $car_model    = $_POST['carModel'];
    $service_required = $_POST['serviceRequired'];
    $comment = $_POST['comment'];

    $stmt = $conn->prepare("
        INSERT INTO service_requests 
        (name, email, phone, state, city, pin_code, vehicle_registration_number, car_make, car_model, service_required, comment)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "sssssssssss",
        $name,
        $email,
        $phone,
        $state,
        $city,
        $pin_code,
        $vehicle_registration_number,
        $car_make,
        $car_model,
        $service_required,
        $comment
    );

    if ($stmt->execute()) {
        echo "Enquiry submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
