package www.web.projects;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

public class Sha256SecurityJunit {
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@Test
	public void shs256Test(){
		Sha256SecurityTest test = new Sha256SecurityTest("yck1234!!");
		try{
			log.info(test.base64Edcoding().base64Decoding().sha256Encoding().toString());
		}catch(Exception e){
			log.error("SecurityException=" + e.getMessage());//git commit test..   123
		}finally{}
	}
	
}
