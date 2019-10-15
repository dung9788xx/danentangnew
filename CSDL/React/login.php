<?php
$conn = new mysqli("localhost", "root", "", "react");
$json = file_get_contents('php://input');
 
	$obj = json_decode($json,true);
	$username = $obj['username'];
	$password=$obj["password"];
	$sql="SELECT * from users WHERE username=? and password=?";

	$stmt=$conn->prepare($sql);
	$stmt->bind_param("ss", $username,$password);
	$stmt->execute();

$result = $stmt->get_result();
	if($result->num_rows>0){
		while ($row=$result->fetch_assoc()) {
			echo json_encode("1".$row['iduser']);
		}
		
 	}else
 		 echo json_encode("0");

?>