<?php session_start();?>
<html>
	<head>
		<title>Ajax Post call</title>	
		<script src="scripts/getLatestOrderID.js"></script>
		<script src="scripts/getItems.js"></script>

		<script>
			var select;
			function sendData(){
				select = document.getElementById("select");
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange=function(){
					if (xhttp.readyState==4 && xhttp.status==200){
						var data = xhttp.responseText;
						//document.getElementById("demo").innerHTML = data;
						//console.log("Result " +data);

					}
				}//end onreadystatechange
				
				var link = "insert.php?";

				var orderID = document.getElementById("orderID").value;
				var compID = document.getElementById("compID").value;
				var addID = document.getElementById("addID").value;
				var cityID = document.getElementById("cityID").value;
				var stateID = document.getElementById("stateID").value;
				var zipID = document.getElementById("zipID").value;
				var qtyID = document.getElementById("qtyID").value;

				var item = document.getElementById (("item-"+(document.getElementById("itemID").value)));
				

				link += "orderID="+orderID+"&"+
						"compID="+compID+"&"+
						"addID="+addID+"&"+
						"cityID="+cityID+"&"+
						"stateID="+stateID+"&"+
						"zipID="+zipID+
						"&productID="+item.childNodes[0].innerHTML+
						"&qtyID="+qtyID+
						"&price="+item.childNodes[5].innerHTML;

				//console.log(link);
				xhttp.open("GET", link, true);
				xhttp.send();
			}


		</script>
	</head>

	<body>
		Order ID: <input id="orderID" type="text" >
		<button onclick="getLatestID()">Get Latest ID</button><br>
		Company ID: <input id="compID" type="text" value= "1"><br>
		Address: <input id="addID" type="text" value= ""><br>
		City: <input id="cityID" type="text" value= ""><br>
		State: <input id="stateID" type="text" value= ""><br>
		Zip: <input id="zipID" type="text" value= ""><br>
		item ID: <input id="itemID" type="text" value= "1"><br>
		Qty: <input id="qtyID" type="text" value= "2"><br>


		<button onclick="getItems()">getItems</button><br><br>
		<button onclick="sendData();">Send Data</button>
			
		<div id="demo">
		</div>

		<table id="items" border='1'>
			



		</table>

	</body>
</html>

<!--%26-->