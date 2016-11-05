<?php session_start();?>
<html>
	<head>
		<title>Ajax Post call</title>	
		<script>
			var select;

			function getData(){
				select = document.getElementById("select");
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange=function(){
					if (xhttp.readyState==4 && xhttp.status==200){
						//var data = JSON.parse(xhttp.responseText);
						var data = xhttp.responseText;
						document.getElementById("demo").innerHTML = data;
						//console.log(data);
						/*
						for (var i = 0; i < data.cats.length; i++){
							var option = document.createElement("option");
							option.innerHTML = data.cats[i];
							select.appendChild(option);
						}
						*/


					}
				}//end onreadystatechange
				
				var link = "getCategories.php?company="+document.getElementById("custID").value;

				xhttp.open("GET", link, true);
				xhttp.send();
			}


		</script>
	</head>

	<body>
		Customer ID<input type="text" id="custID" value="1">
		<button onclick="getData();">Get Data</button>
	
		<div id="demo">
		
		</div>

	</body>
</html>

