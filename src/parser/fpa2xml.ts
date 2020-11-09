/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */

import { deepClean } from '../common';
import { j2xParser } from 'fast-xml-parser';
import { parserOptions, defaultOptions, IFPAOptions, checkXML } from '../common';

const builder = new j2xParser(parserOptions);

/**
 * Parse a JSON Invoice and returns a XML
 * @param {JSON} jsonData An invoice in JS/JSON format
 * @param {boolean} validate [default=true] Whether the function should validate the XML or just return the data
 */
export function fpa2xml(jsonData: object, { validate }: IFPAOptions = defaultOptions): string {
  const parseFn = () => {
    const xmlHeader = `<?xml version="1.0" encoding="utf-8"?>`;
    // const builder = new j2xParser(parserOptions);
    return xmlHeader + builder.parse(deepClean(jsonData));
  };
  if (validate) return checkXML(parseFn());
  else return parseFn();
}
