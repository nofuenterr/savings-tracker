import fs from 'fs';
import path from 'path';

import db from './db';

const seedFiles: string[] = [];

const run = async () => {
  try {
    for (const file of seedFiles) {
      const sql = fs.readFileSync(
        path.join(__dirname, '../../database/seeds', file),
        'utf8',
      );
      await db.query(sql);
      console.log(`Seeded: ${file}`);
    }
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await db.end();
  }
};

run();
