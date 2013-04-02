/**
 * 2011.10.14 (commonLayer 사용방법)
 * MTGi 유창근
 * 공통레이어 (상세팝업,등록,수정,alert,confirm,promot..등등)
 * 상세팝업,등록,수정 팝업은 사용자가 html작업을 하도록 구현..
 * commonLayer.js
 * commonLayer.css
 * ver 1.0
 * 
 * example
 * ***********************************************************************
 * param1(msg) : 경고창에 출력될 메세지(필수)
 * param2(title) : 경고창 타이틀에 출력될 메세지(선택)
 * param3(callback) : ok버튼 클릭하고 나서 true 리턴 콜백펑션(선택)
 * $.j_alert("정상처리되었습니다.","Alert",function(e){true})
 * ***********************************************************************
 * param1(msg) : 컨펌창에 출력될 메세지(필수)
 * param2(title) : 컨펌창 타이틀에 출력될 메세지(선택)
 * param3(callback) : ok버튼 클릭 true , cancle 클릭 false 리턴 콜백펑션(선택)
 * $.j_confirm("삭제하시겠습니까?.","Confirm",function(e){true or false})
 * ***********************************************************************
 * param1(msg) : prompt창에 출력될 메세지(필수)
 * param2(value) : default로 보여줄 사용자의 값(선택) 
 * param3(title) : prompt창 타이틀에 출력될 메세지(선택)
 * param4(callback) : ok버튼 클릭 true , cancle 클릭 false 리턴 콜백펑션(선택)
 * $.j_prompt("값을 입력하여 주십시요.","default Value","Prompt",function(e){사용자 입력받은 값 리턴})
 * ***********************************************************************
 * 
 * ********등록레이어 example******
 * 	var param = {
 *		title : "유저등록_레이어",
 *		draggable : true  //true or false
 *	};
 *	$("#add_layer_area").goAddLayer(param);
 *
 * *******레이어 숨기기 example******
 * 
 * $("#add_layer_area").goHideLayer();//default 폼안의 값 다 리셋되며 레이어는 사라진다.
 * $("#add_layer_area").goHideLayer("Y"); //폼안의 값 다 리셋되며 레이어는 사라진다.
 * $("#add_layer_area").goHideLayer("N"); //폼안의 값만 리셋되며 레이어는 지속된다.
 * 
 * ******* 상세팝업 레이어 example ******
 * 		var parameter = {
 *				url : "<%=root%>/test2/goDetail.do",//서버사이드 url   root/servlet/method
 *				namespace : "TESTVIEWPAGE2", //myBatis 매핑
 *				gridObj : $("#list1"), //jqGrid 객체
 *				pk_key : "USER_ID@EMPLOYEE_NO@USER_NAME",// , , # , @  구분자는 콤마,샵,골뱅이 3개만 지원
 *				header : "USER_ID#USER_NAME",// , , # , @  구분자는 콤마,샵,골뱅이 3개만 지원
 *				title : "유저상세정보",
 *				draggable : true  //true or false
 *		};
 *		$("#add_layer_area").goDetailLayer(parameter);
 */
var confirmFlag = false;
var eleArray;
var paramArray;



$.objects = {
		verticalOffset: -75,                
		horizontalOffset: 0,               
		repositionOnResize: true,        
		overlayOpacity: .01,              
		overlayColor: '#FFF',              
		draggable: true,                   
		okButton: '&nbsp;OK&nbsp;',        
		cancelButton: '&nbsp;Cancel&nbsp;', 
		dialogClass: null,//커스텀css 옵션 사용시 예제는 commonLayer.css  참조 
		elementArray : null,
		jqGridObj : null,
		//alert,confirm,prompt 작업시작
		alert : function(message,title,callback){
			if(title == null) title ="alert";
			$.objects.show(title,message,null,"alert",function(result){
				if(callback)callback(result);
			});
		},
		confirm : function(message,title,callback){
			if(title == null) title ="confirm";
			$.objects.show(title,message,null,"confirm",function(result){
				if(callback)callback(result);
			});	
		},
		prompt : function(message,value,title,callback){
			if(title == null) title ="prompt";
			$.objects.show(title,message,value,"prompt",function(result){
				if(callback)callback(result);
			});
		},
		
		show : function(title,msg,value,type,callback){
			$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
			$.objects._hide();
			$.objects._overlay('show');
			
			$("body").append(
					  '<div id="popup_container">' +
					    '<h1 id="popup_title" style=\'font-size : 9pt; padding-left : 5px; color : black;\'></h1>' +
					    '<div id="popup_content">' +
					      '<div id="popup_message"></div>' +
						'</div>' +
					  '</div>');
			
			if( $.objects.dialogClass ) $("#popup_container").addClass($.objects.dialogClass);
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.objects._reposition();
			$.objects._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.objects.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.objects._hide();
						callback(true);
					});
					$(document).focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ){ 
							//alert("타기시작하고..");
						//	e.preventDefault();
						//	e.stopPropagation();
						//	e.stopImmediatePropagation();
							$("#popup_ok").trigger('click');
							//return false;
						};
					});
				break;
				case 'confirm':   
					//after 함수를 이용하여 해당 엘리먼트 안이 아닌 다음번 위치에 삽입..
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.objects.okButton + '" id="popup_ok" /> <input type="button" value="' + $.objects.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.objects._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.objects._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					
					$(document).keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.objects.okButton + '" id="popup_ok" /> <input type="button" value="' + $.objects.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").bind("click", function() {
						var val = $("#popup_prompt").val();
						$.objects._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").bind("click", function() {
						$.objects._hide();
						if( callback ) callback( null );
					});
					$(document).keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
		
			// Make draggable
			if( $.objects.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
			
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.objects._overlay('hide');
			$.objects._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.objects._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.objects.overlayColor,
						opacity: $.objects.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.objects.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.objects.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.objects.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.objects._reposition);
					break;
					case false:
						$(window).unbind('resize', $.objects._reposition);
					break;
				}
			}
		}
};//End of $.objects


$.extend({
	//jQuery 확장 하여 커스텀 펑션작업..
	
	j_alert : function(msg,title,callback){
		$.objects.alert(msg,title,callback);
	},		
	j_confirm : function(msg,title,callback){
		$.objects.confirm(msg,title,callback);
	},
	j_prompt : function(msg,value,title,callback){
		$.objects.prompt(msg,value,title,callback);
	},
	jconfirm:function(msg,gubn){//return boolean
		$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
		//if(confirmFlag == false && gubn == undefined){
			if(msg == null){
				msg = "";
			}
			var msgHtml = "<div id='question' style='display:none; cursor: default'>";
			msgHtml += "<h1>" + msg + "</h1>";
			msgHtml +="<input type='button' id='yes' value='Yes'/>";
			msgHtml +="<input type='button' id='no' value='no'/>";
			msgHtml +="</div>";
			$(msgHtml).appendTo("body");
			
			$.blockUI({
				message : $("#question") , css : {width:"300px"}
			});
				
			$("#yes").one("click",yes);//사용자 측에서 구현해서 사용할것
			$("#no").one("click",function(e){$.unblockUI(); $("#question").remove();});
			layerCloseEvt($("#question"),null);
			//$("#no").one("click",no);//사용자 구현
			
			//modalCloseEvt($("#question"));
		//}else{
		//	$.unblockUI(); 
		//	$("#question").remove();
		//	confirmFlag = false;
		//	return new Boolean(gubn);
		//}
		//$("#question").block();
	},
	
	getJsonData:function(eleArrayObj,paramObj,callBack){//jQuery 확장 json 데이터 받아오기위한 공통함수.
		//log(eleArrayObj[0].id + " : " + eleArrayObj[1].id + " : " + paramObj.mode + ":" + paramObj.len);
		paramObj["codeValue"] = $(eleArrayObj[0]).val();
		var url = "/INNER_MTGI/commonCodeSearch.do";
		eleArray = eleArrayObj;//callback펑션에서 사용하기 위해서 전역으로 선언.
		paramArray = paramObj;
		$.getJSON(url,paramObj,callBack);
	}
	
	
	
	
	
	
});


/*
 * fn.extend 같은 경우는 기존 $("body").testFunction2("test") 이런식으로 기존 펑션에 확장 개념
 */
$.fn.extend({
	
	testFunction2 : function(obj){
		log("extends Test..not Call Plz..");
	},
	
	goAddLayer : function(obj){//등록 그리드 레이어
		//$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
		
		var title = null;
		var draggable = true; //default true 상단 타이틀 드래그 여부
		
		var $oThis = $(this);
		
		//처음 신규가입시는 세션자체가 없으므로 체크를 하면 안된다
		if(obj.sessionCheck == true || obj.sessionCheck == null){
			$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
		}
		
		
		if($oThis[0] == undefined){//해당 엘리먼트를 선택하지 않았을 경우 id는 반듯이 한개이므로 여러개 지정 불가
			$.j_alert("DIV Element ID : " + $oThis.selector + "\nNot Exists","Element null Error");
			return;
		}
		var oDivid = $oThis[0].id; 
		
		if(obj.title != "" && obj.title != null){//타이틀
			title = obj.title;
		}
		
		if(obj.draggable != null){//드래그여부
			draggable = obj.draggable ;
		}
		
		if($("#" + oDivid).find("#saveFlag").size() > 0){
			$("#" + oDivid).find("#saveFlag").val("add");
		}
		clear_form($oThis.find("form:first"));	//form안의 값 클리어
		
		$.blockUI({
			message : $("#" + oDivid),
			theme:  true,
			title : title,
			draggable : draggable,
			themedCSS: {
				width:  $oThis[0].style.width,	//동적으로 열린div 사이즈만큼 똑같이 한다
				top : "10%"
            }
		});
		//js/grid/temes/redmond/jquery-ui-1.7.1.custom.css 백그라운 속성IE에서 적용이 안되기
		//때문에 삭제한다
		$(".ui-widget-overlay").css("background","");
		layerCloseEvt(null,null);//BlockUI CLose Evt
		
	},
	
	goDetailLayer : function(obj){//상세 그리드 레이어
		
		var param_obj = {};//서버사이드로 넘길 pk 파라메터 및 각종 파라메터....담을 배열
		var pk_list_split;
		var header_split;
		
		var title = null;
		var draggable = true; //default true 상단 타이틀 드래그 여부
		
		var jqGrid_colModel = $(obj.gridObj).jqGrid("getGridParam","colModel");
		
		var $oThis = $(this);
		
		//$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
		
		
		
		if($oThis[0] == undefined){//해당 엘리먼트를 선택하지 않았을 경우 id는 반듯이 한개이므로 여러개 지정 불가
			$.j_alert("DIV Element ID : " + $oThis.selector + "\nNot Exists","Element null Error");
			return;
		}
		
		if(obj.title != "" && obj.title != null){//타이틀
			title = obj.title;
		}
		 
		if(obj.draggable != null){//드래그여부
			draggable = obj.draggable ;
		}
		
		if(obj.pk_key == "" || obj.pk_key == null){
			$.j_alert("PK_LIST Null \nPK_LIST Not Exists","PK_LIST Null Error");
			return;
		}
		
		if(obj.header == "" || obj.header == null){
			$.j_alert("Header Null \nHeader Not Exists","Header Null Error");
			return;
		}
		
		if($("#" + $oThis[0].id).find("#saveFlag").size() > 0){
			$("#" + $oThis[0].id).find("#saveFlag").val("upt");
		}
	
		//pk
		if(obj.pk_key.indexOf(",") >= 0){
			pk_list_split = obj.pk_key.split(",");
		}else if(obj.pk_key.indexOf("#") >= 0){
			pk_list_split = obj.pk_key.split("#");
		}else if(obj.pk_key.indexOf("@") >= 0){
			pk_list_split = obj.pk_key.split("@");
		}else{
			pk_list_split = [obj.pk_key];//pk가 한개일경우 배열형식으로 1개 리턴
		}
	
		//header
		if(obj.header.indexOf(",") >= 0){
			header_split = obj.header.split(",");
		}else if(obj.header.indexOf("#") >= 0){
			header_split = obj.header.split("#");
		}else if(obj.header.indexOf("@") >= 0){
			header_split = obj.header.split("@");
		}else{
			header_split = [obj.header];//header 매핑이 1개일 경우 배열형식으로 1개 리턴
		}
		
 
		$(obj.gridObj).jqGrid("setGridParam",{//셀클릭이벤트 핸들러 추가 
			onCellSelect: function(id, cellidx, cellvalue){
				//alert("@@@" + id + " : " + cellidx + " : " + cellvalue);
				var click_col_name = jqGrid_colModel[cellidx].name;
				var row_data = $(obj.gridObj).getRowData(id);//컬럼이름이 중첩된다면 뒤에게 적용된다
				//var row_data =$(obj.gridObj).jqGrid("getRowData",id);
				//alert(row_data[pk_list_split[0]]);
				
				$.each(header_split,function(k,h_value){
					
					if(click_col_name == h_value){
						
						//header 정보와 매핑된 건에 한에서 상세레이어 출력 ....
						if(obj.namespace != null && obj.namespace != ""){
							param_obj["namespace"] = obj.namespace;
						}
						$(pk_list_split).each(function(i,value){//pk로 선정한 값을 담아야 한다
							//log("" + i + " : " + value);
							param_obj[value] = row_data[value];
						});
					
						//alert(param_obj.USER_ID + " : " + param_obj.EMPLOYEE_NO + " : " + param_obj.USER_NAME);
						
					    $.ajax({
				            url: obj.url,
				            dataType: "json",
				            type: "POST",
				           // contentType: "application/x-www-form-urlencoded; charset=euc-kr;", 
				            data: param_obj,//pk
				            success: function(data, status) {
				            	loadDetailLayer($oThis,title,draggable,data, status);//아래 펑션에서 레이어 올리고 이벤트 작업걸고 레이어 띄운다.
				            },
				            complete: function(xhr, status){},
				            beforeSend: function(xhr){
				            	$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
				            }
				        });
					}
				});
			}
		});
		
	},
	
	
	goNomalLayer : function(obj){
		
		var $oThis = $(this);
		var title = null;
		var draggable = true; //default true 상단 타이틀 드래그 여부
		//$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
		
		if($oThis[0] == undefined){//해당 엘리먼트를 선택하지 않았을 경우 id는 반듯이 한개이므로 여러개 지정 불가
			$.j_alert("DIV Element ID : " + $oThis.selector + "\nNot Exists","Element null Error");
			return;
		}
		
		if(obj.title != "" && obj.title != null){//타이틀
			title = obj.title;
		}
		 
		if(obj.draggable != null){//드래그여부
			draggable = obj.draggable ;
		}
		//alert(obj);
		
	    $.ajax({
            url: obj.url,
            type: "POST",
            dataType: "json",
            //contentType: "application/x-www-form-urlencoded; charset=utf-8;", 
            data: obj,//pk
            success: function(data, status) {
            	loadDetailLayer($oThis,title,draggable,data, status);//아래 펑션에서 레이어 올리고 이벤트 작업걸고 레이어 띄운다.
            },
            complete: function(xhr, status){},
            beforeSend: function(xhr){
            	$.sessionCheck();//세션체크부터  commonModuleScript 141번 라인 참조
            },
            error : function(xhr, status){}
        });
		
		//$.j_alert("" + $oThis[0].id);
		
	},
	
	goHideLayer : function(gubn){
		var $oThis = $(this);//셀렉터해온 객체를 가지고 있는다.
		
		if($oThis[0] == undefined){//해당 엘리먼트를 선택하지 않았을 경우 id는 반듯이 한개이므로 여러개 지정 불가
			$.j_alert("DIV Element ID : " + $oThis.selector + "\nNot Exists","Element null Error");
			return;
		}
		var oDivid = $oThis[0].id; 
		
		if(gubn != null && gubn != ""){
			if($.trim(gubn).toUpperCase()=="Y"){//Y일경우 창을 닫는다..
				$.unblockUI(); 
				clear_form($oThis.find("form:first"));	//form안의 값 클리어
			}else{//N
				clear_form($oThis.find("form:first"));	//form안의 값 클리어
			}
		}else{
			$.unblockUI(); 
			clear_form($oThis.find("form:first"));	//form안의 값 클리어
		}
	},
	
	
	//------------------------------------공통검색 스크립트 관련부분-----------------------------------
	
	searchEle : function(obj){
		//log("" + obj.mode + " : " + obj.len);
		var eleId_Array = new Array();
		//var eleId_Array = {};// 객체 자체를 담고자 할때는 해당 배열은 사용 못한다 위에껄로 사용.
		if(!eleValidation($(this))){
			$.j_alert("DIV Element ID : " + $(this).selector + "\nNot Exists","Element null Error");
			return;
		}
		  
		var oDivid = $(this)[0].id; 
		
		$("#" + oDivid).children("*").each(function(i,ele){
			eleId_Array[i] = ele;
		});
		
		//log(eleId_Array.length);
		//var eleId_Array_size = eleId_Array.length;
		
		newEventSearch($(this),eleId_Array,obj);//해당 펑션에서 각 엘리먼트 이벤트 잡아내서 코드검색 가능하게 개발한뒤 팝업열 수 있도록 이벤트 핸들링 까지 한다.
		
		
		/*
		for(var i = 0; i < eleId_Array_size; i++){
			log("" + eleId_Array[i]);
			$(eleId_Array[i]).bind("keydown",function(event){
				log("" + event.keyCode);
			});
		}
		
	
		function test1(obj){
			log(obj.mode);
		}
		*/
		
		
		//해당 위치부터 작업시작........
		
	},
	searchZip : function(){//searchZip 는 selector가 두개가 반듯이 필수로 들어와야한다 zipcode,address1
		
		var $oThis = $(this);
		
		if($oThis[0] == undefined){//zipcode Element
			$.j_alert("DIV Element ID : " + $oThis.selector.split(",")[0] + "\nNot Exists","Element null Error");
			return;
		}
		
		if($oThis[1] == undefined){//address Element
			$.j_alert("DIV Element ID : " + $oThis.selector.split(",")[1] + "\nNot Exists","Element null Error");
			return;
		}
		
		$oThis.addClass("inputReadOnly default_cursor").attr("readonly",true);//두개의 input 엘리먼트를 readonly로 만든다.
		
		commonSearchEvent($oThis,"zipcode");//엘리먼트가 배열로 잡혀있음을 주의할것..
		
		//alert("" + $sel);
	},
	
	/*
	 * mode : S 일 경우에는 검색시 사용하는 user검색 팝업
	 * mode : N 일 경우에는 등록,수정 에서 사용하는 user 검색 팝업.
	 * Default S
	 */
	searchUser : function(mode){
		//toUpperCase(); 
		var pop_mode = "S";
		var $oThis = $(this);
		
		if(!eleValidation($oThis)){//해당 선택자가 있는지 먼저 검색
			$.j_alert("DIV Element ID : " + $oThis.selector + "\nNot Exists","Element null Error");
			return;
		}
		
		if(mode != null && $.trim(mode.toUpperCase()) == "N"){
			pop_mode = mode;
		}
		
		
		if(pop_mode == "S"){//조회화면에서 사용하는 검색일경우
			//$oThis.next("img").bind("click",function(e){
			//	commonSearchPop($oThis,"user");
			//});
			
			$oThis.bind("keypress",function(e){//키클릭이벤트
				if(e.keyCode == 13){
					commonSearchPop($oThis,"user");
				}
			});
			
			$($oThis[0]).next("img").bind("click",function(e){
				commonSearchPop($oThis,"user");
			});
			
			
		}else{//등록 수정에서 사용하는 유저검색팝업일 경우는 정확한 값의 유도를 하기 위해서 readonly로 속성을 변경시켜줘야 한다.
			$oThis.addClass("inputReadOnly default_cursor").attr("readonly",true);//두개의 input 엘리먼트를 readonly로 만든다.
			commonSearchEvent($oThis,"user");
		}
		
		//log("검색시작 : " + pop_mode);	
		
	}
	
	
});//end of jQuery extends 

	
	function commonSearchEvent(e_obj,mode){
		//이벤트 잡아내는 순서
		
		e_obj.bind("click",function(e){//마우스 클릭 이벤트
			commonSearchPop(e_obj,mode);
		});
		e_obj.bind("keypress",function(e){//키클릭이벤트
			commonSearchPop(e_obj,mode);
		});
		
		$(e_obj[0]).next("img").bind("click",function(e){
			commonSearchPop(e_obj,mode);
		});
		
	}
	
	
	function commonSearchPop(e_obj,mode){
		
		var url = "";
		var width="525";
		var height = "440";
		
		if(mode=="zipcode"){
			url = "/INNER_MTGI/Search/Zipcode/main.p";
			height = "470";
		}else if(mode=="user"){
			url = "/INNER_MTGI/Search/User/main.p";
		}
		
		
		
		
		var returnValue = goNewModalPop(e_obj,url, {mode : mode}, width, height, false);
		//goNewModalPop(e_obj,url, {mode : mode}/*, "525", "470", false*/);
		
		if(returnValue != null){
			
			
			if(mode=="zipcode"){
				$(e_obj[0]).val(returnValue.args1);
				$(e_obj[1]).val(returnValue.args2);
				$(e_obj[1]).next("input[type=text]").val(returnValue.args3).focus();
			}else if(mode=="user"){
				$(e_obj).val(returnValue.args1);
			}
		}
	}

function newEventSearch(divObj , eleArrayObj , paramObj){
	//log("" + divObj[0].id);
	//log(paramObj.mode + " : " + paramObj.len);
	//log(eleArrayObj[0].id + " : " + eleArrayObj[1].id + " : " +  eleArrayObj[2].id);
	//if(paramObj.mode == "company"){//공통팝업 생길때마다 확장해서 만들것 현제는 회사 검색 1개..우편번호는 jQuery $.extends안에서 작업.
		$(eleArrayObj[0]).bind("keyup",function(e){
			if(e.keyCode == 8){//backspace
				$(eleArrayObj[1]).val("");//name 엘리먼트 지운다.
				
				if(divObj.find("#function_call").size() > 0){//---프로젝트 등록시....
					$("#i_project_name").val("");
					$("#i_order_ceo").val("");
					$("#i_client_cp_code").val("");
					$("#i_client_cp_name").val("");
					$("#i_order_cp_code").val("");
					$("#i_order_cp_name").val("");
				}

			}
			if($(this).val().length == paramObj.len){
				//세션체크부터 해당 getJsonData 부분은 어노테이션이 아닌 Bean 을 이용하여 컨트롤러 호출..
				$.sessionCheck();
				$.getJsonData(eleArrayObj,paramObj,codSearchCallback);//아규먼트 3번째는 콜백펑션을 의미한다 데이터 파싱은 json으로 처리. 콜백펑션은 codSearchCallback
			}
		});	
	//}
	
	//keypress 이벤트 이용해서 code enter 이벤트 , name enter 이벤트 , img click 이벤트 처리......
	$(eleArrayObj[0]).bind("keypress",function(e){//code Ele
		if(e.keyCode == 13){
			searchEventPop(divObj , eleArrayObj , paramObj);
		}
	});
	$(eleArrayObj[1]).bind("keypress",function(e){//name Ele
		if(e.keyCode == 13){
			searchEventPop(divObj , eleArrayObj , paramObj);
		}
	});
	$(eleArrayObj[2]).bind("click",function(e){//img Ele
			searchEventPop(divObj , eleArrayObj , paramObj);
	});
	
	//if...
	
	//if...
	
}

function codSearchCallback(data,result){
	//log(result + " : " + eleArray + " : " + paramArray);
	//log("" + $(data).size());
	//log("" + paramArray.mode);
	if($(data).size() <= 0){
		
		if(paramArray.mode == "card"){
			alert("카드번호의 데이터가 존재하지 않습니다.");
		}else{
			alert("코드값의 데이터가 존재하지 않습니다.");
		}
		$(eleArray[0]).val("");
		$(eleArray[1]).val("");
		$(eleArray[0]).focus();
		return;
	}else{
		$(eleArray[0]).val($(eleArray[0]).val().toUpperCase());
		$(eleArray[1]).val(data[0].NAME);
	}
}

function searchEventPop(divObj , eleArrayObj , paramObj){
	
	var mode = paramObj.mode;
	var url = "";
	var width  = "525";
	var height = "440";
	var resize_is = false;
	
	
	paramObj["popFlag"] = null;
	paramObj["searchTxt"] = null;
	
	
	if($.trim($(eleArrayObj[1]).val()) != ""){//name 엘리먼트 
		paramObj["popFlag"] = "codeName";
		paramObj["searchTxt"] = $.trim($(eleArrayObj[1]).val());
	}
	
	if($.trim($(eleArrayObj[0]).val()) != ""){//code 엘리먼트
		paramObj["popFlag"] = "code";
		paramObj["searchTxt"] = $.trim($(eleArrayObj[0]).val());
	}
	
		

	
	
	
	if(mode == "company"){//모드별로 확장해서 나갈것. company는 회사를 뜻한다.
		url = "/INNER_MTGI/Search/Company/main.p";//회사검색공통팝업.
		//width,height,resize_is는 각 if문안에서 재정의 하거나 default로 사용할 것.
	}else if(mode == "project"){
		url = "/INNER_MTGI/Search/Project/main.p";//안건 및 프로젝트 검색 팝업.
		if(divObj.find("#function_call").size() > 0){
			paramObj["winObj"] = window;//윈도우 객체를 보낸다....해당 객체를 이용해서 부모창 펑션을실행 시킨다.
		}
	}else if(mode == "card"){//법인카드 검색
		url = "/INNER_MTGI/Search/Card/main.p";//법인카드 검색팝업
	}
	
	//goNewModalPop(eleArrayObj,url,paramObj/*,width,height,resize_is*/);
	returnValue = goNewModalPop(eleArrayObj,url,paramObj,width,height,resize_is);
	 
	
	if(returnValue != null){
		//확장..차후 값이 더 있게 될지 모르므로 중복되더라도 if문을 이용해서 각 엘리먼트 별로 값을 넣는다.
		if(mode == "company"){
			$(eleArrayObj[0]).val(returnValue.args1);
			$(eleArrayObj[1]).val(returnValue.args2);
		}else if(mode == "project"){//안건 + 프로젝트 검색
			$(eleArrayObj[0]).val(returnValue.args1);
			$(eleArrayObj[1]).val(returnValue.args2);
		}else if(mode == "card"){//법인카드
			$(eleArrayObj[0]).val(returnValue.args1);
			$(eleArrayObj[1]).val(returnValue.args2);
		}	
	}
}



function eleValidation(selector){
	var $oThis = selector;//셀렉터해온 객체를 가지고 있는다.
	if($oThis[0] == undefined){//해당 엘리먼트를 선택하지 않았을 경우 id는 반듯이 한개이므로 여러개 지정 불가
		return false;
	}
	return true;
}



function layerCloseEvt(obj,div1){
	if(obj != null) $(obj).remove();
	$(document).keypress(function(e){
		if(e.keyCode==27){//esc
			if(div1 != null){
				clear_form(div1.find("form:first"));
			}
			$.unblockUI(); 
		}
	});
	
	$("input[name='cancel'],#no,#btn_end").bind("click",function(e){//버튼클릭시
		//clear_form($("#input_formz"));
		if(div1 != null){		
			clear_form(div1.find("form:first"));
		}
		$.unblockUI();
		$("input[name='cancel'],#no,#btn_end").unbind("click");
		//$("#s_pop_layer").remove();
	});
}


function clear_form(ele) {
	$(ele).find(':input').each(function() {
		switch (this.type) {
		case 'password':
		case 'text':
		//case 'hidden':
		case 'textarea':
			$(this).val('');
			break;
		case 'select-multiple':
		case 'select-one':
		case 'select':
			$(this).val('default');
			$(this).val('none');
			break;
		case 'checkbox':
		case 'radio':
			this.checked = "0";
		}
	});
}


function loadDetailLayer(layer_ele,title,draggable,data, status){//디테일..
	//log("" + layer_ele.id);
	//log("" + layer_ele.children().size());
	//layer_ele.attr("style","display:block");
	//레이어 띄울 부분
	$(data).each(function(i,els){
		$.each(els,function(key,value){
			layer_ele.find("#" + key.toLowerCase()).val(value);
		});
	});
	
	//기본정보 > 거래처관리의  회사타입별로 보여주는거 기준 화면에서 도저히 잡아낼수 있는 방법이 없어서 공통에 추가한다.
	//내부보고 > 지출결의서 신청
	if(layer_ele.find("#display_gubun").size() > 0){
		//사용하는 곳..
		//WEB-INF/jsp/Acct/BA_AcctEdit.jsp //거래처 관리 수정
		//WEB-INF/jsp/IN/Spend/IN_SpendEdit.jsp//지출결의서 수정
		displayGubn();
	}
	
	//alert(layer_ele.attr("id"));
	//alert(layer_ele.find("form:first").size());
	$.blockUI({
		message : $("#" + layer_ele[0].id),
		theme:  true,
		title : title,
		draggable : draggable,
		themedCSS: {
			width:  layer_ele[0].style.width,	//동적으로 열린div 사이즈만큼 똑같이 한다
			top : "15%"
        }
	});   
	
	//js/grid/temes/redmond/jquery-ui-1.7.1.custom.css 백그라운 속성IE에서 적용이 안되기
	//때문에 삭제한다
	$(".ui-widget-overlay").css("background","");
	layerCloseEvt(null,layer_ele);//BlockUI CLose Evt
	//clear_form(layer_ele.find("form:first"));	//form안의 값 클리어
}


/**
 * 팝업모달
 * @returns {PopupModal}
 */
function Layer_PopupModal() {
	this._returnValue = null;
	this._url = null;
	this._paramArray = null;
	this._name = null;
	this._width = "525";
	this._height = "430";
	this._scroll = "NO";
	this._resize = "NO";
	this._status = "NO";
	Layer_PopupModal.prototype.setUrl = function(url) {
		this._url = url;
	};
	Layer_PopupModal.prototype.setParam = function(array) {
		this._paramArray = array;
	};
	Layer_PopupModal.prototype.setName = function(name) {
		this._name = name;
	};
	Layer_PopupModal.prototype.setWidth = function(width) {
		this._width = width;
	};
	Layer_PopupModal.prototype.setHeight = function(height) {
		this._height = height;
	};
	Layer_PopupModal.prototype.setUseScroll = function(scroll) {
		if (scroll) {
			this._scroll = "YES";
		}
	};
	Layer_PopupModal.prototype.setUseResize = function(resize) {
		if (resize) {
			this._resize = "YES";
		}
	};
	Layer_PopupModal.prototype.setUseStatus = function(status) {
		if (status) {
			this._status = "YES";
		}
	};
	Layer_PopupModal.prototype.open = function() {
		this._returnValue = window.showModalDialog(this._url, this._paramArray,
				'dialogWidth:' + this._width + 'px;dialogHeight:'
						+ this._height + 'px;status:' + this._status
						+ ';scroll:' + this._scroll + ';resizable:'
						+ this._resize);
		if (this._returnValue) {
			return this._returnValue;
		} else {
			return;
		}
	};
}



/**
 * 팝업모달 사용펑션.
 * @param url : String
 * @param params {} 배열 오브젝트로 가져올 것.
 * @param width : var
 * @param height : var
 * @param resize_is : boolean
 * @returns
 */
function goNewModalPop(eleArrayObj,url, params, width, height, resize_is) {
	
	var popup = new Layer_PopupModal();
	popup.setUrl(url);
	popup.setParam(params);
	popup.setWidth(width);
	popup.setHeight(height);
	popup.setUseResize(eval(resize_is));
	var returnValue = popup.open();
	return returnValue;
	
	
	//loading_start();//로딩모달부터 시작한다.
	
	
	/*
	 * 2012.01.25
	 * Lyyer 검색조건팝업 너무느려서사용 중지
	 * Modal로 재전환 
	 * MTGi 유창근
	var title = "";
	var mode = params.mode;
	
	if(mode == "company"){
		title = "회사정보 조회";
	}else if(mode == "zipcode"){
		title = "우편번호 조회";
	}else if(mode == "user"){
		title = "사용자정보 조회";
	}//계속확장해서 나갈것..
	

	if($("#s_pop_layer").size() <= 0){//div 
		$("<div id='s_pop_layer' style='display:none;'></div>").appendTo("body");
	}
	
	
	setTimeout(function(){
		$("#s_pop_layer").load(url,params,function(data,result){//검색레이어를 가져왔다면 BLOCKUI를 이용하여 레이어팝업으로 출력시킨다.
			loading_end();//로딩종료
			
			$.blockUI({
				message : $("#s_pop_layer"),
				theme:  true,
				title : title,
				draggable : true,
				themedCSS: {
					width:  $("#s_pop_layer")[0].style.width,	//동적으로 열린div 사이즈만큼 똑같이 한다
					top:	'20%',
					left:	'20%'
		        }
			});   
			
			$(".ui-widget-overlay").css("background","");
			layerCloseEvt(null);//BlockUI CLose Evt
				
			
			if(mode == "company"){//열려진 회사 레이어 팝업에서 자동검색이 되게끔 해야 한다.
				//해당펑션은 열려진 검색레이어  위치해 있다.
				autoSearch(params);
				$.objects["elementArray"] = eleArrayObj;
			}
		});
	},400);//의무적으로 0.4초 로딩시간을 갖는다.
	*/
	
	
}

function loading_start(title,loading_Msg){

	var loadingHtml = "<div id='oLoading' style='display:none'>";
	loadingHtml += 	  "<span><strong><font color='blue'>" + loading_Msg + "</font></strong><img src='/INNER_MTGI/resources/res_image/imerp/grid-loading.gif' title='loading'/></span>";
	loadingHtml +=    "</div>";
	
	$(loadingHtml).appendTo("body");
	
	$.blockUI({
		message : $("#oLoading"),
		theme:  true,
		title : title,
		draggable : true,
		themedCSS: {
			width:  $("#oLoading")[0].style.width,	//동적으로 열린div 사이즈만큼 똑같이 한다
			top:	'30%',
			left:	'40%'
        }
	});   
	$(".ui-widget-overlay").css("background","");
}

function loading_end(){
	$.unblockUI();
	$("#oLoading").remove();
}
