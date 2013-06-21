package com.bizon.front.dao.mapper_bizon.mbr;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.bizon.front.dto.manage.UserDto;

@Service(value="daoMbr_bizon")
public interface DaoMbr {
	                                                    
	                        
	/**  
	 * ID 중복검사
	 * @param map
	 * @return
	 */   
	public int getUserDuplicationSch(HashMap map);
	
	
	/**
	 * 사용자 등록
	 * @param map
	 */
	public void setUserReg(HashMap map);
	
	
	/**
	 * 관리자 관련찾아오는 쿼리
	 * @param string
	 * @param string2
	 * @return
	 */
	public HashMap selectSystemUser(String string, String string2);
	
	/**
	 * 로그인 사용자 있는지 확인
	 * @param userId
	 * @return
	 */
	public HashMap<String, Object> selectUserMap(String userId);
	
	/**
	 * 사용자 자체구축인지 검사
	 * @param userId
	 * @return
	 */
	public HashMap setPeerTypeCheck(String userId);
	
	/**
	 * userid and passwd 체크
	 * @param map
	 * @return
	 */
	public int getUserPwdChk(HashMap<String, Object> map);

	
	/**
	 * 사용자 수정
	 * @param map
	 */
	public void setUserUpd(HashMap<String, Object> map);
	
	
	/**
	 * 사용자 수정 하위단
	 * @param map
	 */
	public void setUpuUserUpd(HashMap<String, Object> map);
	
	
	/**
	 * 사용자 ID 찾기
	 * @param map
	 * @return
	 */
	public ArrayList getUserIdSch(HashMap map);
	
	/**
	 * BF_ECP_USER 및 BF_ECP_ENTRY 조인하여 사용자 조회
	 * @param userid
	 * @return
	 */
	public ArrayList getEntryUserSch(String userid);
	
	/**
	 * 로그인 시 사용가능한 계정정보 조회
	 * @param userId
	 * @return
	 */
	public ArrayList getValidAddressList(String userId);



}
