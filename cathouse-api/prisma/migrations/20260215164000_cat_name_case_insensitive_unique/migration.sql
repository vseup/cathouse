-- Enforce case-insensitive uniqueness for cat names.
CREATE UNIQUE INDEX IF NOT EXISTS "cat_name_lower_key" ON "cat" (LOWER("name"));