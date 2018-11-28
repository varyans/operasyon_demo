package com.xinerji.cloud.siparis.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.xinerji.cloud.siparis.domain.enumeration.CustomerRequestStatus;
import com.xinerji.cloud.siparis.domain.enumeration.CarType;

/**
 * A DTO for the CustomerRequest entity.
 */
public class CustomerRequestDTO implements Serializable {

    private Long id;

    private String userName;

    @NotNull
    private String beginLoc;

    @NotNull
    private String endLoc;

    @NotNull
    private Instant operationDate;

    private CustomerRequestStatus orderStatus;

    private CarType carType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBeginLoc() {
        return beginLoc;
    }

    public void setBeginLoc(String beginLoc) {
        this.beginLoc = beginLoc;
    }

    public String getEndLoc() {
        return endLoc;
    }

    public void setEndLoc(String endLoc) {
        this.endLoc = endLoc;
    }

    public Instant getOperationDate() {
        return operationDate;
    }

    public void setOperationDate(Instant operationDate) {
        this.operationDate = operationDate;
    }

    public CustomerRequestStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(CustomerRequestStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public CarType getCarType() {
        return carType;
    }

    public void setCarType(CarType carType) {
        this.carType = carType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerRequestDTO customerRequestDTO = (CustomerRequestDTO) o;
        if (customerRequestDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerRequestDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerRequestDTO{" +
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
