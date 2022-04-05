package coding.finalwebprojet.restapi;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestApiApplication.class, args);
		Database database = new Database("mysql-finalwebprojet.alwaysdata.net", "263242", "fX7uhxfMGM5hqsX", "finalwebprojet_db");
	}
}
