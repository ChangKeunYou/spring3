<%@ page import="java.util.* , java.io.* , java.text.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib prefix="sf" uri="/WEB-INF/tld/sf.tld"%>
<jsp:useBean id="map" class="java.util.HashMap"></jsp:useBean><!-- jstl 사용 -->
<c:set var="root" value="${pageContext.request.contextPath}"   scope="page" />
<%
	//각종 ServerSide 인크루드 
%>

