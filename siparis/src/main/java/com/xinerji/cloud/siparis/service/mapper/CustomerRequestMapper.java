package com.xinerji.cloud.siparis.service.mapper;

import com.xinerji.cloud.siparis.domain.*;
import com.xinerji.cloud.siparis.service.dto.CustomerRequestDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerRequest and its DTO CustomerRequestDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerRequestMapper extends EntityMapper<CustomerRequestDTO, CustomerRequest> {



    default CustomerRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerRequest customerRequest = new CustomerRequest();
        customerRequest.setId(id);
        return customerRequest;
    }
}
