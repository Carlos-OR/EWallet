package com.wnet.ewallet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.wnet.ewallet.IntegrationTest;
import com.wnet.ewallet.domain.Ewalletransaction;
import com.wnet.ewallet.repository.EwalletransactionRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link EwalletransactionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EwalletransactionResourceIT {

    private static final String DEFAULT_EXTERNALID = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNALID = "BBBBBBBBBB";

    private static final String DEFAULT_IDEWALLETCLIENTE = "AAAAAAAAAA";
    private static final String UPDATED_IDEWALLETCLIENTE = "BBBBBBBBBB";

    private static final String DEFAULT_IDUSERCREATE = "AAAAAAAAAA";
    private static final String UPDATED_IDUSERCREATE = "BBBBBBBBBB";

    private static final String DEFAULT_XAPIKEY = "AAAAAAAAAA";
    private static final String UPDATED_XAPIKEY = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHORIZATION = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_MERCHANTID = "AAAAAAAAAA";
    private static final String UPDATED_MERCHANTID = "BBBBBBBBBB";

    private static final String DEFAULT_ACCESSTOKEN = "AAAAAAAAAA";
    private static final String UPDATED_ACCESSTOKEN = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSE = "BBBBBBBBBB";

    private static final String DEFAULT_IDAUTORIZATION = "AAAAAAAAAA";
    private static final String UPDATED_IDAUTORIZATION = "BBBBBBBBBB";

    private static final String DEFAULT_TIMECREATE = "AAAAAAAAAA";
    private static final String UPDATED_TIMECREATE = "BBBBBBBBBB";

    private static final String DEFAULT_TIMERESPONSE = "AAAAAAAAAA";
    private static final String UPDATED_TIMERESPONSE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ewalletransactions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EwalletransactionRepository ewalletransactionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEwalletransactionMockMvc;

    private Ewalletransaction ewalletransaction;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ewalletransaction createEntity(EntityManager em) {
        Ewalletransaction ewalletransaction = new Ewalletransaction()
            .externalid(DEFAULT_EXTERNALID)
            .idewalletcliente(DEFAULT_IDEWALLETCLIENTE)
            .idusercreate(DEFAULT_IDUSERCREATE)
            .xapikey(DEFAULT_XAPIKEY)
            .authorization(DEFAULT_AUTHORIZATION)
            .merchantid(DEFAULT_MERCHANTID)
            .accesstoken(DEFAULT_ACCESSTOKEN)
            .response(DEFAULT_RESPONSE)
            .idautorization(DEFAULT_IDAUTORIZATION)
            .timecreate(DEFAULT_TIMECREATE)
            .timeresponse(DEFAULT_TIMERESPONSE);
        return ewalletransaction;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ewalletransaction createUpdatedEntity(EntityManager em) {
        Ewalletransaction ewalletransaction = new Ewalletransaction()
            .externalid(UPDATED_EXTERNALID)
            .idewalletcliente(UPDATED_IDEWALLETCLIENTE)
            .idusercreate(UPDATED_IDUSERCREATE)
            .xapikey(UPDATED_XAPIKEY)
            .authorization(UPDATED_AUTHORIZATION)
            .merchantid(UPDATED_MERCHANTID)
            .accesstoken(UPDATED_ACCESSTOKEN)
            .response(UPDATED_RESPONSE)
            .idautorization(UPDATED_IDAUTORIZATION)
            .timecreate(UPDATED_TIMECREATE)
            .timeresponse(UPDATED_TIMERESPONSE);
        return ewalletransaction;
    }

    @BeforeEach
    public void initTest() {
        ewalletransaction = createEntity(em);
    }

    @Test
    @Transactional
    void createEwalletransaction() throws Exception {
        int databaseSizeBeforeCreate = ewalletransactionRepository.findAll().size();
        // Create the Ewalletransaction
        restEwalletransactionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isCreated());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeCreate + 1);
        Ewalletransaction testEwalletransaction = ewalletransactionList.get(ewalletransactionList.size() - 1);
        assertThat(testEwalletransaction.getExternalid()).isEqualTo(DEFAULT_EXTERNALID);
        assertThat(testEwalletransaction.getIdewalletcliente()).isEqualTo(DEFAULT_IDEWALLETCLIENTE);
        assertThat(testEwalletransaction.getIdusercreate()).isEqualTo(DEFAULT_IDUSERCREATE);
        assertThat(testEwalletransaction.getXapikey()).isEqualTo(DEFAULT_XAPIKEY);
        assertThat(testEwalletransaction.getAuthorization()).isEqualTo(DEFAULT_AUTHORIZATION);
        assertThat(testEwalletransaction.getMerchantid()).isEqualTo(DEFAULT_MERCHANTID);
        assertThat(testEwalletransaction.getAccesstoken()).isEqualTo(DEFAULT_ACCESSTOKEN);
        assertThat(testEwalletransaction.getResponse()).isEqualTo(DEFAULT_RESPONSE);
        assertThat(testEwalletransaction.getIdautorization()).isEqualTo(DEFAULT_IDAUTORIZATION);
        assertThat(testEwalletransaction.getTimecreate()).isEqualTo(DEFAULT_TIMECREATE);
        assertThat(testEwalletransaction.getTimeresponse()).isEqualTo(DEFAULT_TIMERESPONSE);
    }

    @Test
    @Transactional
    void createEwalletransactionWithExistingId() throws Exception {
        // Create the Ewalletransaction with an existing ID
        ewalletransaction.setId(1L);

        int databaseSizeBeforeCreate = ewalletransactionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEwalletransactionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEwalletransactions() throws Exception {
        // Initialize the database
        ewalletransactionRepository.saveAndFlush(ewalletransaction);

        // Get all the ewalletransactionList
        restEwalletransactionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ewalletransaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].externalid").value(hasItem(DEFAULT_EXTERNALID)))
            .andExpect(jsonPath("$.[*].idewalletcliente").value(hasItem(DEFAULT_IDEWALLETCLIENTE)))
            .andExpect(jsonPath("$.[*].idusercreate").value(hasItem(DEFAULT_IDUSERCREATE)))
            .andExpect(jsonPath("$.[*].xapikey").value(hasItem(DEFAULT_XAPIKEY)))
            .andExpect(jsonPath("$.[*].authorization").value(hasItem(DEFAULT_AUTHORIZATION)))
            .andExpect(jsonPath("$.[*].merchantid").value(hasItem(DEFAULT_MERCHANTID)))
            .andExpect(jsonPath("$.[*].accesstoken").value(hasItem(DEFAULT_ACCESSTOKEN)))
            .andExpect(jsonPath("$.[*].response").value(hasItem(DEFAULT_RESPONSE)))
            .andExpect(jsonPath("$.[*].idautorization").value(hasItem(DEFAULT_IDAUTORIZATION)))
            .andExpect(jsonPath("$.[*].timecreate").value(hasItem(DEFAULT_TIMECREATE)))
            .andExpect(jsonPath("$.[*].timeresponse").value(hasItem(DEFAULT_TIMERESPONSE)));
    }

    @Test
    @Transactional
    void getEwalletransaction() throws Exception {
        // Initialize the database
        ewalletransactionRepository.saveAndFlush(ewalletransaction);

        // Get the ewalletransaction
        restEwalletransactionMockMvc
            .perform(get(ENTITY_API_URL_ID, ewalletransaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ewalletransaction.getId().intValue()))
            .andExpect(jsonPath("$.externalid").value(DEFAULT_EXTERNALID))
            .andExpect(jsonPath("$.idewalletcliente").value(DEFAULT_IDEWALLETCLIENTE))
            .andExpect(jsonPath("$.idusercreate").value(DEFAULT_IDUSERCREATE))
            .andExpect(jsonPath("$.xapikey").value(DEFAULT_XAPIKEY))
            .andExpect(jsonPath("$.authorization").value(DEFAULT_AUTHORIZATION))
            .andExpect(jsonPath("$.merchantid").value(DEFAULT_MERCHANTID))
            .andExpect(jsonPath("$.accesstoken").value(DEFAULT_ACCESSTOKEN))
            .andExpect(jsonPath("$.response").value(DEFAULT_RESPONSE))
            .andExpect(jsonPath("$.idautorization").value(DEFAULT_IDAUTORIZATION))
            .andExpect(jsonPath("$.timecreate").value(DEFAULT_TIMECREATE))
            .andExpect(jsonPath("$.timeresponse").value(DEFAULT_TIMERESPONSE));
    }

    @Test
    @Transactional
    void getNonExistingEwalletransaction() throws Exception {
        // Get the ewalletransaction
        restEwalletransactionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEwalletransaction() throws Exception {
        // Initialize the database
        ewalletransactionRepository.saveAndFlush(ewalletransaction);

        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();

        // Update the ewalletransaction
        Ewalletransaction updatedEwalletransaction = ewalletransactionRepository.findById(ewalletransaction.getId()).get();
        // Disconnect from session so that the updates on updatedEwalletransaction are not directly saved in db
        em.detach(updatedEwalletransaction);
        updatedEwalletransaction
            .externalid(UPDATED_EXTERNALID)
            .idewalletcliente(UPDATED_IDEWALLETCLIENTE)
            .idusercreate(UPDATED_IDUSERCREATE)
            .xapikey(UPDATED_XAPIKEY)
            .authorization(UPDATED_AUTHORIZATION)
            .merchantid(UPDATED_MERCHANTID)
            .accesstoken(UPDATED_ACCESSTOKEN)
            .response(UPDATED_RESPONSE)
            .idautorization(UPDATED_IDAUTORIZATION)
            .timecreate(UPDATED_TIMECREATE)
            .timeresponse(UPDATED_TIMERESPONSE);

        restEwalletransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEwalletransaction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEwalletransaction))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
        Ewalletransaction testEwalletransaction = ewalletransactionList.get(ewalletransactionList.size() - 1);
        assertThat(testEwalletransaction.getExternalid()).isEqualTo(UPDATED_EXTERNALID);
        assertThat(testEwalletransaction.getIdewalletcliente()).isEqualTo(UPDATED_IDEWALLETCLIENTE);
        assertThat(testEwalletransaction.getIdusercreate()).isEqualTo(UPDATED_IDUSERCREATE);
        assertThat(testEwalletransaction.getXapikey()).isEqualTo(UPDATED_XAPIKEY);
        assertThat(testEwalletransaction.getAuthorization()).isEqualTo(UPDATED_AUTHORIZATION);
        assertThat(testEwalletransaction.getMerchantid()).isEqualTo(UPDATED_MERCHANTID);
        assertThat(testEwalletransaction.getAccesstoken()).isEqualTo(UPDATED_ACCESSTOKEN);
        assertThat(testEwalletransaction.getResponse()).isEqualTo(UPDATED_RESPONSE);
        assertThat(testEwalletransaction.getIdautorization()).isEqualTo(UPDATED_IDAUTORIZATION);
        assertThat(testEwalletransaction.getTimecreate()).isEqualTo(UPDATED_TIMECREATE);
        assertThat(testEwalletransaction.getTimeresponse()).isEqualTo(UPDATED_TIMERESPONSE);
    }

    @Test
    @Transactional
    void putNonExistingEwalletransaction() throws Exception {
        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();
        ewalletransaction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEwalletransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ewalletransaction.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEwalletransaction() throws Exception {
        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();
        ewalletransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletransactionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEwalletransaction() throws Exception {
        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();
        ewalletransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletransactionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEwalletransactionWithPatch() throws Exception {
        // Initialize the database
        ewalletransactionRepository.saveAndFlush(ewalletransaction);

        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();

        // Update the ewalletransaction using partial update
        Ewalletransaction partialUpdatedEwalletransaction = new Ewalletransaction();
        partialUpdatedEwalletransaction.setId(ewalletransaction.getId());

        partialUpdatedEwalletransaction
            .externalid(UPDATED_EXTERNALID)
            .idewalletcliente(UPDATED_IDEWALLETCLIENTE)
            .xapikey(UPDATED_XAPIKEY)
            .merchantid(UPDATED_MERCHANTID)
            .accesstoken(UPDATED_ACCESSTOKEN)
            .timecreate(UPDATED_TIMECREATE);

        restEwalletransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEwalletransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEwalletransaction))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
        Ewalletransaction testEwalletransaction = ewalletransactionList.get(ewalletransactionList.size() - 1);
        assertThat(testEwalletransaction.getExternalid()).isEqualTo(UPDATED_EXTERNALID);
        assertThat(testEwalletransaction.getIdewalletcliente()).isEqualTo(UPDATED_IDEWALLETCLIENTE);
        assertThat(testEwalletransaction.getIdusercreate()).isEqualTo(DEFAULT_IDUSERCREATE);
        assertThat(testEwalletransaction.getXapikey()).isEqualTo(UPDATED_XAPIKEY);
        assertThat(testEwalletransaction.getAuthorization()).isEqualTo(DEFAULT_AUTHORIZATION);
        assertThat(testEwalletransaction.getMerchantid()).isEqualTo(UPDATED_MERCHANTID);
        assertThat(testEwalletransaction.getAccesstoken()).isEqualTo(UPDATED_ACCESSTOKEN);
        assertThat(testEwalletransaction.getResponse()).isEqualTo(DEFAULT_RESPONSE);
        assertThat(testEwalletransaction.getIdautorization()).isEqualTo(DEFAULT_IDAUTORIZATION);
        assertThat(testEwalletransaction.getTimecreate()).isEqualTo(UPDATED_TIMECREATE);
        assertThat(testEwalletransaction.getTimeresponse()).isEqualTo(DEFAULT_TIMERESPONSE);
    }

    @Test
    @Transactional
    void fullUpdateEwalletransactionWithPatch() throws Exception {
        // Initialize the database
        ewalletransactionRepository.saveAndFlush(ewalletransaction);

        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();

        // Update the ewalletransaction using partial update
        Ewalletransaction partialUpdatedEwalletransaction = new Ewalletransaction();
        partialUpdatedEwalletransaction.setId(ewalletransaction.getId());

        partialUpdatedEwalletransaction
            .externalid(UPDATED_EXTERNALID)
            .idewalletcliente(UPDATED_IDEWALLETCLIENTE)
            .idusercreate(UPDATED_IDUSERCREATE)
            .xapikey(UPDATED_XAPIKEY)
            .authorization(UPDATED_AUTHORIZATION)
            .merchantid(UPDATED_MERCHANTID)
            .accesstoken(UPDATED_ACCESSTOKEN)
            .response(UPDATED_RESPONSE)
            .idautorization(UPDATED_IDAUTORIZATION)
            .timecreate(UPDATED_TIMECREATE)
            .timeresponse(UPDATED_TIMERESPONSE);

        restEwalletransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEwalletransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEwalletransaction))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
        Ewalletransaction testEwalletransaction = ewalletransactionList.get(ewalletransactionList.size() - 1);
        assertThat(testEwalletransaction.getExternalid()).isEqualTo(UPDATED_EXTERNALID);
        assertThat(testEwalletransaction.getIdewalletcliente()).isEqualTo(UPDATED_IDEWALLETCLIENTE);
        assertThat(testEwalletransaction.getIdusercreate()).isEqualTo(UPDATED_IDUSERCREATE);
        assertThat(testEwalletransaction.getXapikey()).isEqualTo(UPDATED_XAPIKEY);
        assertThat(testEwalletransaction.getAuthorization()).isEqualTo(UPDATED_AUTHORIZATION);
        assertThat(testEwalletransaction.getMerchantid()).isEqualTo(UPDATED_MERCHANTID);
        assertThat(testEwalletransaction.getAccesstoken()).isEqualTo(UPDATED_ACCESSTOKEN);
        assertThat(testEwalletransaction.getResponse()).isEqualTo(UPDATED_RESPONSE);
        assertThat(testEwalletransaction.getIdautorization()).isEqualTo(UPDATED_IDAUTORIZATION);
        assertThat(testEwalletransaction.getTimecreate()).isEqualTo(UPDATED_TIMECREATE);
        assertThat(testEwalletransaction.getTimeresponse()).isEqualTo(UPDATED_TIMERESPONSE);
    }

    @Test
    @Transactional
    void patchNonExistingEwalletransaction() throws Exception {
        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();
        ewalletransaction.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEwalletransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ewalletransaction.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEwalletransaction() throws Exception {
        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();
        ewalletransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletransactionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEwalletransaction() throws Exception {
        int databaseSizeBeforeUpdate = ewalletransactionRepository.findAll().size();
        ewalletransaction.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletransactionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletransaction))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ewalletransaction in the database
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEwalletransaction() throws Exception {
        // Initialize the database
        ewalletransactionRepository.saveAndFlush(ewalletransaction);

        int databaseSizeBeforeDelete = ewalletransactionRepository.findAll().size();

        // Delete the ewalletransaction
        restEwalletransactionMockMvc
            .perform(delete(ENTITY_API_URL_ID, ewalletransaction.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ewalletransaction> ewalletransactionList = ewalletransactionRepository.findAll();
        assertThat(ewalletransactionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
