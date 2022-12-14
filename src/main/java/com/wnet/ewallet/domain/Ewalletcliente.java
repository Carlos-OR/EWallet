package com.wnet.ewallet.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ewalletcliente.
 */
@Entity
@Table(name = "ewalletcliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ewalletcliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "idwizpos")
    private Long idwizpos;

    @Column(name = "datos")
    private String datos;

    @ManyToOne
    private Ewalletransaction idEW;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ewalletcliente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Ewalletcliente nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getIdwizpos() {
        return this.idwizpos;
    }

    public Ewalletcliente idwizpos(Long idwizpos) {
        this.setIdwizpos(idwizpos);
        return this;
    }

    public void setIdwizpos(Long idwizpos) {
        this.idwizpos = idwizpos;
    }

    public String getDatos() {
        return this.datos;
    }

    public Ewalletcliente datos(String datos) {
        this.setDatos(datos);
        return this;
    }

    public void setDatos(String datos) {
        this.datos = datos;
    }

    public Ewalletransaction getIdEW() {
        return this.idEW;
    }

    public void setIdEW(Ewalletransaction ewalletransaction) {
        this.idEW = ewalletransaction;
    }

    public Ewalletcliente idEW(Ewalletransaction ewalletransaction) {
        this.setIdEW(ewalletransaction);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ewalletcliente)) {
            return false;
        }
        return id != null && id.equals(((Ewalletcliente) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ewalletcliente{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", idwizpos=" + getIdwizpos() +
            ", datos='" + getDatos() + "'" +
            "}";
    }
}
