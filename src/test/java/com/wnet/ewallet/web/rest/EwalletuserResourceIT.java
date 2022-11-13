package com.wnet.ewallet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.wnet.ewallet.IntegrationTest;
import com.wnet.ewallet.domain.Ewalletuser;
import com.wnet.ewallet.repository.EwalletuserRepository;
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
 * Integration tests for the {@link EwalletuserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EwalletuserResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_APPID = "AAAAAAAAAA";
    private static final String UPDATED_APPID = "BBBBBBBBBB";

    private static final String DEFAULT_APIKEY = "AAAAAAAAAA";
    private static final String UPDATED_APIKEY = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ewalletusers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EwalletuserRepository ewalletuserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEwalletuserMockMvc;

    private Ewalletuser ewalletuser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ewalletuser createEntity(EntityManager em) {
        Ewalletuser ewalletuser = new Ewalletuser()
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD)
            .appid(DEFAULT_APPID)
            .apikey(DEFAULT_APIKEY);
        return ewalletuser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ewalletuser createUpdatedEntity(EntityManager em) {
        Ewalletuser ewalletuser = new Ewalletuser()
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD)
            .appid(UPDATED_APPID)
            .apikey(UPDATED_APIKEY);
        return ewalletuser;
    }

    @BeforeEach
    public void initTest() {
        ewalletuser = createEntity(em);
    }

    @Test
    @Transactional
    void createEwalletuser() throws Exception {
        int databaseSizeBeforeCreate = ewalletuserRepository.findAll().size();
        // Create the Ewalletuser
        restEwalletuserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletuser)))
            .andExpect(status().isCreated());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeCreate + 1);
        Ewalletuser testEwalletuser = ewalletuserList.get(ewalletuserList.size() - 1);
        assertThat(testEwalletuser.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testEwalletuser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testEwalletuser.getAppid()).isEqualTo(DEFAULT_APPID);
        assertThat(testEwalletuser.getApikey()).isEqualTo(DEFAULT_APIKEY);
    }

    @Test
    @Transactional
    void createEwalletuserWithExistingId() throws Exception {
        // Create the Ewalletuser with an existing ID
        ewalletuser.setId(1L);

        int databaseSizeBeforeCreate = ewalletuserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEwalletuserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletuser)))
            .andExpect(status().isBadRequest());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEwalletusers() throws Exception {
        // Initialize the database
        ewalletuserRepository.saveAndFlush(ewalletuser);

        // Get all the ewalletuserList
        restEwalletuserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ewalletuser.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].appid").value(hasItem(DEFAULT_APPID)))
            .andExpect(jsonPath("$.[*].apikey").value(hasItem(DEFAULT_APIKEY)));
    }

    @Test
    @Transactional
    void getEwalletuser() throws Exception {
        // Initialize the database
        ewalletuserRepository.saveAndFlush(ewalletuser);

        // Get the ewalletuser
        restEwalletuserMockMvc
            .perform(get(ENTITY_API_URL_ID, ewalletuser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ewalletuser.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.appid").value(DEFAULT_APPID))
            .andExpect(jsonPath("$.apikey").value(DEFAULT_APIKEY));
    }

    @Test
    @Transactional
    void getNonExistingEwalletuser() throws Exception {
        // Get the ewalletuser
        restEwalletuserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEwalletuser() throws Exception {
        // Initialize the database
        ewalletuserRepository.saveAndFlush(ewalletuser);

        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();

        // Update the ewalletuser
        Ewalletuser updatedEwalletuser = ewalletuserRepository.findById(ewalletuser.getId()).get();
        // Disconnect from session so that the updates on updatedEwalletuser are not directly saved in db
        em.detach(updatedEwalletuser);
        updatedEwalletuser.username(UPDATED_USERNAME).password(UPDATED_PASSWORD).appid(UPDATED_APPID).apikey(UPDATED_APIKEY);

        restEwalletuserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEwalletuser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEwalletuser))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
        Ewalletuser testEwalletuser = ewalletuserList.get(ewalletuserList.size() - 1);
        assertThat(testEwalletuser.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testEwalletuser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testEwalletuser.getAppid()).isEqualTo(UPDATED_APPID);
        assertThat(testEwalletuser.getApikey()).isEqualTo(UPDATED_APIKEY);
    }

    @Test
    @Transactional
    void putNonExistingEwalletuser() throws Exception {
        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();
        ewalletuser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEwalletuserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ewalletuser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ewalletuser))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEwalletuser() throws Exception {
        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();
        ewalletuser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletuserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ewalletuser))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEwalletuser() throws Exception {
        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();
        ewalletuser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletuserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletuser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEwalletuserWithPatch() throws Exception {
        // Initialize the database
        ewalletuserRepository.saveAndFlush(ewalletuser);

        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();

        // Update the ewalletuser using partial update
        Ewalletuser partialUpdatedEwalletuser = new Ewalletuser();
        partialUpdatedEwalletuser.setId(ewalletuser.getId());

        partialUpdatedEwalletuser.password(UPDATED_PASSWORD).appid(UPDATED_APPID);

        restEwalletuserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEwalletuser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEwalletuser))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
        Ewalletuser testEwalletuser = ewalletuserList.get(ewalletuserList.size() - 1);
        assertThat(testEwalletuser.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testEwalletuser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testEwalletuser.getAppid()).isEqualTo(UPDATED_APPID);
        assertThat(testEwalletuser.getApikey()).isEqualTo(DEFAULT_APIKEY);
    }

    @Test
    @Transactional
    void fullUpdateEwalletuserWithPatch() throws Exception {
        // Initialize the database
        ewalletuserRepository.saveAndFlush(ewalletuser);

        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();

        // Update the ewalletuser using partial update
        Ewalletuser partialUpdatedEwalletuser = new Ewalletuser();
        partialUpdatedEwalletuser.setId(ewalletuser.getId());

        partialUpdatedEwalletuser.username(UPDATED_USERNAME).password(UPDATED_PASSWORD).appid(UPDATED_APPID).apikey(UPDATED_APIKEY);

        restEwalletuserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEwalletuser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEwalletuser))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
        Ewalletuser testEwalletuser = ewalletuserList.get(ewalletuserList.size() - 1);
        assertThat(testEwalletuser.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testEwalletuser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testEwalletuser.getAppid()).isEqualTo(UPDATED_APPID);
        assertThat(testEwalletuser.getApikey()).isEqualTo(UPDATED_APIKEY);
    }

    @Test
    @Transactional
    void patchNonExistingEwalletuser() throws Exception {
        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();
        ewalletuser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEwalletuserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ewalletuser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletuser))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEwalletuser() throws Exception {
        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();
        ewalletuser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletuserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletuser))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEwalletuser() throws Exception {
        int databaseSizeBeforeUpdate = ewalletuserRepository.findAll().size();
        ewalletuser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletuserMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ewalletuser))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ewalletuser in the database
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEwalletuser() throws Exception {
        // Initialize the database
        ewalletuserRepository.saveAndFlush(ewalletuser);

        int databaseSizeBeforeDelete = ewalletuserRepository.findAll().size();

        // Delete the ewalletuser
        restEwalletuserMockMvc
            .perform(delete(ENTITY_API_URL_ID, ewalletuser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ewalletuser> ewalletuserList = ewalletuserRepository.findAll();
        assertThat(ewalletuserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
