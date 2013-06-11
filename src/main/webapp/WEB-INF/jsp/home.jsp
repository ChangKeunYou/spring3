<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="java.util.HashMap,java.util.ArrayList;"%>
<jsp:useBean id="map" class="java.util.HashMap"></jsp:useBean><!-- jstl 사용 -->
<c:set var="root" value="${pageContext.servletContext.contextPath}" scope="page" />
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Home</title>
	<script type="text/javascript" src="${root}/resources/js/common/jquery-1.8.3.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			
			
			
		});
	</script>
	
</head>
<body>
<h1>
	Hello world!  
</h1>
<P>  The time on the server is ${serverTime}. </P>
</body>
</html>
