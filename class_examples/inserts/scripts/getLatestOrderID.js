
function getLatestID(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if (xhttp.readyState==4 && xhttp.status==200){
			var data = parseInt(xhttp.responseText);
			data = data +1;
			document.getElementById("orderID").value = data;
		}
	}//end onreadystatechange
	
	var link = "./getLatestOrderID.php";

	xhttp.open("GET", link, true);
	xhttp.send();
}