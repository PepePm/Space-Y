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
@RequestMapping("/users")
public class UsersController {
	
	@Autowired
	private JdbcTemplate template;
	

	Map<Long, User> users = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<User> Users() {
		
		List<User> userList = template.query("SELECT * FROM Users", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User(rowNum, rs.getString("Name"), rs.getString("Password"), rs.getBoolean("Online"));
			}
			//rs.getBoolean("Online")
		});
		return userList;
	}
	
	@GetMapping("/count")
	public int countUsers() {
		
		List<User> userList = template.query("SELECT Name FROM Users", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User();
			}
			
		});

		return userList.size();
	}
	
	@GetMapping("/online")
	public Collection<User> UsersOnline() {
		
		List<User> userList = template.query("SELECT * FROM Users WHERE Online = 'true'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User(rowNum, rs.getString("Name"), rs.getString("Password"), rs.getBoolean("Online"));
			}
			
		});

		return userList;
	}
	
	@GetMapping("/countOnline")
	public int countUsersOnline() {
		
		List<User> userList = template.query("SELECT Name FROM Users WHERE Online = 'true'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User();
			}
			
		});

		return userList.size();
	}
	
	@PostMapping("/checkPassword")
	public boolean checkPassword(@RequestBody User user) {
		
		String username = user.getName();
		String password = user.getPassword();
		List<User> userList = template.query("SELECT * FROM Users WHERE Name='"+username+"'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return new User(rowNum, rs.getString("Name"), rs.getString("Password"), rs.getBoolean("Online"));
			}
			
		});

		if (userList.size() > 0) {
			
			if (userList.get(0).getPassword().equals(password)) {
				return true;
			}
		}
		
		return false;
		
	}
	
	@PostMapping("/check")
	public boolean checkUser(@RequestBody User user) {
		
		String username = user.getName();
		
		List<User> userList = template.query("SELECT * FROM Users WHERE Name='"+username+"'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return new User(rowNum, rs.getString("Name"), rs.getString("Password"), rs.getBoolean("Online"));
			}
			
		});

		if (userList.size() > 0) {
			
			return true;
		}
		
		return false;
		
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User newUser(@RequestBody User user) {

		long id = nextId.incrementAndGet();
		user.setId(id);
		users.put(id, user);
		
		String name = user.getName();
		String pass = user.getPassword();
		boolean online = user.isOnline();
		int img = user.getUserImg();
		template.update("INSERT INTO Users(Name,Password,Online,UserImage) VALUES('"+name+"','"+pass+"','"+online+"','"+img+"')");

		return user;
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateOnline(@PathVariable String id, @RequestBody User user) {

		boolean online = user.isOnline();
		
		template.update("UPDATE Users SET Online='"+online+"' WHERE Name='"+user.getName()+"';");

		return null;
	}
	
	@GetMapping("/{username}")
	public int GetNumImg(@PathVariable String username) {

		List<User> userList = template.query("SELECT * FROM Users WHERE Name='"+username+"'", new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				return new User(0, "", "", false, rs.getInt("UserImage"));
			}
			
		});
		
		return userList.get(0).getUserImg();
	}
	
	/*
	@GetMapping("/{id}")
	public ResponseEntity<Item> getItem(@PathVariable long id) {

		Item savedItem = items.get(id);

		if (savedItem != null) {
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Item> borraItem(@PathVariable long id) {

		Item savedItem = items.get(id);

		if (savedItem != null) {
			items.remove(savedItem.getId());
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
*/
}
