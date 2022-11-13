package com.wnet.ewallet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.wnet.ewallet.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EwalletransactionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ewalletransaction.class);
        Ewalletransaction ewalletransaction1 = new Ewalletransaction();
        ewalletransaction1.setId(1L);
        Ewalletransaction ewalletransaction2 = new Ewalletransaction();
        ewalletransaction2.setId(ewalletransaction1.getId());
        assertThat(ewalletransaction1).isEqualTo(ewalletransaction2);
        ewalletransaction2.setId(2L);
        assertThat(ewalletransaction1).isNotEqualTo(ewalletransaction2);
        ewalletransaction1.setId(null);
        assertThat(ewalletransaction1).isNotEqualTo(ewalletransaction2);
    }
}
