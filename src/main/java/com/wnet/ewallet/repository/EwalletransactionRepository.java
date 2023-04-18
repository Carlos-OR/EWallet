package com.wnet.ewallet.repository;

import com.wnet.ewallet.domain.Ewalletransaction;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ewalletransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EwalletransactionRepository extends JpaRepository<Ewalletransaction, Long> {
    @Query("select et from Ewalletransaction et where et.externalid = :external_id")
    Optional<Ewalletransaction> findByExternalID(@Param("external_id") String external_id);
}
