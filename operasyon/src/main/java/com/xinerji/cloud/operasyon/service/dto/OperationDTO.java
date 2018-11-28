package com.xinerji.cloud.operasyon.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.xinerji.cloud.operasyon.domain.enumeration.OperationStatus;

/**
 * A DTO for the Operation entity.
 */
public class OperationDTO implements Serializable {

    private Long id;

    private String order;

    private String driver;

    private OperationStatus operationStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public OperationStatus getOperationStatus() {
        return operationStatus;
    }

    public void setOperationStatus(OperationStatus operationStatus) {
        this.operationStatus = operationStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OperationDTO operationDTO = (OperationDTO) o;
        if (operationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OperationDTO{" +
            "id=" + getId() +
            ", order='" + getOrder() + "'" +
            ", driver='" + getDriver() + "'" +
            ", operationStatus='" + getOperationStatus() + "'" +
            "}";
    }
}
