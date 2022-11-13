package com.wnet.ewallet.web.rest;

import com.wnet.ewallet.domain.Ewalletuser;
import com.wnet.ewallet.repository.EwalletuserRepository;
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
 * REST controller for managing {@link com.wnet.ewallet.domain.Ewalletuser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EwalletuserResource {

    private final Logger log = LoggerFactory.getLogger(EwalletuserResource.class);

    private static final String ENTITY_NAME = "ewalletuser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EwalletuserRepository ewalletuserRepository;

    public EwalletuserResource(EwalletuserRepository ewalletuserRepository) {
        this.ewalletuserRepository = ewalletuserRepository;
    }

    /**
     * {@code POST  /ewalletusers} : Create a new ewalletuser.
     *
     * @param ewalletuser the ewalletuser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ewalletuser, or with status {@code 400 (Bad Request)} if the ewalletuser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ewalletusers")
    public ResponseEntity<Ewalletuser> createEwalletuser(@RequestBody Ewalletuser ewalletuser) throws URISyntaxException {
        log.debug("REST request to save Ewalletuser : {}", ewalletuser);
        if (ewalletuser.getId() != null) {
            throw new BadRequestAlertException("A new ewalletuser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ewalletuser result = ewalletuserRepository.save(ewalletuser);
        return ResponseEntity
            .created(new URI("/api/ewalletusers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ewalletusers/:id} : Updates an existing ewalletuser.
     *
     * @param id the id of the ewalletuser to save.
     * @param ewalletuser the ewalletuser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ewalletuser,
     * or with status {@code 400 (Bad Request)} if the ewalletuser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ewalletuser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ewalletusers/{id}")
    public ResponseEntity<Ewalletuser> updateEwalletuser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ewalletuser ewalletuser
    ) throws URISyntaxException {
        log.debug("REST request to update Ewalletuser : {}, {}", id, ewalletuser);
        if (ewalletuser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ewalletuser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ewalletuserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ewalletuser result = ewalletuserRepository.save(ewalletuser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ewalletuser.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ewalletusers/:id} : Partial updates given fields of an existing ewalletuser, field will ignore if it is null
     *
     * @param id the id of the ewalletuser to save.
     * @param ewalletuser the ewalletuser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ewalletuser,
     * or with status {@code 400 (Bad Request)} if the ewalletuser is not valid,
     * or with status {@code 404 (Not Found)} if the ewalletuser is not found,
     * or with status {@code 500 (Internal Server Error)} if the ewalletuser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ewalletusers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ewalletuser> partialUpdateEwalletuser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ewalletuser ewalletuser
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ewalletuser partially : {}, {}", id, ewalletuser);
        if (ewalletuser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ewalletuser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ewalletuserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ewalletuser> result = ewalletuserRepository
            .findById(ewalletuser.getId())
            .map(existingEwalletuser -> {
                if (ewalletuser.getUsername() != null) {
                    existingEwalletuser.setUsername(ewalletuser.getUsername());
                }
                if (ewalletuser.getPassword() != null) {
                    existingEwalletuser.setPassword(ewalletuser.getPassword());
                }
                if (ewalletuser.getAppid() != null) {
                    existingEwalletuser.setAppid(ewalletuser.getAppid());
                }
                if (ewalletuser.getApikey() != null) {
                    existingEwalletuser.setApikey(ewalletuser.getApikey());
                }

                return existingEwalletuser;
            })
            .map(ewalletuserRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ewalletuser.getId().toString())
        );
    }

    /**
     * {@code GET  /ewalletusers} : get all the ewalletusers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ewalletusers in body.
     */
    @GetMapping("/ewalletusers")
    public List<Ewalletuser> getAllEwalletusers() {
        log.debug("REST request to get all Ewalletusers");
        return ewalletuserRepository.findAll();
    }

    /**
     * {@code GET  /ewalletusers/:id} : get the "id" ewalletuser.
     *
     * @param id the id of the ewalletuser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ewalletuser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ewalletusers/{id}")
    public ResponseEntity<Ewalletuser> getEwalletuser(@PathVariable Long id) {
        log.debug("REST request to get Ewalletuser : {}", id);
        Optional<Ewalletuser> ewalletuser = ewalletuserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ewalletuser);
    }

    /**
     * {@code DELETE  /ewalletusers/:id} : delete the "id" ewalletuser.
     *
     * @param id the id of the ewalletuser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ewalletusers/{id}")
    public ResponseEntity<Void> deleteEwalletuser(@PathVariable Long id) {
        log.debug("REST request to delete Ewalletuser : {}", id);
        ewalletuserRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
