ALTER TABLE issues ADD COLUMN IF NOT EXISTS github_comment_count SMALLINT DEFAULT 0
