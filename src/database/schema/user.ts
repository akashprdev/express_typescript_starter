import { pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'editor', 'author', 'user']);

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),

  password: text('password').notNull(),

  role: roleEnum('role').default('user'),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
