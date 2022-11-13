package com.wnet.ewallet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.wnet.ewallet.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EwalletuserTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ewalletuser.class);
        Ewalletuser ewalletuser1 = new Ewalletuser();
        ewalletuser1.setId(1L);
        Ewalletuser ewalletuser2 = new Ewalletuser();
        ewalletuser2.setId(ewalletuser1.getId());
        assertThat(ewalletuser1).isEqualTo(ewalletuser2);
        ewalletuser2.setId(2L);
        assertThat(ewalletuser1).isNotEqualTo(ewalletuser2);
        ewalletuser1.setId(null);
        assertThat(ewalletuser1).isNotEqualTo(ewalletuser2);
    }
}
