<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../../include/ssi.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; no-cache; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta name="description" content="Businesson ERP">
<title>비즈온ERP</title>
	<!-- include tiles3 header -->
	<tiles:insertAttribute name="include" />
</head>
<body>
	
	<!-- 모달 로딩 start -->
	<div id="loadingArea" style="display: none;">
		<div class="loading"><img src="${root}/resources/images/view/loading.gif" width="106" height="81" alt="로딩중 입니다." class="img_load" /></div>
		<div id="modalWindow"></div>
	</div>   
	<!-- 모달 로딩 end -->
	 
	
	
	<tiles:insertAttribute name="body" />
	
</body>
</html>