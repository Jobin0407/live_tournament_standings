'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { fetchStandings, loginAdmin, submitMatch } from '../lib/api';
import StandingsTable from '../components/StandingsTable';
import MatchForm from '../components/MatchForm';
import { Standing } from '../types';

export default function HomePage() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');

  const teams = useMemo(
    () => standings.map((team) => ({ id: team.id, name: team.name })),
    [standings]
  );

  const loadStandings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStandings();
      setStandings(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStandings();
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    try {
      const response = await loginAdmin(username, password);
      setToken(response.token);
    } catch (err) {
      setLoginError((err as Error).message);
    }
  };

  const handleSubmitMatch = async (match: { team_a_id: number; team_b_id: number; team_a_score: number; team_b_score: number; }) => {
    if (!token) return;
    try {
      await submitMatch(match, token);
      await loadStandings();
    } catch (err) {
      throw err;
    }
  };

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 960, margin: '0 auto' }}>
      <h1>Mini Tournament Standings</h1>
      <p>Live ranking using server-side standings logic and admin match submission.</p>

      {loading ? (
        <p>Loading standings…</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>{error}</p>
      ) : (
        <StandingsTable standings={standings} />
      )}

      <section style={{ marginTop: 32 }}>
        {token ? (
          <div>
            <p>Admin logged in. You can submit new results.</p>
            <MatchForm teams={teams} onSubmit={handleSubmitMatch} />
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12, maxWidth: 420, marginTop: 24 }}>
            <h2>Admin login</h2>
            <label>
              Username
              <input value={username} onChange={(event) => setUsername(event.target.value)} style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ width: '100%', marginTop: 4 }} />
            </label>
            {loginError ? <p style={{ color: 'crimson' }}>{loginError}</p> : null}
            <button type="submit" style={{ padding: '10px 16px' }}>Log in as admin</button>
          </form>
        )}
      </section>
    </main>
  );
}
