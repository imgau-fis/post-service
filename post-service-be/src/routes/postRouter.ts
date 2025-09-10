import { Elysia, t } from 'elysia';
import { listPosts, getPost, createPost } from '../controllers/postController';


export const postRouter = new Elysia();

// GET /api/v1/posts  → list 50 bài mới nhất
postRouter.get('/',listPosts);

// GET /api/v1/posts/:id  → detail + attributes (typed)
postRouter.get('/:id',getPost);

// POST /api/v1/posts  → create (KHÔNG sanitize bodyHtml)
postRouter.post('/create-post',createPost);

export default postRouter;
