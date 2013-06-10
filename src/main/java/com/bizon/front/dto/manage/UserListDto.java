package com.bizon.front.dto.manage;

import java.io.Serializable;
import java.util.Date;

import com.bizon.front.util.EcpDateUtil;
import com.bizon.front.util.EncryptUtil;

public class UserListDto implements Serializable{

	private static final long serialVersionUID = 4246866081464181501L;
	
	EncryptUtil eUtil = new EncryptUtil("encryptKey", "InitVect");
	
	private String id;
    private String passwd;
    private Date createdOn;
    private int userLevel;
    private int userType;
    private int managerAuth;
    private String certDn;
    private String certPk;
    private int status;
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
    private String formatCreatedOn;			// 메시지 등록일자 문자(날짜형식에 맞춤)
    
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
	public int getUserType() {
		return userType;
	}
	public void setUserType(int userType) {
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
	public String getIdn() {
		return idn;
	}
	public void setIdn(String idn) {
		this.idn = eUtil.decrypt(idn);
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
		this.tel = eUtil.decrypt(tel);
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = eUtil.decrypt(mobile);
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = eUtil.decrypt(addr);
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
	 * @return the rollGrpCd
	 */
	public String getRollGrpCd() {
		return rollGrpCd;
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
		this.addr2 = eUtil.decrypt(addr2);
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
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserListDto [id=");
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
		builder.append("]");
		return builder.toString();
	}
}
