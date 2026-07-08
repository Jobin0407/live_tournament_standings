import { Standing } from '../types';

interface Props {
  standings: Standing[];
}

export default function StandingsTable({ standings }: Props) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Team</th>
          <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>W</th>
          <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>GP</th>
          <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>PF</th>
          <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>PA</th>
          <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Diff</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((team) => (
          <tr key={team.id}>
            <td style={{ padding: '8px 0' }}>{team.name}</td>
            <td style={{ textAlign: 'right' }}>{team.wins}</td>
            <td style={{ textAlign: 'right' }}>{team.played}</td>
            <td style={{ textAlign: 'right' }}>{team.points_for}</td>
            <td style={{ textAlign: 'right' }}>{team.points_against}</td>
            <td style={{ textAlign: 'right' }}>{team.differential}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
