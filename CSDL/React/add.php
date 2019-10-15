<?php
$conn = new mysqli("localhost", "root", "", "react");
$tg="avatar/up/";
if(!file_exists($tg)){
	mkdir($tg,0777,true);

}
$isavatar="1";
$imglink="";
$name=time(). ".jpeg";
 $tg =$tg.$name ;
	if(isset($_FILES['image']['tmp_name'])){
		if(move_uploaded_file($_FILES['image']['tmp_name'],$tg)){

			$isavatar="1";
			$imglink=$name;

		}else{
 			$isavatar="0";
			}
	}
else $isavatar="0";
 if(isset($_POST["ten"]))  $ten=$_POST['ten'];
if(isset($_POST["sdt1"]))  $sdt1=$_POST["sdt1"];else $sdt1="";
if(isset($_POST["sdt2"]))  $sdt2=$_POST["sdt2"];else $sdt2="";
if(isset($_POST["email"]))  $email=$_POST["email"];else $sdt2="";
if(isset($_POST["iduser"])) $iduser=$_POST["iduser"];

if($isavatar=="1") 
	$sql="INSERT INTO `danhba`(`id`, `iduser`, `ten`, `sdt1`, `sdt2`, `email`, `isavatar`,`imglink`) VALUES (null,?,?,?,?,?,?,?)";
	else 
	$sql="INSERT INTO `danhba`(`id`, `iduser`, `ten`, `sdt1`, `sdt2`, `email`, `isavatar`) VALUES (null,?,?,?,?,?,?)";
$stmt=$conn->prepare($sql);
	if($isavatar=="1")
		$stmt->bind_param("sssssss", $iduser,$ten,$sdt1,$sdt2,$email,$isavatar,$imglink);
	else $stmt->bind_param("ssssss", $iduser,$ten,$sdt1,$sdt2,$email,$isavatar);
	if($stmt->execute()){
		echo json_encode("1");
	}else echo json_encode("0");
 	

 ?>