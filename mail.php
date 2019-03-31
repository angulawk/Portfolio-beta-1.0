<?php


if( isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['m']) ) {
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$email = $_POST['email'];
	$msg = nl2br($_POST['msg']);
	$to = 'agnieszka.weronika.wojcik@gmail.com';
	$from = $email;
	$message = '<b>Name:</b> ' .$firstName. ' <br> <b>Email: </b> '.$email. '<p>' .$msg. '</p>';
	$headers = "From: $from\n";
	$headers .= "MIME-VERSION: 1.0\n";
	$headers .= "Content-type: text/html; charset=UTF-8\n";
	if( var_dump( mail($to, $message, $headers)) ) {
		echo "succes";
	} else {
		echo "The server failed to send the message. Try again later.";
	}
}
?>