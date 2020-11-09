import fs from 'fs';
import path from 'path';
import { fpa2js, fpa2xml, fpaValidate, FPAYupSchema } from '../src';
import { ValidationError } from 'yup';

/**
  |--------------------------------------------------
  | PERCORSI DEI DATI DI TEST
  |--------------------------------------------------
  */
const xmlDir = path.resolve(__dirname, './data/xmlInvoices');
const jsonDir = path.resolve(__dirname, './data/jsonInvoices');
const xmlInvDir = path.resolve(__dirname, './data/xmlInvalid');
const perFile = path.resolve(__dirname, './data/performance.md');

/**
  |--------------------------------------------------
  | LETTURA DATI TEST DA FILESYSTEM
  |--------------------------------------------------
  */
const xmlFiles = fs.readdirSync(xmlDir, { encoding: 'utf-8' });
const xmlInvFiles = fs.readdirSync(xmlInvDir, { encoding: 'utf-8' });
const jsonFiles = fs.readdirSync(jsonDir, { encoding: 'utf-8' });

/**
  |--------------------------------------------------
  | TEST PARSING XML => JSON
  |--------------------------------------------------
  */
describe('fpa2js', () => {
  // Append headers to performance file
  fs.appendFileSync(perFile, '\n### XML to JS conversion - fpa2js()\n');
  xmlFiles.forEach((filename) => {
    // Read invoices from filesystem
    const invoiceBuffer = fs.readFileSync(path.resolve(xmlDir, filename)).toString();
    // Start execution timer
    let t0 = performance.now();
    // Convert the parsed JSON invoice to XML
    const jsonInvoice = fpa2js(invoiceBuffer, {
      validate: false,
      valuesOnly: true,
    });
    // Stop execution timer
    let t1 = performance.now();
    // Append results to performance file
    fs.appendFileSync(perFile, `- Time to parse ${filename.split('_')[1]} : ${t1 - t0}\n`);

    // Write Parsed Values to filesystem
    fs.writeFileSync(
      path.resolve(
        __dirname,
        './data/parsedJson',
        filename.replace('.p7m', '').replace('.xml', '.json')
      ),
      JSON.stringify(jsonInvoice, null, 2)
    );

    // Destructuring Invoice Values
    const FatturaElettronica = jsonInvoice;
    const { FatturaElettronicaHeader, FatturaElettronicaBody } = FatturaElettronica;
    const { DatiTrasmissione, CedentePrestatore } = FatturaElettronicaHeader;

    it('parses XML to JSON', () => {
      expect(FatturaElettronica).toBeDefined();
      expect(FatturaElettronicaBody).toBeDefined();
      expect(FatturaElettronicaHeader).toBeDefined();
      expect(DatiTrasmissione).toBeDefined();
      expect(DatiTrasmissione.IdTrasmittente).toBeDefined();
      expect(DatiTrasmissione.ProgressivoInvio).toBeDefined();
    });
    it("parses node attributes in a property named '@'", () => {
      expect(FatturaElettronica).toHaveProperty('@');
    });
    it('parses VAT ID as string', () => {
      expect(DatiTrasmissione.IdTrasmittente).toHaveProperty('IdPaese');
      expect(DatiTrasmissione.IdTrasmittente).toHaveProperty('IdCodice');
      expect(typeof DatiTrasmissione.IdTrasmittente.IdPaese === 'string').toBe(true);
      expect(typeof DatiTrasmissione.IdTrasmittente.IdCodice === 'string').toBe(true);
    });
    it('parses Tax ID as string', () => {
      expect(typeof CedentePrestatore.DatiAnagrafici.IdFiscaleIVA.IdCodice === 'string').toBe(true);
    });
    it('parses transmission number as string', () => {
      expect(typeof DatiTrasmissione.ProgressivoInvio === 'string').toBe(true);
    });
  });
});

/**
  |--------------------------------------------------
  | TEST VALIDATION with YUP
  |--------------------------------------------------
  */
describe('fpaValidate', () => {
  xmlFiles.forEach((filename) => {
    // Read invoices from filesystem
    const invoiceBuffer = fs.readFileSync(path.resolve(xmlDir, filename)).toString();

    // Convert the parsed XML invoice to JS
    const jsonInvoice = fpa2js(invoiceBuffer, {
      validate: false,
      valuesOnly: true,
    });

    test('it pass with valid invoices : ' + filename, async () => {
      const FatturaElettronica = await fpaValidate(jsonInvoice, FPAYupSchema).catch((err) => {
        expect(err).not.toBeInstanceOf(ValidationError);
      });

      expect(FatturaElettronica).toHaveProperty('@');
      expect(FatturaElettronica).toHaveProperty('FatturaElettronicaHeader');
      expect(FatturaElettronica).toHaveProperty('FatturaElettronicaBody');
    });
  });

  xmlInvFiles.forEach((filename) => {
    // Read invoices from filesystem
    const invoiceBuffer = fs.readFileSync(path.resolve(xmlDir, filename)).toString();

    // Convert the parsed XML invoice to JS
    const jsonInvoice = fpa2js(invoiceBuffer, {
      validate: false,
      valuesOnly: true,
    });

    test('it fails on invalid invoice : ' + filename, async () => {
      await fpaValidate(jsonInvoice, FPAYupSchema).catch((err) => {
        expect(err).toBeInstanceOf(ValidationError);
      });
    });
  });
});

/**
  |--------------------------------------------------
  | TEST PARSING JSON => XML
  |--------------------------------------------------
  */
describe('fpa2xml', () => {
  // Append headers to performance file
  fs.appendFileSync(perFile, '\n### JSON to XML conversion : fpa2xml()\n');
  jsonFiles.forEach((filename) => {
    // Read invoices from filesystem
    let invoiceBuffer = JSON.parse(fs.readFileSync(path.resolve(jsonDir, filename)).toString());
    // Start execution timer
    let t0 = performance.now();
    // Convert the parsed JSON invoice to XML
    const xmlInvoice = fpa2xml(invoiceBuffer, { validate: false });
    // Stop execution timer
    let t1 = performance.now();
    // Append results to performance file
    fs.appendFileSync(perFile, `- Time to parse ${filename.split('_')[1]} : ${t1 - t0}\n`);

    // Write the XML invoice to filesystem
    fs.writeFileSync(
      path.resolve(__dirname, './data/parsedXml', filename.replace('.json', '.xml')),
      xmlInvoice
    );

    it('parses JSON to XML', () => {
      expect(xmlInvoice).toBeDefined();
    });
    it('parses attributes tagged by @', () => {
      expect(xmlInvoice.includes('versione=')).toBe(true);
    });
    it('parses VAT ID as string', () => {
      expect(xmlInvoice.includes('<IdCodice>')).toBe(true);
      expect(xmlInvoice.includes('</IdCodice>')).toBe(true);
    });
    it('parses Tax ID as string', () => {
      expect(xmlInvoice.includes('<CodiceFiscale>')).toBe(true);
      expect(xmlInvoice.includes('</CodiceFiscale>')).toBe(true);
    });
    it('parses trasmission number as string', () => {
      expect(xmlInvoice.includes('<ProgressivoInvio>')).toBe(true);
      expect(xmlInvoice.includes('</ProgressivoInvio>')).toBe(true);
    });
  });
});
