package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
@CrossOrigin(origins = "*")
public class Sign {
    @PostMapping("/register") public @ResponseBody ResponseEntity<String> register(@RequestParam String email, @RequestParam String password) {
        Database database = Database.getDatabase();
        String sqlCheckUser = String.format("SELECT * FROM users WHERE email = \"%s\"", email);
        String sqlInsertUsers = "INSERT INTO users (email, password) VALUES (?, ?)";
        String sqlGetId = String.format("SELECT id FROM users WHERE email = \"%s\"", email);
        String sqlInsertGeolocalisation = "INSERT INTO geolocalisation (id, latitude, longitude) VALUES (?, ?, ?)";

        try {
            boolean found = false;
            ResultSet resultSet = database.executeQuery(sqlCheckUser);

            while (resultSet.next()) found = resultSet.getObject("id", Boolean.class);
            if (found) return new ResponseEntity<>(null, HttpStatus.OK);

            PreparedStatement preparedStatement = database.getConnection().prepareStatement(sqlInsertUsers);
            preparedStatement.setString(1, email);
            preparedStatement.setString (2, password);
            database.executeStatement(preparedStatement);

            //////////////////////////

            int id = 0;
            resultSet = database.executeQuery(sqlGetId);

            while (resultSet.next()) id = resultSet.getInt("id");
            if (id == 0) return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

            preparedStatement = database.getConnection().prepareStatement(sqlInsertGeolocalisation);
            preparedStatement.setInt(1, id);
            preparedStatement.setString (2, "0");
            preparedStatement.setString (3, "0");

            database.executeStatement(preparedStatement);
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.toString(), HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        String sql = String.format("SELECT id, password FROM users WHERE email = \"%s\" AND password = \"%s\"", email, password);
        String id = null;

        try {
            ResultSet resultSet = Database.getDatabase().executeQuery(sql);
            while (resultSet.next()) id = resultSet.getString("id");
        } catch (Exception exception) {
            return new ResponseEntity<>(exception.toString(), HttpStatus.OK);
        }
        return new ResponseEntity<>("{\"id\": " + id + "}", HttpStatus.OK);
    }
}
