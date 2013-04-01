package www.web.projects;

import java.security.MessageDigest;
import java.text.*;
import java.util.*;
import java.io.IOException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * 2013.03.19
 * @author 비즈온 유창근
 * String값 파라메터로 받아 base64 로 만든후 sha256(md5) 암호화
 * 복호화는 불가능...
 */
public class Sha256SecurityTest {
	
	private String paramString;
	private String base64Encoding;
	private String base64Decoding;
	private String sha256;
	
	private Log log = LogFactory.getLog(this.getClass());
	
	private Sha256SecurityTest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public Sha256SecurityTest(String paramString) {
		super();
		this.paramString = paramString;
	}

	public Sha256SecurityTest base64Edcoding() throws Exception{
		this.base64Encoding = new BASE64Encoder().encode(this.paramString.getBytes());
		return this;
	}
	
	public Sha256SecurityTest base64Decoding() throws Exception{
		this.base64Decoding = new String(new BASE64Decoder().decodeBuffer(this.base64Encoding));
		return this;
	}
		
	
	public Sha256SecurityTest sha256Encoding() throws Exception{
		 
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        //md.update(this.base64Encoding.getBytes());//이부분만 변경하면서 테스트
        md.update(this.base64Decoding.getBytes());
        
        byte byteData[] = md.digest();
 
        //convert the byte to hex format method 1
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
         sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        //this.sha256 = sb.toString();
        //System.out.println("Hex format : " + sb.toString());
 
        //convert the byte to hex format method 2
        StringBuffer hexString = new StringBuffer();
        
    	for (int i=0;i<byteData.length;i++) {
    		String hex=Integer.toHexString(0xff & byteData[i]);
   	     	if(hex.length()==1) hexString.append('0');
   	     	hexString.append(hex);
    	}
    	
    	//System.out.println("Hex format : " + hexString.toString());
		this.sha256 = hexString.toString();
		return this;
	}
	
	
	@Override
	public String toString(){
		StringBuilder sb = new StringBuilder();
		sb.append("\nbase64Encoding=[" + this.base64Encoding + "]\nbase64Decoding=[" + this.base64Decoding + "]\nsha256=[" + this.sha256 + "]");
		return sb.toString();
	}
	
	
}
