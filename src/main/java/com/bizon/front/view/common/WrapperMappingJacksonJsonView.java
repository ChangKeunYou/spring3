package com.bizon.front.view.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

public class WrapperMappingJacksonJsonView extends MappingJacksonJsonView {
	
	private String contentType;
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	
	public WrapperMappingJacksonJsonView(String contentType) {
		super();
		logger.info("parsing ContentType=>" + contentType);
		this.contentType = contentType;
	}
	
	public String getContentType() {
		return this.contentType;
	}

}
