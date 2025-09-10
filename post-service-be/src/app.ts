import Elysia from "elysia";
import { cors } from '@elysiajs/cors'
import postRouter from "@/routes/postRouter";

const app = new Elysia();

// Cấu hình môi trường
if (process.env.NODE_ENV !== "production") {
  // Thêm Swagger
  // app.use(swagger());

  // Xử lý lỗi
  app.onError(({ error, code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return "Not Found";
    }
    set.status = 500;
    return error;
  });
} else {
  // Xử lý lỗi
  app.onError(({ code, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return "Not Found";
    }
    set.status = 500;
    return "Internal Server Error";
  });
}

app.use(cors());

// Định nghĩa các routes
app.use(postRouter);

export default app;
