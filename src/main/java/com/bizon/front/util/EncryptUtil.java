package com.bizon.front.util;


import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.KeySpec;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

import org.apache.commons.codec.binary.Base64;  

import com.chrysalisits.crypto.LunaCryptokiException;

/**
 * 암호화/복호화 관련 Util class
 * 2012-oct-22
 * @author miriet
 *
 */
public class EncryptUtil {

	private KeySpec keySpec;
	private SecretKey key;
	private IvParameterSpec iv;

	private static EncryptUtil eUtil = new EncryptUtil("encryptKey", "InitVect");
	
	@SuppressWarnings("unused")
	private EncryptUtil(){//싱글턴
		
	}
	
	public static EncryptUtil getInstance(){
		return eUtil;
	}

	/**
	 * EncryptUtil 생성.
	 * encryption을 위한 keyString과 initial Vector key값을 파라미터로 받아 key와 IVParameterSpec 을 생성한다.
	 * keyString은 임의의 문자열, ivString은 8자짜리 문자열로 구성한다.
	 * @param valCmd
	 */
	public EncryptUtil(String keyString, String ivString) {
		try {
			final MessageDigest md = MessageDigest.getInstance("md5");
			final byte[] digestOfPassword = md.digest(Base64.decodeBase64(keyString.getBytes("utf-8")));
			final byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
			for (int j = 0, k = 16; j < 8;) {
				keyBytes[k++] = keyBytes[j++];
			}

			keySpec = new DESedeKeySpec(keyBytes);

			key = SecretKeyFactory.getInstance("DESede").generateSecret(keySpec);

			iv = new IvParameterSpec(ivString.getBytes());
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public String encrypt(String value) {
		String result = null;
		try {
			Cipher ecipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
			ecipher.init(Cipher.ENCRYPT_MODE, key, iv);

			if(value != null && !"".equals(value)){
				// Encode the string into bytes using utf-8
				byte[] utf8 = value.getBytes("UTF8");
	
				// Encrypt
				byte[] enc = ecipher.doFinal(utf8);
				// Encode bytes to base64 to get a string
				result = new String(Base64.encodeBase64(enc),"UTF-8");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public String decrypt(String value) {
		String result = null;
		try {
			Cipher dcipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
			dcipher.init(Cipher.DECRYPT_MODE, key, iv);

			if(value != null && !"".equals(value)){
				// Decode base64 to get bytes
				byte[] dec = Base64.decodeBase64(value.getBytes());
	
				// Decrypt
				byte[] utf8 = dcipher.doFinal(dec);
	
				// Decode using utf-8
				result = new String(utf8, "UTF8");
			}
		}catch(IllegalBlockSizeException ie){
			// 나중에 확인 후 해결해야 할지도..
		}catch(LunaCryptokiException ie){
			// 나중에 확인 후 해결해야 할지도..
		}catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public String getHash(String sourceText){
		if(sourceText != null && !"".equals(sourceText.trim())){
			sourceText = getHash(sourceText, 1945);	//보안을 위해 동일한 알고리즘(SHA-256)을 반복해서 hash값을 얻음. 반복횟수가 없는 경우 디폴트값을 1945로 지정. 대한독립만세!!
		}
		return sourceText;
	}
		
	public String getHash(String sourceText, int repeatCount) {	

		byte[] hash;
		String result = null;
		StringBuffer sb = new StringBuffer(); 

		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			digest.reset();
			hash = digest.digest(sourceText.getBytes("UTF-8"));

			for (int i=0; i<repeatCount; i++){
				digest.reset();
				hash = digest.digest(hash);
			}

			for(int i = 0 ; i < hash.length ; i++){
				sb.append(Integer.toString((hash[i]&0xff) + 0x100, 16).substring(1));
			}	
			result = sb.toString();

		} catch (NoSuchAlgorithmException e) {
			result = null;
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			result = null;
			System.out.println("EncryptUtil.getHash()::UnsupportedEncodingException");
			e.printStackTrace();
		}
		return result;
	}
	
	
	public static void main(String[]args){
		
		
		System.out.println("===========EncryptUtil Test==========");
		
		String hashpw = EncryptUtil.getInstance().getHash("1q2w3e");
		System.out.println("SHA-256 Passwd=>" + hashpw);
		
		
	}

	
} 