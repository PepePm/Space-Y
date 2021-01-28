package com.example.spacey;

import org.springframework.stereotype.Component;

@Component
public class User {

	private long id;
	private String name;
	private String password;
	private boolean online;
	private int userImg;

	public int getUserImg() {
		return userImg;
	}

	public void setUserImg(int userImg) {
		this.userImg = userImg;
	}

	public User() {
	}
	
	public User(String name_) {
		this.name = name_;
	}

	public User(long id_, String name_, String password_, boolean online_) {
		this.id = id_;
		this.name = name_;
		this.password = password_;
		this.online = online_;
	}
	
	public User(long id_, String name_, String password_, boolean online_, int userImg_) {
		this.id = id_;
		this.name = name_;
		this.password = password_;
		this.online = online_;
		this.userImg = userImg_;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isOnline() {
		return online;
	}

	public void setOnline(boolean online) {
		this.online = online;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", online=" + online + "]";
	}

}
