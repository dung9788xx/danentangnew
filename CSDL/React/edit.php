<?php
$er="";
$conn = new mysqli("localhost", "root", "", "react");
$tg="avatar/up/";
if(!file_exists($tg)){
	mkdir($tg,0777,true);

}

if(isset($_POST["imgoldlink"])) $imgoldlink=$_POST["imgoldlink"];else $imgoldlink="";

$isavatar="0";
$imglink="";
$name=$imgoldlink;



	if(isset($_FILES['image']['tmp_name'])){
		if($imgoldlink=="") { $isavatar="1";$name=time().".jpeg";}	
	}
 $tg =$tg.$name ;

	if(isset($_FILES['image']['tmp_name'])){
		if(file_exists($tg)) {
    chmod($tg,0777);
    unlink($tg); 
}
		if(move_uploaded_file($_FILES['image']['tmp_name'],$tg)){
			$imglink=$name;
		}else{
 			$isavatar="0";
			}		
	}
else $isavatar="0";



 if(isset($_POST["id"]))  $id=$_POST['id'];else $id="";
 if(isset($_POST["ten"]))  $ten=$_POST['ten'];
if(isset($_POST["sdt1"]))  $sdt1=$_POST["sdt1"];else $sdt1="";
if(isset($_POST["sdt2"]))  $sdt2=$_POST["sdt2"];else $sdt2="";
if(isset($_POST["email"]))  $email=$_POST["email"];else $sdt2="";
if(isset($_POST["iduser"])) $iduser=$_POST["iduser"];


if(isset($_POST["isdeleteavatar"])) $isdeleteavatar=$_POST["isdeleteavatar"];else $isdeleteavatar="0";
if($isdeleteavatar=="1"&&$imgoldlink!=""){
		if(file_exists($tg)) {
    chmod($tg,0777);
    unlink($tg); 
}
		$sql="UPDATE `danhba`SET `isavatar`='0',`imglink`='' WHERE id=?";
		$stmt=$conn->prepare($sql);
		$stmt->bind_param("s",$id);
		$stmt->execute();
		
}

if($isavatar=="1"){
$sql="UPDATE `danhba`SET `ten`=?,`sdt1`=?,`sdt2`=?,`email`=?,`isavatar`='1',`imglink`=? WHERE id=?";
}else{
	$sql="UPDATE `danhba`SET `ten`=?,`sdt1`=?,`sdt2`=?,`email`=? WHERE id=?";
}

$stmt=$conn->prepare($sql);
if($isavatar=="1"){
$stmt->bind_param("ssssss", $ten,$sdt1,$sdt2,$email,$name,$id);
}else{
	$stmt->bind_param("sssss", $ten,$sdt1,$sdt2,$email,$id);
}
	
		
	if($stmt->execute())	{
		echo json_encode("1");
	}else echo json_encode("0");
	 	

 ?>