<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="sf" uri="/WEB-INF/tld/sf.tld"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; no-cache; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<title>비즈온ERP</title>
<script type="text/javascript">
	alert("layout.jsp Dynamic-Tiles 렌더링 성공");
</script>
</head>
<body>
	
	<tiles:insertAttribute name="body"/>
	
</body>
</html>