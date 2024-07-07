// jest.setup.js
require('dotenv').config({ path: '../../.env.test' });
require('whatwg-fetch');

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';