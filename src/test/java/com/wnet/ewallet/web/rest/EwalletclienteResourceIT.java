package com.wnet.ewallet.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.wnet.ewallet.IntegrationTest;
import com.wnet.ewallet.domain.Ewalletcliente;
import com.wnet.ewallet.repository.EwalletclienteRepository;
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
 * Integration tests for the {@link EwalletclienteResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class EwalletclienteResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Long DEFAULT_IDWIZPOS = 1L;
    private static final Long UPDATED_IDWIZPOS = 2L;

    private static final String DEFAULT_DATOS = "AAAAAAAAAA";
    private static final String UPDATED_DATOS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/ewalletclientes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EwalletclienteRepository ewalletclienteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEwalletclienteMockMvc;

    private Ewalletcliente ewalletcliente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ewalletcliente createEntity(EntityManager em) {
        Ewalletcliente ewalletcliente = new Ewalletcliente().nombre(DEFAULT_NOMBRE).idwizpos(DEFAULT_IDWIZPOS).datos(DEFAULT_DATOS);
        return ewalletcliente;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ewalletcliente createUpdatedEntity(EntityManager em) {
        Ewalletcliente ewalletcliente = new Ewalletcliente().nombre(UPDATED_NOMBRE).idwizpos(UPDATED_IDWIZPOS).datos(UPDATED_DATOS);
        return ewalletcliente;
    }

    @BeforeEach
    public void initTest() {
        ewalletcliente = createEntity(em);
    }

    @Test
    @Transactional
    void createEwalletcliente() throws Exception {
        int databaseSizeBeforeCreate = ewalletclienteRepository.findAll().size();
        // Create the Ewalletcliente
        restEwalletclienteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isCreated());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeCreate + 1);
        Ewalletcliente testEwalletcliente = ewalletclienteList.get(ewalletclienteList.size() - 1);
        assertThat(testEwalletcliente.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEwalletcliente.getIdwizpos()).isEqualTo(DEFAULT_IDWIZPOS);
        assertThat(testEwalletcliente.getDatos()).isEqualTo(DEFAULT_DATOS);
    }

    @Test
    @Transactional
    void createEwalletclienteWithExistingId() throws Exception {
        // Create the Ewalletcliente with an existing ID
        ewalletcliente.setId(1L);

        int databaseSizeBeforeCreate = ewalletclienteRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restEwalletclienteMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllEwalletclientes() throws Exception {
        // Initialize the database
        ewalletclienteRepository.saveAndFlush(ewalletcliente);

        // Get all the ewalletclienteList
        restEwalletclienteMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ewalletcliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].idwizpos").value(hasItem(DEFAULT_IDWIZPOS.intValue())))
            .andExpect(jsonPath("$.[*].datos").value(hasItem(DEFAULT_DATOS)));
    }

    @Test
    @Transactional
    void getEwalletcliente() throws Exception {
        // Initialize the database
        ewalletclienteRepository.saveAndFlush(ewalletcliente);

        // Get the ewalletcliente
        restEwalletclienteMockMvc
            .perform(get(ENTITY_API_URL_ID, ewalletcliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ewalletcliente.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.idwizpos").value(DEFAULT_IDWIZPOS.intValue()))
            .andExpect(jsonPath("$.datos").value(DEFAULT_DATOS));
    }

    @Test
    @Transactional
    void getNonExistingEwalletcliente() throws Exception {
        // Get the ewalletcliente
        restEwalletclienteMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingEwalletcliente() throws Exception {
        // Initialize the database
        ewalletclienteRepository.saveAndFlush(ewalletcliente);

        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();

        // Update the ewalletcliente
        Ewalletcliente updatedEwalletcliente = ewalletclienteRepository.findById(ewalletcliente.getId()).get();
        // Disconnect from session so that the updates on updatedEwalletcliente are not directly saved in db
        em.detach(updatedEwalletcliente);
        updatedEwalletcliente.nombre(UPDATED_NOMBRE).idwizpos(UPDATED_IDWIZPOS).datos(UPDATED_DATOS);

        restEwalletclienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedEwalletcliente.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedEwalletcliente))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
        Ewalletcliente testEwalletcliente = ewalletclienteList.get(ewalletclienteList.size() - 1);
        assertThat(testEwalletcliente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEwalletcliente.getIdwizpos()).isEqualTo(UPDATED_IDWIZPOS);
        assertThat(testEwalletcliente.getDatos()).isEqualTo(UPDATED_DATOS);
    }

    @Test
    @Transactional
    void putNonExistingEwalletcliente() throws Exception {
        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();
        ewalletcliente.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEwalletclienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ewalletcliente.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchEwalletcliente() throws Exception {
        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();
        ewalletcliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletclienteMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamEwalletcliente() throws Exception {
        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();
        ewalletcliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletclienteMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ewalletcliente)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateEwalletclienteWithPatch() throws Exception {
        // Initialize the database
        ewalletclienteRepository.saveAndFlush(ewalletcliente);

        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();

        // Update the ewalletcliente using partial update
        Ewalletcliente partialUpdatedEwalletcliente = new Ewalletcliente();
        partialUpdatedEwalletcliente.setId(ewalletcliente.getId());

        partialUpdatedEwalletcliente.nombre(UPDATED_NOMBRE).idwizpos(UPDATED_IDWIZPOS).datos(UPDATED_DATOS);

        restEwalletclienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEwalletcliente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEwalletcliente))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
        Ewalletcliente testEwalletcliente = ewalletclienteList.get(ewalletclienteList.size() - 1);
        assertThat(testEwalletcliente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEwalletcliente.getIdwizpos()).isEqualTo(UPDATED_IDWIZPOS);
        assertThat(testEwalletcliente.getDatos()).isEqualTo(UPDATED_DATOS);
    }

    @Test
    @Transactional
    void fullUpdateEwalletclienteWithPatch() throws Exception {
        // Initialize the database
        ewalletclienteRepository.saveAndFlush(ewalletcliente);

        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();

        // Update the ewalletcliente using partial update
        Ewalletcliente partialUpdatedEwalletcliente = new Ewalletcliente();
        partialUpdatedEwalletcliente.setId(ewalletcliente.getId());

        partialUpdatedEwalletcliente.nombre(UPDATED_NOMBRE).idwizpos(UPDATED_IDWIZPOS).datos(UPDATED_DATOS);

        restEwalletclienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedEwalletcliente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedEwalletcliente))
            )
            .andExpect(status().isOk());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
        Ewalletcliente testEwalletcliente = ewalletclienteList.get(ewalletclienteList.size() - 1);
        assertThat(testEwalletcliente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEwalletcliente.getIdwizpos()).isEqualTo(UPDATED_IDWIZPOS);
        assertThat(testEwalletcliente.getDatos()).isEqualTo(UPDATED_DATOS);
    }

    @Test
    @Transactional
    void patchNonExistingEwalletcliente() throws Exception {
        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();
        ewalletcliente.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEwalletclienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ewalletcliente.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchEwalletcliente() throws Exception {
        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();
        ewalletcliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletclienteMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamEwalletcliente() throws Exception {
        int databaseSizeBeforeUpdate = ewalletclienteRepository.findAll().size();
        ewalletcliente.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restEwalletclienteMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ewalletcliente))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ewalletcliente in the database
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteEwalletcliente() throws Exception {
        // Initialize the database
        ewalletclienteRepository.saveAndFlush(ewalletcliente);

        int databaseSizeBeforeDelete = ewalletclienteRepository.findAll().size();

        // Delete the ewalletcliente
        restEwalletclienteMockMvc
            .perform(delete(ENTITY_API_URL_ID, ewalletcliente.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ewalletcliente> ewalletclienteList = ewalletclienteRepository.findAll();
        assertThat(ewalletclienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
