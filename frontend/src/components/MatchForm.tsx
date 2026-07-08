import { FormEvent, useState } from 'react';

interface Props {
  teams: { id: number; name: string }[];
  onSubmit: (match: {
    team_a_id: number;
    team_b_id: number;
    team_a_score: number;
    team_b_score: number;
  }) => Promise<void>;
}

export default function MatchForm({ teams, onSubmit }: Props) {
  const [teamA, setTeamA] = useState<number>(teams[0]?.id ?? 0);
  const [teamB, setTeamB] = useState<number>(teams[1]?.id ?? 0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (teamA === teamB) {
      setError('Please select two different teams.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await onSubmit({
        team_a_id: teamA,
        team_b_id: teamB,
        team_a_score: scoreA,
        team_b_score: scoreB,
      });
    } catch (err) {
      setError((err as Error).message || 'Match submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: 4 }}>
      <h2>Submit new match</h2>
      <div style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
        <label>
          Team A
          <select value={teamA} onChange={(e) => setTeamA(Number(e.target.value))} style={{ width: '100%', marginTop: 4 }}>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </label>

        <label>
          Team B
          <select value={teamB} onChange={(e) => setTeamB(Number(e.target.value))} style={{ width: '100%', marginTop: 4 }}>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </label>

        <label>
          Score A
          <input type="number" value={scoreA} onChange={(e) => setScoreA(Number(e.target.value))} style={{ width: '100%', marginTop: 4 }} />
        </label>

        <label>
          Score B
          <input type="number" value={scoreB} onChange={(e) => setScoreB(Number(e.target.value))} style={{ width: '100%', marginTop: 4 }} />
        </label>

        {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

        <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>
          {loading ? 'Submitting...' : 'Submit Result'}
        </button>
      </div>
    </form>
  );
}
