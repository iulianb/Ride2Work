<?php

    $to = 'contact@ride2work.ro';
    $subject = 'Website contact';
	$email = $_POST[ 'email' ];
	$message = $_POST[ 'message' ];
	$message = " Email: " . $email . " || Message: " . $message;

    $headers = "From: $email"; 

	if ( $send = mail($to, $subject, $message, $headers, "-f " . $email) ) {
		echo "Thank you <strong>$email</strong> for contacting with us!";
	} else {
		echo "Error in sending message! Please try again";
	}

 ?>
