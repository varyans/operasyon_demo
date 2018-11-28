package com.xinerji.cloud.siparis.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.xinerji.cloud.siparis.domain.enumeration.CustomerRequestStatus;

import com.xinerji.cloud.siparis.domain.enumeration.CarType;

/**
 * A CustomerRequest.
 */
@Entity
@Table(name = "customer_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @NotNull
    @Column(name = "begin_loc", nullable = false)
    private String beginLoc;

    @NotNull
    @Column(name = "end_loc", nullable = false)
    private String endLoc;

    @NotNull
    @Column(name = "operation_date", nullable = false)
    private Instant operationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private CustomerRequestStatus orderStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "car_type")
    private CarType carType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public CustomerRequest userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBeginLoc() {
        return beginLoc;
    }

    public CustomerRequest beginLoc(String beginLoc) {
        this.beginLoc = beginLoc;
        return this;
    }

    public void setBeginLoc(String beginLoc) {
        this.beginLoc = beginLoc;
    }

    public String getEndLoc() {
        return endLoc;
    }

    public CustomerRequest endLoc(String endLoc) {
        this.endLoc = endLoc;
        return this;
    }

    public void setEndLoc(String endLoc) {
        this.endLoc = endLoc;
    }

    public Instant getOperationDate() {
        return operationDate;
    }

    public CustomerRequest operationDate(Instant operationDate) {
        this.operationDate = operationDate;
        return this;
    }

    public void setOperationDate(Instant operationDate) {
        this.operationDate = operationDate;
    }

    public CustomerRequestStatus getOrderStatus() {
        return orderStatus;
    }

    public CustomerRequest orderStatus(CustomerRequestStatus orderStatus) {
        this.orderStatus = orderStatus;
        return this;
    }

    public void setOrderStatus(CustomerRequestStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public CarType getCarType() {
        return carType;
    }

    public CustomerRequest carType(CarType carType) {
        this.carType = carType;
        return this;
    }

    public void setCarType(CarType carType) {
        this.carType = carType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CustomerRequest customerRequest = (CustomerRequest) o;
        if (customerRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerRequest{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", beginLoc='" + getBeginLoc() + "'" +
            ", endLoc='" + getEndLoc() + "'" +
            ", operationDate='" + getOperationDate() + "'" +
            ", orderStatus='" + getOrderStatus() + "'" +
            ", carType='" + getCarType() + "'" +
            "}";
    }
}
