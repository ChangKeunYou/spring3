package com.bizon.front.controller.sample;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bizon.front.dao.com.DaoComExec;
import com.bizon.front.service.sample.YUI_Sample_Service;
import com.bizon.front.view.common.WrapperMappingJacksonJsonView;


@Controller
@RequestMapping(value="/yui",method = {RequestMethod.GET, RequestMethod.POST})
public class YUI_Sample_Controller {
	
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	
	
	@Autowired
	private YUI_Sample_Service yuiService;
	
	 /**
	  * 
	  * @param session
	  * @param model
	  * @param request
	  * @param response
	  * response 객체를 파라메터로 갖고 있을 경우 json으로 파싱이 안나간다.
	  * new WrapperMappingJacksonJsonView("text/plain").render(model, request, response); 이용해서 나갈 것
	  */
	 @RequestMapping(value="yuiSearch_Sample.json")
	 public void yuiSearch_Sample(HttpSession session, ModelMap model,HttpServletRequest request, HttpServletResponse response)throws Exception{
		 
		 try{
			 
			 //logger.info("서버사이드 타기 시작....");
			 
			 HashMap dataMap = this.yuiService.getSampleDataSearch(request,response);
			 
			 
			 model.addAttribute("Results", dataMap);
			 
		 }catch(Exception e){
			 logger.error("YUISearch Exception=>" + e.getMessage());
			 model.addAttribute("Results", "Exception : " + e.getMessage());
			 throw e;
		 }finally{
			 
		 }
		 
		 new WrapperMappingJacksonJsonView("application/json").render(model, request, response);
		 
	 }
	
}
