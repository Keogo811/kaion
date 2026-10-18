import { neon } from '@neondatabase/serverless';

// On initialise la connexion avec la variable d'environnement
const sql = neon(import.meta.env.VITE_DATABASE_URL);

export default sql;