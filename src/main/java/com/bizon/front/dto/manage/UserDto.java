package com.bizon.front.dto.manage;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

import com.bizon.front.util.EcpDateUtil;
import com.bizon.front.util.EncryptUtil;

/**  
 * @Description 유저 정보
 * @author eunjung Jang
 * @since 2012.11.19
 *  
 * Copyright (주)비지니스온커뮤니케이션 All right reserved.
 */
public class UserDto implements Serializable{

	private static final long serialVersionUID = -2880440913256401385L;

	private String id;
    private String passwd;
    private Date createdOn;
    private int userLevel;
    private String userType;
    private int managerAuth;
    private String certDn;
    private String certPk;
    private int status; 						// 0: 등록, 1: 승인, 2: 삭제
    private String idn;
    private String name;
    private String email;
    private String tel;
	private String mobile;
    private String addr;
    private String remark;
    private String userId;
    private String psno;
    private String addr2;
    private String signatureYn;
    private String entryAddress;
    private String rollGrpCd;
    private String formatCreatedOn;				// 메시지 등록일자 문자(날짜형식에 맞춤)
    private String peerEncryptedYn;
    private String certYn;						// 인증서 정보 유무
    
	private int startIndex = 0;					// 목록조회 시작 index
	private int lastIndex = 0;					// 목록조회 종료 index 
	
	private byte[] recordSign;					// 위변조방지 Sign
	private boolean falsificationFlag = false;	// 위변조여부 
	
	private String rollGrp;
	private int expired;
	private int period;

	/**
	 * @param expired the expired to set
	 */
	public void setExpired(int expired) {
		this.expired = expired;
	}
	/**
	 * @param period the period to set
	 */
	public void setPeriod(int period) {
		this.period = period;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public Date getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
		this.formatCreatedOn = EcpDateUtil.format(createdOn);
	}
	public int getUserLevel() {
		return userLevel;
	}
	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public int getManagerAuth() {
		return managerAuth;
	}
	public void setManagerAuth(int managerAuth) {
		this.managerAuth = managerAuth;
	}
	public String getCertDn() {
		return certDn;
	}
	public void setCertDn(String certDn) {
		this.certDn = certDn;
	}
	public String getCertPk() {
		return certPk;
	}
	public void setCertPk(String certPk) {
		this.certPk = certPk;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getEncryptIdn(){
		return EncryptUtil.getInstance().encrypt(idn);
	}
	public String getIdn() {
		return idn;
	}
	public void setIdn(String idn) {
		this.idn = EncryptUtil.getInstance().decrypt(idn);
		//this.idn = idn;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEncryptTel() {
		return EncryptUtil.getInstance().encrypt(tel);
	}	
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = EncryptUtil.getInstance().decrypt(tel);
	}
	public String getEncryptMobile() {
		return EncryptUtil.getInstance().encrypt(mobile);
	}	
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = EncryptUtil.getInstance().decrypt(mobile);
	}
	public String getEncryptAddr() {
		return EncryptUtil.getInstance().encrypt(addr);
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = EncryptUtil.getInstance().decrypt(addr);
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * @return the psno
	 */
	public String getPsno() {
		return psno;
	}
	/**
	 * @return the addr2
	 */
	public String getEncryptAddr2() {
		return EncryptUtil.getInstance().encrypt(addr2);
	}
	public String getAddr2() {
		return addr2;
	}
	/**
	 * @return the signatureYn
	 */
	public String getSignatureYn() {
		return signatureYn;
	}
	/**
	 * @return the entryAddress
	 */
	public String getEntryAddress() {
		return entryAddress;
	}
	/**
	
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * @param psno the psno to set
	 */
	public void setPsno(String psno) {
		this.psno = psno;
	}
	/**
	 * @param addr2 the addr2 to set
	 */
	public void setAddr2(String addr2) {
		this.addr2 = EncryptUtil.getInstance().decrypt(addr2);
	}
	/**
	 * @param signatureYn the signatureYn to set
	 */
	public void setSignatureYn(String signatureYn) {
		this.signatureYn = signatureYn;
	}
	/**
	 * @param entryAddress the entryAddress to set
	 */
	public void setEntryAddress(String entryAddress) {
		this.entryAddress = entryAddress;
	}
	
    /**
	 * @return the rollGrpCd
	 */
	public String getRollGrpCd() {
		return rollGrpCd;
	}
	/**
	 * @param rollGrpCd the rollGrpCd to set
	 */
	public void setRollGrpCd(String rollGrpCd) {
		this.rollGrpCd = rollGrpCd;
	}
	/**
	 * @return the formatCreatedOn
	 */
	public String getFormatCreatedOn() {
		return formatCreatedOn;
	}

	/**
	 * @param formatCreatedOn the formatCreatedOn to set
	 */
	public void setFormatCreatedOn(String formatCreatedOn) {
		this.formatCreatedOn = formatCreatedOn;
	}

	/**
	 * @return the startIndex
	 */
	public int getStartIndex() {
		return startIndex;
	}
	/**
	 * @return the lastIndex
	 */
	public int getLastIndex() {
		return lastIndex;
	}
	/**
	 * @param startIndex the startIndex to set
	 */
	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}
	/**
	 * @param lastIndex the lastIndex to set
	 */
	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}
	/**
	 * @return the recordSign
	 */
	public byte[] getRecordSign() {
		return recordSign;
	}
	/**
	 * @return the falsificationFlag
	 */
	public boolean isFalsificationFlag() {
		return falsificationFlag;
	}
	/**
	 * @param recordSign the recordSign to set
	 */
	public void setRecordSign(byte[] recordSign) {
		this.recordSign = recordSign;
	}
	/**
	 * @param falsificationFlag the falsificationFlag to set
	 */
	public void setFalsificationFlag(boolean falsificationFlag) {
		this.falsificationFlag = falsificationFlag;
	}

	public String getRollGrp() {
		return rollGrp;
	}
	public void setRollGrp(String rollGrp) {
		this.rollGrp = rollGrp;
	}
	/**
	 * @return the peerEncryptedYn
	 */
	public String getPeerEncryptedYn() {
		return peerEncryptedYn;
	}
	/**
	 * @param peerEncryptedYn the peerEncryptedYn to set
	 */
	public void setPeerEncryptedYn(String peerEncryptedYn) {
		this.peerEncryptedYn = peerEncryptedYn;
	}
	
	/**
	 * @return the expired
	 */
	public int getExpired() {
		return expired;
	}
	/**
	 * @return the period
	 */
	public int getPeriod() {
		return period;
	}
	/**
	 * @return the certYn
	 */
	public String getCertYn() {
		return certYn;
	}
	/**
	 * @param certYn the certYn to set
	 */
	public void setCertYn(String certYn) {
		this.certYn = certYn;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserDto [id=");
		builder.append(id);
		builder.append(", passwd=");
		builder.append(passwd);
		builder.append(", createdOn=");
		builder.append(createdOn);
		builder.append(", userLevel=");
		builder.append(userLevel);
		builder.append(", userType=");
		builder.append(userType);
		builder.append(", managerAuth=");
		builder.append(managerAuth);
		builder.append(", certDn=");
		builder.append(certDn);
		builder.append(", certPk=");
		builder.append(certPk);
		builder.append(", status=");
		builder.append(status);
		builder.append(", idn=");
		builder.append(idn);
		builder.append(", name=");
		builder.append(name);
		builder.append(", email=");
		builder.append(email);
		builder.append(", tel=");
		builder.append(tel);
		builder.append(", mobile=");
		builder.append(mobile);
		builder.append(", addr=");
		builder.append(addr);
		builder.append(", remark=");
		builder.append(remark);
		builder.append(", userId=");
		builder.append(userId);
		builder.append(", psno=");
		builder.append(psno);
		builder.append(", addr2=");
		builder.append(addr2);
		builder.append(", signatureYn=");
		builder.append(signatureYn);
		builder.append(", entryAddress=");
		builder.append(entryAddress);
		builder.append(", rollGrpCd=");
		builder.append(rollGrpCd);
		builder.append(", formatCreatedOn=");
		builder.append(formatCreatedOn);
		builder.append(", peerEncryptedYn=");
		builder.append(peerEncryptedYn);
		builder.append(", certYn=");
		builder.append(certYn);
		builder.append(", startIndex=");
		builder.append(startIndex);
		builder.append(", lastIndex=");
		builder.append(lastIndex);
		builder.append(", recordSign=");
		builder.append(Arrays.toString(recordSign));
		builder.append(", falsificationFlag=");
		builder.append(falsificationFlag);
		builder.append(", rollGrp=");
		builder.append(rollGrp);
		builder.append(", expired=");
		builder.append(expired);
		builder.append(", period=");
		builder.append(period);
		builder.append("]");
		return builder.toString();
	}
}
	
	
