package com.bizon.front.service.test;

import java.text.*;
import java.sql.*;
import java.util.*;
import java.lang.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.bizon.front.dao.com.DaoComExec;


public class TranSactionDAOTemplate {
	
	
	
	private DaoComExec daoComExec;
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	public DaoComExec getDaoComExec() {
		return daoComExec;
	}

	public void setDaoComExec(DaoComExec daoComExec) {
		this.daoComExec = daoComExec;
	}



	public TranSactionDAOTemplate(){
		super();
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
	}
	
	
	
	public void tranSactionTest()throws Exception{

		
			//목오브젝트 이용하여 가짜req,res생성 가능함...
		
			logger.info("DIClass====>" + this.daoComExec.getClass().getName() );
			
			logger.info("=================UserInfoServiceTest TransactionTest Start==============");
			
			HashMap map = new HashMap();
			for(int i = 0; i < 10; i++){
				
				map.put("id", (i+1));
				map.put("col1", "col1Test" + (i+1));
				map.put("col2", "col2Test" + (i+1));
				
				
				logger.info("mapParam=>" + map.toString());
				
				//this.userDao.tranSactionTest(map);
				this.daoComExec.insert("tran_test.testInsert", map);
			}//
			
			if(true){
				throw new RuntimeException("트랜잭션 강제오류");
			}
			
	}
	
	
	
	
}
