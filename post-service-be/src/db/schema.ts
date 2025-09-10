import {
  pgTable, text, timestamp, index, varchar, pgEnum,
  boolean, integer, doublePrecision, numeric, uniqueIndex
} from 'drizzle-orm/pg-core';

export const attrType = pgEnum('attr_type', ['STRING','INT','FLOAT','BOOL','DATE','DECIMAL']);

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  bodyHtml: text('body_html').notNull(),        // controller quyết định lưu raw HTML
  tags: text('tags').array().notNull().default([]),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
}, (t) => ({
  createdIdx: index('posts_created_idx').on(t.createdAt)
}));

export const postAttributes = pgTable('post_attributes', {
  id: text('id').primaryKey(),
  postId: text('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  key: varchar('key', { length: 64 }).notNull(),
  type: attrType('type').notNull(),
  vString:  text('v_string'),
  vInt:     integer('v_int'),
  vFloat:   doublePrecision('v_float'),
  vBool:    boolean('v_bool'),
  vDate:    timestamp('v_date'),
  vDecimal: numeric('v_decimal', { precision: 12, scale: 2 })
}, (t) => ({
  uqPostKey: uniqueIndex('uq_post_key').on(t.postId, t.key)
}));
