/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */

import { string, object, date, number, mixed } from 'yup';
import { SCodiceNazione, SRegimiFiscali, SCodiceFiscale } from './common';

/**
 * 1. FatturaElettronicaHeader
 */
const SIdPaese = string().oneOf(SCodiceNazione);
const SIdCodice = string().min(2).max(28);
const SEmail = string().email().min(7).max(256);
const SRifAmministrazione = string().min(1).max(20);
const SIdFiscaleIVA = object({
  IdPaese: SIdPaese.required(),
  IdCodice: SIdCodice.required(),
});
const SIndirizzo = string().min(1).max(60);
const SNumCivico = string().min(1).max(8);
const SContattiTrasmittente = object({
  Telefono: string().min(5).max(12), // 1.1.5.1
  Email: SEmail, // 1.1.5.2
}).nullable();
const SStabileOrganizz = object({
  Indirizzo: SIndirizzo.required(), // 1.2.3.1
  NumeroCivico: SNumCivico, // 1.2.3.2
  CAP: string()
    .matches(/^\d{5}$/)
    .required(), // 1.2.3.3
  Comune: string().min(1).max(60).required(), // 1.2.3.4
  Provincia: string().uppercase().length(2), // 1.2.3.5
  Nazione: string().uppercase().length(2).required(), // 1.2.3.6
}).when('Sede.Nazione', {
  is: (v) => v !== 'IT',
  then: object().required(),
  otherwise: object().nullable(),
});
// .nullable();

const SIscrizioneREA = object({
  Ufficio: string().uppercase().length(2).required(), // 1.2.4.1
  NumeroREA: string().min(1).max(20).required(), // 1.2.4.2
  CapitaleSociale: number()
    // .precision(2)
    .positive(), // 1.2.4.3
  SocioUnico: string().oneOf(['SU', 'SM']), // 1.2.4.4
  StatoLiquidazione: string().oneOf(['LS', 'LN']).required(), // 1.2.4.5
});

/**
 * 1.1 DatiTrasmissione
 */
const SDatiTrasmissione = object()
  .shape({
    /**
     * 1.1.1 IdTrasmittente
     */
    IdTrasmittente: object()
      .shape({
        IdPaese: SIdPaese.required(),
        IdCodice: string().required().min(2).max(28),
        // TODO : Verify IdCodice exists in the national database if IdPaese = "IT"
      })
      .required(),
    /**
     * 1.1.2 ProgressivoInvio
     */
    ProgressivoInvio: string().required().min(1).max(10),
    /**
     * 1.1.3 FormatoTrasmissione
     */
    FormatoTrasmissione: string().oneOf(['FPA12', 'FPR12']).required(),
    /**
     * 1.1.4 CodiceDestinatario
     */
    CodiceDestinatario: string()
      .when('FormatoTrasmissione', {
        is: 'FPA12',
        then: string().length(6),
        otherwise: string().length(7),
      })
      // .when('PECDestinatario', {
      //   is: PECDestinatario => PECDestinatario.length > 0,
      //   then: string().oneOf(['0000000']),
      // })
      .required(),
    /**
     * 1.1.5 ContattiTrasmittente
     */
    ContattiTrasmittente: SContattiTrasmittente,
    /**
     * 1.1.6 PECDestinatario
     */
    PECDestinatario: string().when('CodiceDestinatario', {
      // FIXME
      is: '0000000',
      then: SEmail.required(),
      otherwise: string().nullable(),
    }),
  })
  .required();

/**
 * 1.2 CedentePrestatore
 */
const SCedPrestatore = object({
  /**
   * 1.2.1 DatiAnagrafici
   */
  DatiAnagrafici: object()
    .shape({
      IdFiscaleIVA: SIdFiscaleIVA.required(), // 1.2.1.1
      CodiceFiscale: SCodiceFiscale, // 1.2.1.2
      Anagrafica: object()
        .shape({
          //1.2.1.3
          Denominazione: string().min(1).max(80), // 1.2.1.3.1
          Nome: string().min(1).max(60), // 1.2.1.3.2
          Cognome: string().min(1).max(60), // 1.2.1.3.3
          Titolo: string().min(2).max(10), // 1.2.1.3.4
          CodEORI: string().min(13).max(17), // 1.2.1.3.5
        })
        .required(),
      AlboProfessionale: string().min(1).max(60), // 1.2.1.4
      ProvinciaAlbo: string().length(2), // 1.2.1.5
      NumeroIscrizioneAlbo: string().min(1).max(60), // 1.2.1.6
      DataIscrizioneAlbo: date(),
      // .string()
      // .isoDate()
      // .raw()
      // .notes('YYYY-MM-DD'), // 1.2.1.7
      RegimeFiscale: string().oneOf(SRegimiFiscali).required(), // 1.2.1.8
    })
    .required(),
  /**
   * 1.2.2 Sede
   */
  Sede: object({
    Indirizzo: SIndirizzo.required(),
    NumeroCivico: string().min(1).max(8),
    CAP: string()
      .matches(/^\d{5}$/)
      .required(),
    Comune: string().min(1).max(60).required(),
    Provincia: string().uppercase().length(2),
    Nazione: string().uppercase().length(2).required(),
  }).required(), // 1.2.2
  /**
   * 1.2.3 StabileOrganizzazione
   */
  StabileOrganizzazione: object().when('Sede.Nazione', {
    is: (v) => v !== 'IT',
    then: SStabileOrganizz.required(),
    otherwise: object().nullable(),
  }),
  /**
   * 1.2.4 IscrizioneREA
   */
  IscrizioneREA: SIscrizioneREA.nullable().default(null), // 1.2.4
  /**
   * 1.2.5 Contatti
   */
  Contatti: object({
    Telefono: string().min(5).max(12), // 1.2.5.1
    Fax: string().min(5).max(12), // 1.2.5.2
    Email: SEmail, // 1.2.5.3
  }).nullable(), // 1.2.5
  RiferimentoAmministrazione: SRifAmministrazione, // 1.2.6
}).required();

/**
 * 1.2 - CEDENTE PRESTATORE
 */
// const SCedPrestatore = object({
//   DatiAnagrafici: SDatiAnagCedentePrestatore, // 1.2.1
//   Sede: SSedeCedentePrestatore, // 1.2.2
//   StabileOrganizzazione: object().when('Sede.Nazione', {
//     is: (v) => v !== 'IT',
//     then: SStabileOrganizz.required(),
//     otherwise: object().nullable(),
//   }), // 1.2.3
//   IscrizioneREA: SIscrizioneREA.nullable().default(null), // 1.2.4
//   Contatti: SContattiCedPres, // 1.2.5
//   RiferimentoAmministrazione: SRifAmministrazione, // 1.2.6
// }).required();

/**
 * 1.3 - RAPPRESENTANTE FISCALE
 */
const SRappresFiscale = object({
  /**
   * 1.3.1 DatiAnagrafici
   */
  DatiAnagrafici: object({
    IdFiscaleIVA: SIdFiscaleIVA.required(), // 1.3.1.1
    CodiceFiscale: SCodiceFiscale, // 1.3.1.2
    Anagrafica: object({
      Denominazione: string().min(1).max(80),
      Nome: string().min(1).max(60),
      Cognome: string().min(1).max(60),
      Titolo: string().min(2).max(10),
      CodEORI: string().min(13).max(17),
    }).required(), //1.3.1.3
  })
    .nullable()
    .default(null), // 1.3.1
})
  .nullable()
  .default(null);

/**
 * 1.4 CessionarioCommittente
 */
const SCessionarioCommittente = object({
  /**
   * 1.4.1 DatiAnagrafici
   */
  DatiAnagrafici: object()
    .shape(
      {
        IdFiscaleIVA: mixed().when('CodiceFiscale', {
          is: (CodiceFiscale) => !CodiceFiscale,
          then: SIdFiscaleIVA.required(),
        }),
        CodiceFiscale: mixed().when('IdFiscaleIVA', {
          is: (IdFiscale) => !IdFiscale,
          then: SCodiceFiscale.required(),
        }),
        Anagrafica: object()
          .shape({
            Denominazione: string().min(1).max(80),
            Nome: string().min(1).max(60),
            Cognome: string().min(1).max(60),
            Titolo: string().min(2).max(10),
            CodEORI: string().min(13).max(17),
          })
          .required(),
      },
      [['CodiceFiscale', 'IdFiscaleIVA']]
    )
    .required(),
  /**
   * 1.4.2 Sede
   */
  Sede: object({
    Indirizzo: SIndirizzo.required(),
    NumeroCivico: SNumCivico,
    CAP: string()
      .matches(/^\d{5}$/)
      .required(),
    Comune: string().min(1).max(60).required(),
    Provincia: string().uppercase().length(2),
    Nazione: string().uppercase().length(2).required(),
  }).required(),
  /**
   * 1.4.3 StabileOrganizzazione
   */
  StabileOrganizzazione: object().when('Sede.Nazione', {
    is: (v) => v !== 'IT',
    then: SStabileOrganizz.required(),
    otherwise: object().nullable(),
  }),
  /**
   * 1.4.4 RappresentanteFiscale
   */
  RappresentanteFiscale: object().shape({
    IdFiscaleIVA: SIdFiscaleIVA.nullable().default(null),
    Denominazione: string().min(1).max(80),
    Nome: string().min(1).max(60),
    Cognome: string().min(1).max(60),
  }),
}).required();

/**
 * 1.5 - TERZO INTERMEDIARIO O SOGGETTO EMITTENTE
 */
const TerzoIntermediarioOSoggettoEmittenteSchema = object({
  DatiAnagrafici: object()
    .shape({
      IdFiscaleIVA: SIdFiscaleIVA,
      CodiceFiscale: SCodiceFiscale,
      Anagrafica: object()
        .shape({
          Denominazione: string().min(1).max(80),
          Nome: string().min(1).max(60),
          Cognome: string().min(1).max(60),
          Titolo: string().min(2).max(10),
          CodEORI: string().min(13).max(17),
        })
        .required(),
    })
    .required(),
})
  .nullable()
  .default(null);

/**
 * 1.6 - SOGGETTO EMITTENTE
 */
const SSoggettoEmittente = string().oneOf(['CC', 'TZ']);

/**
 * 1. FATTURA ELETTRONICA HEADER
 */
export const FPAYupHeader = object({
  DatiTrasmissione: SDatiTrasmissione, // 1.1
  CedentePrestatore: SCedPrestatore, // 1.2
  RappresentanteFiscale: SRappresFiscale, // 1.3
  CessionarioCommittente: SCessionarioCommittente, // 1.4
  TerzoIntermediarioOSoggettoEmittente: TerzoIntermediarioOSoggettoEmittenteSchema, // 1.5
  SoggettoEmittente: SSoggettoEmittente, // 1.6
}).required();
