package coding.finalwebprojet.restapi;

import coding.finalwebprojet.restapi.utils.Database;
import coding.finalwebprojet.restapi.utils.ApiRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(RestApiApplication.class, args);

		Database database = new Database();
		database.connect();

		Runtime.getRuntime().addShutdownHook(new Thread(database::disconnect));
	}
}
