package com.bizon.front.dto.manage;

import java.io.Serializable;
import java.util.Date;

import com.bizon.front.util.EcpDateUtil;

/**  
 * @Description 등록자 정보
 * @author eunjung Jang
 * @since 2012.11.19
 *  
 * Copyright (주)비지니스온커뮤니케이션 All right reserved.
 */
public class EntryDto implements Serializable{
	
	private static final long serialVersionUID = 1675524265993213860L;
	
	private Date createdOn;					// 등록일
	private String entryAddress;			// 등록자
	private String delYn;					// 삭제여부
	private String entryCeoName;			// 대표자명
	private String entryStaus;				// 등록자 상태
	private Date entryDueDate;				//
	private String peerEncrypt;				//
	private String renewalRequestYn;		//
	private Date renewalRequestDate;		//
	private String entryRemark;				//
	private String entryName;				// 등록자 소유자명
	private String entryNum;				// 등록자 사업자번호
	private String entryNumType;			// 
	private String entryAddr;				// 주소
	private String entryEmail;				// 이메일
	private String entryPhone;				// 전화번호
	private String entryMobile;				// 휴대폰
	private String idInfoOpenYn;			// 공인전자주소 
	private String adminAssignYn;			//
	private String representId;				//
	private String userType;				//
	private String formatCreatedOn;			// 메시지 등록일자 문자(날짜형식에 맞춤)
	private String formatentryDueDate;		//
	
	private int startIndex = 0;	// 목록조회 시작 index
	private int lastIndex = 0;	// 목록조회 종료 index 
	
	
	/**
	 * @return the createdOn
	 */
	public Date getCreatedOn() {
		return createdOn;
	}
	/**
	 * @return the entryAddress
	 */
	public String getEntryAddress() {
		return entryAddress;
	}
	/**
	 * @return the delYn
	 */
	public String getDelYn() {
		return delYn;
	}
	/**
	 * @return the entryCeoName
	 */
	public String getEntryCeoName() {
		return entryCeoName;
	}
	
	/**
	 * @return the entryStaus
	 */
	public String getEntryStaus() {
		return entryStaus;
	}
	/**
	 * @return the entryDueDate
	 */
	public Date getEntryDueDate() {
		return entryDueDate;
	}
	/**
	 * @return the peerEncrypt
	 */
	public String getPeerEncrypt() {
		return peerEncrypt;
	}
	/**
	 * @return the renewalRequestYn
	 */
	public String getRenewalRequestYn() {
		return renewalRequestYn;
	}
	/**
	 * @return the renewalRequestDate
	 */
	public Date getRenewalRequestDate() {
		return renewalRequestDate;
	}
	/**
	 * @return the entryRemark
	 */
	public String getEntryRemark() {
		return entryRemark;
	}
	/**
	 * @return the entryName
	 */
	public String getEntryName() {
		return entryName;
	}
	/**
	 * @return the entryNum
	 */
	public String getEntryNum() {
		return entryNum;
	}
	/**
	 * @return the entryNumType
	 */
	public String getEntryNumType() {
		return entryNumType;
	}
	/**
	 * @return the entryAddr
	 */
	public String getEntryAddr() {
		return entryAddr;
	}
	/**
	 * @return the entryEmail
	 */
	public String getEntryEmail() {
		return entryEmail;
	}
	/**
	 * @return the entryPhone
	 */
	public String getEntryPhone() {
		return entryPhone;
	}
	/**
	 * @return the entryMobile
	 */
	public String getEntryMobile() {
		return entryMobile;
	}
	/**
	 * @return the idInfoOpenYn
	 */
	public String getIdInfoOpenYn() {
		return idInfoOpenYn;
	}
	/**
	 * @return the adminAssignYn
	 */
	public String getAdminAssignYn() {
		return adminAssignYn;
	}
	/**
	 * @return the representId
	 */
	public String getRepresentId() {
		return representId;
	}
	/**
	 * @param createdOn the createdOn to set
	 */
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
		this.formatCreatedOn = EcpDateUtil.format(createdOn);
	}
	/**
	 * @param entryAddress the entryAddress to set
	 */
	public void setEntryAddress(String entryAddress) {
		this.entryAddress = entryAddress;
	}
	/**
	 * @param delYn the delYn to set
	 */
	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
	/**
	 * @param entryCeoName the entryCeoName to set
	 */
	public void setEntryCeoName(String entryCeoName) {
		this.entryCeoName = entryCeoName;
	}

	/**
	 * @param entryStaus the entryStaus to set
	 */
	public void setEntryStaus(String entryStaus) {
		this.entryStaus = entryStaus;
	}
	/**
	 * @param entryDueDate the entryDueDate to set
	 */
	public void setEntryDueDate(Date entryDueDate) {
		this.entryDueDate = entryDueDate;
		this.formatentryDueDate = EcpDateUtil.format(entryDueDate);
	}
	/**
	 * @param peerEncrypt the peerEncrypt to set
	 */
	public void setPeerEncrypt(String peerEncrypt) {
		this.peerEncrypt = peerEncrypt;
	}
	/**
	 * @param renewalRequestYn the renewalRequestYn to set
	 */
	public void setRenewalRequestYn(String renewalRequestYn) {
		this.renewalRequestYn = renewalRequestYn;
	}
	/**
	 * @param renewalRequestDate the renewalRequestDate to set
	 */
	public void setRenewalRequestDate(Date renewalRequestDate) {
		this.renewalRequestDate = renewalRequestDate;
	}
	/**
	 * @param entryRemark the entryRemark to set
	 */
	public void setEntryRemark(String entryRemark) {
		this.entryRemark = entryRemark;
	}
	/**
	 * @param entryName the entryName to set
	 */
	public void setEntryName(String entryName) {
		this.entryName = entryName;
	}
	/**
	 * @param entryNum the entryNum to set
	 */
	public void setEntryNum(String entryNum) {
		this.entryNum = entryNum;
	}
	/**
	 * @param entryNumType the entryNumType to set
	 */
	public void setEntryNumType(String entryNumType) {
		this.entryNumType = entryNumType;
	}
	/**
	 * @param entryAddr the entryAddr to set
	 */
	public void setEntryAddr(String entryAddr) {
		this.entryAddr = entryAddr;
	}
	/**
	 * @param entryEmail the entryEmail to set
	 */
	public void setEntryEmail(String entryEmail) {
		this.entryEmail = entryEmail;
	}
	/**
	 * @param entryPhone the entryPhone to set
	 */
	public void setEntryPhone(String entryPhone) {
		this.entryPhone = entryPhone;
	}
	
	/**
	 * @param entryMobile the entryMobile to set
	 */
	public void setEntryMobile(String entryMobile) {
		this.entryMobile = entryMobile;
	}
	/**
	 * @param idInfoOpenYn the idInfoOpenYn to set
	 */
	public void setIdInfoOpenYn(String idInfoOpenYn) {
		this.idInfoOpenYn = idInfoOpenYn;
	}
	/**
	 * @param adminAssignYn the adminAssignYn to set
	 */
	public void setAdminAssignYn(String adminAssignYn) {
		this.adminAssignYn = adminAssignYn;
	}
	/**
	 * @param representId the representId to set
	 */
	public void setRepresentId(String representId) {
		this.representId = representId;
	}
	
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getFormatCreatedOn() {
		return formatCreatedOn;
	}
	public void setFormatCreatedOn(String formatCreatedOn) {
		this.formatCreatedOn = formatCreatedOn;
	}
	public String getFormatentryDueDate() {
		return formatentryDueDate;
	}
	public void setFormatentryDueDate(String formatentryDueDate) {
		this.formatentryDueDate = formatentryDueDate;
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
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("EntryDto [createdOn=");
		builder.append(createdOn);
		builder.append(", entryAddress=");
		builder.append(entryAddress);
		builder.append(", delYn=");
		builder.append(delYn);
		builder.append(", entryCeoName=");
		builder.append(entryCeoName);
		builder.append(", USER_TYPE=");
		builder.append(", entryStaus=");
		builder.append(entryStaus);
		builder.append(", entryDueDate=");
		builder.append(entryDueDate);
		builder.append(", peerEncrypt=");
		builder.append(peerEncrypt);
		builder.append(", renewalRequestYn=");
		builder.append(renewalRequestYn);
		builder.append(", renewalRequestDate=");
		builder.append(renewalRequestDate);
		builder.append(", entryRemark=");
		builder.append(entryRemark);
		builder.append(", entryName=");
		builder.append(entryName);
		builder.append(", entryNum=");
		builder.append(entryNum);
		builder.append(", entryNumType=");
		builder.append(entryNumType);
		builder.append(", entryAddr=");
		builder.append(entryAddr);
		builder.append(", entryEmail=");
		builder.append(entryEmail);
		builder.append(", entryPhone=");
		builder.append(entryPhone);
		builder.append(", entryMobile=");
		builder.append(entryMobile);
		builder.append(", idInfoOpenYn=");
		builder.append(idInfoOpenYn);
		builder.append(", adminAssignYn=");
		builder.append(adminAssignYn);
		builder.append(", representId=");
		builder.append(representId);
		builder.append("]");
		return builder.toString();
	}
	

}
