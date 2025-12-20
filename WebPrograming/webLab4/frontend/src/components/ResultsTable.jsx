import React from 'react';

function ResultsTable({ points }) {
    if (!points || points.length === 0) {
        return <div className="table-section"><p>No results yet.</p></div>;
    }
    return (
        <div className="table-section">
            <table>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Time</th>
                        <th>Exec Time (ns)</th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((p, idx) => (
                        <tr key={idx}>
                            <td>{parseFloat(p.x).toFixed(3)}</td>
                            <td>{parseFloat(p.y).toFixed(3)}</td>
                            <td>{parseFloat(p.r).toFixed(3)}</td>
                            <td style={{ color: p.hit ? 'green' : 'red' }}>{p.hit ? 'Hit' : 'Miss'}</td>
                            <td>{p.timestamp}</td>
                            <td>{p.executionTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResultsTable;
