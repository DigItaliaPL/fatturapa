/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */

import { ObjectSchema, ValidationError } from 'yup';
import type { TFatturaElettronica } from '../types';

/**
 * Validate FatturaPA
 * @param {object} fpa Invoice JS Object
 * @param {object} yupSchema [default=FPAYupSchema]A yup object shape
 */
export async function fpaValidate(
  fpa: TFatturaElettronica,
  schema: ObjectSchema
): Promise<TFatturaElettronica | ValidationError> {
  return schema.validate(fpa, { recursive: true }) as Promise<TFatturaElettronica>;
}
