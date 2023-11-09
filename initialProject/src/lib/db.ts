import { Pool } from 'pg';
import type { SQLStatement } from 'sql-template-strings';
import { env } from '$env/dynamic/private';

export const pool = new Pool({
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	host: env.POSTGRES_HOST,
	port: parseInt(env.POSTGRES_PORT ?? '5432'),
	database: env.POSTGRES_DB
});

export const query = async <Row = any>(statement: string | SQLStatement) => {
	try {
		return (await pool.query(statement)).rows;
	} catch (error: any) {
		throw new Error(`DB error: ${error.message}`);
	}
};
