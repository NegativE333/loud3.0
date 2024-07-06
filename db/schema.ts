import { boolean, pgTable, varchar, PgArray, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: varchar("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").unique(),
    password: varchar("password").notNull(),
    verifyCode: varchar("verifycode").notNull(),
    verifyCodeExpire: varchar("verifycodeexpire").notNull(),
    isVerified: boolean("isverified").default(false),
    favoriteSongs: text("favourite").array()
});
