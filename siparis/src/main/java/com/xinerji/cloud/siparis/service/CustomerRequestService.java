package com.xinerji.cloud.siparis.service;

import com.xinerji.cloud.siparis.service.dto.CustomerRequestDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CustomerRequest.
 */
public interface CustomerRequestService {

    /**
     * Save a customerRequest.
     *
     * @param customerRequestDTO the entity to save
     * @return the persisted entity
     */
    CustomerRequestDTO save(CustomerRequestDTO customerRequestDTO);

    /**
     * Get all the customerRequests.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CustomerRequestDTO> findAll(Pageable pageable);


    /**
     * Get the "id" customerRequest.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CustomerRequestDTO> findOne(Long id);

    /**
     * Delete the "id" customerRequest.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
