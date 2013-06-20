<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../include/ssi.jsp" %>

<script type="text/javascript">

	
$.ajaxSetup({
	type:'POST',
	dataType:'json',
	async: true,					
	beforeSend :function(XMLHttpRequest){
		//fnShowLoading();
		//processingCount++;
		XMLHttpRequest.setRequestHeader("AJAX", "true");//ajax 통신이라는 requestHeader 정보에 삽입.
	},				
	error:function(XMLHttpRequest, textStatus, errorThrown){

		
	},
	complete:function(responseText, textStatus) {
		processingCount--;
		if(processingCount <= 0) fnCloseLoading();
	}
});
	
	$(function(){
		//d.log("content log test");
		$("#mail_btn").click(function(e){
			
			
			var o = $("#myForm").serializeArray();
			
			
			
			
			if(confirm("메일을 전송 하시겠습니까?")){
			
				$.getJSON("${root}/mail/mailSendTest.json",o,function(data,status){
					if(status === "success"){
						alert(data.message);
					}
				});
			}
			
		});
		
		
	});
</script>

	
	
		
		
		<div class="span10">
		<!--  
          <div class="hero-unit">
            <h1>Hello, world!</h1>
            <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            <p><a href="#" class="btn btn-primary btn-large">Learn more &raquo;</a></p>
          </div>
         --> 
          <div class="row-fluid">
          	<!--  
            <div class="span4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div>
            <div class="span4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div>
            <div class="span4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div>
            -->
            <form method="post" id="myForm" name="myForm">
		       <table id="oTbl1" border="0">
					<colgroup width="15%" />
					<colgroup width="85%" />
					<tbody>
						
						<tr>
							<td width="15%">보내는 사람 : </td>
							<td width="85%">
								<input type="text" name="from_mail" id="from_mail" value="" style="width: 300px;" />
							</td>
						</tr>
						
						
						<tr>
							<td width="15%">받는사람 : </td>
							<td width="85%">
								<input type="text" name="to_mail" id="to_mail" value="" style="width: 300px;" />
							</td>
						</tr>
						 
						
						<tr>
							<td width="15%">제목 : </td>
							<td width="85%">
								<input type="text" name="mail_title" id="mail_title" value="" style="width: 500px;" />
							</td>
						</tr>
						<tr>
							<td>내용 : </td>
							<td>
								<textarea style="width: 500px; height: 300px;" id="mail_content" name="mail_content"></textarea>
							</td>
						</tr>
						<tr>
							<td colspan="2" align="center">
								<input type="button" id="mail_btn" name="mail_btn" value="메일전송" />
							</td>
						</tr>
					</tbody>
				</table>
				
				
				
			
			</form>
			
			<!--  
			<img title="test" src="${root}/resources/images/view/hi.jpg" class="img-circle">
			-->
			
			
         </div>
         
         
         
         
       </div>
		
			
		
	
		
		
	
