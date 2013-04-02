/** @#$
 * CommonModuleScript - 네오모듈 유창근
 * Client , Page , Async 영역에서 사용되는 공통 모듈의 집합
 */ 

/**
 * 
 *  Custom CUD Ajax jquery function
 */
$(function(){
	
	
	Common = {};
	Common.format = function(text) {
	    if (arguments.length <= 1) {
	        return text;
	    }
	    var tokenCount = arguments.length - 2;
	    for (var token = 0; token <= tokenCount; token++) {
	        text = text.replace(new RegExp("\\{" + token + "\\}", "gi"),
	                                                arguments[token + 1]);
	    }
	    return text;
	};
	
	

	//XSS Injection detect
	$("* > input[type=text] , * > input[type=password]").bind("keydown",function(e){
		//window.clipboardData.setData("Text",""); 
		//alert(e.keyCode);
		if((e.keyCode == 188 && e.shiftKey) ||  e.keyCode == 222 || (e.keyCode == 56 && e.shiftKey) || e.keyCode == 106){
			event.returnValue= false;
		}
	});
	
	//grid auto resize bug fix
	$(window).bind('resize', function() {
		 gridWidth = $("#mainTable").width() - $("#leftmenu").width() - 20;
		//alert(gridWidth);
		if (gridWidth > 200){		
			jQuery("#list1").jqGrid('setGridWidth',gridWidth);
			jQuery("#list2").jqGrid('setGridWidth',gridWidth);
		}
	});	
		
	//Title
	if($(".title01_td > b[class='tex02']").html() != null){
		var oTitle = $(".title01_td > b[class='tex02']").html().split(" &gt; ");
		$(".title01_td > b[class='tex01']").html(oTitle[oTitle.length-1]);
	}
	
	//Action Log 작업을 위한..
	$("span[id='AR'] > img[id*='btn_']").bind("click",function(o){
		actionEvnt("R",$(this));
	});
	
	//Action Log 작업을 위한..
	$("span[id='AC'] > img[id*='btn_']").bind("click",function(o){
		actionEvnt("C",$(this));
	});
	
	//Action Log 작업을 위한..
	$("span[id='AU'] > img[id*='btn_']").bind("click",function(o){
		actionEvnt("U",$(this));
	});
	
	//Action Log 작업을 위한..
	$("span[id='AD'] > img[id*='btn_']").bind("click",function(o){
		actionEvnt("D",$(this));
	});
	
		
	
	$.extend({
		
		//cudAjax
		cudAjax : function(url,dataType,formName,param,successfn){
			
			var oForm = $("#"+formName).serializeArray();
			var paramArray = param;
			
			jQuery.each(oForm, function(i, oForm){
				paramArray[oForm.name] = oForm.value;
			});
					
			$.ajax({
				url : url,
				type : "POST",
				dataType : dataType,
				data :paramArray,
				processData : true,//default true
				beforeSend  : function(xhr){
					 xhr.setRequestHeader("AJAX", "true");
					//$("#cus_block").css("display","block");
					//centerLayer("cus_loading");
				},
				success : successfn,
				error : function(jqXHR, textStatus, errorThrown){
					alert("Ajax Error");
					//setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");},0);
				},
				complete : function(){
					//setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");},0);
				}
			
			});
		},
		
		
		
		//cudAjaxSubmit
		cudAjaxSubmit : function(url,dataType,formName,successfn){
			$("<div id='oMultiPart'/>").appendTo($("#"+formName));
		    var options = { 
		    		target: $("#oMultiPart"),
		    		
		            beforeSubmit:  function(formData, jqForm, options){
		            	$("#cus_block").css("display","block");
						 centerLayer("cus_loading");
		            	 //var queryString = $.param(formData); 
		           
		            },
		            type: "POST",
		            dataType:dataType,
		            url: url,
		            success:    successfn,//showResponse,  // post-submit callback
		            processData : true,//default true
		            error:function(jqXHR, textStatus, errorThrown){
		            	alert("Sorry. This is a temporary error. Please contact your administrator.");
		            	setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");},0);
		            },
					complete : function(){
						//setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");},100);
						$("#oMultiPart").remove();
					}
		    }; 
		    
			//$('#input_formz').ajaxSubmit(options);
		    $("#"+formName).ajaxSubmit(options);
		},
		
		//sessionCheck
		sessionCheck : function(){
			$.ajax({
				url : "sessioncheck.do",  //url ../로 잡아놓으면 못탐..다른곳에서..  
				dataType : "text",
				error : function(){
					alert("Login session expired. please login again.");
					urB=(function x(){})[-5]=='x'?'FF3':(function x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Saf':/s/.test(/a/.toString)?'Chr':/^function \(/.test([].sort)?'Op':'Unknown';
					 if (urB=='FF3' || urB=='FF2' || urB=='FF' || urB!=='IE' ){   //firefox
						 location.replace("../../");
					 }else{
						location.href("/INNER_MTGI/init/gateway.do");
					 }
					return false;
				}
			});	
			
		},
		//generateComboBox
		
		generateComboBox : function(sbId,param,ib_ns,ib_id,defValue,block,selVal){
			
			param["defValue"] = defValue;
			param["ib_ns"] = ib_ns;
			param["ib_id"] = ib_id;
			
			$.ajax({
				url : "./AsyncComboBox.do",
				type : "POST",
				dataType : "text",
				data :param,
				beforeSend  : function(){
					
					if(block){
						$("#cus_block").css("display","block");
						centerLayer("cus_loading");
					}
				
				},
				success : function(data){
					
					//alert(data);
					$("#"+sbId).empty();
					$(data).appendTo("#"+sbId);
					
					if(selVal != null){
						$("#"+sbId).val(selVal);
					};
					
				},
				error : function(jqXHR, textStatus, errorThrown){
					alert("Sorry. This is a temporary error. Please contact your administrator.");
				},
				complete : function(){
					
					if(block){
						setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");});
					}
					
					
				}
			
			});
			
			
		},
		
		// Auto set Value Input Element 
		popInit : function(url){

			//Block Overay Div 를 그린다.
			//$("<div id='cus_block' class='ui-widget-overlay jqgrid-overlay'  style='display: none;'/>").appendTo("body");
			//$("<div id='cus_loading' style='position: absolute; top: 43%; left: 43%;  display: none;'><img src='../../resources/res_image/images/ajax-loader.gif'/></div>").appendTo("body");
			//ajax setup 하고
				centerLayer("cus_loading");
				$.ajax({
					url : url,
					data :window.dialogArguments,
					beforeSend  : function(){
						$("#cus_block").css("display","block");
						centerLayer("cus_loading");
					},
					success : function(data,status){		
						setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");
							$(data).find("row > *").each(function(){
							//$("#"+(this).nodeName.toLowerCase()).val($(this).text());
							//alert((this).nodeName.toLowerCase());
						
							   switch(($("#"+(this).nodeName.toLowerCase())).attr("type")) {
						
				
					           case 'password':	
					           case 'text':
					           case 'hidden':
					           case 'textarea':
					        	   $("#"+(this).nodeName.toLowerCase()).val($(this).text());
					        	   /**
					        	   var _temp = $("#"+(this).nodeName.toLowerCase()).attr("id");
					        	   var isDate =  _temp.lastIndexOf("date");
					        	   if(isDate != -1){ //데이터 형식이 date 일때 포맷팅 @#$
					        		   var vDate = addDateFormat($(this).text());
					        		   $("#"+(this).nodeName.toLowerCase()).val(vDate);
					        	   }else{
					        		   $("#"+(this).nodeName.toLowerCase()).val($(this).text());
					        	   }
					        	   **/
					               break;
					           case 'select-multiple':
					           case 'select-one':
					           case 'select':
					        	   if($(this).text() == ""){
					        		   $("#"+(this).nodeName.toLowerCase() + " > option[value='none']").attr("selected","true");
					        	   }else{
					        		   $("#"+(this).nodeName.toLowerCase() + " > option[value="+$(this).text()+"]").attr("selected","true");
					        	   }  
					        	   break;
					           case 'checkbox':
					           case 'radio':
					        	
					        	   $("input[name="+(this).nodeName.toLowerCase()+"]").filter('input[value='+$(this).text()+']').attr("checked", "checked");
					        	   break;
					           default:
					        	   
					        	   if($("#"+(this).nodeName.toLowerCase()).length > 0){
					        		   $("#"+(this).nodeName.toLowerCase()).html($(this).text());
					        		   /**
					        		   var _temp = $("#"+(this).nodeName.toLowerCase()).attr("id");
						        		var isDate =  _temp.lastIndexOf("date") == null ? -1 :  _temp.lastIndexOf("date");
						        	   if(isDate != -1){ //데이터 형식이 date 일때 포맷팅 @#$
						        		   var vDate = addDateFormat($(this).text());
						        		   $("#"+(this).nodeName.toLowerCase()).html(vDate);
						        	   }else{
						        		   $("#"+(this).nodeName.toLowerCase()).html($(this).text());
						        	   }**/
						        	   
					        		   
					        	   }   
					       }
				
						});
					
						
						},500);		
					},
					error : function(jqXHR, textStatus, errorThrown){
						alert("Sorry. This is a temporary error. Please contact your administrator.");
					}
			});
		},
		
		//Custom initialize popup
		customInit : function(url,obj){
			//Block Overay Div 를 그린다.
			//$("<div id='cus_block' class='ui-widget-overlay jqgrid-overlay'  style='display: none;'/>").appendTo("body");
			//$("<div id='cus_loading' style='position: absolute; top: 43%; left: 43%;  display: none;'><img src='../../resources/res_image/images/ajax-loader.gif'/></div>").appendTo("body");
			//ajax setup 하고
				$.ajax({
					url : url,
					data :window.dialogArguments,
					beforeSend  : function(){
						
						$("#cus_block").css("display","block");
						centerLayer("cus_loading");
					},
					success : obj,
					error : function(jqXHR, textStatus, errorThrown){
						alert("Sorry. This is a temporary error. Please contact your administrator.");
					},
					complete : function(){
						setTimeout(function(){$("#cus_block,#cus_loading").css("display","none");},0);
						
					}
				
			});
		},
		
		//page redirect
		redirect : function (url){
			
			urB=(function x(){})[-5]=='x'?'FF3':(function x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Saf':/s/.test(/a/.toString)?'Chr':/^function \(/.test([].sort)?'Op':'Unknown';
			 if (urB=='FF3' || urB=='FF2' || urB=='FF' || urB!=='IE' ){   //firefox
					location.replace(url);
			 }else{
				 
					location.href(url);
			 }
			return false;
			
		},
		
		
		openCommonPopup : function(type,code_id,name_id, multi1, multi2, multi3, multi_param){
			$("#cus_block").css("display","block");
			centerLayer("cus_loading");
			
			var popup = new PopupModal();//PopupModal 생성
			var param = {};
			param["type"] = type;
			
		
			if($("#"+code_id).val()==""){
				param["popFlag"] = "codeName"; 
				param["codeName"] = $("#"+name_id).val();
			}
			else{
				param["popFlag"] = "code"; 
				param["code"] =  $("#"+code_id).val();
			}
			
			if(typeof(multi_param) != "undefined"){
				$.each(multi_param,function(index, item){
					param[index] = item;
					//alert("index=="+index+"\nitem="+item);
				});
			}
			/*
			$.each(param,function(index, item){
				alert("index=="+index+"\nitem="+item);
			});
			*/

			
			switch(type){
			case "user":				// 전체사용자
			case "vendor" :				// Vendor 목록
			case "vendorByCompany" :	// Company 관련 Vendor 목록
			case "inUser":				// 내부 사용자
			case "outUser" : 			// 외부 사용자
			case "outUserByCompany":	// Company 관련 Vendor User 목록
			case "ConfirmInvoice":				// Purchase Plan Confirm invoice Popup
				break;
			default:
				alert(type + " 의 팝업은 없습니다.");
				return false;		
			}
			//if(type != "user" && type != "vendor" && type != "out_user" && type !="in_user"){
			//	alert(type + " 의 팝업은 없습니다.");
			//	return false;		
			//}
			var url= "./commonPopup.p?type=" + type  ;  //팝업 경로 지정
			var returnValue = popup.open(url,param,"600","410","NO","NO");		
			
			if(returnValue){
				$("#"+code_id).val(returnValue["CODE"]);
				$("#"+name_id).val(returnValue["CODE_NAME"]);
				
				if(multi1){
					$("#"+multi1).val(returnValue["MULTI1"]);
				}
				if(multi2){
					$("#"+multi2).val(returnValue["MULTI2"]);
				}
				if(multi3){
					$("#"+multi3).val(returnValue["MULTI3"]);
				}
				
			}
			$("#cus_block,#cus_loading").css("display","none");
		},
		
		
	
		
		
		
		excelDown : function(url,objname,formname){
		
			$("#cus_block").css("display","block");
			centerLayer("cus_loading");
			var obj = $("#"+objname);
			var tot_gsr = obj.jqGrid('getGridParam','reccount');
			if(tot_gsr < 1){
				alert("There is no data available for download. After query, please proceed.");
				$("#cus_block,#cus_loading").css("display","none");
				return false;
			}
				
			$("<iframe id='oExcel' name='oExcel' width='0' height='0'/>").appendTo($("body"));
		 
			//$("#"+formname).attr("action",url);
			//$("#"+formname).attr("method",post);

			$("#"+formname).attr("onsubmit","");
			$("#"+formname).attr("action",url);
			$("#"+formname).attr("method","post");
			$("#"+formname).attr("target","oExcel");
			//$("<form id='excel' action='"+url+"' method='post' style='display : none/>").appendTo("body");
			//$("#excel").append($("#"+formname +" > *").html());
			$("#"+formname).submit();
			$("#"+formname).attr("onsubmit","return false");
			//$("#excel").remove();
			$("#oExcel").remove();
			//$("#excel").append($("#searchForm input").html());
			$("#cus_block,#cus_loading").css("display","none");	
		},
		
		//MTGi유창근..checkbox 선택된 데이터 String 으로 묶기..
		//컬럼은 콤마 로우는 골뱅이로 한다 즉 이런식으로 데이터가 만들어진다
		//test1,test2,test2@test4,test5,test6@ <-즉 골뱅이 표시가 Row열이 되는 것이다
		jqGridCheckParam :function(gridObj,pkString){
			var oArray = {};
			var dataString = "";
			var checkGrid = gridObj.jqGrid("getGridParam","selarrrow");
			//alert(gridObj.id + " : " + pkString);
			var pkStringSplit = pkString.split("@");
			//log("" + checkGrid[i]);
			for(var i = 0; i < checkGrid.length; i++){
				
				var gridData = gridObj.getRowData(checkGrid[i]);
				
				for(var j = 0; j < pkStringSplit.length; j++){
					
					if(j != (pkStringSplit.length - 1)){
						dataString += gridData[pkStringSplit[j]] + ",";
					}else{
						dataString += gridData[pkStringSplit[j]];
					}	
				}
				if( i != (checkGrid.length - 1)){
					dataString += "@";//Row구분자
				}
			}
			//log(dataString);
			oArray["pkString"] = dataString;
			return oArray;
		}
		
	});
});

var oDate = new Date();


function actionEvnt(oAction,obj){
	
	$("input[name='actionEvnt']").val(oAction);
	var oBtn = $(obj).attr("id");
	var oComnt = $("input[name='"+oBtn+"']").val();
	var isPopup = $("div[id='popup']").length != 0 ? true : false;

	if(oComnt != null){
		if(isPopup){
			$("input[name='actionComnt']").val(oComnt + "(p)");
		}else{
			$("input[name='actionComnt']").val(oComnt);
		}
		
	}else{
		oComnt = oBtn.replace("btn_","");
		if(isPopup){
			$("input[name='actionComnt']").val(oComnt + "(p)");
		}else{
			$("input[name='actionComnt']").val(oComnt);
		}
	}
	
}


/**
 * jqgrid 에서 발생하는 비동기 에러 캐치
 * 
 * @param xhr
 * @param status
 * @param error
 * @returns
 */
var asyncError = function(xhr,status,error){
	
	if(xhr.getResponseHeader("oio")){
		
		urB=(function x(){})[-5]=='x'?'FF3':(function x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Saf':/s/.test(/a/.toString)?'Chr':/^function \(/.test([].sort)?'Op':'Unknown';
		 if (urB=='FF3' || urB=='FF2' || urB=='FF' || urB!=='IE' ){   //firefox
				location.replace("../../");
		 }else{
			 
				location.href("../../");
		 }
		return false;
	}
	
	if(status != "error"){
		urB=(function x(){})[-5]=='x'?'FF3':(function x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Saf':/s/.test(/a/.toString)?'Chr':/^function \(/.test([].sort)?'Op':'Unknown';
		 if (urB=='FF3' || urB=='FF2' || urB=='FF' || urB!=='IE' ){   //firefox
				location.replace("error.do");
		 }else{
			 
				location.href("error.do");
		 }
	}else{
		
		alert(xhr.responseText);
		return false;
		
	}
	
	
	
};



/** @#$
 *  Form Element 의 Input type 의 값을 리셋  - achiz
 */
function clear_form_elements(ele) {

    $(ele).find(':input').each(function() {
        switch(this.type) {
            case 'password':	
            case 'text':
            case 'hidden':
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



var xmlParser =  { 
	      root:"result", 
	      row:"row",
	      page:"rows>page", 
	      total:"rows>total", 
	      records:"rows>records",
	      repeatitems:false,
	      id : "id"
	  };

//json파싱
var jsonParser = {
	      root:"rows",
	      page: "page",
	      total: "total",
	      records: "records",
	      repeatitems: false,
	      id: "0"
	};

/**
 *  Grid optional search  - achiz
 *  : 검색을 필드로 구현할 시 필드 data를 Array Object 로 처리
 */
function postArray(obj){
	var paramArray = {};
	jQuery.each(obj, function(i, obj){
		paramArray[obj.name] = obj.value;
	 });
	 return paramArray;
}

/**
 *  Grid Date formatt 셋팅 - 커스터마이징 후 나중에 분리할것 - achiz
 */
function dateFormatter(cellvalue, options, rowObject){
	var temp = cellvalue.split(" ");

	cellvalue = temp[0];
	
	return cellvalue;
}

/**
 *  Grid Date formatt 셋팅 - 커스터마이징 후 나중에 분리할것 - achiz
 */
//DB 전화번호 필드가 null 일 경우 -- 뿌려주는 것 방지
function telFormatter(cellvalue, options, rowObject){
	
	if(cellvalue.length == 2){
		cellvalue = " ";
		return cellvalue;
	}
	else{
		return cellvalue;
	}
}

/** 
 * grid ui block control
 * @param opt
 * @param gridId
 * @param message
 * @returns {Boolean}
 */


function gridUiBlock(opt,gridId,message){
	
	if(opt == "block"){
		if(message != ""){
			$("#load_"+$.jgrid.jqID(gridId)).html(message);
		}
		$("#lui_"+$.jgrid.jqID(gridId)).show();
	    $("#load_"+$.jgrid.jqID(gridId)).show();
		
		
	}else if(opt ="unblock"){
		message = "불러오는 중...";
		$("#load_"+$.jgrid.jqID(gridId)).html(message);
		$("#lui_"+$.jgrid.jqID(gridId)).hide();
	    $("#load_"+$.jgrid.jqID(gridId)).hide();
	    
	}else{
		
		alert("not Option = + " + opt);
		return false;
	}
	
}












function post(URL, PARAMS) {

	var temp=document.createElement("form");
	temp.action=URL;
	temp.method="POST";
	temp.style.display="none";
	temp.onsubmit ="return false";
	for(var x in PARAMS) {
		var opt=document.createElement("textarea");
		opt.name=x;
		opt.value=PARAMS[x];
		temp.appendChild(opt);
	}
	document.body.appendChild(temp);
	temp.submit();
	return temp;
}




function dCalendar(spanid,dateTextid,type){
	
	var s_id = $("#"+spanid);
	$("<img  height='17px' onMouseOver=\"style.cursor='pointer'\" align='absmiddle' src=\"../../resources/res_image/icons/calendar.gif\" onclick=\"displayCalendar(document.forms[0]."+dateTextid+",'"+type+"',this)\"></img>").appendTo(s_id);

	//$(".calendar_week_row > td").attr("width","20px");
	//alert($(".calendar_week_row > td").attr("width"));
	
}


function authButtons(auth){
	
	var r = auth.charAt(0);
	var c = auth.charAt(1);
	var u = auth.charAt(2);
	var d = auth.charAt(3);
	var a = auth.charAt(4);
	
	if(r == "N"){
		$("span[id='AR']").css("display","none");
	}
	if(c == "N"){
		$("span[id='AC']").css("display","none");
	};
	if(u == "N"){
		$("span[id='AU']").css("display","none");
	};
	if(d == "N"){
		$("span[id='AD']").css("display","none");
	};
	if(a == "N"){
		$("span[id='AA']").css("display","none");
	};
	
}
/** @#$
 *   동적 콤보박스 Initialize -  achiz
 *   comboBoxTableName : 뿌려줄 Select Object
 *   query : 조건 쿼리를 추가로 넣을 수 있다.
 *   defaultValue : 소분류 및 자식 Select Box 를 타겟으로 해당 값을 검색하여 그려준다.
 *   mapID : comboBox, deptComboBox 
 *   defaultSelectBox : 소분류 및 자식 Select Box 이름
 *   isInit : 페이지 로드시 뿌려줄것인지 여부
 */
var switcher = true;
function asyncComboBox(codeBoxTableName,query,defaultValue,defaultSelectBox,mapID,isInit){
	
	if(!switcher && defaultValue == "none"){
		var obj = document.getElementById(defaultSelectBox);
		$(obj).html("");
		$("<option value='default'>ALL</option>").appendTo(obj);
		return false;
	}
	var url = "comboBox.do?tablespace="+codeBoxTableName+"&mapId="+mapID+"&query="+query+"&defaultValue="+defaultValue;
	$.post(url, function(data){
		
		var obj = document.getElementById(defaultSelectBox);
		var index = document.getElementById(defaultSelectBox).selectedIndex;
		var selvalue = document.getElementById(defaultSelectBox)[index].value;
		if(isInit == false && index == -1){
			return false;
		}
		if(isInit){
			$(data).find("code").each(function(){
				var skey = $(this).attr("skey");
				var name = $(this).attr("name");	
				$("<option value='"+skey+"'>"+name+"</option>").appendTo(obj);
			});
		}else{
			$(obj).html("");
			$("<option value='default'>ALL</option>").appendTo(obj);
			$(data).find("code").each(function(){
				var skey = $(this).attr("skey");
				var name = $(this).attr("name");
				$("<option value='"+skey+"'>"+name+"</option>").appendTo(obj);
			});
			
			if (defaultValue != "none"){
				$(obj).val(defaultValue);
			}
		}

	});
	switcher = false;
}

/**
 *  공백제거 Trim 기능 - achiz
*/
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/**
$.datepicker.setDefaults({
    buttonImageOnly: true,
    buttonText : "달력",
    buttonImage: "./resources/design/ico_calendar.gif"
   });
**/

/**  @#$
 * endWindth
 * 마지막글자 체크
 */
String.prototype.endWidth = function(str){
	return (str == this.charAt(this.length - 1));	
};



/**
 * CheckRow- achiz
 * Grid 에서 현재 Row 가 선택되었는지 확인해준다.
 */
function checkRow(gridid){
	var gsr = $(gridid).jqGrid('getGridParam','selrow');

	if(gsr == null){
		alert("Please select the data you want to work." );
		return false;
	}
	return true;
	
}

/**
 * checkBox selected -you
 * Grid에서 체크박스가 선택되있는지 검사
 */

function gridCheckV(gridObj){
	var checkEle = gridObj.jqGrid("getGridParam","selarrrow");
		if(checkEle == null || checkEle == ""){
			return false;
		}
	return true;
}

/**  @#$
 *  PopupModal - achiz
 *  callModal 을 common custom 형태 로 수정
 *  윈도우 팝업을 Modal 형태로 보여준다
 *  new 타입을 이용하여 객체를 생성하며
 *  setter 를 이용하여 필수로 설정해줘야하는 값을 넣은후 open() 을 이용하여 팝업을 띄운다.
 *  팝업이 닫히는 시점부터 그다음 문장을 실행하며 팝업에서 넘긴 value를 컨트롤 가능하게한다.
 *  
 *  -- 필수 Setter --
 *  setUrl("팝업주소")
 *  setParam("파라메터가 포함된 Object 또는 Array, 단일 변수도 대입이 가능하다")
 *  setWidth("팝업가로길이")
 *  setHeight("팝업세로")
 *  
 *  -- 선택사항 Setter --
 *  setUseScroll(스크롤사용여부 true, false //기본은 false); 
 *  setUseResize(팝업크기조절여부 true, false //기본은 false);
 *  setUseStatus(상태바표시여부 true, flase //기본은 false);
 */
function PopupModal(){
	
	PopupModal.prototype.open = function(url,param,w,h,scroll,resize){
		
		 var returns = window.showModalDialog(url,param,'dialogWidth:'+w+'px;dialogHeight:'+h+'px;scroll:'+scroll+';resizable:'+resize);
			
		 
		 if(returns){
			
				return returns;
			}else{
				return;
			}
	};
}


/**  @#$
 *  Batch Data Handling  - achiz
 *  Grid 등에서 Server 로 일괄처리시 일괄처리할 데이터는 JSON 으로 처리하여 전송한다
 *  Object - > JSON parsing - > ajax post 
 *  
 *  Server 에서는 request 또는 paramHash 를 이용하여 "json" 으로 받으면 된다.
 *  추가 처리될 Parameter 도 추가가 가능하다
 *  DataGrid.java 참고
 *  
 *  @param gridId : Grid Id
 *  @param param : 확장 Parameter 추가적인 Parameter 추가시 Array 로 정의
 *  @Uri : 요청 Uri
 *
 */
function sendBatchData(gridId,param, uri){
	//gridId = "#"+gridId;
	var temps = $(gridId).getRowData();
	var body = "{result : [";
	for(i=0; i  <temps.length; i++){
		var temp = temps[i];
			if(temp.change_yn=="Y"){
				body += "{";  
			   for (var oKey in temp) {
				   body += "\""+oKey+"\":\""+trim(temp[oKey])+"\",";
			    }//End of For
			   body = body.substr(0,body.lastIndexOf(","));
			   body += "},";
			}  
	}//End Of For
	body = body.substr(0,body.lastIndexOf(","));
	body += "]}";	
	param["json"] = body;
	
	$.post(uri,param,function(data,status){
		if(status == "success"){
			//alert("ok");
			$(gridId).trigger("reloadGrid");
		}else{
			alert("Server Side Error");
		}
	});	
}
 
/** @#$
 * destoryDatePicker - jquery datepicker 를 비활성화시킨다. - achiz
 * @param id
 * @return
 */
function destroyDatepicker(id){
	
	$input = $("#"+id); 
	// remove still present related DOM objects @#$
	$input.siblings('.ui-datepicker-trigger,.ui-datepicker-apply').remove();
	// remove datepicker object and detach events  @#$
	$input.removeClass('hasDatepicker').removeData('datepicker').unbind();
	$input.attr("class","inputReadOnly").attr("disabled","disabled");
}


// 날짜 기간 설정하여 반환함.
function getCalendarDate(startDate, duration){
	var targetDate;
	if(duration=="0"){
		targetDate = startDate;
	}else{
		targetDate = new Date(Date.parse(startDate)+duration * 1000 * 60 * 60 * 24);
	}
	return targetDate;
}


// 금주 월요일로 세팅
function getMondayOfWeek(standardDate){
	var dayOfWeek = standardDate.getDay();
	if(dayOfWeek == "0"){
		dayOfWeek = 7;
	}
	var duration = 1-dayOfWeek; 
	var returnDate;
	if(duration=="0"){
		returnDate = standardDate;
	}else{
		returnDate = new Date(Date.parse(standardDate)+duration * 1000 * 60 * 60 * 24);
	}
	return returnDate;
}

// 해당일 달의 첫날
function getFirstOfMonth(standardDate){
	var returnDate = standardDate;  
	returnDate.setDate(1);     
	returnDate.setMonth(standardDate.getMonth());
	return returnDate;
}


function centerLayer(strLayerId) {
	 obj_centerLayer = document.getElementById(strLayerId);
	 obj_centerLayer.style.display='';
	 centerLayerMove(strLayerId);
	 
}




//TextArea 개행처리

function textAreaAutoHTML(str){



	$str1=str.replace(/(\r\n|\n|\n\n)/gi,'[split]');
	$str1=$str1.replace(/\'/g,"''");
	$str1 = $str1.split("[split]");
	$result="";
	$.each(

			$str1,function(i){
						if($str1[i]=="")
							$result +="&nbsp;"+"<br/>";
						else
							$result +=""+$str1[i]+""+"<br/>";

	});

	return $result;
};







function centerLayerMove(strLayerId) {
	

	 obj_centerLayer = document.getElementById(strLayerId);
	 
	 var bodyWidth    = document.documentElement.clientWidth; 
	 var bodyHeight    = document.documentElement.clientHeight;
	 
	    var divWidth    = obj_centerLayer.offsetWidth; 
	    var divHeight    = obj_centerLayer.offsetHeight; 
	 
	 if (typeof document.body.style.maxHeight != "undefined") {
	  bodyWidth    = document.body.clientWidth; 
	  bodyHeight    = document.body.clientHeight; 
	  if (!!(window.attachEvent && !window.opera)) { //IE 7 ~
	   pageLeft = document.documentElement.scrollLeft;
	   pageTop = document.documentElement.scrollTop;
	  } else { //FF
	   pageLeft = window.pageXOffset;
	   pageTop = window.pageYOffset;
	  }
	 } else {// IE 6
	  pageLeft = document.documentElement.scrollLeft;
	     pageTop = document.documentElement.scrollTop;
	 }
	
	 

    var divLeft = pageLeft, divTop = pageTop; 

    if(bodyWidth > divWidth) { 
        divLeft = pageLeft + Math.ceil((bodyWidth - divWidth) / 2); 
    }
    
    if(bodyHeight > divHeight) {
        divTop = pageTop + Math.ceil((bodyHeight - divHeight) / 2); 
    } 

    	obj_centerLayer.style.left = divLeft+"px";
    	obj_centerLayer.style.top = divTop+"px";
    if (obj_centerLayer.style.display == '') {
     setTimeout(function() { centerLayerMove(strLayerId);}, 100);
    }
    
   
}


/**
 * 두 날짜의 차이를 일자로 구한다.(조회 종료일 - 조회 시작일)
 *	2011.11.11 MTGi유창근
 * @param val1 - 조회 시작일(날짜 ex.2002-01-01)
 * @param val2 - 조회 종료일(날짜 ex.2002-01-01)
 * @return 기간에 해당하는 일자
 */
function calDateRange(val1, val2)
{
    var FORMAT = "-";

    

    // FORMAT을 포함한 길이 체크
    if (val1.length != 10 || val2.length != 10)
        return null;



    // FORMAT이 있는지 체크
    if (val1.indexOf(FORMAT) < 0 || val2.indexOf(FORMAT) < 0)
        return null;



    // 년도, 월, 일로 분리
    var start_dt = val1.split(FORMAT);
    var end_dt = val2.split(FORMAT);



    // 월 - 1(자바스크립트는 월이 0부터 시작하기 때문에...)
    // Number()를 이용하여 08, 09월을 10진수로 인식하게 함.
    start_dt[1] = (Number(start_dt[1]) - 1) + "";
    end_dt[1] = (Number(end_dt[1]) - 1) + "";



    var from_dt = new Date(start_dt[0], start_dt[1], start_dt[2]);
    var to_dt = new Date(end_dt[0], end_dt[1], end_dt[2]);



    return (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24;
}

$.reSizejqGrid = function(gridId,formId){
	
	
	var gridObj = $("#" + gridId);
	var formObj = $("#" + formId);

	if(gridObj.size() <= 0){
		alert(gridId + " element가 존재하지 않습니다.");
		return;
	}
	
	if(formObj.size() <= 0){
		alert(formId + " element가 존재하지 않습니다.");
		return;
	}
	
	$(window).resize(function(){
		//alert(formObj.width());
		gridObj.jqGrid("setGridWidth",(formObj.width() + 25),true);
	});
};
