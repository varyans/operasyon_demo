package com.xinerji.cloud.operasyon.service.mapper;

import com.xinerji.cloud.operasyon.domain.*;
import com.xinerji.cloud.operasyon.service.dto.OperationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Operation and its DTO OperationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OperationMapper extends EntityMapper<OperationDTO, Operation> {



    default Operation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Operation operation = new Operation();
        operation.setId(id);
        return operation;
    }
}
