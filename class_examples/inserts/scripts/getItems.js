
function getItems(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		if (xhttp.readyState==4 && xhttp.status==200){
			var data = xhttp.responseText;
			//console.log(data);
			document.getElementById("items").innerHTML = data;
		}
	}//end onreadystatechange
	
	var link = "./getItems.php";

	xhttp.open("GET", link, true);
	xhttp.send();
}