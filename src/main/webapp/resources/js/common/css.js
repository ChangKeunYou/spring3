$(function(){
	/*
	 * 2012.08.17
	 * 네오모듈 유창근 
	 * 아래 스크립트는 css가 bootstrap 하고 jqGrid가 겹쳐서 깨지는 현상때문에 script로 완하시켜준다...
	 * 최대한css를 수정해서 스크립트로 조절하지 않게하고 가능하다면 css 상속을 안받게끔 한다.
	 */
	$("input[class=ui-pg-input]").width(20);
	$("select[class=ui-pg-selbox]").width(45);
	//alert($("input[class=ui-pg-input]").size() + " : " + $("select[class=ui-pg-selbox]").size());
}); 