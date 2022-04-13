package coding.finalwebprojet.restapi.controller.gare;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
@CrossOrigin(origins = "*")
public class AffluenceController {
    @PostMapping("/affluence")
    public @ResponseBody ResponseEntity<String> affluence(@RequestParam String id, @RequestParam String gare, @RequestParam String affluence) {
        Database database = Database.getDatabase();

        try {
            String sqlQueryDate = String.format("SELECT *, MAX(timestamp) FROM affluence WHERE user_id = \"%s\"", id);
            String sqlInsertAffluence = "INSERT INTO affluence (user_id, gare, affluence, timestamp) VALUES (?, ?, ?, ?)";

            ResultSet resultSet = database.executeQuery(sqlQueryDate);

            if (resultSet.getLong("MAX(timestamp)") + 300000 >= System.currentTimeMillis())
                return new ResponseEntity<>(null, HttpStatus.TOO_EARLY);
            PreparedStatement preparedStatement = database.getConnection().prepareStatement(sqlInsertAffluence);
            preparedStatement.setInt(1, Integer.parseInt(id));
            preparedStatement.setString(2, gare);
            preparedStatement.setInt(3, Integer.parseInt(affluence));
            preparedStatement.setLong(4, System.currentTimeMillis());

            database.executeStatement(preparedStatement);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
