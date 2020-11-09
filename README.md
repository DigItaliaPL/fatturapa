# @digitalia/fatturapa

Isomorphic JavaScript library for handling Italian electronic invoice [FatturaPA](https://www.fatturapa.gov.it/export/fatturazione/it/fattura_PA.htm) XML to JS/JSON and JS/JSON to XML conversions and validation.

Libreria JavaScript isomorfica per la gestione della validazione e conversione bidirezionale della fattura elettronica [FatturaPA](https://www.fatturapa.gov.it/export/fatturazione/it/fattura_PA.htm) da XML a JS/JSON e da JS/JSON a XML.

## Bundle

The package is made of 2 sub-modules

- parser : Contains all the parsing functions (`fpa2js`, `fpa2xml`) - ~10.68KB
- validator: Contains the validation function `fpaValidate` and the FatturaPA Yup object schema `FPAYupSchema` - ~25.20KB

## How to use

Just install it as dependency via `$ npm install @digitalia/fatturapa` or `$ yarn add @digitalia/fatturapa`.
The library works either in NodeJS or browser environments, making it possible to implement different data management strategies and
easily integrate with pre-exisisting software systems.

Semplicemente installando come dipendenza via `$ npm install @digitalia/fatturapa` o `$ yarn add @digitalia/fatturapa`.
La libreria funziona sia in ambiente NodeJS che browser, rendendo possibile l'implementazione di differenti strategie di gestione dei dati e l'integrazione con sistemi software pre-esistenti.

### Conversion

The conversion module exports the 3 functions:

Il modulo di conversione esporta le 3 funzioni:

- `fpa2js` - XML => JS Object
- `fpa2xml` - JS Object => XML
- `fpa2json` - XML => JSON string

Each function runs, by default, a syntactic XML pre-validation against the W3C Schema.
This is meant to avoid inconsistencies and wrong outputs. If you're sure the data input is correct, you can opt-out the pre-validation.
To opt-out the XML pre-validation, just set the 'validate' property to false in the configuration object.

Tutte le funzioni effettuano, di default, una pre-validazione sintattica dell'XML secondo lo schema W3C.
Questo serve ad evitare inconsistenze ed errori in output. Se i dati XML sono sicuramente corretti, puoi disattivare la pre-validazione.
Per disattivare la pre-validazione XML, imposta la proprietà 'validate' a false nell'oggetto di configurazione.

```js
fpa2whatever(data, { validate: false });
```

#### XML to JS Object

```js
import { fpa2js } from "@digitalia/fatturapa";

let xmlData = `
  <?xml version="1.0" encoding="UTF-8"?>
  <ns:FatturaElettronica versione="FPA12">
    <FatturaElettronicaHeader>
    .....
    </FatturaElettronicaHeader>
    <FatturaElettronicaBody>
    .....
    </FatturaElettronicaBody>
  </p:FatturaElettronica>
`;

let invoice = fpa2js(xmlData, { validate: false, valuesOnly: false });

console.log("Invoice :", invoice);
```

#### JSON to XML

```js
import { fpa2xml } from "@digitalia/fatturapa";

let jsonData = `
  {
    ns:FatturaElettronica: {
      '@': { versione: 'FPA12', .... },
      FatturaElettronicaHeader: { .... },
      FatturaElettronicaBody: { .... }
    }
  }
`;

let invoice = fpa2xml(jsonData);

console.log("Invoice :", invoice);
```

### Validation

The module also exports a [yup](https://github.com/jquense/yup) object schema `FPAYupSchema` along with a `fpaValidate` function to check the document validity against the [FatturaPA specs](https://www.fatturapa.gov.it/export/documenti/Specifiche_tecniche_del_formato_FatturaPA_V1.3.1.pdf)

Il modulo esporta anche l'oggetto `FPAYupSchema` contenente lo schema [yup](https://github.com/jquense/yup) e la funzione `fpaValidate` per il controllo di validità del documento secondo le [specifiche FatturaPA](https://www.fatturapa.gov.it/export/documenti/Specifiche_tecniche_del_formato_FatturaPA_V1.3.1.pdf)

#### JS/JSON Validation

###### Example in React with Formik

```js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FatturaPASchema } from '@digitalia/fatturapa';

const ClientSideForm = () => {
  return (
    <Formik initalValues={{...}} validationSchema={FatturaPASchema}>
      {({errors, touched}) => (
        <Form>
          ....
          <Field name='IdFiscaleIVA'>
            {errors.IdFiscaleIVA && touched.IdFiscaleIVA ? (<div>{errors.IdFiscaleIVA}</div>) : null }
          </Field>
          .....
        </Form>
      )}
    </Formik>
  )
}
```

###### Example in Node/JS

```js
import {fpaValidate, FatturaPASchema} from '@digitalia/fatturapa'

let invoice = {
  FatturaElettronica: {
    '@': { versione: 'FPA12', .... },
    FatturaElettronicaHeader: { .... },
    FatturaElettronicaBody: { .... }
  }
}

let isValid = fpaValidate(invoice)
// If you want to use your own yup schema
let isValid = fpaValidate(invoice, yourYupSchema)
```

#### XML Validation

To validate an XML file, you must convert it to a JS object via the fpa2js() function mentioned above.

Per validare un file XML, è necessario convertirlo in un oggetto JS tramite la funzione fpa2js() menzionata sopra.

```js
import { fpa2js, fpaValidate, FatturaPASchema } from "@digitalia/fatturapa";

let xmlData = `
  <?xml version="1.0" encoding="UTF-8"?>
  <ns:FatturaElettronica versione="FPA12">
    <FatturaElettronicaHeader>
    .....
    </FatturaElettronicaHeader>
    <FatturaElettronicaBody>
    .....
    </FatturaElettronicaBody>
  </p:FatturaElettronica>
`;

let isValid = fpaValidate(fpa2js(xmlData));
```

## Credits

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx) and makes use of the great [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) library under the hood.
