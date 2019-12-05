import { config } from 'dotenv';
config({ path: `./environments/${process.env.NODE_ENV || 'development'}/.env`});
