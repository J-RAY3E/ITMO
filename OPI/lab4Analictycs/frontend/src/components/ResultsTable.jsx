import React from 'react';

function ResultsTable({ points }) {
    const formatNumber = (val) => {
        const num = parseFloat(val);
        if (isNaN(num)) return val;

        const str = num.toString();
        if (str.includes('.') && str.split('.')[1].length > 4) {
            return num.toExponential(2);
        }
        return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
    };

    return (
        <div className="table-section">
            <table id="results-table">
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Date & Time</th>
                        <th>Exec (ms)</th>
                    </tr>
                </thead>
                <tbody>
                    {points && points.length > 0 ? (
                        points.map((p, idx) => (
                            <tr key={idx} className="result-row">
                                <td>{formatNumber(p.x)}</td>
                                <td>{formatNumber(p.y)}</td>
                                <td>{formatNumber(p.r)}</td>
                                <td style={{ color: p.hit ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                                    {p.hit ? 'HIT' : 'MISS'}
                                </td>
                                <td>{new Date(p.timestamp).toLocaleString()}</td>
                                <td>{p.executionTime}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '2rem' }}>
                                No results yet
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ResultsTable;
