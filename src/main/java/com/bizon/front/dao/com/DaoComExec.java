package com.bizon.front.dao.com;

import java.util.List;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.transaction.annotation.Transactional;

/**  
 * @Description SQLID로 sql 실행하기 위한 DAO
 * @since 2013.05.09
 *  
 * Copyright (주)프론티어솔루션 All right reserved.
 */
public class DaoComExec extends SqlSessionDaoSupport {

	/**
	 * Insert Sql 실행
	 * @param sqlId
	 * @return
	 */
	public int insert(String sqlId) {
		return getSqlSession().insert(sqlId);
    }
	
	/**
	 * Insert Sql 실행
	 * @param sqlId
	 * @param param
	 * @return
	 */
	public int insert(String sqlId, Object param) {
		return getSqlSession().insert(sqlId, param);
    }
	
	/**
	 * Update Sql 실행
	 * @param sqlId
	 * @return
	 */
	public int update(String sqlId) {
		return getSqlSession().update(sqlId);
    }
	
	/**
	 * Update Sql 실행
	 * @param sqlId
	 * @param param
	 * @return
	 */
	public int update(String sqlId, Object param) {
		return getSqlSession().update(sqlId, param);
    }
	
	/**
	 * Delete Sql 실행
	 * @param sqlId
	 * @return
	 */
	public int delete(String sqlId) {
		return getSqlSession().delete(sqlId);
    }
	
	/**
	 * Delete Sql 실행
	 * @param sqlId
	 * @param param
	 * @return
	 */
	public int delete(String sqlId, Object param) {
		return getSqlSession().delete(sqlId, param);
    }
	
	/**
	 * 단건 조회 Sql 실행
	 * @param sqlId
	 * @return
	 */
	public Object selectOne(String sqlId) {
		return getSqlSession().selectOne(sqlId);
    }
	
	/**
	 * 단건 조회 Sql 실행
	 * @param sqlId
	 * @param param
	 * @return
	 */
	public Object selectOne(String sqlId, Object param) {
		return getSqlSession().selectOne(sqlId, param);
    }
	
	/**
	 * 다건 조회 Sql 실행
	 * @param sqlId
	 * @return
	 */
	public List<Object> selectList(String sqlId) {
		return getSqlSession().selectList(sqlId);
    }
	
	/**
	 * 다건 조회 Sql 실행
	 * @param sqlId
	 * @param param
	 * @return
	 */
	public List<Object> selectList(String sqlId, Object param) {
		return getSqlSession().selectList(sqlId, param);
    }
}
 
