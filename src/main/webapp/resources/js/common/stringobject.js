/**
	표인환 suf neomodule 유창근


//  +----------------------------------+
//  |  String 관련 prototype function  |
//  +----------------------------------+
*/

/**
 * String.trim() method 구현
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
};


/**
 * String.ltrim() method 구현
 */
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
}


/**
 * String.rtrim() method 구현
 */
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
}


/**
 * String.lpad() method 구현
 */
String.prototype.lpad = function(padLength, padChar) {
    padChar = padChar == null ? " " : padChar;
    var result = "";
    for (var i = 0, n = padLength - this.byteLength(); i < n; i++) {
        result += padChar;
    }

    return result + this;
};


/**
 * String.rpad() method 구현
 */
String.prototype.rpad = function(padLength, padChar) {
    padChar = padChar == null ? " " : padChar;
    var result = this;
    for (var i = 0, n = padLength - this.byteLength(); i < n; i++) {
        result += padChar;
    }

    return result;
};


/**
 * String.replaceAll(from, to) method 구현
 */
String.prototype.replaceAll = function(from, to) {
	return this.replace(new RegExp(from, "g"), to); 
};


/**
 * String.removeAll(ch) method 구현
 */
String.prototype.removeAll = function(ch) {
	return this.replaceAll(ch, "");
}


/**
 * String.reverse() method 구현
 */

String.prototype.reverse = function() {
	var result = "";
	var i = this.length;

	while (i > 0) {
		result += this.charAt(--i);
	}

	return result;
}

/**
 * String.byteLength() method 구현
 */
String.prototype.byteLength = function() {
    var result = 0;
    for (var i = 0; i < this.length; i++) {
        var chr = escape(this.charAt(i));
        if (chr.length == 1 ) {
            result++;
        } else if (chr.indexOf("%u") != -1) {
            result += 2;
        } else if (chr.indexOf("%") != -1) {
            result += chr.length / 3;
        }
    }
    return result;    
}


/**
 * String.byteIndexOf() method 구현
 */
String.prototype.byteIndexOf = function(chr) {
    var idx = this.indexOf(chr);
    if (idx == -1) {
        return idx;
    } else {
        return this.substring(0, idx).byteLength();
    }
}


/**
 * String.substringByte() method 구현
 */
String.prototype.substringByte = function (start, end) {
    var result = "";

    var preByte = 0;
    var curByte = 0;

    for (var i = 0; i < this.length; i++) {
        var chr = this.charAt(i);
        
        preByte = curByte;
        curByte += chr.byteLength();
        
        if (preByte >= start && curByte <= end) {
            result += chr;
        } else if (curByte > end) {
            break;
        }
    }

    return result;
}


/**
 * String.substrByte() method 구현
 */
String.prototype.substrByte = function(start, length) {
    return this.substringByte(start, start + length);
}

/**
 * String.defaultString() method 구현
 * description : String 값이 "" 이면 def를 반환
 */
String.prototype.defaultString = function(def) {
	return this.trim() == "" ? def : this;
}


/**
 * String.toInt() method 구현
 */
String.prototype.toInt = function() {
    return this.trim() == "" ? 0 : parseInt(this.trim(), 10);
}


/** 
 * String.toHex() method 구현 : 16진수 구하기
 */
String.prototype.toHex = function() {
    return this.toRadix(16);
}


/** 
 * String.toRadix() method 구현 : radix 진수 구하기
 */
String.prototype.toRadix = function(radix) {
    return Number(this).toString(radix).toUpperCase();
}


/**
 * String.isEmpty() method 구현
 */
String.prototype.isEmpty = function() {
    return this.trim().length == 0;
}


/**
 * String값을 Number type으로 반환
 */
String.prototype.toNumber = function() {
	return Number(this.unmask("real"));
}


/**
 * String값을 Date 객체로 반환
 */
String.prototype.toDate = function() {
	var sDate = this.unmask("date");
	var iYear = sDate.substr(0, 4).toNumber();
	var iMonth = sDate.substr(4, 6).defaultString("0").toNumber() - 1;
	var iDate = sDate.substr(6, 4).defaultString("1").toNumber();

	return new Date(iYear, iMonth, iDate);
}


/**
 * String.isDigit() method 구현
 */
String.prototype.isDigit = function() {
    if (this.isEmpty()) {
        return true;
    }

    return this.search(/^\d+$/) != -1;
}

/**
 * String.isInt() method 구현
 */
String.prototype.isInt = function() {
    if (this.isEmpty()) {
        return true;
    }

    return this.search(/^(?:\-?|\+?)\d+$/) != -1;
}

/**
 * String.isDouble() method 구현
 */
String.prototype.isDouble = function(dec,frac) {
    if (this.isEmpty()) {
        return true;
    }
    oriStr  = this.removeAll(",");
    if (oriStr.indexOf(".") >= 0) {
        decStr  = oriStr.substring(0,oriStr.indexOf("."));
        fracStr = oriStr.substring(oriStr.indexOf(".")+1);
    } else {
        decStr  = oriStr;
        fracStr = "";
    }
    if (dec < decStr.length || frac < fracStr.length) return false;
    
    return !isNaN(this); // 구현예정. 시간이 없어 일단 이렇게 한다.
}

/**
 * String.isNumber() method 구현
 */
String.prototype.isNumber = function() {
    if (this.isEmpty()) {
        return true;
    }

    return !isNaN(this);
}


/**
 * String.isCardNo() method 구현 - 카드번호
 */
String.prototype.isCardNo = function() {
    if (this.isEmpty()) {
        return true;
    }

    return this.search(/^\d{4}\-?\d{4}\-?\d{4}\-?\d{4}$/) != -1;
}



/**
 * String.isIdNo() method 구현 - 주민등록번호
 */
String.prototype.isIdNo = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^\d{6}\-?\d{7}$/) == -1) {
        return false;
    }
    
    var sRegNo = this.removeAll("-");
    var iSum   = 0;
	for (var i = 0; i < sRegNo.length - 1; i++) {
	    iSum += (sRegNo.charAt(i) * (i % 8 + 2));
    }

    return sRegNo.charAt(12) == (11 - iSum % 11) % 10;
}



/**
 * String.isBizNo() method 구현 - 사업자등록번호
 */
String.prototype.isBizNo = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^\d{3}\-?\d{2}\-?\d{5}$/) == -1) {
        return false;
    }

    var sBizNo = this.removeAll("-");
    var aCheckNo = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var iSum = 0;

    for (var i = 0; i < sBizNo.length; i++) {
        iSum += sBizNo.charAt(i) * aCheckNo[i] % 10;

        if (i == 8) {
            iSum += Math.floor(sBizNo.charAt(i) * aCheckNo[i] / 10);
        }
    }

    return iSum % 10 == 0;
}


/**
 * String.isCorpNo() method 구현 - 법인등록번호
 */
String.prototype.isCorpNo = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^\d{6}\-?\d{7}$/) == -1) {
        return false;
    }

    var sCorpNo = this.removeAll("-");
    var iSum = 0;

    for (var i = 0; i < sCorpNo.length - 1; i++) {
        iSum += (sCorpNo.charAt(i) * (i % 2 + 1));
    }

    return sCorpNo.charAt(12) == (10 - iSum % 10);
}




/**
 * String.isZipNo() method 구현 - 우편번호
 */
String.prototype.isZipNo = function() {
    if (this.isEmpty()) {
        return true;
    }

    return this.search(/^\d{3}\-?\d{3}$/) != -1;
}


/**
 * String.isPhoneNo() method 구현 - 전화번호
 */
String.prototype.isPhoneNo = function() {
    if (this.isEmpty()) {
        return true;
    }

    return this.search(/^(?:0\d{1,2}\-?\d{2,4}|\d{2,4})\-?\d{4}$/) != -1;
}

/**
 * String.isYMD() method 구현 - 날짜
 * 구분자 => / or - or .
 */
String.prototype.isYMD = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^(\d{4})[\/|\-|.]?(\d{2})[\/|\-|.]?(\d{2})$/) == -1) {
        return false;
    }
    
    var lastDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (RegExp.$2 > 12 || RegExp.$2 < 01) {
        return false;
    }
    
    if (RegExp.$3 > lastDays[RegExp.$2 - 1] || RegExp.$3 < 01) {
        return false;
    }

    if (RegExp.$2 == 2 
            && RegExp.$3 > 28
            && (RegExp.$1 % 4 != 0 || (RegExp.$1 % 100 == 0 && RegExp.$1 % 400 != 0))) { 
        return false;
    }

    return true;
}



/**
 * String.isYM() method 구현 - 날짜
 * 구분자 => / or - or .
 */
String.prototype.isYM = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^(\d{4})[\/|\-|.]?(\d{2})$/) == -1) {
        return false;
    }
    
    if (RegExp.$2 > 12 || RegExp.$2 < 01) {
        return false;
    }

    return true;
}

/**
 * String.isMY() method 구현 - 신용카드 유효기간 00/00
 * 구분자 => / or - or .
 */
String.prototype.isMY = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^(\d{2})[\/|\-|.]?(\d{2})$/) == -1) {
        return false;
    }
    
    if (RegExp.$1 > 12 || RegExp.$1 < 01) {
        return false;
    }
    
    if (RegExp.$2 > 99 || RegExp.$2 < 01) {
        return false;
    }

    return true;
}


/**
 * String.isMD() method 구현 - 날짜
 * 구분자 => / or - or .
 */
String.prototype.isMD = function() {
    if (this.isEmpty()) {
        return true;
    }
    if (this.search(/^(\d{2})[\/|\-|.]?(\d{2})$/) == -1) {
        return false;
    }

    var lastDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (RegExp.$1 > 12 || RegExp.$1 < 01) {
        return false;
    }

    if (RegExp.$2 > lastDays[RegExp.$1 - 1] || RegExp.$2 < 01) {
        return false;
    }
    return true;
}



/**
 * String.isHMS() method 구현 - 시간
 */
String.prototype.isHMS = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^([0|1|2]\d):?(\d{2})?:?(\d{2})?$/) == -1) {
        return false;
    }

    if (RegExp.$1 > 23 || RegExp.$2 > 59 || RegExp.$3 > 59) {
        return false;
    }

    return true;
}



/**
 * String.isMS() method 구현 - 시간
 */
String.prototype.isMS = function() {
    if (this.isEmpty()) {
        return true;
    }

    if (this.search(/^(\d{2}):?(\d{2})$/) == -1) {
        return false;
    }

    if (RegExp.$1 > 59 || RegExp.$2 > 59) {
        return false;
    }

    return true;
}


/**
 * String.isEmail() method 구현 - email
 */
String.prototype.isEmail = function() {
    if (this.isEmpty()) {
        return true;
    }

	var checkTLD = 1;
	var knownDomsPat = /^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
	var emailPat = /^(.+)@(.+)$/;
	var specialChars = "\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	var validChars = "\[^\\s" + specialChars + "\]";
	var quotedUser = "(\"[^\"]*\")";
	var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom = validChars + '+';
	var word = "(" + atom + "|" + quotedUser + ")";
	var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat = new RegExp("^" + atom + "(\\." + atom +")*$");
	var matchArray = this.match(emailPat);

	if (matchArray == null) {
		return false;
	}

	var user = matchArray[1];
	var domain = matchArray[2];

	for (i = 0; i < user.length; i++) {
		if (user.charCodeAt(i) > 127) {
			return false;
	   }
	}

	for (i = 0; i < domain.length; i++) {
		if (domain.charCodeAt(i) > 127) {
			return false;
	    }
	}

	if (user.match(userPat) == null) {
		return false;
	}

	var ipArray = domain.match(ipDomainPat);

	if (ipArray != null) {
		for (var i = 1;i <= 4; i++) {
			if (ipArray[i] > 255) {
				return false;
 		    }
		}
		return true;
	}

	var atomPat = new RegExp("^" + atom + "$");
	var domArr = domain.split(".");
	var len = domArr.length;

	for (i = 0; i < len; i++) {
		if (domArr[i].search(atomPat) == -1) {
			return false;
	   }
	}

	if (checkTLD && domArr[domArr.length - 1].length != 2 
		&& domArr[domArr.length - 1].search(knownDomsPat) == -1) {
		return false;
	}

    return len >= 2;
}
/**
 * String.isFormat() method 구현 - 특정 포맷에 맞는 형식인가
 */
String.prototype.isFormat = function() {

    if (this.isEmpty()) {
        return true;
    }

    var formatStr = arguments[0].split("-");
    var searchStr = "this.search(/^";
    for (var _i=0; _i < formatStr.length; _i++) {
        if (_i==0) {
            searchStr += "\\d{"+formatStr[_i]+"}";
        } else {
            searchStr += "\\-?\\d{"+formatStr[_i]+"}";
        }
    }
    searchStr += "$/) != -1;";

    return eval(searchStr);
}


/**
 * String의 각 표현형식별 mask 처리하여 반환
 */
String.prototype.mask = function(preset) {
	var result;
    
    // preset에 () 형식이 포함될 경우 - 특정 format 처리
    if (preset.indexOf("(") >= 0 && preset.indexOf(")") >=0 ) {
        var formatStr = preset.substring(preset.indexOf("(")+1,preset.indexOf(")"));
        preset = preset.substring(0,preset.indexOf("("));
        result = this.maskFormat(formatStr);

    // 일반적인 경우
    } else {
    	switch (preset.toLowerCase()) {
    		case "number": 
    			break;
    		case "numberdot": 
    			break;
    		case "numberplus": 
    			break;
    		case "amtplus": 
    		case "amt": 
    		case "amtdot": 
    			result = this.maskNumber();
    			break;
    
            case "ymdhms":
            case "ymdhm":
                result = this.maskDateTime();
                break;
                
            case "datemy":
                result = this.maskDateMY();
                break;    
    
    		case "dateymd":
    		case "dateym":
    			result = this.maskDate();
    			break;
    
    		case "datemd":
    			result = this.maskDateMD();
    			break;
    
    		case "timehms":
    		case "timehm":
    		case "timems":
    			result = this.maskTime();
    			break;
    
    		case "telno":
    		case "hpno":
    			result = this.maskPhoneNo();
    			break;
    
    		case "cardno":
    			result = this.maskCardNo();
    			break;
    
    		case "idno":
            case "corpno":
    			result = this.maskIdNo();
    			break;
    
    		case "bizno":
    			result = this.maskBizNo();
    			break;
    
    		case "corp":
    			result = this.maskIdNo();
    			break;
    
    		case "zipno":
    			result = this.maskZipNo();
    			break;
    
    		default:
    			result = this;
    			break;
    	}
    }
    if (result == null || result == "undefined") result = this;
	return result;
}


/**
 * String의 각 표현형식별 mask 처리 삭제하여 반환
 */
String.prototype.unmask = function(preset) {
	var result;

    // preset에 () 형식이 포함될 경우
    if (preset.indexOf("(") >= 0 && preset.indexOf(")") >=0 ) {
		result = this.removeAll(SEPARATOR_DEFAULT);

    // 일반적인 경우
    } else {
    
    	switch (preset.toLowerCase()) {
    		case "number": 
    		case "numberdot": 
    		case "numberplus": 
    		case "amt": 
    			result = this.removeAll(SEPARATOR_NUMBER);
    			break;
    
    		case "dateymd":
    		case "dateym":
    		case "datemd":
    			result = this.removeAll(SEPARATOR_DATE);
    			break;
    			
    		case "datemy":
    			result = this.removeAll(CREDIT_SEPARATOR_DATE);
    			break;
    
    		case "timehms":
    		case "timehm":
    		case "timems":
    			result = this.removeAll(SEPARATOR_TIME);
    			break;
    
    		case "telno":
    		case "hpno":
    		case "cardno":
    		case "idno":
    		case "bizno":
    		case "corpno":
    		case "zipno":
    			result = this.removeAll(SEPARATOR_DEFAULT);
    			break;
    
    		default:
    			result = this.trim();
    			break;
    	}
    }
    if (result == null || result == "undefined") result = this;

	return result;	
}


/**
 * String을 comma가 추가된 number type으로 반환
 */
String.prototype.maskNumber = function() {
	var sInt = this.removeAll(SEPARATOR_NUMBER);

	var sSign = sInt.charAt(0);
	if (sSign == "-" || sSign == "+") {
		sInt = sInt.substr(1);
		sSign = sSign == "+" ? "" : "-";
	} else {
        sSign = "";
    }
	
	var iPointIdx = sInt.indexOf(".");
	var sDecimal = "";
	if (iPointIdx > -1) {
		sDecimal = sInt.substr(iPointIdx);
		sInt = sInt.substr(0, iPointIdx);
	}

	if (sInt.length <= 3) {
		return sSign + sInt + sDecimal;
	}

	var sReverseInt = sInt.reverse();
	var sReverseResult = "";

    for(var i = 0, n = sReverseInt.length; i < n; i += 3) {
		sReverseResult += sReverseInt.substr(i, 3);
		if (i + 3 < n) {
			sReverseResult += SEPARATOR_NUMBER;
		}
    }

	return sSign + sReverseResult.reverse() + sDecimal;	
}


/**
 * String을 날짜구분자가 추가된 형식으로 반환
 */
String.prototype.maskDateTime = function() {
	var sDateTime = this.removeAll(SEPARATOR_DATE)
                        .removeAll(SEPARATOR_TIME)
                        .removeAll(" ");
    var sDate = sDateTime.substring(0, 8);
    var sTime = sDateTime.substring(8);

    return sDate.maskDate() + " " + sDate.maskTime();
}


/**
 * String을 날짜구분자가 추가된 형식으로 반환
 */
String.prototype.maskDate = function() {
	var sDate = this.removeAll(SEPARATOR_DATE);
	var len = sDate.length;

	if (len <= 4) {
		return sDate;
	} else if (len <= 6) {
		return sDate.substr(0, 4) 
			 + SEPARATOR_DATE
			 + sDate.substr(4);
	} else if (len <= 8) {
		return sDate.substr(0, 4)
		     + SEPARATOR_DATE
		     + sDate.substr(4, 2)
		     + SEPARATOR_DATE
		     + sDate.substr(6);
	}
}

/**
 * String을 신용카드 유효기간 구분자가 추가된 형식으로 반환
 */
String.prototype.maskDateMY = function() {
	var sDate = this.removeAll(CREDIT_SEPARATOR_DATE);
	var len = sDate.length;

	if (len <= 2) {
		return sDate;
	} else if (len <= 4) {
		return sDate.substr(0, 2) 
			 + CREDIT_SEPARATOR_DATE
			 + sDate.substr(2);
	}
}

/**
 * String을 시간구분자가 추가된 형식으로 반환
 */
String.prototype.maskTime = function() {
	var sTime = this.removeAll(SEPARATOR_TIME);
	var len = sTime.length;

	if (len <= 2) {
		return sTime;
	} else if (len <= 4) {
		return sTime.substr(0, 2)
		     + SEPARATOR_TIME
		     + sTime.substr(2);
	} else {
		return sTime.substr(0, 2)
		     + SEPARATOR_TIME
		     + sTime.substr(2, 2)
		     + SEPARATOR_TIME
		     + sTime.substr(4, 2); 
	}
}


/**
 * String을 전화번호 구분자가 추가된 형식으로 반환
 */
String.prototype.maskPhoneNo = function() {
	var phoneNo = this.removeAll(SEPARATOR_DEFAULT);

	var idx = 0;
	var result = "";

	if (phoneNo.substr(0, 2) == "02") {
		result += (phoneNo.substr(0, 2) + SEPARATOR_DEFAULT);
		idx = 2;
	} else if (phoneNo.charAt(0) == "0") {
		result += (phoneNo.substr(0, 3) + SEPARATOR_DEFAULT);
		idx = 3;
	}

	if (phoneNo.substr(idx).length < 4) {
		result += phoneNo.substr(idx);
	} else if (phoneNo.substr(idx).length < 8) {
		result += (phoneNo.substr(idx, 3)
			       + SEPARATOR_DEFAULT
		           + phoneNo.substr(idx + 3));
	} else {
		result += (phoneNo.substr(idx, 4) 
			       + SEPARATOR_DEFAULT
		           + phoneNo.substr(idx + 4));
	}

	return result;
}


/**
 * String을 카드번호 구분자가 추가된 형식으로 반환
 */
String.prototype.maskCardNo = function() {
	var cardNo = this.removeAll(SEPARATOR_DEFAULT);

    if (cardNo.length <= 4) {
        return cardNo;
    } else if (cardNo.length <= 8) {
        return cardNo.substr(0, 4)
             + SEPARATOR_DEFAULT
             + cardNo.substr(4)
    } else if (cardNo.length <= 12) {
        return cardNo.substr(0, 4)
             + SEPARATOR_DEFAULT
             + cardNo.substr(4, 4)
             + SEPARATOR_DEFAULT
             + cardNo.substr(8)
    } else {
        return cardNo.substr(0, 4)
             + SEPARATOR_DEFAULT
             + cardNo.substr(4, 4)
             + SEPARATOR_DEFAULT
             + cardNo.substr(8, 4)
             + SEPARATOR_DEFAULT
             + cardNo.substr(12);
    }
}


/**
 * String을 주민등록번호 구분자가 추가된 형식으로 반환
 */
String.prototype.maskIdNo = function() {
	var idNo = this.removeAll(SEPARATOR_DEFAULT);
    
    if (idNo.length <= 6) {
        return idNo;
    } else {
        return idNo.substr(0, 6)
             + SEPARATOR_DEFAULT
             + idNo.substr(6);
    }
}


/**
 * String을 사업자등록번호 구분자가 추가된 형식으로 반환
 */
String.prototype.maskBizNo = function() {
	var bizNo = this.removeAll(SEPARATOR_DEFAULT);
    
    if (bizNo.length <= 3) {
        return bizNo;
    } else if (bizNo.length <= 5) {
        return bizNo.substr(0, 3)
             + SEPARATOR_DEFAULT
             + bizNo.substr(3)
    } else {
        return bizNo.substr(0, 3)
             + SEPARATOR_DEFAULT
             + bizNo.substr(3, 2)
             + SEPARATOR_DEFAULT
             + bizNo.substr(5);
    }
}


/**
 * String을 우편번호 구분자가 추가된 형식으로 반환
 */
String.prototype.maskZipNo = function() {
	var zipNo = this.removeAll(SEPARATOR_DEFAULT);
    
    if (zipNo.length <= 3) {
        return zipNo;
    } else {
        return zipNo.substr(0, 3)
             + SEPARATOR_DEFAULT
             + zipNo.substr(3);
    }
}

/**
 * String을 "-" 구분자가 추가된 특정 형식으로 반환
 */
String.prototype.maskFormat = function() {
	var formatValue = this.removeAll(SEPARATOR_DEFAULT);
    var formatStr = arguments[0].split("-");
    
    var resultStr = "";
    var resultIdx = 0;
    for (var _i=0; _i<formatStr.length; _i++) {
        if ((resultIdx+parseInt(formatStr[_i])) >= formatValue.length) {
            if (_i==0) {
                resultStr += formatValue.substring(resultIdx, resultIdx+parseInt(formatStr[_i]));
            } else {
                resultStr += "-" + formatValue.substring(resultIdx, resultIdx+parseInt(formatStr[_i]));
            }
            return resultStr;
        } else {
            if (_i==0) {
                resultStr += formatValue.substring(resultIdx, resultIdx+parseInt(formatStr[_i]));
            } else {
                resultStr += "-" + formatValue.substring(resultIdx, resultIdx+parseInt(formatStr[_i]));
            }
            resultIdx += parseInt(formatStr[_i]);
        }
    }
    return resultStr;
}



//  +----------------------------------+
//  |  Date Object                     |
//  +----------------------------------+



//  +----------------------------------+
//  |  Map Object                      |
//  +----------------------------------+

function Map(delim, insensitive) {
    this.delim = (delim == null ? "=" : delim);
    this.insensitive = (insensitive == null ? false : insensitive);

    this._map = new ActiveXObject("Scripting.Dictionary");


    this.build = function(dic) {
        if (this.insensitive) {
            var keys = dic.keys().toArray();
            for (var i = 0, n = keys.length; i < n; i++) {
                this._map.item(keys[i].toLowerCase()) = dic.item(keys[i]);
            }
        } else {
            this._map = dic;
        }
    }


    this.setInsensitive = function(insensitive) {
        this.insensitive = insensitive;
    }


    this.get = function(key) {
        key = this.realKey(key);
        return this._map.exists(key) ? this._map.item(key) : null;
    }

    
    this.put = function(key, value) {
        key = this.realKey(key);
        var oldValue = this._map.item(key);
        this._map.item(key) = value;
        return value;
    }

    
    this.size = function() {
        return this._map.count;
    }

    
    this.remove = function(key) {
        key = this.realKey(key);
        var value = this._map.item(key);
        this._map.remove(key);
        return value;
    }

    
    this.clear = function() {
        this._map.removeAll();
    }

    
    this.keys = function() {
        return this._map.keys().toArray();
    }

    
    this.values = function() {
        return this._map.items().toArray();
    }


    this.containsKey = function(key) {
        key = this.realKey(key);
        return this._map.exists(key);
    }


    this.containsValue = function(value) {
        var values = this.values();

        for (var i in values) {
            if (value == values[i]) {
                return true;
            }
        }

        return false;
    }

    
    this.isEmpty = function() {
        return this.size() <= 0;
    }


    this.putAll = function(map) {
        if (!(map instanceof Map)) {
            throw new Error(0, "Map.putAll(Map) method는 Map type의 parameter만 가능합니다.");
        }
        
        var keys = map.keys();
        for (var i in keys) {
            key = this.realKey(keys[i]);
            this.put(key, map.get(key));
        }

        return this;
    }


    this.toString = function(separator) {
        var keys = this.keys();
        var result = "";

        separator = separator == null ? "&" : separator;

        for (var i in keys) {
            result += (keys[i] + this.delim + this._map.item(keys[i]));
            if (i < this.size() - 1) {
                result += separator;
            }
        }

        return result;
    }


    this.realKey = function(key) {
        return this.insensitive ? key.toLowerCase() : key;
    }
}


/**
 * URLBuiler Object
 */
function URLBuilder(url) {
    this.url      = url;
    this.paramMap = new Map();

    this.add = function(name, value) {
        this.paramMap.put(name, value);
    }


    this.get = function(name) {
        return this.paramMap.get(name);
    }


    this.remove = function(name) {
        return this.paramMap.remove(name);
    }


    this.clear = function() {
        return this.paramMap.clear();
    }


    this.queryString = function() {
        return this.paramMap.toString();
    }


    this.build = function() {
        return this.url + "?" + this.queryString();
    }
}
