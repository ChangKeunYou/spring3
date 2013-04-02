/*
 2012.09.05
 NeoModule 유창근 
 jqGrid 의 내용을 비동기 방식으로 Excel로 출력하기 위한 js 파일.
 jQuery를 확장 하여 사용..
*/

var oDate = new Date();
var ex_year = oDate.getFullYear();
var ex_month = (oDate.getMonth() +1) < 10 ? "0" + (oDate.getMonth() +1) : oDate.getMonth() +1;
var ex_day = (oDate.getDate()) < 10 ? "0" + oDate.getDate() : oDate.getDate();
var o; 