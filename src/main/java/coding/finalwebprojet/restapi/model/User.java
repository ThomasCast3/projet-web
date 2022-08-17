package coding.finalwebprojet.restapi.model;

public class User {
    public int id;
    public String email, role, firstName, lastName;

    public User(int id, String email, String role, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
