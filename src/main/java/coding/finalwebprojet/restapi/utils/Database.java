package coding.finalwebprojet.restapi.utils;

import java.io.*;
import java.sql.*;
import java.util.Properties;

public class Database {
    private static Database database;
    private Connection connection;

    private String url;
    private String username;
    private String password;
    private String driver;

    public static Database getDatabase() {
        return database;
    }

    public Connection getConnection() {
        return connection;
    }

    public Database() {
        database = this;

        try (InputStream inputStream = new FileInputStream(System.getProperty("user.dir") + "/src/main/resources/application.properties")) {
            Properties properties = new Properties();
            properties.load(inputStream);

            this.url = properties.getProperty("spring.datasource.url");
            this.username = properties.getProperty("spring.datasource.username");
            this.password = properties.getProperty("spring.datasource.password");
            this.driver = properties.getProperty("spring.datasource.driver-class-name");
        } catch (IOException io) {
            io.printStackTrace();
        }
    }

    public void connect() {
        try {
            Class.forName(this.driver);
            this.connection = DriverManager.getConnection(this.url, this.username, this.password);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
    }

    public ResultSet executeQuery(String sql) {
        try {
            return this.connection.createStatement().executeQuery(sql);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }

    public void executeStatement(PreparedStatement sql) {
        try {
            sql.execute();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }

    public void disconnect() {
        try {
            this.connection.close();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
    }
}
