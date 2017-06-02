<?php

	$email = $_POST[ 'email' ];
	$message = $_POST[ 'message' ];
	$message = " Email: " . $email . " || Message: " . $message;

	if ( $send = mail('an.pop95@gmail.com', $message, "From:" . $email ) ) {
		echo "Thank you <strong>$email</strong> for contacting with us!";
	} else {
		echo "Error in sending message! Please try again";
	}

	var_dump($send);

 ?>
