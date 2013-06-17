<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="root" value="${pageContext.request.contextPath}"    scope="page" />


<script src="${root}/resources/js/common/jquery-1.8.3.min.js"></script>


<script type="text/javascript">
	$(function(){
		
		$("#mail_btn").click(function(e){
			
			
			var o = $("#myForm").serializeArray();
			
			
			if(confirm("메일을 전송 하시겠습니까?")){
			
				$.getJSON("${root}/mail/.json",o,function(data,status){
					if(status === "success"){
						alert(data.message);
					}
				});
			}
			
		});
		
		
	});
</script>


	
	
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
		
		<div style="border: solid 1px red; width: 600px; height: 50px; display: none;"></div>
		
	</form>
