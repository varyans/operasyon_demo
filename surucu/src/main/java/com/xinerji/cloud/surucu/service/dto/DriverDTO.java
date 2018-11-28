package com.xinerji.cloud.surucu.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.xinerji.cloud.surucu.domain.enumeration.DriverStatus;

/**
 * A DTO for the Driver entity.
 */
public class DriverDTO implements Serializable {

    private Long id;

    private String userName;

    private DriverStatus driverStatus;

    private String location;

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

    public DriverStatus getDriverStatus() {
        return driverStatus;
    }

    public void setDriverStatus(DriverStatus driverStatus) {
        this.driverStatus = driverStatus;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DriverDTO driverDTO = (DriverDTO) o;
        if (driverDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driverDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DriverDTO{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", driverStatus='" + getDriverStatus() + "'" +
            ", location='" + getLocation() + "'" +
            "}";
    }
}
