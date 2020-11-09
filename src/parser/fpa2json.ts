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
import { parserOptions, defaultOptions, IFPAOptions, checkXML } from '../common';

/**
 * Parse an XML Invoice and return it as JSON String
 * @param {string} xmlData A string containing the XML invoice document to convert to JSON
 * @param {boolean} validate [default=false] Whether the function should validate the XML or just return the data
 * @param {boolean} minify [default=true] Whether the function should return the JSON string minified or formatted
 */
export function fpa2json(
  xmlData: string,
  { validate, minify }: IFPAOptions = defaultOptions
): string {
  const parseCb = () => JSON.stringify(parse(xmlData, parserOptions), null, minify ? 0 : 2);
  if (validate) return checkXML(xmlData, parseCb);
  else return parseCb();
}
