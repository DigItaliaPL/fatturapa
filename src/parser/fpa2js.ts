/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */
import { parse } from 'fast-xml-parser';
import { parserOptions, defaultOptions, checkXML } from '../common';
import type { IFPAOptions, IFPAO_Values } from '../common';
import type { TFatturaPA, TFatturaElettronica } from '../types';

/**
 * Parse an XML invoice and returns it as JS Object
 * @param {string} xmlData A string containing the XML invoice document to convert to JS
 * @param {boolean} valuesOnly [default=false] Whether the function should return the namespaced 'FatturaElettronica' property or not
 * @param {boolean} validate [default=true] Whether the function should validate the XML or just return the data
 */
export function fpa2js(xmlData: string, options: IFPAO_Values): TFatturaElettronica;
export function fpa2js(xmlData: string, options: IFPAOptions): TFatturaPA;

export function fpa2js(xmlData: string, options: IFPAOptions | IFPAO_Values = defaultOptions) {
  const { validate, valuesOnly } = options;

  function parseFn(xmlData: string): TFatturaPA {
    return parse(xmlData, parserOptions);
  }

  if (valuesOnly && validate) {
    if (checkXML(xmlData)) return Object.values(parseFn(xmlData))[0];
    else throw new Error('The XML Invoice is not correct.');
  }

  if (valuesOnly) return Object.values(parseFn(xmlData))[0];

  if (validate) return checkXML(xmlData, parseFn);

  // const parseFn = (xmlData): TFatturaPA | TFatturaElettronica => {
  //   let invoice: TFatturaPA = parse(xmlData, parserOptions);
  //   if (valuesOnly) {
  //     return Object.values(invoice)[0] as TFatturaElettronica;
  //   }
  //   return invoice;
  // };
  // if (validate) return checkXML(xmlData, parseFn);
  // else return parseFn(xmlData);
}
