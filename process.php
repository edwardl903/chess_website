<?php 
    //This is where we will add the contact items to the database - contact table

    //first get data from the form 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $name = $_POST["name"];
        $mail = $_POST["mail"];
        $subject = $_POST["subject"];
        $message = $_POST["message"];

        $server = "localhost";
        $userid = "vishnusa_Vishnusai11";
        $pw = "vishsql118";
        
        //Server connection
        $conn = new mysqli($server, $userid, $pw );
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        //Database connection
        $db= "vishnusa_project4";
        $conn->select_db($db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        //sql query to insert data into table
        $sql = "INSERT INTO contact (name, email, subject, message) VALUES ('$name', '$mail', '$subject', '$message')";

        if ($conn->query($sql) === TRUE) {
            //echo "Data entered successfully.";
        } else {
            echo "error inserting data into the database: " . $conn->error;
        }

        //Close the database connection
        $conn->close();
    }
    header("Location: contact.html");
?>
