package com.bizon.front.controller.common;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bizon.front.service.module.AbsService;

/**
 * 2012.06.17
 * 비즈온 유창근
 * @author yck
 * 
 * 해당 컨트롤러의 목적은 동적 URL을 받아 해당 jsp가 있는 곳으로 포워딩 해주는 컨트롤러이다
 * 허나 실제 변경이 되는 jsp 즉 컨텐츠 부분의 jsp는 tiles 설정된 부분에서 변경이 가해진다.  
 * 
 */
@Controller
@RequestMapping(value="/main",method = {RequestMethod.GET})
public class TilesForwardController extends AbsService{
		
	 private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	 
	 
	 @RequestMapping(value="/{path1}")
	 public String forwardTilesPage(@PathVariable String path1,Locale locale, Model model , HttpServletRequest request,HttpServletResponse response){
		 logger.info("Tiles3PageForward=>/WEB-INF/jsp/" + path1 + ".jsp");
		 logger.info("Tiles3FileConfig=>tiles/" + path1);
		 return "tiles/" + path1;
	 }
	
	
	 @RequestMapping(value="/{path1}/{path2}")
	 public String forwardTilesPage(@PathVariable String path1,@PathVariable String path2,Locale locale, Model model , HttpServletRequest request,HttpServletResponse response){
		 logger.info("Tiles3PageForward=>/WEB-INF/jsp/" + path1 + "/" + path2 + ".jsp");
		 logger.info("Tiles3FileConfig=>tiles/" + path1 + "/" + path2);
		 return "tiles/" + path1 + "/" + path2;
	 }
	 
	 @RequestMapping(value="/{path1}/{path2}/{path3}")
	 public String forwardTilesPage(@PathVariable String path1,@PathVariable String path2,@PathVariable String path3,Locale locale, Model model , HttpServletRequest request,HttpServletResponse response){
		 logger.info("Tiles3PageForward=>/WEB-INF/jsp/" + path1 + "/" + path2 + "/" + path3 + ".jsp");
		 logger.info("Tiles3FileConfig=>tiles/" + path1 + "/" + path2 + "/" + path3);
		 return "tiles/" + path1 + "/" + path2 + "/" + path3;
	 }
	
	
}
