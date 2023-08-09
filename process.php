<?php 
    //This is where we will add the contact items to the database - contact table

    //first get data from the form 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $name = $_POST["name"];
        $mail = $_POST["mail"];
        $subject = $_POST["subject"];
        $message = $_POST["message"];

        $server = "webhosting2021.is.cc";
        $dbname = "vishnusa_project4"; // Replace with your actual database name
        $username = "vishnusa_Vishnusai11"; // Replace with your actual database username
        $password = "vishsql118"; // Replace with your actual database password
        
        try {
            $conn = new PDO("mysql:host=$server;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo 'Connected to the database successfully!';
            
            $sql = "INSERT INTO contact (name, email, subject, message) VALUES ('$name', '$mail', '$subject', '$message')";
            
            // Execute the SQL statement
            $conn->exec($sql);
            echo 'Data inserted successfully!';
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }
    header("Location: contact.html");
?>
