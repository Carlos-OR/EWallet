package com.wnet.ewallet.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ewalletransaction.
 */
@Entity
@Table(name = "ewalletransaction")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ewalletransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "externalid")
    private String externalid;

    @Column(name = "idewalletcliente")
    private String idewalletcliente;

    @Column(name = "idusercreate")
    private String idusercreate;

    @Column(name = "xapikey")
    private String xapikey;

    @Column(name = "authorization")
    private String authorization;

    @Column(name = "merchantid")
    private String merchantid;

    @Column(name = "accesstoken")
    private String accesstoken;

    @Column(name = "response")
    private String response;

    @Column(name = "idautorization")
    private String idautorization;

    @Column(name = "timecreate")
    private String timecreate;

    @Column(name = "timeresponse")
    private String timeresponse;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ewalletransaction id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExternalid() {
        return this.externalid;
    }

    public Ewalletransaction externalid(String externalid) {
        this.setExternalid(externalid);
        return this;
    }

    public void setExternalid(String externalid) {
        this.externalid = externalid;
    }

    public String getIdewalletcliente() {
        return this.idewalletcliente;
    }

    public Ewalletransaction idewalletcliente(String idewalletcliente) {
        this.setIdewalletcliente(idewalletcliente);
        return this;
    }

    public void setIdewalletcliente(String idewalletcliente) {
        this.idewalletcliente = idewalletcliente;
    }

    public String getIdusercreate() {
        return this.idusercreate;
    }

    public Ewalletransaction idusercreate(String idusercreate) {
        this.setIdusercreate(idusercreate);
        return this;
    }

    public void setIdusercreate(String idusercreate) {
        this.idusercreate = idusercreate;
    }

    public String getXapikey() {
        return this.xapikey;
    }

    public Ewalletransaction xapikey(String xapikey) {
        this.setXapikey(xapikey);
        return this;
    }

    public void setXapikey(String xapikey) {
        this.xapikey = xapikey;
    }

    public String getAuthorization() {
        return this.authorization;
    }

    public Ewalletransaction authorization(String authorization) {
        this.setAuthorization(authorization);
        return this;
    }

    public void setAuthorization(String authorization) {
        this.authorization = authorization;
    }

    public String getMerchantid() {
        return this.merchantid;
    }

    public Ewalletransaction merchantid(String merchantid) {
        this.setMerchantid(merchantid);
        return this;
    }

    public void setMerchantid(String merchantid) {
        this.merchantid = merchantid;
    }

    public String getAccesstoken() {
        return this.accesstoken;
    }

    public Ewalletransaction accesstoken(String accesstoken) {
        this.setAccesstoken(accesstoken);
        return this;
    }

    public void setAccesstoken(String accesstoken) {
        this.accesstoken = accesstoken;
    }

    public String getResponse() {
        return this.response;
    }

    public Ewalletransaction response(String response) {
        this.setResponse(response);
        return this;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getIdautorization() {
        return this.idautorization;
    }

    public Ewalletransaction idautorization(String idautorization) {
        this.setIdautorization(idautorization);
        return this;
    }

    public void setIdautorization(String idautorization) {
        this.idautorization = idautorization;
    }

    public String getTimecreate() {
        return this.timecreate;
    }

    public Ewalletransaction timecreate(String timecreate) {
        this.setTimecreate(timecreate);
        return this;
    }

    public void setTimecreate(String timecreate) {
        this.timecreate = timecreate;
    }

    public String getTimeresponse() {
        return this.timeresponse;
    }

    public Ewalletransaction timeresponse(String timeresponse) {
        this.setTimeresponse(timeresponse);
        return this;
    }

    public void setTimeresponse(String timeresponse) {
        this.timeresponse = timeresponse;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ewalletransaction)) {
            return false;
        }
        return id != null && id.equals(((Ewalletransaction) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ewalletransaction{" +
            "id=" + getId() +
            ", externalid='" + getExternalid() + "'" +
            ", idewalletcliente='" + getIdewalletcliente() + "'" +
            ", idusercreate='" + getIdusercreate() + "'" +
            ", xapikey='" + getXapikey() + "'" +
            ", authorization='" + getAuthorization() + "'" +
            ", merchantid='" + getMerchantid() + "'" +
            ", accesstoken='" + getAccesstoken() + "'" +
            ", response='" + getResponse() + "'" +
            ", idautorization='" + getIdautorization() + "'" +
            ", timecreate='" + getTimecreate() + "'" +
            ", timeresponse='" + getTimeresponse() + "'" +
            "}";
    }
}
