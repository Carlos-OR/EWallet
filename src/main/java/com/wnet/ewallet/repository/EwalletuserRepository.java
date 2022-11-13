package com.wnet.ewallet.repository;

import com.wnet.ewallet.domain.Ewalletuser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ewalletuser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EwalletuserRepository extends JpaRepository<Ewalletuser, Long> {}
