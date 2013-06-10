package com.bizon.front.dao.manage;

import java.util.HashMap;
import java.util.List;

import com.bizon.front.dto.manage.EntryDto;
import com.bizon.front.dto.manage.UserDto;
import com.bizon.front.dto.manage.UserListDto;
import com.bizon.front.vo.manage.EntryVO;
import com.bizon.front.vo.manage.UserVO;

public interface UserDao {
	
	public HashMap selectUserMap(String userId);
	
	public UserDto selectUser(String userId);
	
	public UserDto selectSystemUser(String userType, String userLevel);
	
	public List<UserListDto> selectUserList(UserDto user);
	
	public int selectUserListCount(UserDto user);
	
	public void updateUserInfo(UserVO user);
	
	public void insertUserInfo(UserVO user);
	
	public void updateUserStatus(UserVO user);
	
	public UserDto selectUserCheck(String userId,String passwd);

	public String selectUserId(String idn, String name);
	
	public String selectUserCnt(String idn, String id, String name);
	
	public void updateUserPassword(String passwd, String id);
	
	public EntryDto selectEntry(String entryAddress);
	
	public void deleteEntry(String entryAddress);
	
	public void insertEntryInfo(EntryVO domain);
	
	public List<EntryDto> selectEntryList(EntryDto domain);
	
	public int selectEntryListCount(EntryDto domain);
	
	public void updateDropUser(String userId);
	
	public void tranSactionTest(HashMap map);

	public int selectBf_Ecp_Entry(String userAddress);

	public HashMap setPeerTypeCheck(String userId);

}
