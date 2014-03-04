package ro.example.domain;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Mihai on 2/9/14.
 */
@Entity
@Table
public class Person {

    @Id
    @Column(name = "ID_PERSON")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigDecimal id;


    @Column(name = "FIRST_NAME")

    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

}
