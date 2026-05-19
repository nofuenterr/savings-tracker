import fs from 'fs';

import db from './db';

const run = async () => {
  try {
    const sql = fs.readFileSync(`src/database/schema.sql`, 'utf8');
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
