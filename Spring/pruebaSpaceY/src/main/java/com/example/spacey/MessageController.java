package com.example.spacey;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.jdbc.core.RowMapper;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/messages")
public class MessageController {
	
	@Autowired
	private JdbcTemplate template;

	Map<Long, Message> messages = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<Message> Messages() {
		
		List<Message> messageList = template.query("SELECT * FROM Messages", new RowMapper<Message>() {
			@Override
			public Message mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Message(rowNum, rs.getString("Username"), rs.getString("Content"), rs.getBoolean("ServerInfo"));
			}
		});
		return messageList;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Message newMessage(@RequestBody Message msg) {

		long id = nextId.incrementAndGet();
		msg.setId(id);
		//messages.put(id, msg);
		
		String username = msg.getUserName();
		String content = msg.getContent();
		boolean svInfo = msg.isServerInfo();
		
		template.update("INSERT INTO Messages(Id,Username,Content,ServerInfo) VALUES('"+id+"','"+username+"','"+content+"','"+svInfo+"')");

		return msg;
	}

}
