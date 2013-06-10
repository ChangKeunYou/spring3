/**
 * Copyright (c) 2011-2012 Torpedo Corporations. All rights reserved.
 *
 * BizFrame and BizFrame-related trademarks and logos are
 * trademarks or registered trademarks of Torpedo Corporations
 */

package com.bizon.front.util;

import java.text.SimpleDateFormat;
import java.util.Date;


public class EcpDateUtil {

	private static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

	public static String format(Date date) {
		return format(date, DEFAULT_DATE_FORMAT);
	}

	public static String format(Date date, String format) {
		return new SimpleDateFormat(format).format(date);
	}
	
}
