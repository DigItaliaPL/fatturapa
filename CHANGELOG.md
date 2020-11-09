# Changelog

### 1.3.1 (2020-11-08)

- The versioning of the library now match with that of [FatturaPA](https://www.fatturapa.gov.it/it/norme-e-regole/documentazione-fatturapa/).
- The library now exports validation functions and Yup schema.

### 0.1.9 (2019-07-09)

- fpa2xml now deeply clean invoice objects from empty/falsy values, preventing the serialization of useless XML entries and reducing the output size

### 0.1.8 (2019-07-09)

- DEPRECATED

### 0.1.7 (2019-07-09)

- DEPRECATED

### 0.1.6 (2019-07-08)

- Fixed JS/JSON => XML parsing. The parser now returns valid XML invoices accorging to the FatturaPA Schema

### 0.1.5 (2019-07-08)

- Fixed the XML => JS/JSON parsing. fpa2js() now always returns an object containing a "FatturaElettronica" property, regardless the XML namespace
- Fixed and added new tests
