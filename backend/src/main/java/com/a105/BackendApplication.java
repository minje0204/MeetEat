package com.a105;

import com.a105.kurento.CallHandler;
import com.a105.kurento.RoomManager;
import com.a105.kurento.UserRegistry;
import org.kurento.client.KurentoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@SpringBootApplication(exclude =
		{SecurityAutoConfiguration.class})
@EnableWebSocket
public class BackendApplication implements WebSocketConfigurer {
	@Bean
	public UserRegistry registry() {
		return new UserRegistry();
	}

	@Bean
	public RoomManager roomManager() {
		return new RoomManager();
	}

	@Bean
	public CallHandler groupCallHandler() {
		return new CallHandler();
	}

	@Bean
	public KurentoClient kurentoClient() {
		return KurentoClient.create();
	}

	@Bean
	public ServletServerContainerFactoryBean createServletServerContainerFactoryBean() {
		ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
		container.setMaxTextMessageBufferSize(32768);
		return container;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(groupCallHandler(), "/groupcall").setAllowedOrigins("http://localhost:3000");
	}
}
