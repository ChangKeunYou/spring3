/**
 * javascript alert 창 일일이 찍어서 확인하기 귀찮아서 만듬
 *네오모듈 유창근
 * @param	str
 */
function log(msg) {
	
	var message = msg.toString();  
	
	if($("#debugColsol").size() <= 0){
		$("<div id='debugColsol'></div>").prependTo("body");
	}
    var $selted = jQuery("#debugColsol").show();
    $selted.removeClass("debugClass");
    if (message != null && message != "") {
        jQuery("<div></div>").addClass("debugClass").fadeIn("slow").text(msg).appendTo($selted);
    } else {
        jQuery("<div></div>").addClass("debugClass").fadeIn("slow").text("디버깅 메세지가 없습니다 확인해주세요").appendTo($selted);
    }
}