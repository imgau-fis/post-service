import app from '@/app';
import '@/db';

// Bắt đầu lắng nghe service
app.listen(process.env.PORT || 8081);

// Thành công
console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);
