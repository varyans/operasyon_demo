package com.xinerji.cloud.siparis.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.xinerji.cloud.siparis.service.CustomerRequestService;
import com.xinerji.cloud.siparis.web.rest.errors.BadRequestAlertException;
import com.xinerji.cloud.siparis.web.rest.util.HeaderUtil;
import com.xinerji.cloud.siparis.web.rest.util.PaginationUtil;
import com.xinerji.cloud.siparis.service.dto.CustomerRequestDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerRequest.
 */
@RestController
@RequestMapping("/api")
public class CustomerRequestResource {

    private final Logger log = LoggerFactory.getLogger(CustomerRequestResource.class);

    private static final String ENTITY_NAME = "siparisCustomerRequest";

    private final CustomerRequestService customerRequestService;

    public CustomerRequestResource(CustomerRequestService customerRequestService) {
        this.customerRequestService = customerRequestService;
    }

    /**
     * POST  /customer-requests : Create a new customerRequest.
     *
     * @param customerRequestDTO the customerRequestDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerRequestDTO, or with status 400 (Bad Request) if the customerRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-requests")
    @Timed
    public ResponseEntity<CustomerRequestDTO> createCustomerRequest(@Valid @RequestBody CustomerRequestDTO customerRequestDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerRequest : {}", customerRequestDTO);
        if (customerRequestDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerRequestDTO result = customerRequestService.save(customerRequestDTO);
        return ResponseEntity.created(new URI("/api/customer-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-requests : Updates an existing customerRequest.
     *
     * @param customerRequestDTO the customerRequestDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerRequestDTO,
     * or with status 400 (Bad Request) if the customerRequestDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerRequestDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-requests")
    @Timed
    public ResponseEntity<CustomerRequestDTO> updateCustomerRequest(@Valid @RequestBody CustomerRequestDTO customerRequestDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerRequest : {}", customerRequestDTO);
        if (customerRequestDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerRequestDTO result = customerRequestService.save(customerRequestDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerRequestDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-requests : get all the customerRequests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerRequests in body
     */
    @GetMapping("/customer-requests")
    @Timed
    public ResponseEntity<List<CustomerRequestDTO>> getAllCustomerRequests(Pageable pageable) {
        log.debug("REST request to get a page of CustomerRequests");
        Page<CustomerRequestDTO> page = customerRequestService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-requests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /customer-requests/:id : get the "id" customerRequest.
     *
     * @param id the id of the customerRequestDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerRequestDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-requests/{id}")
    @Timed
    public ResponseEntity<CustomerRequestDTO> getCustomerRequest(@PathVariable Long id) {
        log.debug("REST request to get CustomerRequest : {}", id);
        Optional<CustomerRequestDTO> customerRequestDTO = customerRequestService.findOne(id);
        return ResponseUtil.wrapOrNotFound(customerRequestDTO);
    }

    /**
     * DELETE  /customer-requests/:id : delete the "id" customerRequest.
     *
     * @param id the id of the customerRequestDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerRequest(@PathVariable Long id) {
        log.debug("REST request to delete CustomerRequest : {}", id);
        customerRequestService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
