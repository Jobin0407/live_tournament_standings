import { Standing } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export async function fetchStandings(): Promise<Standing[]> {
  const res = await fetch(`${API_BASE}/standings`);
  if (!res.ok) {
    throw new Error('Failed to load standings');
  }
  return res.json();
}

export async function loginAdmin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Login failed');
  }
  return res.json();
}

export async function submitMatch(match: {
  team_a_id: number;
  team_b_id: number;
  team_a_score: number;
  team_b_score: number;
}, token: string) {
  const res = await fetch(`${API_BASE}/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(match),
  });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Unable to submit match');
  }
  return res.json();
}
