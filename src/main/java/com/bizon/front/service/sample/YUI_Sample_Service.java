package com.bizon.front.service.sample;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bizon.front.dao.com.DaoComExec;
import com.bizon.front.service.module.AbsService;

@Service(value="yuiService")
public class YUI_Sample_Service extends AbsService  {
	
	
	
	@Autowired
	private DaoComExec daoComExec;
	
	
	
	//데이터 샘플 조회
	public HashMap getSampleDataSearch(HttpServletRequest request,HttpServletResponse response) {
		// TODO Auto-generated method stub
		HashMap map = this.executeParamUpdate(request);
		
		try{
			  
			int totalCount = (int)this.daoComExec.selectOne(map.get("getCount").toString(), map);
			
			map.put("totalRecord", totalCount);
			
			this.getPaginator(map);
			
			
			ArrayList<HashMap<String,Object>> dataList = (ArrayList)this.daoComExec.selectList(map.get("namespace").toString(), map);
			
			map.put("Result", dataList);
			
			//logger.info("data========>" + map.get("Result").toString());
			//logger.info(map.toString());	
			
		}catch(Exception e){
			logger.error("dataSearchException : " + e.getMessage());
			throw new RuntimeException(e.getMessage());
		}finally{}
		
		
		
		return map;
	}


	/**
	 * 페이징에 관련된 값들을 해당 펑션을 이용하여 담는다.
	 * @param map
	 */
	private void getPaginator(HashMap map) throws Exception {
		// TODO Auto-generated method stub
		int page = 1; //현제 페이지
		int itemsPerPage = 25; //화면에 보여질 갯수
		int start = 0; 
		int end = 0;
		
		//logger.info("Paginator=>" + map.toString());
		
		if(map.containsKey("page")){
			page = Integer.parseInt(map.get("page").toString());
		}
		
		if(map.containsKey("itemsPerPage")){
			itemsPerPage = Integer.parseInt(map.get("itemsPerPage").toString());
		}
		
		start = ((page * itemsPerPage) - itemsPerPage) + 1;//시작
		end = (page * itemsPerPage);
		
		
		map.put("start",start);
		map.put("end", end);
		
	}
	
	
	
	
}
