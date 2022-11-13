package com.wnet.ewallet.repository;

import com.wnet.ewallet.domain.Ewalletcliente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ewalletcliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EwalletclienteRepository extends JpaRepository<Ewalletcliente, Long> {}
