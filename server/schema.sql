CREATE TABLE IF NOT EXISTS member_progress (
  eid TEXT PRIMARY KEY,
  full_name TEXT,
  progress JSONB NOT NULL DEFAULT '{}'::jsonb
);
