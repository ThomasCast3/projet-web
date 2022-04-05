package coding.finalwebprojet.restapi.utils;

import java.sql.*;

public class Database {
    private Connection connection;
    private Statement statement;

    public Database(String url, String user, String password, String database) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.connection = DriverManager.getConnection("jdbc:mysql://" + url + "/" + database, user, password);
            this.statement = this.connection.createStatement();
        } catch(Exception error) {
            error.printStackTrace();
        }
    }

    public ResultSet executeQuery(String sql) {
        try {
            return this.statement.executeQuery(sql);
        } catch (Exception error) {
            error.printStackTrace();
            return null;
        }
    }

    public void closeConnection() {
        try {
            this.connection.close();
        } catch (Exception error) {
            error.printStackTrace();
        }
    }
}
