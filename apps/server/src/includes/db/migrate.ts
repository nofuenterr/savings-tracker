import fs from 'fs';
import path from 'path';

import db from './db';

const run = async () => {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, '../../database/schema.sql'),
      'utf8',
    );
    await db.query(sql);
    console.log('Migration complete');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await db.end();
  }
};

run();
