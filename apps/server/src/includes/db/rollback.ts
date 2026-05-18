import fs from 'fs';
import path from 'path';

import db from './db';

const run = async () => {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, '../../database/rollback.sql'),
      'utf8',
    );
    await db.query(sql);
    console.log('Rollback complete');
  } catch (err) {
    console.error('Rollback failed:', err);
    process.exit(1);
  } finally {
    await db.end();
  }
};

run();
