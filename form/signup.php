<?php
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "newform";
$tablename = "signup";

    if(!empty($_POST['fname']) && !empty($_POST['lname']) && !empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['password2'])){
    $firstName = validate($_POST['fname']);
    $lastName = validate($_POST['lname']);
    $email = validate($_POST['email']);
    $password = validate($_POST['password']);
    $repeatPassword = validate($_POST['password2']);

    if (strlen($password) < 8) {
        echo "* Password must be at least 8 characters long";
    } else if ($password != $repeatPassword) {
        echo "* Passwords do not match";
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "* Invalid email format";
    } else {
        try {
            $db = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Check if the email already exists
            $stm = $db->prepare("SELECT * FROM $tablename WHERE `Email`=:email");
            $stm->bindParam(":email", $email);
            $stm->execute();

            if ($stm->rowCount() > 0) {
                echo "The Email already exists";
            } else {
                // Hash the password before storing it
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                // Insert the new user
                $stm = $db->prepare("INSERT INTO $tablename (FirstName,LastName,Email,Password) VALUES(:fname, :lname, :email, :password)");
                $stm->bindParam(":fname", $firstName);
                $stm->bindParam(":lname", $lastName);
                $stm->bindParam(":email", $email);
                $stm->bindParam(":password", $hashedPassword);
                $stm->execute();

                echo "Registration successful";                
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}





?>
