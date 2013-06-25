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
		HashMap<String,Object> submap = null;
		ArrayList<HashMap<String,Object>> dataList = new ArrayList<HashMap<String,Object>>();
		try{

			for (int i = 0; i < 10; i++){
				submap = new HashMap<String,Object>();
				submap.put("CREDITCARDID", "test" + (i+1));
				submap.put("CARDTYPE", "Vista");
				submap.put("CARDNUMBER", "402857058292010" + i);
				submap.put("CARDNUMBER_V", "4028-5705-8292-010" + i);
				submap.put("EXPYEAR", "2013");
				submap.put("EXPMONTH", "08");
				submap.put("MODIFIEDDATE", "20130801");
				dataList.add(submap);
			}
			
		
		
			
			
			map.put("Result", dataList);
			
			
			
			logger.info("daoComExec=>" + this.daoComExec.getClass().getName());
			
		}catch(Exception e){
			throw new RuntimeException(e.getMessage());
		}
		
		
		
		return map;
	}
	
	
	
	
}
