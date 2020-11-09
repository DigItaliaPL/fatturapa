const fs = require('fs');
const path = require('path');

const { FPAYupSchema } = require('../dist/index');

const description = FPAYupSchema.describe();

fs.writeFileSync(
  path.resolve(__dirname, '../src/schema/FPAYupSchema.json'),
  JSON.stringify(description, null, 2),
  'utf-8'
);
