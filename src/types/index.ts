/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */

export type FormatoTrasmissioneType = 'FPA12' | 'FPR12';
export type RateType = number;
export type Amount8DecimalType = number;
export type EsigibilitaIvaType = 'D' | 'I' | 'S';
export type Amount2DecimalType = number;
export type NaturaType = 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6' | 'N7';
export type String100LatinType = string;
export type XsDate = string;
export type String60LatinType = string;
export type String10Type = string;
export type String35Type = string;
export type String1000LatinType = string;
export type NumeroLineaType = number;
export type QuantitaType = number;
export type String20Type = string;
export type RitenutaType = 'SI';
export type TipoScontoMaggiorazioneType = 'SC' | 'MG';
export type TipoCessionePrestazioneType = 'SC' | 'PR' | 'AB' | 'AC';
export type String15Type = string;
export type RiferimentoNumeroLineaType = number;
export type Art73Type = 'SI';
export type String200LatinType = string;
export type DataFatturaType = string;
export type BolloVirtualeType = 'SI';
export type TipoCassaType =
  | 'TC01'
  | 'TC02'
  | 'TC03'
  | 'TC04'
  | 'TC05'
  | 'TC06'
  | 'TC07'
  | 'TC08'
  | 'TC09'
  | 'TC10'
  | 'TC11'
  | 'TC12'
  | 'TC13'
  | 'TC14'
  | 'TC15'
  | 'TC16'
  | 'TC17'
  | 'TC18'
  | 'TC19'
  | 'TC20'
  | 'TC21'
  | 'TC22';
export type CausalePagamentoType =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'G'
  | 'H'
  | 'I'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | 'L1'
  | 'M1'
  | 'O1'
  | 'V1';
export type TipoRitenutaType = 'RT01' | 'RT02';
export type DivisaType = string;
export type TipoDocumentoType = 'TD01' | 'TD02' | 'TD03' | 'TD04' | 'TD05' | 'TD06';
export type RiferimentoFaseType = number;
export type XsDateTime = string;
export type CodEoriType = string;
export type String80LatinType = string;
export type TitoloType = string;
export type CodiceFiscaleType = string;
export type CodiceType = string;
export type NazioneType = string;
export type CapType = string;
export type NumeroCivicoType = string;
export type ProvinciaType = string;
export type NumeroColliType = number;
export type PesoType = number;
export type TipoResaType = string;
export type CondizioniPagamentoType = 'TP01' | 'TP02' | 'TP03';
export type AbiType = string;
export type BicType = string;
export type CabType = string;
export type CodiceFiscalePfType = string;
export type String60Type = string;
export type GiorniTerminePagamentoType = number;
export type IbanType = string;
export type ModalitaPagamentoType =
  | 'MP01'
  | 'MP02'
  | 'MP03'
  | 'MP04'
  | 'MP05'
  | 'MP06'
  | 'MP07'
  | 'MP08'
  | 'MP09'
  | 'MP10'
  | 'MP11'
  | 'MP12'
  | 'MP13'
  | 'MP14'
  | 'MP15'
  | 'MP16'
  | 'MP17'
  | 'MP18'
  | 'MP19'
  | 'MP20'
  | 'MP21'
  | 'MP22';
export type TelFaxType = string;
export type RegimeFiscaleType =
  | 'RF01'
  | 'RF02'
  | 'RF04'
  | 'RF05'
  | 'RF06'
  | 'RF07'
  | 'RF08'
  | 'RF09'
  | 'RF10'
  | 'RF11'
  | 'RF12'
  | 'RF13'
  | 'RF14'
  | 'RF15'
  | 'RF16'
  | 'RF17'
  | 'RF19'
  | 'RF18';
export type SocioUnicoType = 'SU' | 'SM';
export type StatoLiquidazioneType = 'LS' | 'LN';
export type CodiceDestinatarioType = string;
export type EmailType = string;
export type SoggettoEmittenteType = 'CC' | 'TZ';
export type CodicePaese =
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

/**
 *
 * Schema fatture destinate a PA e privati in forma ordinaria 1.2
 *
 */

export type TFatturaPA = {
  [key: string]: TFatturaElettronica;
};

export type TFatturaElettronica = {
  '@'?: {
    versione: FormatoTrasmissioneType;
  };
  FatturaElettronicaBody: FatturaElettronicaBodyType | FatturaElettronicaBodyType[];
  FatturaElettronicaHeader: FatturaElettronicaHeaderType;
};
export interface FatturaElettronicaBodyType {
  DatiBeniServizi: DatiBeniServiziType;
  DatiGenerali: DatiGeneraliType;
  DatiPagamento?: DatiPagamentoType | DatiPagamentoType[];
  DatiVeicoli?: DatiVeicoliType;
}
/**
 *
 * 	Blocco relativo ai dati di Beni Servizi della Fattura	Elettronica
 *
 */
export interface DatiBeniServiziType {
  DatiRiepilogo: DatiRiepilogoType | DatiRiepilogoType[];
  DettaglioLinee: DettaglioLineeType | DettaglioLineeType[];
}
export interface DatiRiepilogoType {
  AliquotaIVA: RateType;
  Arrotondamento?: Amount8DecimalType;
  EsigibilitaIVA?: EsigibilitaIvaType;
  ImponibileImporto: Amount2DecimalType;
  Imposta: Amount2DecimalType;
  Natura?: NaturaType;
  RiferimentoNormativo?: String100LatinType;
  SpeseAccessorie?: Amount2DecimalType;
}
export interface DettaglioLineeType {
  AliquotaIVA: RateType;
  AltriDatiGestionali?: AltriDatiGestionaliType | AltriDatiGestionaliType[];
  CodiceArticolo?: CodiceArticoloType | CodiceArticoloType[];
  DataFinePeriodo?: XsDate;
  DataInizioPeriodo?: XsDate;
  Descrizione: String1000LatinType;
  Natura?: NaturaType;
  NumeroLinea: NumeroLineaType;
  PrezzoTotale: Amount8DecimalType;
  PrezzoUnitario: Amount8DecimalType;
  Quantita?: QuantitaType;
  RiferimentoAmministrazione?: String20Type;
  Ritenuta?: RitenutaType;
  ScontoMaggiorazione?: ScontoMaggiorazioneType | ScontoMaggiorazioneType[];
  TipoCessionePrestazione?: TipoCessionePrestazioneType;
  UnitaMisura?: String10Type;
}
export interface AltriDatiGestionaliType {
  RiferimentoData?: XsDate;
  RiferimentoNumero?: Amount8DecimalType;
  RiferimentoTesto?: String60LatinType;
  TipoDato: String10Type;
}
export interface CodiceArticoloType {
  CodiceTipo: String35Type;
  CodiceValore: String35Type;
}
export interface ScontoMaggiorazioneType {
  Importo?: Amount2DecimalType;
  Percentuale?: RateType;
  Tipo: TipoScontoMaggiorazioneType;
}
/**
 *
 * 	Blocco relativo ai Dati Generali della Fattura Elettronica
 *
 */
export interface DatiGeneraliType {
  DatiContratto?: DatiDocumentiCorrelatiType | DatiDocumentiCorrelatiType[];
  DatiConvenzione?: DatiDocumentiCorrelatiType | DatiDocumentiCorrelatiType[];
  DatiDDT?: DatiDdtType | DatiDdtType[];
  DatiFattureCollegate?: DatiDocumentiCorrelatiType | DatiDocumentiCorrelatiType[];
  DatiGeneraliDocumento: DatiGeneraliDocumentoType;
  DatiOrdineAcquisto?: DatiDocumentiCorrelatiType | DatiDocumentiCorrelatiType[];
  DatiRicezione?: DatiDocumentiCorrelatiType | DatiDocumentiCorrelatiType[];
  DatiSAL?: DatiSalType | DatiSalType[];
  DatiTrasporto?: DatiTrasportoType;
  FatturaPrincipale?: FatturaPrincipaleType;
}
export interface DatiDocumentiCorrelatiType {
  CodiceCIG?: String15Type;
  CodiceCUP?: String15Type;
  CodiceCommessaConvenzione?: String100LatinType;
  Data?: XsDate;
  IdDocumento: String20Type;
  NumItem?: String20Type;
  RiferimentoNumeroLinea?: RiferimentoNumeroLineaType | RiferimentoNumeroLineaType[];
}
export interface DatiDdtType {
  DataDDT: XsDate;
  NumeroDDT: String20Type;
  RiferimentoNumeroLinea?: RiferimentoNumeroLineaType | RiferimentoNumeroLineaType[];
}
export interface DatiGeneraliDocumentoType {
  Arrotondamento?: Amount2DecimalType;
  Art73?: Art73Type;
  Causale?: String200LatinType | String200LatinType[];
  Data: DataFatturaType;
  DatiBollo?: DatiBolloType;
  DatiCassaPrevidenziale?: DatiCassaPrevidenzialeType | DatiCassaPrevidenzialeType[];
  DatiRitenuta?: DatiRitenutaType;
  Divisa: DivisaType;
  ImportoTotaleDocumento?: Amount2DecimalType;
  Numero: String20Type;
  ScontoMaggiorazione?: ScontoMaggiorazioneType | ScontoMaggiorazioneType[];
  TipoDocumento: TipoDocumentoType;
}
export interface DatiBolloType {
  BolloVirtuale: BolloVirtualeType;
  ImportoBollo: Amount2DecimalType;
}
export interface DatiCassaPrevidenzialeType {
  AlCassa: RateType;
  AliquotaIVA: RateType;
  ImponibileCassa?: Amount2DecimalType;
  ImportoContributoCassa: Amount2DecimalType;
  Natura?: NaturaType;
  RiferimentoAmministrazione?: String20Type;
  Ritenuta?: RitenutaType;
  TipoCassa: TipoCassaType;
}
export interface DatiRitenutaType {
  AliquotaRitenuta: RateType;
  CausalePagamento: CausalePagamentoType;
  ImportoRitenuta: Amount2DecimalType;
  TipoRitenuta: TipoRitenutaType;
}
export interface DatiSalType {
  RiferimentoFase: RiferimentoFaseType;
}
export interface DatiTrasportoType {
  CausaleTrasporto?: String100LatinType;
  DataInizioTrasporto?: XsDate;
  DataOraConsegna?: XsDateTime;
  DataOraRitiro?: XsDateTime;
  DatiAnagraficiVettore?: DatiAnagraficiVettoreType;
  Descrizione?: String100LatinType;
  IndirizzoResa?: IndirizzoType;
  MezzoTrasporto?: String80LatinType;
  NumeroColli?: NumeroColliType;
  PesoLordo?: PesoType;
  PesoNetto?: PesoType;
  TipoResa?: TipoResaType;
  UnitaMisuraPeso?: String10Type;
}
export interface DatiAnagraficiVettoreType {
  Anagrafica: AnagraficaType;
  CodiceFiscale?: CodiceFiscaleType;
  IdFiscaleIVA: IdFiscaleType;
  NumeroLicenzaGuida?: String20Type;
}
/**
 *
 * 	Blocco relativo ai dati Anagrafici
 *
 */
export interface AnagraficaType {
  CodEORI?: CodEoriType;
  Cognome?: String60LatinType;
  Denominazione?: String80LatinType;
  Nome?: String60LatinType;
  Titolo?: TitoloType;
}
export interface IdFiscaleType {
  IdCodice: CodiceType;
  IdPaese: NazioneType;
}
export interface IndirizzoType {
  CAP: CapType;
  Comune: String60LatinType;
  Indirizzo: String60LatinType;
  Nazione: NazioneType;
  NumeroCivico?: NumeroCivicoType;
  Provincia?: ProvinciaType;
}
export interface FatturaPrincipaleType {
  DataFatturaPrincipale: XsDate;
  NumeroFatturaPrincipale: String20Type;
}
/**
 *
 * 	Blocco relativo ai dati di Pagamento della Fattura	Elettronica
 *
 */
export interface DatiPagamentoType {
  CondizioniPagamento: CondizioniPagamentoType;
  DettaglioPagamento: DettaglioPagamentoType | DettaglioPagamentoType[];
}
export interface DettaglioPagamentoType {
  ABI?: AbiType;
  BIC?: BicType;
  Beneficiario?: String200LatinType;
  CAB?: CabType;
  CFQuietanzante?: CodiceFiscalePfType;
  CodUfficioPostale?: String20Type;
  CodicePagamento?: String60Type;
  CognomeQuietanzante?: String60LatinType;
  DataDecorrenzaPenale?: XsDate;
  DataLimitePagamentoAnticipato?: XsDate;
  DataRiferimentoTerminiPagamento?: XsDate;
  DataScadenzaPagamento?: XsDate;
  GiorniTerminiPagamento?: GiorniTerminePagamentoType;
  IBAN?: IbanType;
  ImportoPagamento: Amount2DecimalType;
  IstitutoFinanziario?: String80LatinType;
  ModalitaPagamento: ModalitaPagamentoType;
  NomeQuietanzante?: String60LatinType;
  PenalitaPagamentiRitardati?: Amount2DecimalType;
  ScontoPagamentoAnticipato?: Amount2DecimalType;
  TitoloQuietanzante?: TitoloType;
}
/**
 *
 * Blocco relativo ai dati dei Veicoli della Fattura
 * Elettronica (da indicare nei casi di cessioni tra Paesi
 * membri di mezzi di trasporto nuovi, in base all'art. 38,
 * comma 4 del dl 331 del 1993
 *
 */
export interface DatiVeicoliType {
  Data: XsDate;
  TotalePercorso: String15Type;
}
export interface FatturaElettronicaHeaderType {
  CedentePrestatore: CedentePrestatoreType;
  CessionarioCommittente: CessionarioCommittenteType;
  DatiTrasmissione: DatiTrasmissioneType;
  RappresentanteFiscale?: RappresentanteFiscaleType;
  SoggettoEmittente?: SoggettoEmittenteType;
  TerzoIntermediarioOSoggettoEmittente?: TerzoIntermediarioSoggettoEmittenteType;
}

/**
 *
 * 	Blocco relativo ai dati del Cedente / Prestatore
 *
 */
export interface CedentePrestatoreType {
  Contatti?: ContattiType;
  DatiAnagrafici: DatiAnagraficiCedenteType;
  IscrizioneREA?: IscrizioneReaType;
  RiferimentoAmministrazione?: String20Type;
  Sede: IndirizzoType;
  StabileOrganizzazione?: IndirizzoType;
}
export interface ContattiType {
  Email?: string;
  Fax?: TelFaxType;
  Telefono?: TelFaxType;
}
export interface DatiAnagraficiCedenteType {
  AlboProfessionale?: String60LatinType;
  Anagrafica: AnagraficaType;
  CodiceFiscale?: CodiceFiscaleType;
  DataIscrizioneAlbo?: XsDate;
  IdFiscaleIVA: IdFiscaleType;
  NumeroIscrizioneAlbo?: String60Type;
  ProvinciaAlbo?: ProvinciaType;
  RegimeFiscale: RegimeFiscaleType;
}
export interface IscrizioneReaType {
  CapitaleSociale?: Amount2DecimalType;
  NumeroREA: String20Type;
  SocioUnico?: SocioUnicoType;
  StatoLiquidazione: StatoLiquidazioneType;
  Ufficio: ProvinciaType;
}
/**
 *
 * Blocco relativo ai dati del Cessionario / Committente
 *
 */
export interface CessionarioCommittenteType {
  DatiAnagrafici: DatiAnagraficiCessionarioType;
  RappresentanteFiscale?: RappresentanteFiscaleCessionarioType;
  Sede: IndirizzoType;
  StabileOrganizzazione?: IndirizzoType;
}
export interface DatiAnagraficiCessionarioType {
  Anagrafica: AnagraficaType;
  CodiceFiscale?: CodiceFiscaleType;
  IdFiscaleIVA?: IdFiscaleType;
}
export interface RappresentanteFiscaleCessionarioType {
  Cognome?: String60LatinType;
  Denominazione?: String80LatinType;
  IdFiscaleIVA: IdFiscaleType;
  Nome?: String60LatinType;
}
/**
 *
 * Blocco relativo ai dati di trasmissione della Fattura Elettronica
 *
 */
export interface DatiTrasmissioneType {
  CodiceDestinatario: CodiceDestinatarioType;
  ContattiTrasmittente?: ContattiTrasmittenteType;
  FormatoTrasmissione: FormatoTrasmissioneType;
  IdTrasmittente: IdFiscaleType;
  PECDestinatario?: EmailType;
  ProgressivoInvio: String10Type;
}
export interface ContattiTrasmittenteType {
  Email?: EmailType;
  Telefono?: TelFaxType;
}
/**
 *
 * 	Blocco relativo ai dati del Rappresentante Fiscale
 *
 */
export interface RappresentanteFiscaleType {
  DatiAnagrafici: DatiAnagraficiRappresentanteType;
}
export interface DatiAnagraficiRappresentanteType {
  Anagrafica: AnagraficaType;
  CodiceFiscale?: CodiceFiscaleType;
  IdFiscaleIVA: IdFiscaleType;
}
/**
 *
 * 	Blocco relativo ai dati del Terzo Intermediario che
 * 	emette fattura elettronica per conto del
 * 	Cedente/Prestatore
 *
 */
export interface TerzoIntermediarioSoggettoEmittenteType {
  DatiAnagrafici: DatiAnagraficiTerzoIntermediarioType;
}
export interface DatiAnagraficiTerzoIntermediarioType {
  Anagrafica: AnagraficaType;
  CodiceFiscale?: CodiceFiscaleType;
  IdFiscaleIVA?: IdFiscaleType;
}
