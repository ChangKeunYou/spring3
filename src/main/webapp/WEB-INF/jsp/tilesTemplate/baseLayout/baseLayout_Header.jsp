<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../../include/ssi.jsp" %>

<script type="text/javascript">
$(function(){
	//common script source code include..
	var browser = $.browser.name;
	$(".dropdown-toggle").dropdown();//bootstrap dropdown...
	
	//사용자 프로파일
	$("#profile").click(function(){
		alert("사용자 프로파일 기능구현 준비중.");
	});
	
	$("#signout").click(function(){
		alert("로그아웃! 기능구현 준비중.");
	});
	
	//alert("browser=" + browser);
	
	
});


</script>

  <div class="navbar navbar-inverse navbar-fixed-top">
     <div class="navbar-inner">
       <div class="container-fluid">
         <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
         </button>
         <a class="brand" href="${root}/index.view" style="color:#429FA0">BusinessON</a>
         
         
         <div class="nav-collapse collapse">
         
          <!-- 사용자 정보 영역 -->
          <div class="btn-group pull-right">
            <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
             <!-- icon-white -->
              <i class="icon-user"></i>비즈온(유창근)<span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#" id="profile">Profile</a></li>
              <li class="divider"></li>
              <li><a href="#" id="signout">Sign Out</a></li>
            </ul>
          </div>
         <!--  
           <p class="navbar-text pull-right">
             Logged in as <a href="#" class="navbar-link">Username</a>
           </p>
          --> 
           <ul class="nav">
             <li class="active"><a href="${root}/main/mail/mailTest.view?menu=1">각종샘플</a></li>
             <li><a style="cursor: pointer;">메뉴2</a></li>
             <li><a style="cursor: pointer;">메뉴3</a></li>
             <li><a style="cursor: pointer;">메뉴4</a></li>
             <li><a style="cursor: pointer;">메뉴5</a></li>
             <li><a style="cursor: pointer;">메뉴6</a></li>
             <li><a style="cursor: pointer;">메뉴7</a></li>
             <li><a style="cursor: pointer;">메뉴8</a></li>
           </ul>
         </div><!--/.nav-collapse -->
       </div>
     </div>
   </div>