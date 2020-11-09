/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */

import { validate } from 'fast-xml-parser';
import isEmpty from 'lodash.isempty';
import isPlainObject from 'lodash.isplainobject';
import transform from 'lodash.transform';

export type CleanOptions = {
  emptyArrays?: boolean;
  emptyObjects?: boolean;
  emptyStrings?: boolean;
  nullValues?: boolean;
  undefinedValues?: boolean;
};

/**
 * Clean a nested object removing all the properties having falsy values
 * @param {objext} object An object to clean
 * @param {CleanOptions} options [default=true] Whether the function should clean the object from selected properties
 */
export function deepClean(
  object: any,
  {
    emptyArrays = true,
    emptyObjects = true,
    emptyStrings = true,
    nullValues = true,
    undefinedValues = true,
  } = {}
) {
  //@ts-ignore
  return transform(object, (result: any, value: any, key: any) => {
    // Recurse into arrays and objects.
    if (Array.isArray(value) || isPlainObject(value)) {
      value = deepClean(value, {
        emptyArrays,
        emptyObjects,
        emptyStrings,
        nullValues,
        undefinedValues,
      });
    }

    // Exclude empty objects.
    if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
      return;
    }

    // Exclude empty arrays.
    if (emptyArrays && Array.isArray(value) && !value.length) {
      return;
    }

    // Exclude empty strings.
    if (emptyStrings && value === '') {
      return;
    }

    // Exclude null values.
    if (nullValues && value === null) {
      return;
    }

    // Exclude undefined values.
    if (undefinedValues && value === undefined) {
      return;
    }

    // Append when recursing arrays.
    if (Array.isArray(result)) {
      return result.push(value);
    }

    result[key] = value;
  });
}

/**
 * FatturaPA Parser Options
 */
export const parserOptions = {
  attrNodeName: '@',
  attributeNamePrefix: '',
  ignoreNameSpace: false,
  // ignoreNameSpace: true,
  ignoreAttributes: false,
  parseNodeValue: false,
  // stopNodes,
};

export interface IFPAOptions {
  minify?: boolean;
  validate?: boolean;
  valuesOnly?: boolean;
}

export interface IFPAO_Validated extends IFPAOptions {
  validate: true;
}

export interface IFPAO_Minified extends IFPAOptions {
  minify: true;
}

export interface IFPAO_Values extends IFPAOptions {
  valuesOnly: true;
}

/**
 * FatturaPA Functions Options
 */
export const defaultOptions = {
  minify: true,
  validate: false,
  valuesOnly: false,
};

/**
 * Check formal XML validity and returns the value of a
 * callback function provided as prop, if it's valid
 */
export function checkXML(xmlData: string, cb?: (...params: any) => any) {
  if (validate(xmlData) === true) {
    if (cb) return cb();
    else return xmlData;
  } else {
    throw new Error('Il file XML non è sintatticamente corretto');
  }
}
