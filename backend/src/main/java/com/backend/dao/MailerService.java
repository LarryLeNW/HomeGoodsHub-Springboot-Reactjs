package com.backend.dao;




import com.backend.entity.MailInfo;

import jakarta.mail.MessagingException;

public interface MailerService {

	void send(MailInfo mail) throws MessagingException;

	void send(String to, String subject, String body) throws MessagingException;
	

}
