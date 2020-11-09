/**
 *
 * Copyright DigItalia. 2019. All Rights Reserved.
 * Node module: @digitalia/fatturapa
 * Version : 1.3.1
 * This file is licensed under the MIT license.
 * License text available at https://opensource.org/licenses/MIT
 *
 */
import { object, string } from 'yup';
import { FPAYupHeader } from './FEHeaderSchema';
import { FPAYupBody } from './FEBodySchema';

export const FPAYupSchema = object({
  '@': object({
    versione: string().oneOf(['FPA12', 'FPR12']),
  }),
  FatturaElettronicaHeader: FPAYupHeader, // 1
  FatturaElettronicaBody: FPAYupBody, // 2
});
