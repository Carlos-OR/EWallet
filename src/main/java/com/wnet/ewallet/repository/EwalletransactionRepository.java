package com.wnet.ewallet.repository;

import com.wnet.ewallet.domain.Ewalletransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ewalletransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EwalletransactionRepository extends JpaRepository<Ewalletransaction, Long> {}
