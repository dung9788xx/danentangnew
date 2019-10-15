<?php
/**
* 
*/
class DanhBa 
{
	var $id,$ten,$sdt1,$sdt2,$email,$isavatar,$imglink;
	function __construct($id,$ten,$sdt1,$sdt2,$email,$isavatar,$imglink){	
		$this->id=$id."";
		$this->ten=$ten;
		$this->sdt1=$sdt1;
		$this->sdt2=$sdt2;
		$this->email=$email;
		$this->isavatar=$isavatar;
		$this->imglink=$imglink;

	}
}
$conn = new mysqli("localhost", "root", "", "react");
$json = file_get_contents('php://input');
 
	$obj = json_decode($json,true);
	$id = $obj['id'];

	$sql="SELECT * from danhba WHERE iduser=? ";

	$stmt=$conn->prepare($sql);
	$stmt->bind_param("s", $id);
	$stmt->execute();

	$result = $stmt->get_result();
	$ds=array();
	while ($row = $result->fetch_assoc()) {
   		array_push($ds, new DanhBa($row['id'],$row['ten'],$row['sdt1'],$row['sdt2'],$row['email'],$row["isavatar"],$row["imglink"]));
	}
	echo json_encode($ds);
 		 

?>