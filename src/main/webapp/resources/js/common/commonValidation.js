/*------------------------------------------------------------------------------------------------
 * jQuery usage
 * 
 * 	$(document).ready(function(){  
 *		$(":input[vcheck]").keyup(function(event){langChk(this);});//영문 한글 숫자 체크
 *		var oForm = document.getElementById("form1");//검사하고 싶은 폼 등록
 *		$("#Button1").click(function(){//저장하기전 벨리데이션 검사
 *			alert(validate(oForm));
 *		});
 *	});
 * ---------------------------------------------------------------------------------------------
 * html example
 * 한글 + 숫자
 * <input type="text" id="kr_int" name="kr_int" vcheck="kr int">
 * 
 * validation example
 * N : Null 체크
 * L : 자리수체크
 * X : 맥스값은 구현안했음
 * M : 최소값 체크
 * D : 날짜 타입 체크
 * vleng 속성은 최소값 체크할때 숫자 입력해 줄 것
 * <input type="text" id="test4" name="test4" vname="NLXMD" vleng="3" iden="이름">
 * 
 * -------------------------------------------------------------------------------------
 * <input type="text" id="test4" name="test4" vname="NLXMD" vcheck="eng" vleng="3" iden="이름">
 */	

//마지막 글자 추출
	function lastLan(val){
		var length = val.length;
		var str = val.substr(length-1,length);
		return str;
	}

	/* --------------------------------------------------
	알파벳인지 체크
	------------------------------------------------*/
	function isAlphabet(ch) {
		var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
		if ( 65 <= numUnicode && numUnicode <= 90 ) return true;            // 대문자
		if ( 97 <= numUnicode && numUnicode <= 122 ) return true;            // 소문자
		return false;
	}

	/* --------------------------------------------------
	한글인지 체크
	------------------------------------------------*/
	function isKorean(ch) {
		var numUnicode = ch.charCodeAt(0);
		if ( 44032 <= numUnicode && numUnicode <= 55203 || 12593 <= numUnicode && numUnicode <= 12643 ) return true;            
	return false;
	}

	/* --------------------------------------------------
	숫자인지 체크
	------------------------------------------------*/
	/*function isNumber(ch) {
		var numUnicode = ch.charCodeAt(0);                                                                              
		if ( 48 <= numUnicode && numUnicode <= 57 ) return true;            
		return false;
	}
	*/
	
	  /**
	   * 오직 숫자로만 이루어져 있는지 체크 한다.
	   *
	   * @param	num
	   * @return	boolean
	   */
	  function isNumber2(num) {
	    re = /[0-9]*[0-9]$/;
	    if (re.test(num)) {
	      return	true;
	    }
	    return	false;
	  }

	function langChk(attribute){
		//javascript indexOf 0부터 시작
		var rule =  attribute.vcheck;
		var value = attribute.value;
		var str = lastLan(value);
		var chk = false;	
		if(rule != ""){
			if(rule.indexOf("en") < 0 && !chk && str){
				chk = isAlphabet(str);
			}
			if(rule.indexOf("int") < 0 && !chk && str){
				chk = isNumber(str);
			}
			if(rule.indexOf("kr") < 0 && !chk && str){
				chk = isKorean(str);
			}
		}
		
		if(chk){
			alert('형식에 맞는 문자 및 숫자만 입력가능합니다.');
			attribute.value = "";
		}
	}
	
	
	/**
	 * trim
	 * @param	text
	 * @return	string
	 */
	function trim(text) {
	  if(text == null)
	    return;
	  if (text == "") {
	    return	text;
	  }
	  var len = text.length;
	  var st = 0;
	  while ((st < len) && (text.charAt(st) <= ' ')) {
	    st++;
	  }
	  while ((st < len) && (text.charAt(len - 1) <= ' ')) {
	    len--;
	  }
	  return	((st > 0) || (len < text.length)) ? text.substring(st, len) : text;
	}
	
	function nullCheck(obj){//널체크
		var value = obj.value;
		if(value == "" || value == null){	
			var attribute = obj.getAttribute("iden");
			alert(attribute + " 항목을 입력해 주십시요.");
			obj.focus();	
			return false;
		}
		return true;
	}
	
	function lengthCheck(obj){//자리수 체크
		var value = obj.value;
			if(value.length <= 1){
				var attribute = obj.getAttribute("iden");
				alert(attribute +  " 항목을 1자이상 입력해 주십시요.");
				obj.focus();
				return false;
			}
		return true;
	}
	
	function maxCheck(obj){//맥스값 체크 구현안함 차후 다른목적으로 사용하기위해 냅둔다
		var value = obj.value;
		return true;
	}
	
	function minCheck(obj){//최소값 체크
		var value = obj.value;
		var attribute = obj.getAttribute("iden");
		var oleng = parseInt(obj.getAttribute("vleng"));
			//alert(attribute + " : " + oleng);		
		if(oleng == null || oleng == "" || isNaN(oleng)){
			alert(attribute + " input 타입에 vleng='최소값' <-속성을 추가하여주십시요. ");
			obj.focus();
			return false;
		}else{
		  if(value.length < oleng){
			alert(attribute + " 항목은 최소 " + oleng + " 자 이상 입력하셔야 합니다.");
			return false;	
		  }
		}	
		return true;
	}
	
	
	function dateCheck(obj){//날짜 형식체크
		var value = obj.value;
		var attribute  = 	obj.getAttribute("iden");

	    if (value == "" || value == null || value.length != 8) {
	    	alert(attribute +  " 항목에 - 없이 8자리 숫자를 입력해 주십시요.");
	    	obj.focus();
	        return	false;
	      }
		
			if(!isNumber2(value)){
				alert(attribute +  " 항목을 숫자로만 입력해 주십시요.");
				obj.focus();			
				return false;
			}
		
		 	var year = eval(value.substring(0, 4));
		    var month = eval(value.substring(4, 6));
		    var day = eval(value.substring(6, 8));

		    if (month > 12) {
			    alert("월이 12월달을 넘어갈수 없습니다.");
			    obj.focus();
		      return	false;
		    }

		    var totalDays;

		    switch (eval(month)){
				
		      case 1 :
		        totalDays = 31;
		        break;
		      case 2 :
		        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
		          totalDays = 29;
		        else
		          totalDays = 28;
		        break;
		      case 3 :
		        totalDays = 31;
		        break;
		      case 4 :
		        totalDays = 30;
		        break;
		      case 5 :
		        totalDays = 31;
		        break;
		      case 6 :
		        totalDays = 30;
		        break;
		      case 7 :
		        totalDays = 31;
		        break;
		      case 8 :
		        totalDays = 31;
		        break;
		      case 9 :
		        totalDays = 30;
		        break;
		      case 10 :
		        totalDays = 31;
		        break;
		      case 11 :
		        totalDays = 30;
		        break;
		      case 12 :
		        totalDays = 31;
		        break;
		    }
		    if (day > totalDays) {
			   alert("날짜 형식이 잘못되었습니다 다시 입력하여 주십시요.");
			   obj.focus();
		      return	false;
		    }
		    return	true;
	}
	
	/**
	 * 유창근
	 * @param form
	 * @return
	 */
	function validate(form){
		var chk = true;//체크 플레그 변수
		var obj;//각 엘리먼트의 Object 를 담을 변수 선언
			for (i = 0; i < form.elements.length; i++) {
				obj = form.elements(i);//각각의 엘리먼트를 얻어낸다
				if(obj.getAttribute("vname") != null && obj.getAttribute("vname") != ""){
					var charchk = obj.getAttribute("vname");
					for(var j = 0; j < charchk.length; j++){
						var oval = charchk.charAt(j).toUpperCase();//대문자로 치환
						//alert(i +" = " + obj.value + " = "  + oval);
						if(oval =="N"){//널체크
							if(nullCheck(obj) == false) return false;
						}else if(oval =="L"){//자리수체크
							if(lengthCheck(obj) == false) return false;
						}else if(oval =="X"){//최대값체크 사용안함 일단은 냅두기로 결정 차후 다른목적으로 사용할지 몰라서
							if(maxCheck(obj)==false) return false;
						}else if(oval =="M"){//최소값체크
							if(minCheck(obj) == false) return false;
						}else{//날짜체크
							if(dateCheck(obj) == false) return false;
						}	
					}
				}	
			}
		return true;
	}
	/**
	 * 유창근
	 * 비밀번호 문자숫자 조합
	 * @return
	 */
	function passWordCharAndNumber(p){
		 var   chk1 = /^[a-z\d]{8,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
		 var   chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
		 var   chk3 = /\d/;  //적어도 한개의 0-9 확인
	return chk1.test(p) && chk2.test(p) && chk3.test(p);
	}
	
	
/**
 *  Email Check - Achiz
 * 
 */
function email_chk(oo){

	  var t = escape(oo);
	  if(t.match(/^([0-9a-zA-Z_-_.]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/) == null){
	     //alert("이메일을 올바르게 입력해 주세요.");
	    //$(oo).val("");
	   // $(oo).focus();
	    return false;

	  } 
	  return true;

}
	



/**
 *  form input text-> Special Character Check - Achiz
 */
function Check_SChar(evnt) 
{ 
	var k_code = event.keyCode ; 
	//alert(k_code);
	if ( 
			// k_code == 96 || // ` 96 
			k_code == 33 || // ! 33 
			k_code == 64 || // @ 64 
			k_code == 35 || // # 35 
			k_code == 36 || // $ 36 
			k_code == 37 || // % 37 
			k_code == 94 || // ^ 94 
			k_code == 38 || // & 38 
			k_code == 42 || // * 42 
		    k_code == 40 || // ( 40 
			k_code == 41 || // ) 41 
			k_code == 95 || // _ 95 
			k_code == 43 || // + 43 
			k_code == 92 || // \ 92 
			k_code == 124 || // | 124 
			k_code == 34 || // " 34 
			k_code == 39  ||// ' 39 
			k_code == 62  || // > 62 
			k_code == 47  || // > 62 
			k_code == 44  || // > 62 
			k_code == 59  ||
			k_code == 58  
	) 
	{ 
	//alert("특수문자는 입력할수 없습니다."); 
	event.returnValue = false; 
	} 
} 

/**
 *  form input text -> only null check    - achiz
 *  (input attribute 에  isNull 과 nullName 을 추가) 
 *  isNull="false" 일때만 NullCheck 
 *  nullName : alert 경고창에 나올 키워드 문구
 * 
 */
function textNullCheckForm(oForm){
	
	var bool = true;
	var msg = "";
	
	$(oForm).find("input:text").each(function(){
		
		if($(this).attr("isNull") == "false"){

			if($(this).val() == ""){
				msg += $(this).attr("nullName") +",";
				bool = false;
			}
		};

	});
	var mmsg = msg.substring(0, msg.length-1);
	if(!bool){
		alert(mmsg + " 을(를) 입력해 주세요");
	}
	return bool;
}


/**
 * 
 *  form input text -> only number check - achiz
 * 
 */
function onlyNumber() 
{ 
if ( ( (96<=event.keyCode) && (event.keyCode<=105) ) || 
		( (48<=event.keyCode) && (event.keyCode<=57) ) || 
		(event.keyCode==8) || 
		(event.keyCode==37) || 
		(event.keyCode==39) || 
		(event.keyCode==13) || 
		(event.keyCode==9)	||
		(event.keyCode==46)	||
		(event.keyCode==16)	||
		(event.keyCode==17)	||
		(event.keyCode==18)	||
		(event.keyCode==21)	
	) 
{ 

	event.returnValue=true;  
} 
else 
{ 
	
	//alert("숫자만 입력 가능합니다");
	event.returnValue=false; 
} 
} 


function onlyfloat()
{
	if( ((48<=event.keyCode) && (event.keyCode<=57)) //기본 숫자키
			||((96<=event.keyCode) && (event.keyCode<=105))	//오른쪽 숫자키
			|| (event.keyCode==8)  //백스페이스
			|| (event.keyCode==9)	//탭
			|| (event.keyCode==27)	//ESC
			|| (event.keyCode==37)	//왼쪽
			|| (event.keyCode==38)	//위
			|| (event.keyCode==39)	//오른쪽
			|| (event.keyCode==40)	//아래
			|| (event.keyCode==46)	//Delete
			|| (event.keyCode==190)	// .(온점)
			|| (event.keyCode==110)	// .(온점) (숫자키 안에 온점)
	)
	{ 
		event.returnValue=true;  
	} 
	else 
	{ 
		//alert(event.keyCode); //아스키 코드표대로 KeyCode가 안나온다... 요렇게 alert찍어보면 원하는 키에 대한 코드값이 나옴  
		//alert("숫자만 입력 가능합니다");
		event.returnValue=false; 
	} 
}

/**
 * 
 *  form input text -> only decimal check - achiz
 * 
 */
function onlyDecimal(obj)
{ 
	
	  var val = obj.value;
      var re = /[^0-9|.]/gi;
      obj.value = val.replace(re, '');
      
      var split = val.split(".");
      if(split.length > 2) {  //콤마 1개 이상 못들어오도록.
       obj.value = val.substr(0,val.length-1);
      }
      if(split[1] != null){   //소수점 아래 한자리 넘지못하도록.
       if(split[1].length > 2) {
        obj.value = val.substr(0,val.length-1);
       }
      }
      //if(!(parseInt(parseFloat(obj.value)*10) < 1000000000)){   //값을 1000이하로 제한
      // obj.value = "";
      //}

} 
	

/**
 * 천단위 음수 . 소숫점
 * 
 * @param obj
 */
function vComma(obj) {
	var str = "" + obj.value.replace(/,/gi,''); // 콤마 제거
	var regx = new RegExp(/(-?\d+)(\d{3})/);
	var bExists = str.indexOf(".",0);
	var strArr = str.split('.');
	while(regx.test(strArr[0])){
	strArr[0] = strArr[0].replace(regx,"$1,$2");
	}
	
	if (bExists > -1){
		
		  if(strArr[1].length > 2) {
			  obj.value = strArr[0] + "." + strArr[1].substr(0,strArr[1].length - 1);
		  }
		
	}else{
		obj.value = strArr[0];
	}
}


/**
 *  최대길이 (MaxLength Check) - achiz
 * @param object
 * @param iMax
 * @return
 * 
 * ex: <input type="text" class="text_wl"  name="txt_EmployeeNO" MAXLENGTH=10  onkeyup="calBytes(this,10)" value="">
 */ 
function calBytes(object,iMax)
{
	var iCount = 0;    // 길이 
	var sVal = new String(object.value);    //값
	var iLen = sVal.length;    //현재 길이
	
	var oChar;
	for ( i=0; i<iLen; i++ )
	{
	  oChar = sVal.charAt(i);
	  if (escape(oChar).length > 4)
	    iCount += 2;
	  else
	    iCount += 1;
	}
	if (iCount>iMax){    //최대 길이 비교
	     alert("현재 자릿수를 초과 하셨습니다"); 
	     object.value=sVal.substring(0,iLen-1);
	     object.focus();
	}
}

/**
 * Input Radio -- Readonly 모드 - Achiz
 * @param e
 * @return
 */

function getSrc(e){
	return e? e.target || e.srcElement : event.srcElement;
}

/**
 * yck
 * 숫자체크 jQUery
 * @param object
 * @return
 */
function inputNumber(object){
	if ( (!( 48 <= event.keyCode && event.keyCode <= 57 )) && (!( 96 <= event.keyCode && event.keyCode <= 105 )) && (event.keyCode != 9) ){
		if(event.keyCode != 8 && event.keyCode != 13 && event.keyCode != 37 && event.keyCode != 39){
			//alert("숫자만 입력가능합니다.");
			if(isNaN(parseInt(object.val()))){
				object.val("");
			}else{
				object.val(parseInt(object.val()));
			}
			object.focus();	  
		}
	}
}

/**
 * yck
 * @param from
 * @param to
 * @return
 * 배열 요소 삭제
 * example : 
 * var arr = new Array();
 * arr[0] = "hello0";
 * arr[1] = "hello1";
 * arr[2] = "hello2";
 * arr.remove(0,arr.length);
 */

Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
	};

function number_format(numstr) {
	  var numstr = String(numstr);
	  var re0 = /(\d+)(\d{3})($|\..*)/;
	  if (re0.test(numstr))
	    return numstr.replace(
	      re0,
	      function(str,p1,p2,p3) { return number_format(p1) + "," + p2 + p3; }
	    );
	  else
	    return numstr;
}




