<?php


	$email = $_POST[ 'email' ];
	$message = $_POST[ 'message' ];
	$message = " Email: " . $email . " || Message: " . $message;

	/* Replace YOUR_MAIL With Your Mail Address inside '' */
	if ( mail('an.pop95@gmail.com', $message, "From:" . $email ) ) {
		echo "Thank you <strong>$email</strong> for contacting with us!";
	} else {
		echo "Error in sending message! Please try again";
	}

 ?>
