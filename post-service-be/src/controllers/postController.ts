import { db } from '@/db/db';
import { posts, postAttributes } from '@/db/schema';
import { createPostSchema } from '@/lib/validate';
import { eq, desc } from 'drizzle-orm';
import { newId } from '@/utils/id';
import type { Request, Response } from 'express';

// GET /api/v1/posts  → list 50 bài mới nhất
export async function listPosts(res: Response) {
  const rows = await db.select({
    id: posts.id, title: posts.title, tags: posts.tags, createdAt: posts.createdAt
  }).from(posts).orderBy(desc(posts.createdAt)).limit(50);
  res.json({ items: rows });
}

// GET /api/v1/posts/:id  → detail + attributes
export async function getPost(req: Request, res: Response) {
  const id = req.params.id;
  const [p] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!p) return res.status(404).json({ error: 'Not found' });

  const attrs = await db.select().from(postAttributes).where(eq(postAttributes.postId, id));
  const attributes = attrs.map(a => ({
    key: a.key, type: a.type,
    value: a.vString ?? a.vInt ?? a.vFloat ?? a.vBool ?? a.vDate ?? a.vDecimal ?? null
  }));
  res.json({ ...p, attributes });
}

// POST /api/v1/posts  → create (controller quyết định lưu raw HTML)
export async function createPost(req: Request, res: Response) {
  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const d   = parsed.data;
  const id  = newId();
  const now = new Date();

  const attrs = (d.attributes ?? []).map(a => {
    const base: any = { id: newId(), postId: id, key: a.key, type: a.type };
    switch (a.type) {
      case 'STRING':  base.vString  = String(a.value); break;
      case 'INT':     base.vInt     = Number.parseInt(String(a.value), 10); break;
      case 'FLOAT':   base.vFloat   = Number(a.value); break;
      case 'BOOL':    base.vBool    = (a.value === true || a.value === 'true' || a.value === 1 || a.value === '1'); break;
      case 'DATE':    base.vDate    = new Date(String(a.value)); break;
      case 'DECIMAL': base.vDecimal = a.value == null ? null : String(a.value); break;
    }
    return base;
  });

  await db.transaction(async (tx) => {
    await tx.insert(posts).values({
      id, title: d.title, bodyHtml: d.bodyHtml, tags: d.tags ?? [],
      createdAt: now, updatedAt: now
    });
    if (attrs.length) await tx.insert(postAttributes).values(attrs);
  });

  res.status(201).json({
    id, title: d.title, bodyHtml: d.bodyHtml, tags: d.tags ?? [],
    createdAt: now, updatedAt: now
  });
}