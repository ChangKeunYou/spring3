package com.bizon.front.service.test;


import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.bizon.front.dao.com.DaoComExec;
import com.bizon.front.dao.manage.UserDao;

//@Transactional(rollbackFor={Exception.class,RuntimeException.class})
//@TransactionConfiguration

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/junit_test_config/dispacher-junit-test-servlet.xml"})
public class TranSactionTest_Junit {
	
	
    
	@Autowired
	private UserDao userDao;
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	
	@Autowired
	private DaoComExec daoComExec;
	
	
	@Autowired
	private TranSactionDAOTemplate tranSactionDAOTemplate;
	
	
	@Before
	public void init(){
		logger.info("=========================TranSactionTest Start=====================");
	}
	
	
	@Test
	//@Transactional(rollbackFor={Exception.class})
	public void testTran(){
		
		// TODO Auto-generated method stub
		System.out.println("Spring3 junit Test=>" + userDao.getClass().getName());
		System.out.println("TranSactionDAOTemplate junit Test=>" + tranSactionDAOTemplate.getClass().getName());
		//System.out.println("#### => " + logWriter.toString());
		//logger.info("test");
		  MockHttpServletRequest request = new MockHttpServletRequest();//야메 request
		  MockHttpServletResponse response = new MockHttpServletResponse(); //야메 response
		try{
			request.setAttribute("testValue", "testValue123123");
			this.tranSactionDAOTemplate.tranSactionTest();
			
		}catch(Exception e){
			String errorMessage = "트랜잭션 테스트 에러 =>" + e.getMessage();
			System.out.println("ServiceAreaException=>" + errorMessage);
			logger.info(errorMessage, e);
		}finally{
			logger.info("=================UserInfoServiceTest TransactionTest End==============");
			logger.info("requestGetattribute=>" + (String)request.getAttribute("testValue"));
		}
	}
	
	
	@Ignore
	@Test
	public void argTest(){
		this.dynamicArgTest("1","2","3","4");
	}
	
	private void dynamicArgTest(String... test){
		
		for(String str : test){
			logger.info(str);
		}
	}
	
	
	public static void main(String[] args){
		TranSactionTest_Junit test = new TranSactionTest_Junit();
		try{
		test.testTran();
		}catch(Exception e){
			System.err.println(e.getMessage());
		}finally{}
		
	}
	
}
