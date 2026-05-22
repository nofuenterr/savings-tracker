import pg, { Pool } from 'pg';

pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat);
pg.types.setTypeParser(pg.types.builtins.INT8, parseInt);

import {
  NODE_ENV,
  DATABASE_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} from '../config/mainConfig';

const isProduction = NODE_ENV === 'production' && !!DATABASE_URL;

const connectionConfig = isProduction
  ? {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    };

const pool = new Pool(connectionConfig);

export default pool;
