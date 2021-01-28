package com.example.spacey;

import org.springframework.stereotype.Component;

@Component
public class Message {
	
	private long id;
	private String userName;
	private String content;
	private boolean serverInfo;

	public Message() {
	}
	
	public boolean isServerInfo() {
		return serverInfo;
	}

	public void setServerInfo(boolean serverInfo) {
		this.serverInfo = serverInfo;
	}

	public Message(long id_, String userName_, String content_, boolean serverInfo_) {
		this.id = id_;
		this.userName = userName_;
		this.content = content_;
		this.serverInfo = serverInfo_;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return userName + ": " + content;
	}

}
