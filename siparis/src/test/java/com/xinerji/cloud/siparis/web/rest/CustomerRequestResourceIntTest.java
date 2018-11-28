package com.xinerji.cloud.siparis.web.rest;

import com.xinerji.cloud.siparis.SiparisApp;

import com.xinerji.cloud.siparis.domain.CustomerRequest;
import com.xinerji.cloud.siparis.repository.CustomerRequestRepository;
import com.xinerji.cloud.siparis.service.CustomerRequestService;
import com.xinerji.cloud.siparis.service.dto.CustomerRequestDTO;
import com.xinerji.cloud.siparis.service.mapper.CustomerRequestMapper;
import com.xinerji.cloud.siparis.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.xinerji.cloud.siparis.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.xinerji.cloud.siparis.domain.enumeration.CustomerRequestStatus;
import com.xinerji.cloud.siparis.domain.enumeration.CarType;
/**
 * Test class for the CustomerRequestResource REST controller.
 *
 * @see CustomerRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SiparisApp.class)
public class CustomerRequestResourceIntTest {

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BEGIN_LOC = "AAAAAAAAAA";
    private static final String UPDATED_BEGIN_LOC = "BBBBBBBBBB";

    private static final String DEFAULT_END_LOC = "AAAAAAAAAA";
    private static final String UPDATED_END_LOC = "BBBBBBBBBB";

    private static final Instant DEFAULT_OPERATION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_OPERATION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final CustomerRequestStatus DEFAULT_ORDER_STATUS = CustomerRequestStatus.CREATED;
    private static final CustomerRequestStatus UPDATED_ORDER_STATUS = CustomerRequestStatus.ONPROGRESS;

    private static final CarType DEFAULT_CAR_TYPE = CarType.SMALL;
    private static final CarType UPDATED_CAR_TYPE = CarType.MIDDLE;

    @Autowired
    private CustomerRequestRepository customerRequestRepository;

    @Autowired
    private CustomerRequestMapper customerRequestMapper;

    @Autowired
    private CustomerRequestService customerRequestService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCustomerRequestMockMvc;

    private CustomerRequest customerRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerRequestResource customerRequestResource = new CustomerRequestResource(customerRequestService);
        this.restCustomerRequestMockMvc = MockMvcBuilders.standaloneSetup(customerRequestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerRequest createEntity(EntityManager em) {
        CustomerRequest customerRequest = new CustomerRequest()
            .userName(DEFAULT_USER_NAME)
            .beginLoc(DEFAULT_BEGIN_LOC)
            .endLoc(DEFAULT_END_LOC)
            .operationDate(DEFAULT_OPERATION_DATE)
            .orderStatus(DEFAULT_ORDER_STATUS)
            .carType(DEFAULT_CAR_TYPE);
        return customerRequest;
    }

    @Before
    public void initTest() {
        customerRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerRequest() throws Exception {
        int databaseSizeBeforeCreate = customerRequestRepository.findAll().size();

        // Create the CustomerRequest
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(customerRequest);
        restCustomerRequestMockMvc.perform(post("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isCreated());

        // Validate the CustomerRequest in the database
        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerRequest testCustomerRequest = customerRequestList.get(customerRequestList.size() - 1);
        assertThat(testCustomerRequest.getUserName()).isEqualTo(DEFAULT_USER_NAME);
        assertThat(testCustomerRequest.getBeginLoc()).isEqualTo(DEFAULT_BEGIN_LOC);
        assertThat(testCustomerRequest.getEndLoc()).isEqualTo(DEFAULT_END_LOC);
        assertThat(testCustomerRequest.getOperationDate()).isEqualTo(DEFAULT_OPERATION_DATE);
        assertThat(testCustomerRequest.getOrderStatus()).isEqualTo(DEFAULT_ORDER_STATUS);
        assertThat(testCustomerRequest.getCarType()).isEqualTo(DEFAULT_CAR_TYPE);
    }

    @Test
    @Transactional
    public void createCustomerRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerRequestRepository.findAll().size();

        // Create the CustomerRequest with an existing ID
        customerRequest.setId(1L);
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(customerRequest);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerRequestMockMvc.perform(post("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerRequest in the database
        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkBeginLocIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRequestRepository.findAll().size();
        // set the field null
        customerRequest.setBeginLoc(null);

        // Create the CustomerRequest, which fails.
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(customerRequest);

        restCustomerRequestMockMvc.perform(post("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndLocIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRequestRepository.findAll().size();
        // set the field null
        customerRequest.setEndLoc(null);

        // Create the CustomerRequest, which fails.
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(customerRequest);

        restCustomerRequestMockMvc.perform(post("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOperationDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRequestRepository.findAll().size();
        // set the field null
        customerRequest.setOperationDate(null);

        // Create the CustomerRequest, which fails.
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(customerRequest);

        restCustomerRequestMockMvc.perform(post("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isBadRequest());

        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerRequests() throws Exception {
        // Initialize the database
        customerRequestRepository.saveAndFlush(customerRequest);

        // Get all the customerRequestList
        restCustomerRequestMockMvc.perform(get("/api/customer-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME.toString())))
            .andExpect(jsonPath("$.[*].beginLoc").value(hasItem(DEFAULT_BEGIN_LOC.toString())))
            .andExpect(jsonPath("$.[*].endLoc").value(hasItem(DEFAULT_END_LOC.toString())))
            .andExpect(jsonPath("$.[*].operationDate").value(hasItem(DEFAULT_OPERATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].orderStatus").value(hasItem(DEFAULT_ORDER_STATUS.toString())))
            .andExpect(jsonPath("$.[*].carType").value(hasItem(DEFAULT_CAR_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getCustomerRequest() throws Exception {
        // Initialize the database
        customerRequestRepository.saveAndFlush(customerRequest);

        // Get the customerRequest
        restCustomerRequestMockMvc.perform(get("/api/customer-requests/{id}", customerRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerRequest.getId().intValue()))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME.toString()))
            .andExpect(jsonPath("$.beginLoc").value(DEFAULT_BEGIN_LOC.toString()))
            .andExpect(jsonPath("$.endLoc").value(DEFAULT_END_LOC.toString()))
            .andExpect(jsonPath("$.operationDate").value(DEFAULT_OPERATION_DATE.toString()))
            .andExpect(jsonPath("$.orderStatus").value(DEFAULT_ORDER_STATUS.toString()))
            .andExpect(jsonPath("$.carType").value(DEFAULT_CAR_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerRequest() throws Exception {
        // Get the customerRequest
        restCustomerRequestMockMvc.perform(get("/api/customer-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerRequest() throws Exception {
        // Initialize the database
        customerRequestRepository.saveAndFlush(customerRequest);

        int databaseSizeBeforeUpdate = customerRequestRepository.findAll().size();

        // Update the customerRequest
        CustomerRequest updatedCustomerRequest = customerRequestRepository.findById(customerRequest.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerRequest are not directly saved in db
        em.detach(updatedCustomerRequest);
        updatedCustomerRequest
            .userName(UPDATED_USER_NAME)
            .beginLoc(UPDATED_BEGIN_LOC)
            .endLoc(UPDATED_END_LOC)
            .operationDate(UPDATED_OPERATION_DATE)
            .orderStatus(UPDATED_ORDER_STATUS)
            .carType(UPDATED_CAR_TYPE);
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(updatedCustomerRequest);

        restCustomerRequestMockMvc.perform(put("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isOk());

        // Validate the CustomerRequest in the database
        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeUpdate);
        CustomerRequest testCustomerRequest = customerRequestList.get(customerRequestList.size() - 1);
        assertThat(testCustomerRequest.getUserName()).isEqualTo(UPDATED_USER_NAME);
        assertThat(testCustomerRequest.getBeginLoc()).isEqualTo(UPDATED_BEGIN_LOC);
        assertThat(testCustomerRequest.getEndLoc()).isEqualTo(UPDATED_END_LOC);
        assertThat(testCustomerRequest.getOperationDate()).isEqualTo(UPDATED_OPERATION_DATE);
        assertThat(testCustomerRequest.getOrderStatus()).isEqualTo(UPDATED_ORDER_STATUS);
        assertThat(testCustomerRequest.getCarType()).isEqualTo(UPDATED_CAR_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerRequest() throws Exception {
        int databaseSizeBeforeUpdate = customerRequestRepository.findAll().size();

        // Create the CustomerRequest
        CustomerRequestDTO customerRequestDTO = customerRequestMapper.toDto(customerRequest);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerRequestMockMvc.perform(put("/api/customer-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerRequest in the database
        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerRequest() throws Exception {
        // Initialize the database
        customerRequestRepository.saveAndFlush(customerRequest);

        int databaseSizeBeforeDelete = customerRequestRepository.findAll().size();

        // Get the customerRequest
        restCustomerRequestMockMvc.perform(delete("/api/customer-requests/{id}", customerRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerRequest> customerRequestList = customerRequestRepository.findAll();
        assertThat(customerRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerRequest.class);
        CustomerRequest customerRequest1 = new CustomerRequest();
        customerRequest1.setId(1L);
        CustomerRequest customerRequest2 = new CustomerRequest();
        customerRequest2.setId(customerRequest1.getId());
        assertThat(customerRequest1).isEqualTo(customerRequest2);
        customerRequest2.setId(2L);
        assertThat(customerRequest1).isNotEqualTo(customerRequest2);
        customerRequest1.setId(null);
        assertThat(customerRequest1).isNotEqualTo(customerRequest2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerRequestDTO.class);
        CustomerRequestDTO customerRequestDTO1 = new CustomerRequestDTO();
        customerRequestDTO1.setId(1L);
        CustomerRequestDTO customerRequestDTO2 = new CustomerRequestDTO();
        assertThat(customerRequestDTO1).isNotEqualTo(customerRequestDTO2);
        customerRequestDTO2.setId(customerRequestDTO1.getId());
        assertThat(customerRequestDTO1).isEqualTo(customerRequestDTO2);
        customerRequestDTO2.setId(2L);
        assertThat(customerRequestDTO1).isNotEqualTo(customerRequestDTO2);
        customerRequestDTO1.setId(null);
        assertThat(customerRequestDTO1).isNotEqualTo(customerRequestDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(customerRequestMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(customerRequestMapper.fromId(null)).isNull();
    }
}
