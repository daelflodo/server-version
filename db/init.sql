SELECT 'CREATE DATABASE adminiodb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE dataname = 'adminiodb')\gexec