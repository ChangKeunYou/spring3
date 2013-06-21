package www.web.projects;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;
import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.bizon.front.dao.com.DaoComExec;
//import com.bizon.front.dao.manage.UserDao;
import com.bizon.front.dao.mbr.DaoMbr;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	private DaoComExec daoComExec;
	
	
	@Autowired
	private DaoComExec daoComExecForMtgi;
	
	
	
	
	 @Autowired
	 private JavaMailSender mailSender;
    /*
	@Autowired
	 private UserDao userDao;
	
	@Autowired
	private DaoMbr daoMbr;
	*/
	/*
	 @Resource
	 private MailSender mailSender;
	*/
	
	
	/**
	 * Simply selects the home view to render by returning its name.    dddd1234
	 */
	
	@RequestMapping(value = "/index.view", method = RequestMethod.GET)
	public String home(Locale locale, Model model , HttpServletRequest request,HttpServletResponse response) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();       
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		System.out.println(this.getClass().getName());
		String formattedDate = dateFormat.format(date);
		System.out.println("dd=" + SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME);
	
		
		logger.info("daoComExec jndi=======>" + daoComExec.getClass().getName() + " : " + daoComExec.hashCode() + " : " + daoComExec);
		logger.info("daoComExecForMtgi jndi=======>" + daoComExecForMtgi.getClass().getName() + " : " + daoComExecForMtgi.hashCode() + " : " + daoComExecForMtgi);
		
		
		
		ArrayList daoComExec_a = (ArrayList)this.daoComExec.selectList("tran_test.testSelect");
		ArrayList daoComExecForMtgi_a = (ArrayList)this.daoComExecForMtgi.selectList("test1.testSelect");
		
		logger.info(daoComExec_a.toString());
		
		logger.info(daoComExecForMtgi_a.toString());
		
		/*
		for(int i = 0; i < 10; i++){
			this.daoComExec.insert("tran_test.insert_1");
			
		}
		
		this.daoComExecForMtgi.insert("test1.insert_1");
		
		if(true){
			throw new RuntimeException();
		}
		*/
		//logger.info("mailSender DI=>" + mailSender.getClass().getName() + " : " + mailSender.getClass().hashCode());
		

		System.out.println("Test Jrebel...11443..");
		//????
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	 
	 /*
	@RequestMapping(value = "/index.view", method = RequestMethod.GET)
	public ModelAndView goPage(Locale locale, Model model , HttpServletRequest request,HttpServletResponse response) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();       
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		System.out.println(this.getClass().getName());
		String formattedDate = dateFormat.format(date);
		System.out.println("dd=" + SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME);
	
		
		//logger.info("mailSender DI=>" + mailSender.getClass().getName() + " : " + mailSender.getClass().hashCode());
		

		System.out.println("Test Jrebel...1133..");
		//????
		model.addAttribute("serverTime", formattedDate );
		
		return new ModelAndView("tiles/yck/yck");//모델엔 뷰로 리턴하더라도 타일즈에 정의된 것으로 리턴할 것.....그래야 타일즈가 입혀져서 나간다
	}
	*/
	
}
