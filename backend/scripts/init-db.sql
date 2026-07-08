DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  team_a_id INT NOT NULL REFERENCES teams(id),
  team_b_id INT NOT NULL REFERENCES teams(id),
  team_a_score INT NOT NULL,
  team_b_score INT NOT NULL,
  played_at TIMESTAMP DEFAULT now()
);

INSERT INTO teams (name) VALUES
  ('Falcons'),
  ('Wolves'),
  ('Tigers'),
  ('Bears');

INSERT INTO matches (team_a_id, team_b_id, team_a_score, team_b_score) VALUES
  (1, 2, 21, 15),
  (3, 4, 18, 21),
  (1, 3, 21, 19),
  (2, 4, 15, 15),
  (1, 4, 21, 10),
  (2, 3, 20, 21);
