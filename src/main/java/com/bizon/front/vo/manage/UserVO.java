package com.bizon.front.vo.manage;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

//import kr.co.bizframe.util.Base64; 
import com.bizon.front.util.EncryptUtil;

public class UserVO implements Serializable{
	
	private static final long serialVersionUID = 4696490733318539098L;

    private String id;
    private String passwd;
    private Date createdOn;
    private int userLevel;
    private String userType;
    private int managerAuth;
    private int peerEncrypted;
    private String certDn;
    private String certPk;
    private int status; // 0: 등록, 1: 승인, 2: 삭제
    private String idn;
    private String name;
    private String email;
    private String tel;
    private String mobile;
    private String addr;
    private String remark;
    private String ownerName;
    private String kmCertBase64;
    private String signCertBase64;
	private String userId;
    private String psno;
    private String addr2;
    private String signatureYn;
    private String entryAddress;
    private String rollGrp;
    private List<String> accountIdList;	// 계정Id
    private String peerEncryptedYn;
    private byte[] recordSign;					// 위변조방지 Sign
	private boolean falsificationFlag = false;	// 위변조여부 
	private String signCert;
    private String passwd2;
    private int expired;
    private int period;
    private String certYn;	// 인증서 사용할지 안 할지
    
	/**
	 * @return the period
	 */
	public int getPeriod() {
		return period;
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
		this.passwd = EncryptUtil.getInstance().getHash(passwd);
	}
	public Date getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
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
	public int getPeerEncrypted() {
		return peerEncrypted;
	}
	public void setPeerEncrypted(int peerEncrypted) {
		this.peerEncrypted = peerEncrypted;
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
		//setKmCertBase64(Base64.encode(certPk.getBytes()));
		this.certPk = certPk;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getIdn() {
		return idn;
	}
	public void setIdn(String idn) {
		this.idn = EncryptUtil.getInstance().encrypt(idn);
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
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = EncryptUtil.getInstance().encrypt(tel);//VO에서 암호화 하여 데이터 삽입.
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = EncryptUtil.getInstance().encrypt(mobile);
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = EncryptUtil.getInstance().encrypt(addr);
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getSignCertBase64() {
		return signCertBase64;
	}
	public void setSignCertBase64(String signCertBase64) {
		this.signCertBase64 = signCertBase64;
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
		this.addr2 = EncryptUtil.getInstance().encrypt(addr2);
	}
	/**
	 * @param signatureYn the signatureYn to set
	 */
	public void setSignatureYn(String signatureYn) {
		this.signatureYn = signatureYn;
	}
	
	/**
	 * @return the entryAddress
	 */
	public String getEntryAddress() {
		return entryAddress;
	}
	/**
	 * @param entryAddress the entryAddress to set
	 */
	public void setEntryAddress(String entryAddress) {
		this.entryAddress = entryAddress;
	}
	/**
	 * @return the rollGrp
	 */
	public String getRollGrp() {
		return rollGrp;
	}
	/**
	 * @param rollGrp the rollGrp to set
	 */
	public void setRollGrp(String rollGrp) {
		this.rollGrp = rollGrp;
	}
	
	
	/**
	 * @return the accountIdList
	 */
	public List<String> getAccountIdList() {
		return accountIdList;
	}
	/**
	 * @param accountIdList the accountIdList to set
	 */
	public void setAccountIdList(List<String> accountIdList) {
		this.accountIdList = accountIdList;
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
	
	public byte[] getKmCert() {
		//return (kmCertBase64 != null) ? Base64.decode(kmCertBase64) : null;
		return null;
	}

	public String getKmCertBase64() {
		return kmCertBase64;
	}

	public void setKmCert(byte[] kmCert) {
		if (kmCert != null && kmCert.length > 0) {
			//setKmCertBase64(Base64.encode(kmCert));
		}
	}
	
	public void setKmCertBase64(String kmCertBase64) {
		this.kmCertBase64 = kmCertBase64;
	}
	
	public String getPasswd2() {
		return passwd2;
	}
	public void setPasswd2(String passwd2) {
		this.passwd2 = passwd2;
	}
	
	/**
	 * @return the expired
	 */
	public int getExpired() {
		return expired;
	}
	/**
	 * @param expired the expired to set
	 */
	public void setExpired(int expired) {
		this.expired = expired;
	}
	/**
	 * @return the signCert
	 */
	public String getSignCert() {
		return signCert;
	}
	/**
	 * @param signCert the signCert to set
	 */
	public void setSignCert(String signCert) {
		this.signCert = signCert;
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
		builder.append("UserVO [id=");
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
		builder.append(", peerEncrypted=");
		builder.append(peerEncrypted);
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
		builder.append(", ownerName=");
		builder.append(ownerName);
		builder.append(", kmCertBase64=");
		builder.append(kmCertBase64);
		builder.append(", signCertBase64=");
		builder.append(signCertBase64);
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
		builder.append(", rollGrp=");
		builder.append(rollGrp);
		builder.append(", accountIdList=");
		builder.append(accountIdList);
		builder.append(", peerEncryptedYn=");
		builder.append(peerEncryptedYn);
		builder.append(", recordSign=");
		builder.append(Arrays.toString(recordSign));
		builder.append(", falsificationFlag=");
		builder.append(falsificationFlag);
		builder.append(", signCert=");
		builder.append(signCert);
		builder.append(", passwd2=");
		builder.append(passwd2);
		builder.append(", expired=");
		builder.append(expired);
		builder.append(", period=");
		builder.append(period);
		builder.append(", certYn=");
		builder.append(certYn);
		builder.append("]");
		return builder.toString();
	}
	
}  
