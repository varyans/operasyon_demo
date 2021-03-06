package com.xinerji.cloud.surucu.service.mapper;

import com.xinerji.cloud.surucu.domain.*;
import com.xinerji.cloud.surucu.service.dto.DriverDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Driver and its DTO DriverDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DriverMapper extends EntityMapper<DriverDTO, Driver> {



    default Driver fromId(Long id) {
        if (id == null) {
            return null;
        }
        Driver driver = new Driver();
        driver.setId(id);
        return driver;
    }
}
