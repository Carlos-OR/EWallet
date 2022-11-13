package com.wnet.ewallet.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.wnet.ewallet.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EwalletclienteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ewalletcliente.class);
        Ewalletcliente ewalletcliente1 = new Ewalletcliente();
        ewalletcliente1.setId(1L);
        Ewalletcliente ewalletcliente2 = new Ewalletcliente();
        ewalletcliente2.setId(ewalletcliente1.getId());
        assertThat(ewalletcliente1).isEqualTo(ewalletcliente2);
        ewalletcliente2.setId(2L);
        assertThat(ewalletcliente1).isNotEqualTo(ewalletcliente2);
        ewalletcliente1.setId(null);
        assertThat(ewalletcliente1).isNotEqualTo(ewalletcliente2);
    }
}
