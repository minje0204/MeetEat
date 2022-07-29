package com.a105.jdbc;

import com.a105.domain.user.User;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class JdbcQueries {

    public void connect() {
        try (
            Connection conn = DriverManager
                .getConnection("jdbc:mariadb://localhost:3306/a105?serverTimezone=UTC",
                    "root", System.getenv("DB_PW"))) {

            PreparedStatement selectStatement = conn.prepareStatement("select * from user");
            ResultSet rs = selectStatement.executeQuery();

            List<User> users = new ArrayList<>();

//            while (rs.next()) { // will traverse through all rows
//                Long id = rs.getLong("idx");
//                String email = rs.getString("email");
//                String nickname = rs.getString("nickname");
//
//                String password = rs.getString("password");
//                String profile = rs.getString("profile");
//                String bio = rs.getString("bio");
//                String provider = rs.getString("provider");
//
//                AuthProvider pr = "GOOGLE".equals(provider) ? GOOGLE : NAVER;
//
//                User user = new User(id, email, nickname, password, profile, bio, pr);
//                System.out.println(user);
//                users.add(user);
//            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
