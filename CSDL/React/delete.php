<?php
$conn = new mysqli("localhost", "root", "", "react");
$json = file_get_contents('php://input');
 
	$obj = json_decode($json,true);
	$id =$obj["id"];
	$sql="DELETE from danhba WHERE id=$id";
	$result=$conn->query($sql);
	if(mysqli_affected_rows($conn)>0){
			echo json_encode("1");
		
 	}else
 		 echo json_encode("0");
 	
?>