/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */

import { object, array, string, date, mixed, number, Schema } from 'yup';
import {
  SCodiceNazione,
  STipoRitenuta,
  STipoCassa,
  SNatura,
  STipoDocumento,
  SValuta,
  SModPagamento,
  SSignAmount,
  SAliquota,
  SPrezzoSchema,
  SCodiceFiscale,
  SIBAN,
  SAbiCab,
} from './common';

/**
 * 0.1 - Utility Functions
 */

// const oneOrMore = (schema: Schema<any>) => mixed().concat(lazy(val =>Array.isArray(val) ?)).nullable().default(null);
const oneOrMore = (schema: Schema<any>) =>
  array()
    .of(schema)
    .transform((_current: any, original: any) => {
      return Array.isArray(original) ? original : new Array(original);
    })
    .default(undefined);

/**
 * 0.2 - National Standard Tipes
 */
const IdPaeseSchema = string().oneOf(SCodiceNazione);
const IdCodiceSchema = string().min(2).max(28);
const IdFiscaleIVASchema = object({
  IdPaese: IdPaeseSchema.required(),
  IdCodice: IdCodiceSchema.required(),
});
const CodiceFiscaleSchema = string().min(11).max(16);

const ScontoMaggiorazioneItem = object({
  Tipo: string().oneOf(['SC', 'MG']).required(),
  Percentuale: SAliquota,
  Importo: SSignAmount,
});

/**
 * 2.5 - Allegati
 */
const AllegatiSchema = object({
  NomeAttachment: string().min(1).max(60).required(), // 2.5.1
  AlgoritmoCompressione: string().min(1).max(10), // 2.5.2
  FormatoAttachment: string().min(1).max(10), // 2.5.3
  Attachment: string().required(), // 2.5.4
});

/**
 * 2.4.2 - DettaglioPagamento
 */
const DettaglioPagamentoSchema = object({
  Beneficiario: string().min(1).max(200),
  ModalitaPagamento: string().oneOf(SModPagamento).required(),
  DataRiferimentoTerminiPagamento: date(),
  GiorniTerminiPagamento: string().min(1).max(3),
  DataScadenzaPagamento: date(),
  ImportoPagamento: SSignAmount.required(),
  CodUfficioPostale: string().min(1).max(20),
  CognomeQuietanzante: string().when('ModalitaPagamento', {
    is: 'MP04',
    then: string().min(1).max(60),
    otherwise: string().default(undefined),
  }),
  NomeQuietanzante: string().when('ModalitaPagamento', {
    is: 'MP04',
    then: string().min(1).max(60),
    otherwise: string().default(undefined),
  }),
  CFQuietanzante: mixed().when('ModalitaPagamento', {
    is: 'MP04',
    then: SCodiceFiscale,
  }),
  TitoloQuietanzante: mixed().when('ModalitaPagamento', {
    is: 'MP04',
    then: string().min(2).max(10),
  }),
  IstitutoFinanziario: string().min(1).max(80),
  IBAN: SIBAN,
  ABI: SAbiCab,
  CAB: SAbiCab,
  BIC: string().min(8).max(11),
  ScontoPagamentoAnticipato: SSignAmount,
  DataLimitePagamentoAnticipato: date(),
  PenalitaPagamentiRitardati: SSignAmount,
  DataDecorrenzaPenale: date(),
  CodicePagamento: string().min(1).max(60),
});

/**
 * 2.4 - DatiPagamento
 */
const DatiPagamentoSchema = object({
  CondizioniPagamento: string().oneOf(['TP01', 'TP02', 'TP03']).required(), // 2.4.1
  DettaglioPagamento: oneOrMore(DettaglioPagamentoSchema).required(), // 2.4.2
});

/**
 * 2.3 - DatiVeicoli
 */
const DatiVeicoliSchema = object({
  Data: date(), // 2.3.1
  TotalePercorso: string().min(1).max(15), // 2.3.2
});

/**
 * 2.2.2 - DatiRiepilogo
 */
const DatiRiepilogoSchema = object({
  Natura: string().oneOf(SNatura), // 2.2.2.2
  SpeseAccessorie: string().matches(/^[-]?\d{1,12}(\.\d{2,6})$/), // 2.2.2.3
  Arrotondamento: string().matches(/^[-]?\d{1,13}(\.\d{2,6})$/), // 2.2.2.4
  ImponibileImporto: SPrezzoSchema.required(), // 2.2.2.5
  Imposta: SPrezzoSchema.required(), // 2.2.2.6
  EsigibilitaIVA: string().oneOf(['I', 'D', 'S']), // 2.2.2.7
  RiferimentoNormativo: string().min(1).max(100), // 2.2.2.8
});

/**
 * 2.2.1.16 - AltriDatiGestionaliItem
 */
const AltriDatiGestionaliSchema = object({
  TipoDato: string().min(1).max(10).required(), // 2.2.1.16.1
  RiferimentoTesto: string().min(1).max(60), // 2.2.1.16.2
  RiferimentoNumero: string().matches(/^\d{1,18}(\.\d{2,2})$/), // 2.2.1.16.3
  RiferimentoData: date(), //.raw(), // 2.2.1.16.4
});

/**
 * 2.2.1.3 CodiceArticolo
 */
const CodiceArticoloSchema = object({
  CodiceTipo: string().min(1).max(35).required(), // 2.2.1.3.1
  CodiceValore: string().min(1).max(35).required(), // 2.2.1.3.2
});

/**
 * 2.2.1 - DettaglioLinee
 */
const DettaglioLineeSchema = object({
  NumeroLinea: number().min(0).max(9999).required(), // 2.2.1.1
  TipoCessionePrestazione: string().oneOf(['SC', 'PR', 'AB', 'AC']), // 2.2.1.2
  CodiceArticolo: oneOrMore(CodiceArticoloSchema), // 2.2.1.3
  Descrizione: string().min(1).max(1000).required(), // 2.2.1.4
  Quantita: string().matches(/^\d{1,13}(\.\d{2,8})$/), // 2.2.1.5
  UnitaMisura: string().min(1).max(10), // 2.2.1.6
  DataInizioPeriodo: date(), //.raw(), // 2.2.1.7
  DataFinePeriodo: date(), //.raw(), // 2.2.1.8
  PrezzoUnitario: SPrezzoSchema.required(), // 2.2.1.9
  ScontoMaggiorazione: oneOrMore(ScontoMaggiorazioneItem), // 2.2.1.10
  PrezzoTotale: SPrezzoSchema.required(), // 2.2.1.11
  AliquotaIVA: SAliquota.required(), // 2.2.1.12
  Ritenuta: string().oneOf(['SI']), // 2.2.1.13
  Natura: string().oneOf(SNatura), // 2.2.1.14
  RiferimentoAmministrazione: string().min(1).max(20), // 2.2.1.15
  AltriDatiGestionali: oneOrMore(AltriDatiGestionaliSchema), // 2.2.1.16
});

/**
 * 2.2 - DatiBeniServizi
 */
const DatiBeniServiziSchema = object({
  DettaglioLinee: oneOrMore(DettaglioLineeSchema).required(), // 2.2.1
  DatiRiepilogo: oneOrMore(DatiRiepilogoSchema).required(), // 2.2.2
});

/**
 * 2.1.10 - FatturaPrincipale
 */
const FatturaPrincipaleSchema = object({
  NumeroFatturaPrincipale: string().min(1).max(20).required(), // 2.1.10.1
  DataFatturaPrincipale: date().required(), //.raw(), // 2.1.10.2
});

/**
 * 2.1.9.12 - IndirizzoResa
 */
const IndirizzoResaSchema = object({
  Indirizzo: string().min(1).max(60).required(),
  NumeroCivico: string().min(1).max(8),
  CAP: string()
    .matches(/^\d{5}$/)
    .required(),
  Comune: string().min(1).max(60).required(),
  Provincia: string().uppercase().length(2),
  Nazione: string().uppercase().length(2).required(),
});

/**
 * 2.1.9.1 - DatiAnagraficiVettore
 */
const DatiAnagraficiVettoreSchema = object({
  IdFiscaleIVA: IdFiscaleIVASchema.required(), // 2.1.9.1.1
  CodiceFiscale: CodiceFiscaleSchema, // 2.1.9.1.2
  Anagrafica: object()
    .shape({
      Denominazione: string().min(1).max(80),
      Nome: string().min(1).max(60),
      Cognome: string().min(1).max(60),
      Titolo: string().min(2).max(10),
      CodEORI: string().min(13).max(17),
    })
    .required(), // 2.1.9.1.3
  NumeroLicenzaGuida: string().min(1).max(20), // 2.1.9.1.4
});

/**
 * 2.1.9 - DatiTrasporto
 */
const DatiTrasportoSchema = object({
  DatiAnagraficiVettore: DatiAnagraficiVettoreSchema.default(undefined), // 2.1.9.1
  MezzoTrasporto: string().min(1).max(80), // 2.1.9.2
  CausaleTrasporto: string().min(1).max(100), // 2.1.9.3
  NumeroColli: number().integer().min(1).max(9999), // 2.1.9.4
  Descrizione: string().min(1).max(100), // 2.1.9.5
  UnitaMisuraPeso: string().min(1).max(10), // 2.1.9.6
  PesoLordo: string().matches(/^\d{1,4}(\.\d{2,2})$/), // 2.1.9.7
  PesoNetto: string().matches(/^\d{1,4}(\.\d{2,2})$/), // 2.1.9.8
  DataOraRitiro: date(), //.raw(), // 2.1.9.9
  DataInizioTrasporto: date(), //.raw(), // 2.1.9.10
  TipoResa: string().length(3), // 2.1.9.11
  IndirizzoResa: IndirizzoResaSchema.default(undefined), // 2.1.9.12
  DataOraConsegna: date(), //.raw(), // 2.1.9.13
});

/**
 * 2.1.8 - DatiDDT
 */
const DatiDDTSchema = object({
  NumeroDDT: string().min(1).max(20).required(), // 2.1.8.1
  DataDDT: date().required(), // 2.1.8.2
  RiferimentoNumeroLinea: oneOrMore(number().min(1).max(9999)), // 2.1.8.3
});

/**
 * 2.1.7 - DatiSAL
 */
const DatiSALSchema = object({
  RiferimentoFase: number().min(1).max(999).required(), // 2.1.7.1
});

/**
 * 2.1.2 - DatiOrdineAcquisto
 */
const DatiOrdineAcquistoSchema = object({
  RiferimentoNumeroLinea: oneOrMore(number().min(1).max(9999)), // 2.1.2.1
  IdDocumento: string().min(1).max(20).required(), // 2.1.2.2
  Data: date(), //.raw(), // 2.1.2.3
  NumItem: string().min(1).max(20), // 2.1.2.4
  CodiceCommessaConvenzione: string().min(1).max(100), // 2.1.2.5
  CodiceCUP: string().min(1).max(15), // 2.1.2.6
  CodiceCIG: string().min(1).max(15), // 2.1.2.7
});

/**
 * 2.1.1.7 - DatiCassaPrevidenziale
 */
const DatiCassaPrevidenzialeSchema = object({
  TipoCassa: string().oneOf(STipoCassa).required(), // 2.1.1.7.1
  AlCassa: SAliquota.required(), // 2.1.1.7.2
  ImportoContributoCassa: SSignAmount.required(), // 2.1.1.7.3
  ImponibileCassa: SSignAmount, // 2.1.1.7.4
  AliquotaIVA: SAliquota.required(), // 2.1.1.7.5
  Ritenuta: string().oneOf(['SI']), // 2.1.1.6
  // TODO : .when() - Da compilare quando 2.1.1.7.5 == 0
  Natura: string().oneOf(SNatura),
  RiferimentoAmministrazione: string().min(1).max(20),
});

/**
 * 2.1.1.6 - DatiBollo
 */
const DatiBolloSchema = object({
  BolloVirtuale: string().oneOf(['SI']).required(),
  ImportoBollo: SSignAmount,
});

/**
 * 2.1.1.5 - DatiRitenuta
 */
const DatiRitenutaSchema = object({
  TipoRitenuta: string().oneOf(STipoRitenuta).required(),
  ImportoRitenuta: SSignAmount.required(),
  AliquotaRitenuta: SAliquota.required(),
  CausalePagamento: string().min(1).max(2).required(),
});

/**
 * 2.1.1 - DatiGeneraliDocumento
 */
const DatiGeneraliDocumentoSchema = object({
  TipoDocumento: string().oneOf(STipoDocumento).required(), // 2.1.1.1
  Divisa: string().oneOf(SValuta).required(), // 2.1.1.2
  Data: date().required(), // 2.1.1.3
  Numero: string().max(20).required(), // 2.1.1.4
  DatiRitenuta: DatiRitenutaSchema.default(undefined), // 2.1.1.5
  DatiBollo: DatiBolloSchema.default(undefined), // 2.1.1.6
  DatiCassaPrevidenziale: oneOrMore(DatiCassaPrevidenzialeSchema), // 2.1.1.7
  ScontoMaggiorazione: oneOrMore(ScontoMaggiorazioneItem), // 2.1.1.8
  ImportoTotaleDocumento: SSignAmount, // 2.1.1.9
  Arrotondamento: SSignAmount, // 2.1.1.10
  Causale: oneOrMore(string().min(1).max(200)), // 2.1.1.11
  Art73: string().oneOf(['SI']), // 2.1.1.12
});

/**
 * 2.1 - DatiGenerali
 */
const DatiGeneraliSchema = object({
  DatiGeneraliDocumento: DatiGeneraliDocumentoSchema.required(), // 2.1.1
  DatiOrdineAcquisto: oneOrMore(DatiOrdineAcquistoSchema), // 2.1.2
  DatiContratto: oneOrMore(DatiOrdineAcquistoSchema), // 2.1.3
  DatiConvenzione: oneOrMore(DatiOrdineAcquistoSchema), // 2.1.4
  DatiRicezione: oneOrMore(DatiOrdineAcquistoSchema), // 2.1.5
  DatiFattureCollegate: oneOrMore(DatiOrdineAcquistoSchema), // 2.1.6
  DatiSAL: oneOrMore(DatiSALSchema), // 2.1.7
  DatiDDT: oneOrMore(DatiDDTSchema), // 2.1.8
  DatiTrasporto: DatiTrasportoSchema.default(undefined), // 2.1.9
  FatturaPrincipale: FatturaPrincipaleSchema.default(undefined), // 2.1.10
});

/**
 * 2.0 - FatturaElettronicabody
 */
export const FPAYupBody = oneOrMore(
  object({
    DatiGenerali: DatiGeneraliSchema.required(), // 2.1
    DatiBeniServizi: DatiBeniServiziSchema.required(), // 2.2
    DatiVeicoli: DatiVeicoliSchema.default(undefined), // 2.3
    DatiPagamento: DatiPagamentoSchema.default(undefined), // 2.4
    Allegati: AllegatiSchema.default(undefined), // 2.5
  })
)
  // array().of(FatturaElettronicaBodySchema)
  // mixed().oneOf([array().of(FatturaElettronicaBodySchema), FatturaElettronicaBodyItem])
  .required();
