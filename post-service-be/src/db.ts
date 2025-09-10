import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

// Khởi tạo kết nối
const client = postgres(process.env.DATABASE_URL!);

(async () => {
	try {
		await client`SELECT 1`;
		console.log('Database connected');
	} catch (err) {
		console.error('Database connect failed:', err);
		process.exit(1);
	}
})();

// Khởi tạo drizzle
const db = drizzle(client);

// Export db
export default db;
