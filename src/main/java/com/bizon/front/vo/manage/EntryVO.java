package com.bizon.front.vo.manage;

import java.io.Serializable;
import java.util.Arrays;
/**  
 * @Description 등록자 데이터 VO Class
 * @author eunjung Jang
 * @since 2012.10.17
 *  
 * Copyright (주)비지니스온커뮤니케이션 All right reserved.
 */
public class EntryVO implements Serializable{

	private static final long serialVersionUID = -5256402432928986602L;

	private String username;					// 소유자명
	private String idnType;						// 개인, 사업자 여부
	private String corpnum1;					// 사업자 번호
	private String corpnum2;					// 사업자 번호
	private String corpnum3;					// 사업자번호
	private String indinum1;					// 주민등록번호
	private String indinum2;					// 주민등록번호
	private String peerType;					// 송수신개체 구분(중계자, 자체구축)
	private String peerIdn;						// 송수신개체 사업자번호 
	private String peerRegNum;					// 송수신개체 인증번호
	private String entryAddress;				// 등록자
	private String serviceLife;					// 신청 기간 기본 1년(1Y)
	private String authType;					// 본인확인방법
	private String email1;						// 이메일
	private String email2;						// 이메일
	private String tel1;						// 전화번호
	private String tel2;						// 전화번호
	private String tel3;						// 전화번호
	private String cel1;						// 휴대폰
	private String cel2;						// 휴대폰
	private String cel3;						// 휴대폰
	private String addr;						// 주소
	private String provideAdr;					// 3자 공개 여부
	private String setRepresentative;			// 대표 공인전자주소 여부
	private String ceoname;						// 대표자 명
	private String mname;						// 책임자 명
	private String memail1;						// 책임자 이메일
	private String memail2;						// 책임자 이메일
	private String mtel1;						// 책임자 전화번호
	private String mtel2;						// 책임자 전화번호
	private String mtel3;						// 책임자 전화번호
	private String maddr;						// 책임자 주소
	private String signCert;					// 인증서
	
	private String authDate;					// 본인확인날짜
	private String authCorpName;				// 본인확인기관
	private String vdtRealNameCode;				// 실명인증 주문번호
	private String vdtIdentificationCode;		// 본인확인 주문번호
	
	private byte[] recordSign;					// 위변조방지 Sign
	private boolean falsificationFlag = false;	// 위변조여부 
	
	private String authAgent;					// 인증 주체 person: 본인 sub: 대리인
	private String mandatorIdn;					// 대리인 식별번호
	private String mandatorCel;					// 대리인 휴대폰
	private String mandatorName;				// 대리인 명
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getIdnType() {
		return idnType;
	}
	public void setIdnType(String idnType) {
		this.idnType = idnType;
	}
	public String getCorpnum1() {
		return corpnum1;
	}
	public void setCorpnum1(String corpnum1) {
		this.corpnum1 = corpnum1;
	}
	public String getCorpnum2() {
		return corpnum2;
	}
	public void setCorpnum2(String corpnum2) {
		this.corpnum2 = corpnum2;
	}
	public String getCorpnum3() {
		return corpnum3;
	}
	public void setCorpnum3(String corpnum3) {
		this.corpnum3 = corpnum3;
	}
	public String getIndinum1() {
		return indinum1;
	}
	public void setIndinum1(String indinum1) {
		this.indinum1 = indinum1;
	}
	public String getIndinum2() {
		return indinum2;
	}
	public void setIndinum2(String indinum2) {
		this.indinum2 = indinum2;
	}
	public String getPeerType() {
		return peerType;
	}
	public void setPeerType(String peerType) {
		this.peerType = peerType;
	}
	public String getPeerIdn() {
		return peerIdn;
	}
	public void setPeerIdn(String peerIdn) {
		this.peerIdn = peerIdn;
	}
	public String getPeerRegNum() {
		return peerRegNum;
	}
	public void setPeerRegNum(String peerRegNum) {
		this.peerRegNum = peerRegNum;
	}
	public String getEntryAddress() {
		return entryAddress;
	}
	public void setEntryAddress(String entryAddress) {
		this.entryAddress = entryAddress;
	}
	public String getServiceLife() {
		return serviceLife;
	}
	public void setServiceLife(String serviceLife) {
		this.serviceLife = serviceLife;
	}
	public String getAuthType() {
		return authType;
	}
	public void setAuthType(String authType) {
		this.authType = authType;
	}
	public String getEmail1() {
		return email1;
	}
	public void setEmail1(String email1) {
		this.email1 = email1;
	}
	public String getEmail2() {
		return email2;
	}
	public void setEmail2(String email2) {
		this.email2 = email2;
	}
	public String getTel1() {
		return tel1;
	}
	public void setTel1(String tel1) {
		this.tel1 = tel1;
	}
	public String getTel2() {
		return tel2;
	}
	public void setTel2(String tel2) {
		this.tel2 = tel2;
	}
	public String getTel3() {
		return tel3;
	}
	public void setTel3(String tel3) {
		this.tel3 = tel3;
	}
	public String getCel1() {
		return cel1;
	}
	public void setCel1(String cel1) {
		this.cel1 = cel1;
	}
	public String getCel2() {
		return cel2;
	}
	public void setCel2(String cel2) {
		this.cel2 = cel2;
	}
	public String getCel3() {
		return cel3;
	}
	public void setCel3(String cel3) {
		this.cel3 = cel3;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getProvideAdr() {
		return provideAdr;
	}
	public void setProvideAdr(String provideAdr) {
		this.provideAdr = provideAdr;
	}
	public String getSetRepresentative() {
		return setRepresentative;
	}
	public void setSetRepresentative(String setRepresentative) {
		this.setRepresentative = setRepresentative;
	}
	public String getCeoname() {
		return ceoname;
	}
	public void setCeoname(String ceoname) {
		this.ceoname = ceoname;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getMemail1() {
		return memail1;
	}
	public void setMemail1(String memail1) {
		this.memail1 = memail1;
	}
	public String getMemail2() {
		return memail2;
	}
	public void setMemail2(String memail2) {
		this.memail2 = memail2;
	}
	public String getMtel1() {
		return mtel1;
	}
	public void setMtel1(String mtel1) {
		this.mtel1 = mtel1;
	}
	public String getMtel2() {
		return mtel2;
	}
	public void setMtel2(String mtel2) {
		this.mtel2 = mtel2;
	}
	public String getMtel3() {
		return mtel3;
	}
	public void setMtel3(String mtel3) {
		this.mtel3 = mtel3;
	}
	public String getMaddr() {
		return maddr;
	}
	public void setMaddr(String maddr) {
		this.maddr = maddr;
	}
	public String getSignCert() {
		return signCert;
	}
	public void setSignCert(String signCert) {
		this.signCert = signCert;
	}

	public String getAuthDate() {
		return authDate;
	}
	public void setAuthDate(String authDate) {
		this.authDate = authDate;
	}
	public String getAuthCorpName() {
		return authCorpName;
	}
	public void setAuthCorpName(String authCorpName) {
		this.authCorpName = authCorpName;
	}
	public String getVdtRealNameCode() {
		return vdtRealNameCode;
	}
	public void setVdtRealNameCode(String vdtRealNameCode) {
		this.vdtRealNameCode = vdtRealNameCode;
	}
	public String getVdtIdentificationCode() {
		return vdtIdentificationCode;
	}
	public void setVdtIdentificationCode(String vdtIdentificationCode) {
		this.vdtIdentificationCode = vdtIdentificationCode;
	}
	
	public byte[] getRecordSign() {
		return recordSign;
	}
	public void setRecordSign(byte[] recordSign) {
		this.recordSign = recordSign;
	}
	public boolean isFalsificationFlag() {
		return falsificationFlag;
	}
	public void setFalsificationFlag(boolean falsificationFlag) {
		this.falsificationFlag = falsificationFlag;
	}
	
	public String getAuthAgent() {
		return authAgent;
	}
	public void setAuthAgent(String authAgent) {
		this.authAgent = authAgent;
	}
	public String getMandatorIdn() {
		return mandatorIdn;
	}
	public void setMandatorIdn(String mandatorIdn) {
		this.mandatorIdn = mandatorIdn;
	}
	public String getMandatorCel() {
		return mandatorCel;
	}
	public void setMandatorCel(String mandatorCel) {
		this.mandatorCel = mandatorCel;
	}
	public String getMandatorName() {
		return mandatorName;
	}
	public void setMandatorName(String mandatorName) {
		this.mandatorName = mandatorName;
	}
	
	@Override
	public String toString() {
		return "EntryVO [username=" + username + ", idnType=" + idnType
				+ ", corpnum1=" + corpnum1 + ", corpnum2=" + corpnum2
				+ ", corpnum3=" + corpnum3 + ", indinum1=" + indinum1
				+ ", indinum2=" + indinum2 + ", peerType=" + peerType
				+ ", peerIdn=" + peerIdn + ", peerRegNum=" + peerRegNum
				+ ", entryAddress=" + entryAddress + ", serviceLife="
				+ serviceLife + ", authType=" + authType + ", email1=" + email1
				+ ", email2=" + email2 + ", tel1=" + tel1 + ", tel2=" + tel2
				+ ", tel3=" + tel3 + ", cel1=" + cel1 + ", cel2=" + cel2
				+ ", cel3=" + cel3 + ", addr=" + addr + ", provideAdr="
				+ provideAdr + ", setRepresentative=" + setRepresentative
				+ ", ceoname=" + ceoname + ", mname=" + mname + ", memail1="
				+ memail1 + ", memail2=" + memail2 + ", mtel1=" + mtel1
				+ ", mtel2=" + mtel2 + ", mtel3=" + mtel3 + ", maddr=" + maddr
				+ ", signCert=" + signCert + ", authDate=" + authDate
				+ ", authCorpName=" + authCorpName + ", vdtRealNameCode="
				+ vdtRealNameCode + ", vdtIdentificationCode="
				+ vdtIdentificationCode + ", recordSign="
				+ Arrays.toString(recordSign) + ", falsificationFlag="
				+ falsificationFlag + ", authAgent=" + authAgent
				+ ", mandatorIdn=" + mandatorIdn + ", mandatorCel="
				+ mandatorCel + ", mandatorName=" + mandatorName + "]";
	}
}
