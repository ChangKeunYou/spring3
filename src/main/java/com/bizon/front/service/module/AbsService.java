package com.bizon.front.service.module;

import java.io.UnsupportedEncodingException;
import java.security.PrivateKey;
import java.security.Security;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;


import javax.crypto.Cipher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;


/**
 * 
 * @author 네오모듈 유창근
 * @see AbsService : 공통메서드 집합
 * @version 1.0 (-_- need refactoring)
 */
public abstract class AbsService{

	
	
	protected  final Logger logger = Logger.getLogger(getClass().getName());
	protected String contextPath;
	protected String uri;
	protected String fileName; 
	
	/*
	 * 페이지에서 넘어온 모든 파라메터를 해쉬에 담는다.
	 * 필드의 id 값 또는 grid 에서 넘어온 파라메터 값을 담는다
	 * 	 
	 * */

	public HashMap<String, Object> executeParam(Enumeration<String> reqParam, HttpServletRequest request) throws UnsupportedEncodingException
	{
		request.setCharacterEncoding("utf-8");
		HashMap<String, Object> paramHash = new HashMap<String, Object>();
		
		while (reqParam.hasMoreElements()) {
			String name = (String) reqParam.nextElement();
		
			String all[] = request.getParameterValues(name);
			String log = "";
			log += name;
			log += " = [ ";
			
			for (int i = 0; i < all.length; i++) {
				if (i > 0)
					log += (" , ");
				log += all;
				
				paramHash.put(name, all[i].toString());
			}
			log += " ]";
		
		}
		
		if(logger.isDebugEnabled()){
			logger.debug("#################### paramHash Values ####################");
			Iterator<?> iter = paramHash.keySet().iterator();
			String key, value;
			while (iter.hasNext()){
				key = (String)iter.next();
				value = new String((paramHash.get(key).toString().trim()).getBytes("8859_1"), "utf-8"); 
				logger.debug("[key] = " + key + "   [value] = " + value);
				//System.out.println(key.toString() + "       " +  value.toString());
			}
			logger.debug("##########################################################");	
		}
	
		return paramHash;
	}
	
	 public void uriFactory(HttpServletRequest request, HttpServletResponse response){
	    	
   	  
	        //최상위 경로
			this.contextPath = request.getContextPath();
			
			//요청받은 경로
			this.uri = request.getRequestURI();
			logger.debug("this Context uri :: " + uri);
			
			/*
			 * 아래부분은 요청받은 경로의 길이에서 마지막 페이지 확장자를 걸러낸다.
			 * servlet-context properties 에서 suffix 값은 jsp 로 되어있기때문에
			 * 확장자를 걸러내어 정적과 동적의 뷰를 판단해서 리턴한다.
			 */
			int begin = 0;

			if((contextPath == null) || (contextPath.equals(""))){
				begin = 1;
			}else{
				begin = contextPath.length() + 1;
			}

			
			if(logger.isDebugEnabled()){
				logger.debug("---------- debuging -----------");
				logger.debug("Begin : " + begin);

			}
		
			int end;

			if(uri.indexOf(";") != -1){
				end = uri.indexOf(";");
			}else if(uri.indexOf("?") != -1){
				end = uri.indexOf("?");
			}else{
				end = uri.length();
			}


			if(logger.isDebugEnabled()){
				logger.debug("---------- debuging -----------");
				logger.debug("End : " + end);

			}


			String fileName = uri.substring(begin, end);

			if(fileName.indexOf(".") != -1){
				fileName = fileName.substring(0, fileName.lastIndexOf("."));
			}



			/**
			for(Enumeration<String> en = request.getParameterNames(); en.hasMoreElements();){
				
			
				if(logger.isDebugEnabled()){
					logger.debug("---------- debug -----------");
					logger.debug("set Attribute in Request : " + attribute + "= " + attributeValue);

				}

				request.setAttribute(attribute, attributeValue);
				
			}**/


			if(logger.isDebugEnabled()){
				logger.debug("---------- debugging -----------");
				logger.debug("FileName : " + fileName);

			}
			
			this.fileName = fileName;
	    }

	 
	 public void paramHashView(HashMap<String,Object> paramHash) throws UnsupportedEncodingException{
			Iterator<?> iter = paramHash.keySet().iterator();
			String key, value;
			if(logger.isDebugEnabled()){
				logger.debug("#################### paramHAsh Values ####################");
				while (iter.hasNext()){
					key = (String)iter.next();
					value = new String(((String)paramHash.get(key)).getBytes("8859_1"), "utf-8"); 
					
					logger.debug("[key] = " + key + "   [value] = " + value);
					
					//System.out.println(key.toString() + "       " +  value.toString());
				}
				logger.debug("##########################################################");
			 
				
			}
		
	 }
	 
	 
	 
	 public String resultXMLDATA(HashMap<String,Object> map){

			List<?> aResult = (List<?>)map.get("result");
	
			StringBuffer str = new StringBuffer();
			
			int maxRow = aResult.size();
			
			str.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		
			for(int i = 0; i < maxRow; i++)
			{
			
				@SuppressWarnings("unchecked")
				HashMap<String,Object> columnSet = (HashMap<String,Object>)aResult.get(i);			
				Iterator<?> iter = columnSet.keySet().iterator();
				String key;
				Object value;
				str.append("<result>");
				while (iter.hasNext()){
					key = (String)iter.next();
					value = columnSet.get(key) == null ? "" : columnSet.get(key);
					
					
					if( columnSet.get(key)  instanceof java.util.HashMap){
						str.append("<_"+key);
						
						@SuppressWarnings("unchecked")
						HashMap<String,Object> childHash = (HashMap<String,Object>)columnSet.get(key);
						Iterator<?> itChild = childHash.keySet().iterator();
						while(itChild.hasNext()){
							String childKey = itChild.next().toString();
							String childValue = childHash.get(childKey) == null ? null : childHash.get(childKey).toString();
			
							str.append(" ").append(childKey).append("='").append(childValue).append("' ");
						}
						str.append("/>");
						
					}else{
				
						str.append("<"+key+"><![CDATA[").append(value).append("]]></"+key+">");
					}
				}
				str.append("</result>");
				
				
			}

			logger.debug(str.toString());
			return str.toString();
	 }
	 
	 
	 
	 
	 
	 
	 public static String escape(String src) {   
		  
		  int i;   
		  char j;   
		  StringBuffer tmp = new StringBuffer();   
		  tmp.ensureCapacity(src.length() * 6);   
		  for (i = 0; i < src.length(); i++) {   
			  j = src.charAt(i);   
			  if (Character.isDigit(j) || Character.isLowerCase(j)   
					  || Character.isUpperCase(j))   
				  tmp.append(j);   
			  else if (j < 256) {   
				  tmp.append("%");   
				  if (j < 16)   
					  tmp.append("0");   
				  tmp.append(Integer.toString(j, 16));   
			  } else {   
				  tmp.append("%u");   
				  tmp.append(Integer.toString(j, 16));   
			  }   
		  }   
		  return tmp.toString();   
	 }  

	 public static String unescape(String src) {   
		 StringBuffer tmp = new StringBuffer();   
		 tmp.ensureCapacity(src.length());   
		 int lastPos = 0, pos = 0;   
		 char ch;   
		 while (lastPos < src.length()) {   
			 pos = src.indexOf("%", lastPos);   
			 if (pos == lastPos) {   
				 if (src.charAt(pos + 1) == 'u') {   
					 ch = (char) Integer.parseInt(src   
							 .substring(pos + 2, pos + 6), 16);   
					 tmp.append(ch);   
					 lastPos = pos + 6;   
				 } else {   
					 ch = (char) Integer.parseInt(src   
							 .substring(pos + 1, pos + 3), 16);   
					 tmp.append(ch);   
					 lastPos = pos + 3;   
				 }   
			 } else {   
				 if (pos == -1) {   
					 tmp.append(src.substring(lastPos));   
					 lastPos = src.length();   
				 } else {   
					 tmp.append(src.substring(lastPos, pos));   
					 lastPos = pos;   
				 }   
			 }   
		 }   
		 return tmp.toString();   
	 }    

		protected HashMap executeParamUpdate(HttpServletRequest request) {
			HashMap <String,String> paramHash = new HashMap<String,String>();
			Enumeration<String> reqParam = request.getParameterNames();
		    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		    System.out.println("\n==============================" + format.format(new Date()) + "========================================");
		    System.out.println("request from : " + request.getRemoteAddr());
		    
			while(reqParam.hasMoreElements()){
				String key = reqParam.nextElement();
				String value = request.getParameter(key);
				 System.out.println(key + " => " + value);
				//logger.debug("key=" + key + " : value=" + value);
				paramHash.put(key, value);
			}
			/*
			logger.debug("==========Parameter List=========");
			
			Iterator<String> iter = paramHash.keySet().iterator();
			while(iter.hasNext()){
				String key = iter.next();
				String value = paramHash.get(key);
				logger.debug("key=" + key + " : value=" + value);
			}
			*/
			request.setAttribute("result", paramHash);
			return paramHash;
		}
		 
		/*
		public String decryptRsa(PrivateKey privateKey, String securedValue) throws Exception {
		   // System.out.println("will decrypt : " + securedValue);
		    Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
		    //Cipher cipher = Cipher.getInstance("RSA"); 
		    Cipher cipher = Cipher.getInstance("RSA/None/PKCS1Padding", "BC");
		    byte[] encryptedBytes = hexToByteArray(securedValue);
		    cipher.init(Cipher.DECRYPT_MODE, privateKey);
		    byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
		    String decryptedValue = new String(decryptedBytes, "utf-8"); // 문자 인코딩 주의.
		    return decryptedValue;
		}
		*/
		
		/**
		 * 16진 문자열을 byte 배열로 변환한다.
		 */
		public static byte[] hexToByteArray(String hex) {
		    if (hex == null || hex.length() % 2 != 0) {
		        return new byte[]{};
		    }
		
		    byte[] bytes = new byte[hex.length() / 2];
		    for (int i = 0; i < hex.length(); i += 2) {
		        byte value = (byte)Integer.parseInt(hex.substring(i, i + 2), 16);
		        bytes[(int) Math.floor(i / 2)] = value;
		    }
		    return bytes;
		}
		
		 
}
