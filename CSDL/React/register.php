<?php
$conn = new mysqli("localhost", "root", "", "react");
$json = file_get_contents('php://input');
 
	$obj = json_decode($json,true);
	$username = $obj['username'];
	$password=$obj["password"];
	$sql="SELECT * from users WHERE username=? ";

	$stmt=$conn->prepare($sql);
	$stmt->bind_param("s", $username);
	$stmt->execute();

$result = $stmt->get_result();
	if($result->num_rows>0){
		echo json_encode("2");
 	}else{
 		$sql1="INSERT INTO `users`(`iduser`, `username`, `password`) VALUES (null,?,?)";

	$stmt1=$conn->prepare($sql1);
	$stmt1->bind_param("ss", $username,$password);
	
	if($stmt1->execute()){
		echo json_encode("1");
	}else echo json_encode("0");
 	}

 		 

?>