package com.wnet.ewallet.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ewalletuser.
 */
@Entity
@Table(name = "ewalletuser")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ewalletuser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "appid")
    private String appid;

    @Column(name = "apikey")
    private String apikey;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ewalletuser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public Ewalletuser username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public Ewalletuser password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAppid() {
        return this.appid;
    }

    public Ewalletuser appid(String appid) {
        this.setAppid(appid);
        return this;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getApikey() {
        return this.apikey;
    }

    public Ewalletuser apikey(String apikey) {
        this.setApikey(apikey);
        return this;
    }

    public void setApikey(String apikey) {
        this.apikey = apikey;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ewalletuser)) {
            return false;
        }
        return id != null && id.equals(((Ewalletuser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ewalletuser{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", appid='" + getAppid() + "'" +
            ", apikey='" + getApikey() + "'" +
            "}";
    }
}
