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
	
	<script type="text/javascript">
		
	/*	
	var size_util = {
			
			resize : function(){
				var w_h =  $(window).height();
				var m_r_f = $("#master-row-fluid").height();
				
				if(w_h > 700){
					console.log("700 >" + ((w_h-m_r_f) + 341));
					$("#master-row-fluid").css({"height" :  ((w_h-m_r_f) + 341) });
				}else{
					console.log("700 <");
					$("#master-row-fluid").css({"height" : "auto"});
				}
			}	
		};
		
		$(window).resize(function() {
			size_util.resize();
		});
		
		$(document).ready(function(){
			size_util.resize();
		});
		*/
		
	</script>
</head>
<body id="all_area" class="yui3-skin-sam">
	
	<!-- 모달 로딩 start -->
	<div id="loadingArea" style="display: none;">
		<div class="loading"><img src="${root}/resources/images/view/loading.gif" width="106" height="81" alt="로딩중 입니다." class="img_load" /></div>
		<div id="modalWindow"></div>
	</div>   
	<!-- 모달 로딩 end -->
	<tiles:insertAttribute name="header" />
	 <div class="container-fluid">
      	<div class="row-fluid" id="master-row-fluid">
			<tiles:insertAttribute name="left" />
			<tiles:insertAttribute name="body" />
		</div>
		<tiles:insertAttribute name="footer" />
	</div>	
	
</body>
</html>