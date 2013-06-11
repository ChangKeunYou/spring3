<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>몽고디비 챕터4</title>

<script type="text/javascript">
	
	
	//몽고디비 M/D 형식 저장 방법
	db.ord.insert({
		ord_id : "2013-09-012345",
		customer_name : "Wonman & Sports",
		emp_name : "Magee",
		total : "601100",
		payment_type : "Credit",
		order_filled : "Y",
		item_id : [
		           {
		        	   item_id : "1",
		        	   product_name : "Bunny Boots",
		        	   item_price : "135",
		        	   qty : "500",
		        	   price : "67000"
		           },
		           {
		        	   item_id : "2",
		        	   product_name : "Pro Ski Boots",
		        	   item_price : "380",
		        	   qty : "400",
		        	   price : "152000"
		           }
		          ]
	});
	//--------------linking방식------------------------
	
	db.ord.insert({
		ord_id : "2013-09-012345",
		customer_name : "Wonman & Sports",
		emp_name : "Magee",
		total : "601100",
		payment_type : "Credit",
		order_filled : "Y"
	});
	
	o = db.ord.findOne({"ord_id" : "2013-09-012345"});
	
	db.ord_detail.insert({
		ord_id : "2013-09-012345",
		item_id : [
		          	{
		          		item_id : "1",
		          		product_name : "Bunny Boots",
		          		item_price : "135",
		          		qty : "500",
		          		price : "67000"
		          	},
		          	{
		        	   item_id : "2",
		        	   product_name : "Pro Ski Boots",
		        	   item_price : "380",
		        	   qty : "400",
		        	   price : "152000"  
		          	}
		          ],
		ordid_id : ObjectId("51b57c1a58fc608688520b34")      
	});
	
	
	x = {
			ord_id : "2013-09-012345",
			customer_name : "Wonman & Sports",
			emp_name : "Magee",
			total : "601100",
			payment_type : "Credit",
			order_filled : "Y"
	};
	
	
	db.ord_detail.insert({
		ord_id : "2013-09-012345",
		item_id : [
		   			{
		          		item_id : "1",
		          		product_name : "Bunny Boots",
		          		item_price : "135",
		          		qty : "500",
		          		price : "67000"
		          	},
		          	{
		        	   item_id : "2",
		        	   product_name : "Pro Ski Boots",
		        	   item_price : "380",
		        	   qty : "400",
		        	   price : "152000"  
		          	}
		          ],
		ordid_id : new DBRef("ord",x._id)  
	});
	
</script>

</head>
<body>

</body>
</html>