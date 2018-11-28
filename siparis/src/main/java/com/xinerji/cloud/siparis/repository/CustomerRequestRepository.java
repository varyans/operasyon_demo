package com.xinerji.cloud.siparis.repository;

import com.xinerji.cloud.siparis.domain.CustomerRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRequestRepository extends JpaRepository<CustomerRequest, Long> {

}
