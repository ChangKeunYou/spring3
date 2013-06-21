<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../../include/ssi.jsp" %>
<div class="span2">
   <div class="well sidebar-nav">
     <ul class="nav nav-list">
       <li class="nav-header">각종샘플1</li>
       
       <li <c:if test="${param.menu == '1'}">class="active"</c:if>>
       	<a href="${root}/main/mail/mailTest.view?menu=1">스프링3(Jndi_Mail)</a>
       </li>
       
       <li <c:if test="${param.menu == '2'}">class="active"</c:if>>
       	<a href="${root}/main/yui/yuiSample.view?menu=2">스프링3(YUI)</a>
       </li>
       
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       
       <li class="nav-header">각종샘플2</li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       
       <li class="nav-header">각종샘플3</li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       <li><a href="#">Link</a></li>
       
     </ul>
   </div><!--/.well -->
</div><!--/span-->