package www.web.projects;

import java.io.PrintWriter;
import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 메일 테스트 
 * ajax 기반으로 테스트
 * @author yck
 *
 */
@Controller
public class MailController {
	
	 @Resource
	 private JavaMailSender mailSender;
	 
	 
	 @Resource(lookup="bizonMail")
	 private Session mailSession;
	 
	 private Logger logger = LoggerFactory.getLogger(this.getClass());
	 
	 
	 
	 @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
	 public void mailSendTest(HttpSession session, ModelMap model,HttpServletRequest request, HttpServletResponse response){
		 
		 //logger.info("여기탄다???");
		 logger.info("보내는사람===>" + request.getParameter("from_mail"));
		 logger.info("받는사람===>" + request.getParameter("to_mail"));
		 
		 logger.info("mailSender=====>" + mailSender.hashCode());
		 logger.info("mailSession=>" + mailSession.hashCode() + " : " + mailSession);
		 
		 	
        try {
        	
        	MimeMessage message = mailSender.createMimeMessage();
        	
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setSubject(request.getParameter("mail_title"));
            messageHelper.setTo(request.getParameter("to_mail"));
            
            
            messageHelper.setFrom(request.getParameter("from_mail"));
            messageHelper.setText(request.getParameter("mail_content"), true);
            mailSender.send(message);
            
            
            model.addAttribute("code", "0");
            model.addAttribute("message", "메일을 성공적으로 발송하였습니다.");
            
        } catch (Exception e) {
            model.addAttribute("code", "1");
            model.addAttribute("message", e.getMessage());
            e.printStackTrace();
          
        }finally{
        	  this.getJsonReturn(model,request,response);
        }
	 
	   }
	 
	 
	 @RequestMapping(value="/mail/mailTest.view" , method = {RequestMethod.GET, RequestMethod.POST})
	 public String mailPage(Locale locale, Model model , HttpServletRequest request,HttpServletResponse response){
		 logger.info("test1");
		 return "mail/mailTest";
	 }
	 
	 
	private void getJsonReturn(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		StringBuilder sb = new StringBuilder();
		PrintWriter out = null; 
		try{
			//System.out.println(model.get("code") + " : " + model.get("message"));
			response.setContentType("application/json;charset=utf-8");
			//response.setContentType("text/html;charset=utf-8");
			
			out = response.getWriter();
				sb.append("{");
					sb.append("\"code\"").append(":\"").append(model.get("code").toString().trim()).append("\",");
					sb.append("\"message\"").append(":\"").append(model.get("message").toString().trim()).append("\"");
				sb.append("}");
			logger.info("parsing=>" + sb.toString());	
			out.println(sb.toString());//json리턴
		}catch(Exception e){
			logger.error("JsonReturnFailException=" + e.getMessage());
		}finally{
			out.close();
		}
	}
		
	 
	 
}