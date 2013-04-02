/* -------------------------------------------------------------------- */
/* ********************** 공통 사용하는 script 함수들 ********************** */
/* -------------------------------------------------------------------- */
/**
 * 모든 스트립트 함수들의 셈플은 sample.excelDownloadSample.view 페이지에서 확인하실수있습니다.
 */
/* ********************** 숫자처리 관련 ********************** */
	/**
	 * 숫자에 comma를 붙인다.
	 *
	 * @param	str <--12345.67890
	 * return 12,345.67890
	 */
	function addComma(str){
		var ori_str = str;
		var conv1_str = deleteCommaStr(ori_str);
		var conv2_str = addCommaStr(conv1_str);
		return conv2_str;
	}

	/**
	 * 숫자에 comma를 붙인다.
	 *
	 * @param	str
	 */
	function addCommaStr(str) {
		var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
	    var arrNumber = str.split('.');
	    arrNumber[0] += '.';
	    do {
	        arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
	    } while (rxSplit.test(arrNumber[0]));
	
		if (arrNumber.length > 1) {
	      	replaceStr = arrNumber.join("");
	    } else {
	       	replaceStr = arrNumber[0].split(".")[0];
	    }
	    return replaceStr;
	}

	/**
	 * 숫자에서 comma를 없앤다.
	 *
	 * @param	str
	 */
	function deleteCommaStr(str) {
		var temp = '';
	
	   	for (var i = 0; i < str.length; i++) {
	     	if (str.charAt(i) == ',') {
	       	continue;
	     	} else {
	       	temp += str.charAt(i);
	     	}
	   	}
	
	   return	temp;
	 }	
	/* ********************* 숫자처리 관련 끝 ********************* */
	
	
	/* ********************** 날짜처리 관련 ********************** */
	/**
	 * 날짜에 "-"를 붙인다.
	 *
	 * @param	str <--yyyymmdd 형식의 문자열.
	 * return yyyy-mm-dd
	 */
	function addDateFormat(str){
		var ori_str = str;
		
		if (ori_str.length < 8) {
			return "";
		}else{
			if(str){
				var conv1_str = deleteDateFormatStr(ori_str);
				var conv2_str = addDateFormatStr(conv1_str);
			
				return conv2_str;
			}else{
				return "";
			}
		}
	}	
	/**
	 * 날짜에서 "-"를 없앤다.
	 *
	 * @param	str
	 */
	function deleteDateFormatStr(str) {
		var temp = '';

		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == '-') {
				continue;
			} else {
				temp += str.charAt(i);
			}
		}

		return	temp;
	}	
  
	/**
	 * 날짜에 "-"를 붙인다.
	 *
	 * @param	str
	 */
	function addDateFormatStr(str) {
		return	str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
	}	  
	  
	
	/**
	 * MTGi유창근
	 * 기준날짜에서 경과기간을 더한 후 yyyy-mm-dd 형식으로 리턴함.
	 * @param1 : 20100621
	 * @param2 : 3 <-더할 날짜를 의미
	 * return 2011-06-24
	 */
	function addDay(ymd, v_day){
	    var yyyy = ymd.substr(0,4);
	    var mm = eval(ymd.substr(4,2) + "- 1") ;
	    var dd = ymd.substr(6,2);

	    var dt3 = new Date(yyyy, mm, eval(dd + '+' + v_day));

	    yyyy = dt3.getYear();
	    mm = (dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	    dd = dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();

	    return  "" + yyyy + "-" + mm + "-" + dd ;
			
	}
	
	
	/**
	 * 해당년월의 마지막 날짜를 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : 2010 <--년도
	 * @param2 : 6 <--월
	 * return : 30 <--해당 년월의 마지막 일.
	 */
	function lastDay(yyyy,mm){
		var lastDay = new Date((new Date(yyyy, mm,1))-1).getDate();
		return lastDay;
	}
	/* ********************* 날짜처리 관련 끝 ********************* */
	
	
	
	/* ********************* 문자열 대소문자 처리 관련 ********************* */
	/**
	 * 문자열을 대문자로 변환 후 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : abcd123ef
	 * return : 30
	 */
	function upperStr(str){
		return str.toUpperCase();
	}
	/**
	 * 문자열을 소문자로 변환 후 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : 2010 <--년도
	 * return : 30
	 */
	function lowerStr(str){
		return str.toLowerCase();
	}
	/* ********************* 문자열 대소문자 처리 관련 끝 ********************* */
	
	
	/* ********************* 이메일 처리 관련 ********************* */
	/**
	 * 문자열이 이메일 형식인지 확인.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : str
	 * return : boolean (true, false) <--형식에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	function isEmail(str) {
		var supported = 0;
		if (window.RegExp) {
		var tempStr = "a";
		var tempReg = new RegExp(tempStr);
		
		if (tempReg.test(tempStr)) supported = 1;
		}
		if (!supported) 
			return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
			
		var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
		var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
		return (!r1.test(str) && r2.test(str));
		}
	/* ********************* 이메일 처리 관련 끝 ********************* */
	
	
	/* ********************* 주민등록번호 처리 관련 ********************* */
	/**
	 * 주민등록번호폼인지 확인 및 주민등록번호 진위여부 검사.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : str <--1111111111117 참,111111-1111117 거짓, 1234561234567 거짓
	 * return : boolean (true, false) <--형식과 검사 결과에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	function jumin(str) {
		if( str.charAt(6) == 1 || str.charAt(6) == 2 ){
			if( str.charAt(12) ==	(( 11 - ((str.charAt(0)*2+str.charAt(1)*3+str.charAt(2)*4
					+str.charAt(3)*5+str.charAt(4)*6+str.charAt(5)*7
					+str.charAt(6)*8+str.charAt(7)*9+str.charAt(8)*2
					+str.charAt(9)*3+str.charAt(10)*4+str.charAt(11)*5)
					% 11)))%10)
				return true;
		}
		return false;
	}
	/* ********************* 주민등록번호 처리 관련 끝 ********************* */

	
	/* ********************* 문자열 문자 구성 검사 관련 ********************* */
	/**
	 * 문자열이 알파벳 대소문자와 숫자로만 구성되어있는지검사하고 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : str <--
	 * return : boolean (true, false) <--검사 결과에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	function isABCNum(str) {

		var abcNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
		for (i=0; i < str.length; i++) {
	        if (abcNum.indexOf(str.substring(i,i+1))<0) {
				return false;
			}
	       
		}

		return true;
	}
	/**
	 * 문자열이 숫자로만 구성되어있는지검사하고 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : str
	 * return : boolean (true, false) <--검사 결과에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	function isNum(str) {
		for(var i=0;i<str.length;i++){
			achar = str.substring(i,i+1);
			if( achar < "0" || achar > "9" ){
				return (false);
			}
		}
		return true;
	}
	/**
	 * 입력받은 obj의 이벤트 키코드가 숫자인지 검사하고 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : obj <--
	 * return : boolean (true, false) <--검사 결과에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	function onlyNum(obj)
	{
		if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8 || event.keyCode == 45 || event.keyCode == 46 ) {
			alert("true");
		} else {
			alert("false");
			event.returnValue = false;
		}
	}
	
	/**
	 * 입력받은 obj의 이벤트 키코드가 숫자 '-' 문자인지 검사하고 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : obj <--
	 * return : boolean (true, false) <--검사 결과에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	function onlyNumDecimal()
	{
		if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8 || event.keyCode == 45 || event.keyCode == 46 || event.keyCode == 189 ) {
			event.returnValue = true;
		} else {
			alert("숫자만 입력이 가능합니다.");
			event.returnValue = false;
		}
	}
	
	/* ********************* 문자열 문자 구성 검사 관련 끝 ********************* */
	
	
	/* *********************  checkBox 검사 관련 ********************* */
	/**
	 * 입력받은 obj의 checkBox가 선택되어있는지 검사하고 리턴함.
	 * @author yj.park 2010.6.21
	 * 
	 * @param1 : obj <--
	 * return : boolean (true, false) <--검사 결과에 따라 참이면 true, 거짓이면 false 를 리턴함.
	 */
	/*function hasCheckBox(obj) {
	    if (obj.length > 1) {
	        for (var inx = 0; inx < obj.length; inx++) {
	            if (obj[inx].checked) return true;
	        }
	    } else {
	        if (obj.checked) return true;
	    }
	    return false;
	}*/
	/* ********************* checkBox 검사 관련 끝 ********************* */
	
	
	
	
	
	
	
	

//3자리마다 콤마~
function comma(comma_rstr) {
    var nocomma = comma_rstr.value.replace(/,/gi,''); // 불러온 값중에서 컴마를 제거 
    var b = ''; // 값을 넣기위해서 미리 선언 
    var i = 0; // 뒤에서 부터 몇번째인지를 체크하기 위한 변수 선언 
    for (var k=(nocomma.length-1); k>=0; k--) { // 숫자를 뒤에서 부터 루프를 이용하여 불러오기 
        var a = nocomma.charAt(k); 
        if (k == 0 && a == 0) {  // 첫자리의 숫자가 0인경우 입력값을 취소 시킴 
            comma_rstr.value = ''; 
            return; 
        } 
        else { 
            if (i != 0 && i % 3 == 0) { // 뒤에서 3으로 나누었을때 나머지가 0인경우에 컴마 찍기 i가 0인 경우는 제일 뒤에 있다는 것이므로 컴마를 찍으면 안됨 
                b = a + "," + b ; 
            } 
            else { // 나머지가 0인 아닌경우 컴마없이 숫자 붙이기 
                b = a + b; 
            } 
            i++;
        } 
    } 
    comma_rstr.value = b; // 최종값을 input값에 입력하기 
    return; 
} 


// 전화번호 관련 포멧 
// 핸드폰 000-000-0000, 000-0000-0000
// 전화번호 02-000-0000, 02-0000-0000, 000-0000-0000 
function tel_num(telnum){

	var notelnum = telnum.value.replace(/-/gi,'');
	var tel_num;
	//+'-'+
	if(notelnum.length == 11)
	{
		tel_num = notelnum.substring(0,3)+'-'+notelnum.substring(3,7)+'-'+notelnum.substring(7,11);
	}
	else if(notelnum.length == 10 && notelnum.substring(0,2) == '02')
	{
		tel_num = notelnum.substring(0,2)+'-'+notelnum.substring(2,6)+'-'+notelnum.substring(6,10);
	}
	else if(notelnum.length == 10 && notelnum.substring(0,2) != '02')
	{
		tel_num = notelnum.substring(0,3)+'-'+notelnum.substring(3,6)+'-'+notelnum.substring(6,10);
	}
	else if(notelnum.length == 9)
	{
		tel_num = notelnum.substring(0,2)+'-'+notelnum.substring(2,5)+'-'+notelnum.substring(5,9);
	}
	else
		tel_num = notelnum;
		
	telnum.value = tel_num;
}

function date_num(datenum){
	
	//isValidDate(datenum); //윤년
	
	var nodatenum = datenum.value.replace(/-/gi,'');
	var date_num;
	
	if(nodatenum.length == 8)
	{
		date_num = nodatenum.substring(0,4)+'-'+nodatenum.substring(4,6)+'-'+nodatenum.substring(6,8);
	}
	else
		date_num = nodatenum;
	
	datenum.value = date_num;
}


/**
 *  selectallText
 * 
 */
function selectAllText(textbox) {
    textbox.focus();
    textbox.select();
}


/**
 * MTGI 유창근
 * jqGrid 관련 공통 포맷터.. 
 */      
//전화 번호 관련 공통 포맷..
//0222475555 -> 02-2247-5555
//0113403835 -> 011-340-3835
//01073185555 -> 010-7318-5308

function phone_format(cellvalue, options, rowObject){
	//log(cellvalue + " : " + " : " + options + " : " + rowObject);
	var value = cellvalue;
	deleteDateFormatStr(value);
	return value.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}




//년도를 콤보박스로 만들어 준다..
//구분자가 아무것도 없으면 현재 년도를 기본으로 전후 30년까지 생성
//year : 기본 선택 년도
//gbn1 : 보여줄 전후 년도
//gbn2 : 전후 구분 ('B' : 기준년도 이전 년도만, 'A' : 기준년도 이후 년도만) 
function comboYear(year, gbn1, gbn2){
	var str_combo = "";
	var yyyy;
	var yy_between;
	var year_from = 0;
	var year_to = 0;
	
	if(year && year != ''){
		yyyy = year;
	}else{
	    var dt3 = new Date();
	    yyyy = dt3.getFullYear();
	}

	if(gbn1){
		yy_between = gbn1;
	}else{
		yy_between = 30;
	}

	if(!gbn2){
		year_from = Number(yyyy) - Number(yy_between);
		year_to = Number(yyyy) + Number(yy_between);
	}else if(gbn2 == 'B'){
		year_from = Number(yyyy) - Number(yy_between);
		year_to = Number(yyyy);			
	}else if(gbn2 == 'A'){
		year_from = Number(yyyy);
		year_to = Number(yyyy) + Number(yy_between);
	}
	
	for (i = year_from; i < year_to + 1; i ++){
		if(i == yyyy){
			str_combo = str_combo + "<option value='"+i+"' selected>"+i+"</option>";
		}else{
			str_combo = str_combo + "<option value='"+i+"'>"+i+"</option>";
		}
	}

	return str_combo;
} 

//월을 콤보박스로 만들어 준다..
//구분자가 아무것도 없으면 현재 월을 기준으로 선택
//month : 기본 선택 월
//gbn1 : 자릿수 여부 ('Y'이면 1월을 01로 표시)

function comboMonth(month, gbn1){
	var str_combo = "";
	var mm;
	var mm_val;
	var value;
	if(month && month != ''){
		mm = month;
	}else{
		var dt3 = new Date();
		mm = dt3.getMonth()+1;	
	}

	for (i = 1; i < 13; i ++){
		if(gbn1 == 'Y'){
			value = i < 10 ? "0" + i : i;
			mm_val = i < 10 ? "0" + i : i;
		}else{
			value = i;
			mm_val = i;
		}
		
		if(value == mm){
			str_combo = str_combo + "<option value='"+value+"' selected>"+mm_val+"</option>";
		}else{
			str_combo = str_combo + "<option value='"+value+"'>"+mm_val+"</option>";
		}
	}
	return str_combo;
}	


/*
 * 날짜포맷에 맞는지 검사
 */
function isDateFormat(d) {
    var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
    return d.match(df);
}

/*
 * 윤년여부 검사
 */
function isLeaf(year) {
    var leaf = false;

    if(year % 4 == 0) {
        leaf = true;

        if(year % 100 == 0) {
            leaf = false;
        }

        if(year % 400 == 0) {
            leaf = true;
        }
    }

    return leaf;
}

/*
 * 날짜가 유효한지 검사
 */
function isValidDate(d) {
    // 포맷에 안맞으면 false리턴
    if(!isDateFormat(d)) {
        return false;
    }

    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var dateToken = d.split('-');
    var year = Number(dateToken[0]);
    var month = Number(dateToken[1]);
    var day = Number(dateToken[2]);
    
    // 날짜가 0이면 false
    if(day == 0) {
        return false;
    }

    var isValid = false;

    // 윤년일때
    if(isLeaf(year)) {
        if(month == 2) {
            if(day <= month_day[month-1] + 1) {
                isValid = true;
            }
        } else {
            if(day <= month_day[month-1]) {
                isValid = true;
            }
        }
    } else {
        if(day <= month_day[month-1]) {
            isValid = true;
        }
    }

    return isValid;
}



