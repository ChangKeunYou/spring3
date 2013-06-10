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
			/*
			*몽고DB 스크립트
			 chap2
			*/
			//===============================chap2=================================
			db.runCommand({
				 mapreduce : "employees" ,
				 query : {
					hiredate : {$gt : "01-01-1981" , $lt : "31-12-1983"} ,
					sal 	 : {$gt : 800}
				 },
				 map : function(){
					print("map_key" + this.deptno + " : map_value=" + this.job + " : map_ename=" + this.ename + " : map_sal=" + this.sal);
					emit(
						 {d1 : this.deptno , d2 : this.job},
					 	 {msum : this.sal , recs : 1 , mmin : this.sal , mmax: (this.sal > 1000) ? this.sal : 0}
						);	 
				 },
				 //param1 : map : json_obj1
				 //param2 : map : json_obj2
				 reduce : function(key , vals){//reduce는 중복되는게 여러게있을 경우에만 돈다......
					 
					 var ret = {msum : 0 , recs : 0 , mmin : 0 , mmax : 0};
					
					 for(var i = 0; i < vals.length; i++){
						ret.msum += vals[i].msum;
						ret.recs += vals[i].recs;
						print("[" + (i) + "]deptno=" + key.d1 + " : job=" + key.d2);//파일 로그에서 확인 할 것
						
						/*
						if(vals[i].mmin < ret.mmin){
							ret.mmin = vals[i].mmin;
						}
						*/
						
						if(i == 0) ret.mmin = vals[i].mmin;
						
						if(vals[i].mmin < ret.mmin){
							ret.mmin = vals[i].mmin;//switch
						}
						
						if((vals[i].mmax > 1000) && (vals[i].mmax > ret.mmax)){
							ret.mmax = vals[i].mmax;
						}
					 }
					 print("=============================================");
					 return ret;
				 },
				 finalize : function(key,val){
					 val.mavg = val.msum / val.recs;
					 return val;
				 },
				 out : "result1",
				 verbose : true
			});
			
			
			
			//===============================chap2=================================
				
				
				
		    //================================================================
			
		    	
		    	
		    //================================================================
		    		
		    	
		    	
		    //================================================================
		    	
		    	
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
