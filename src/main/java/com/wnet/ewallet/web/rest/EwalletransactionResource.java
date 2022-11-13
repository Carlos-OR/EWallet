package com.wnet.ewallet.web.rest;

import com.wnet.ewallet.domain.Ewalletransaction;
import com.wnet.ewallet.repository.EwalletransactionRepository;
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
 * REST controller for managing {@link com.wnet.ewallet.domain.Ewalletransaction}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EwalletransactionResource {

    private final Logger log = LoggerFactory.getLogger(EwalletransactionResource.class);

    private static final String ENTITY_NAME = "ewalletransaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EwalletransactionRepository ewalletransactionRepository;

    public EwalletransactionResource(EwalletransactionRepository ewalletransactionRepository) {
        this.ewalletransactionRepository = ewalletransactionRepository;
    }

    /**
     * {@code POST  /ewalletransactions} : Create a new ewalletransaction.
     *
     * @param ewalletransaction the ewalletransaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ewalletransaction, or with status {@code 400 (Bad Request)} if the ewalletransaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ewalletransactions")
    public ResponseEntity<Ewalletransaction> createEwalletransaction(@RequestBody Ewalletransaction ewalletransaction)
        throws URISyntaxException {
        log.debug("REST request to save Ewalletransaction : {}", ewalletransaction);
        if (ewalletransaction.getId() != null) {
            throw new BadRequestAlertException("A new ewalletransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ewalletransaction result = ewalletransactionRepository.save(ewalletransaction);
        return ResponseEntity
            .created(new URI("/api/ewalletransactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ewalletransactions/:id} : Updates an existing ewalletransaction.
     *
     * @param id the id of the ewalletransaction to save.
     * @param ewalletransaction the ewalletransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ewalletransaction,
     * or with status {@code 400 (Bad Request)} if the ewalletransaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ewalletransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ewalletransactions/{id}")
    public ResponseEntity<Ewalletransaction> updateEwalletransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ewalletransaction ewalletransaction
    ) throws URISyntaxException {
        log.debug("REST request to update Ewalletransaction : {}, {}", id, ewalletransaction);
        if (ewalletransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ewalletransaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ewalletransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ewalletransaction result = ewalletransactionRepository.save(ewalletransaction);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ewalletransaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ewalletransactions/:id} : Partial updates given fields of an existing ewalletransaction, field will ignore if it is null
     *
     * @param id the id of the ewalletransaction to save.
     * @param ewalletransaction the ewalletransaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ewalletransaction,
     * or with status {@code 400 (Bad Request)} if the ewalletransaction is not valid,
     * or with status {@code 404 (Not Found)} if the ewalletransaction is not found,
     * or with status {@code 500 (Internal Server Error)} if the ewalletransaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ewalletransactions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ewalletransaction> partialUpdateEwalletransaction(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ewalletransaction ewalletransaction
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ewalletransaction partially : {}, {}", id, ewalletransaction);
        if (ewalletransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ewalletransaction.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ewalletransactionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ewalletransaction> result = ewalletransactionRepository
            .findById(ewalletransaction.getId())
            .map(existingEwalletransaction -> {
                if (ewalletransaction.getExternalid() != null) {
                    existingEwalletransaction.setExternalid(ewalletransaction.getExternalid());
                }
                if (ewalletransaction.getIdewalletcliente() != null) {
                    existingEwalletransaction.setIdewalletcliente(ewalletransaction.getIdewalletcliente());
                }
                if (ewalletransaction.getIdusercreate() != null) {
                    existingEwalletransaction.setIdusercreate(ewalletransaction.getIdusercreate());
                }
                if (ewalletransaction.getXapikey() != null) {
                    existingEwalletransaction.setXapikey(ewalletransaction.getXapikey());
                }
                if (ewalletransaction.getAuthorization() != null) {
                    existingEwalletransaction.setAuthorization(ewalletransaction.getAuthorization());
                }
                if (ewalletransaction.getMerchantid() != null) {
                    existingEwalletransaction.setMerchantid(ewalletransaction.getMerchantid());
                }
                if (ewalletransaction.getAccesstoken() != null) {
                    existingEwalletransaction.setAccesstoken(ewalletransaction.getAccesstoken());
                }
                if (ewalletransaction.getResponse() != null) {
                    existingEwalletransaction.setResponse(ewalletransaction.getResponse());
                }
                if (ewalletransaction.getIdautorization() != null) {
                    existingEwalletransaction.setIdautorization(ewalletransaction.getIdautorization());
                }
                if (ewalletransaction.getTimecreate() != null) {
                    existingEwalletransaction.setTimecreate(ewalletransaction.getTimecreate());
                }
                if (ewalletransaction.getTimeresponse() != null) {
                    existingEwalletransaction.setTimeresponse(ewalletransaction.getTimeresponse());
                }

                return existingEwalletransaction;
            })
            .map(ewalletransactionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ewalletransaction.getId().toString())
        );
    }

    /**
     * {@code GET  /ewalletransactions} : get all the ewalletransactions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ewalletransactions in body.
     */
    @GetMapping("/ewalletransactions")
    public List<Ewalletransaction> getAllEwalletransactions() {
        log.debug("REST request to get all Ewalletransactions");
        return ewalletransactionRepository.findAll();
    }

    /**
     * {@code GET  /ewalletransactions/:id} : get the "id" ewalletransaction.
     *
     * @param id the id of the ewalletransaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ewalletransaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ewalletransactions/{id}")
    public ResponseEntity<Ewalletransaction> getEwalletransaction(@PathVariable Long id) {
        log.debug("REST request to get Ewalletransaction : {}", id);
        Optional<Ewalletransaction> ewalletransaction = ewalletransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ewalletransaction);
    }

    /**
     * {@code DELETE  /ewalletransactions/:id} : delete the "id" ewalletransaction.
     *
     * @param id the id of the ewalletransaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ewalletransactions/{id}")
    public ResponseEntity<Void> deleteEwalletransaction(@PathVariable Long id) {
        log.debug("REST request to delete Ewalletransaction : {}", id);
        ewalletransactionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
