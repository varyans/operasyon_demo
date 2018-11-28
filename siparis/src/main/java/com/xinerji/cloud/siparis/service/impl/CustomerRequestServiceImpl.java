package com.xinerji.cloud.siparis.service.impl;

import com.xinerji.cloud.siparis.service.CustomerRequestService;
import com.xinerji.cloud.siparis.domain.CustomerRequest;
import com.xinerji.cloud.siparis.repository.CustomerRequestRepository;
import com.xinerji.cloud.siparis.service.dto.CustomerRequestDTO;
import com.xinerji.cloud.siparis.service.mapper.CustomerRequestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing CustomerRequest.
 */
@Service
@Transactional
public class CustomerRequestServiceImpl implements CustomerRequestService {

    private final Logger log = LoggerFactory.getLogger(CustomerRequestServiceImpl.class);

    private final CustomerRequestRepository customerRequestRepository;

    private final CustomerRequestMapper customerRequestMapper;

    public CustomerRequestServiceImpl(CustomerRequestRepository customerRequestRepository, CustomerRequestMapper customerRequestMapper) {
        this.customerRequestRepository = customerRequestRepository;
        this.customerRequestMapper = customerRequestMapper;
    }

    /**
     * Save a customerRequest.
     *
     * @param customerRequestDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerRequestDTO save(CustomerRequestDTO customerRequestDTO) {
        log.debug("Request to save CustomerRequest : {}", customerRequestDTO);

        CustomerRequest customerRequest = customerRequestMapper.toEntity(customerRequestDTO);
        customerRequest = customerRequestRepository.save(customerRequest);
        return customerRequestMapper.toDto(customerRequest);
    }

    /**
     * Get all the customerRequests.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CustomerRequestDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerRequests");
        return customerRequestRepository.findAll(pageable)
            .map(customerRequestMapper::toDto);
    }


    /**
     * Get one customerRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CustomerRequestDTO> findOne(Long id) {
        log.debug("Request to get CustomerRequest : {}", id);
        return customerRequestRepository.findById(id)
            .map(customerRequestMapper::toDto);
    }

    /**
     * Delete the customerRequest by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerRequest : {}", id);
        customerRequestRepository.deleteById(id);
    }
}
