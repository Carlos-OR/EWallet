package com.wnet.ewallet.web.rest;

import com.wnet.ewallet.domain.Ewalletcliente;
import com.wnet.ewallet.repository.EwalletclienteRepository;
import com.wnet.ewallet.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.wnet.ewallet.domain.Ewalletcliente}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EwalletclienteResource {

    private final Logger log = LoggerFactory.getLogger(EwalletclienteResource.class);

    private static final String ENTITY_NAME = "ewalletcliente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EwalletclienteRepository ewalletclienteRepository;

    public EwalletclienteResource(EwalletclienteRepository ewalletclienteRepository) {
        this.ewalletclienteRepository = ewalletclienteRepository;
    }

    /**
     * {@code POST  /ewalletclientes} : Create a new ewalletcliente.
     *
     * @param ewalletcliente the ewalletcliente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ewalletcliente, or with status {@code 400 (Bad Request)} if the ewalletcliente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ewalletclientes")
    public ResponseEntity<Ewalletcliente> createEwalletcliente(@RequestBody Ewalletcliente ewalletcliente) throws URISyntaxException {
        log.debug("REST request to save Ewalletcliente : {}", ewalletcliente);
        if (ewalletcliente.getId() != null) {
            throw new BadRequestAlertException("A new ewalletcliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ewalletcliente result = ewalletclienteRepository.save(ewalletcliente);
        return ResponseEntity
            .created(new URI("/api/ewalletclientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ewalletclientes/:id} : Updates an existing ewalletcliente.
     *
     * @param id the id of the ewalletcliente to save.
     * @param ewalletcliente the ewalletcliente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ewalletcliente,
     * or with status {@code 400 (Bad Request)} if the ewalletcliente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ewalletcliente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ewalletclientes/{id}")
    public ResponseEntity<Ewalletcliente> updateEwalletcliente(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ewalletcliente ewalletcliente
    ) throws URISyntaxException {
        log.debug("REST request to update Ewalletcliente : {}, {}", id, ewalletcliente);
        if (ewalletcliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ewalletcliente.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ewalletclienteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ewalletcliente result = ewalletclienteRepository.save(ewalletcliente);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ewalletcliente.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ewalletclientes/:id} : Partial updates given fields of an existing ewalletcliente, field will ignore if it is null
     *
     * @param id the id of the ewalletcliente to save.
     * @param ewalletcliente the ewalletcliente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ewalletcliente,
     * or with status {@code 400 (Bad Request)} if the ewalletcliente is not valid,
     * or with status {@code 404 (Not Found)} if the ewalletcliente is not found,
     * or with status {@code 500 (Internal Server Error)} if the ewalletcliente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ewalletclientes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ewalletcliente> partialUpdateEwalletcliente(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ewalletcliente ewalletcliente
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ewalletcliente partially : {}, {}", id, ewalletcliente);
        if (ewalletcliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ewalletcliente.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ewalletclienteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ewalletcliente> result = ewalletclienteRepository
            .findById(ewalletcliente.getId())
            .map(existingEwalletcliente -> {
                if (ewalletcliente.getNombre() != null) {
                    existingEwalletcliente.setNombre(ewalletcliente.getNombre());
                }
                if (ewalletcliente.getIdwizpos() != null) {
                    existingEwalletcliente.setIdwizpos(ewalletcliente.getIdwizpos());
                }
                if (ewalletcliente.getDatos() != null) {
                    existingEwalletcliente.setDatos(ewalletcliente.getDatos());
                }

                return existingEwalletcliente;
            })
            .map(ewalletclienteRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ewalletcliente.getId().toString())
        );
    }

    /**
     * {@code GET  /ewalletclientes} : get all the ewalletclientes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ewalletclientes in body.
     */
    @GetMapping("/ewalletclientes")
    public List<Ewalletcliente> getAllEwalletclientes() {
        log.debug("REST request to get all Ewalletclientes");
        return ewalletclienteRepository.findAll();
    }

    /**
     * {@code GET  /ewalletclientes/:id} : get the "id" ewalletcliente.
     *
     * @param id the id of the ewalletcliente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ewalletcliente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ewalletclientes/{id}")
    public ResponseEntity<Ewalletcliente> getEwalletcliente(@PathVariable Long id) {
        log.debug("REST request to get Ewalletcliente : {}", id);
        Optional<Ewalletcliente> ewalletcliente = ewalletclienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ewalletcliente);
    }

    /**
     * {@code DELETE  /ewalletclientes/:id} : delete the "id" ewalletcliente.
     *
     * @param id the id of the ewalletcliente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ewalletclientes/{id}")
    public ResponseEntity<Void> deleteEwalletcliente(@PathVariable Long id) {
        log.debug("REST request to delete Ewalletcliente : {}", id);
        ewalletclienteRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
