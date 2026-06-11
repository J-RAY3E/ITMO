import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Graph from '../components/Graph';
import ResultsTable from '../components/ResultsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints, addPoint, clearError } from '../store/pointsSlice';

function MainPage() {
    const dispatch = useDispatch();
    const { items: points, error: apiError } = useSelector((state) => state.points);

    const [x, setX] = useState("0");
    const [y, setY] = useState("0");
    const [r, setR] = useState("1");

    const [formError, setFormError] = useState(null);

    useEffect(() => {
        dispatch(fetchPoints());
    }, [dispatch]);

    const validateForm = (valX, valY, valR) => {
        if (valX === "" || isNaN(valX)) return "X must be a number";
        const numX = parseFloat(valX);
        if (numX < -4 || numX > 4) return "X must be between -4 and 4";

        if (valY === "" || isNaN(valY)) return "Y must be a number";
        const numY = parseFloat(valY);
        if (numY <= -3 || numY >= 5) return "Y must be strictly between -3 and 5";

        if (valR === "" || isNaN(valR)) return "R must be a number";
        const numR = parseFloat(valR);
        if (numR === 0) return "R cannot be zero";

        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validateForm(x, y, r);
        if (err) {
            setFormError(err);
            return;
        }
        setFormError(null);
        dispatch(clearError());
        dispatch(addPoint({ x, y, r }));
    };

    const handleGraphCheck = (clickX, clickY) => {
        if (r === "" || isNaN(r) || parseFloat(r) === 0) {
            setFormError("Please select a valid non-zero Radius (R) before clicking on the graph.");
            return;
        }
        setFormError(null);
        dispatch(clearError());
        dispatch(addPoint({ x: clickX.toFixed(3), y: clickY.toFixed(3), r }));
    };

    return (
        <div className="main-page-container">
            <Header />

            <div className="app-content">
                <div className="visual-section">
                    <div className="graph-container card">
                        <Graph points={points} r={r} onCheck={handleGraphCheck} />
                    </div>

                    <div className="table-container card">
                        <ResultsTable points={points} />
                    </div>
                </div>

                <div className="form-section card">
                    <h3>Submit New Point</h3>
                    <form id="point-form" onSubmit={handleSubmit} className="point-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>X Coordinate (-4 ... 4)</label>
                                <select id="x-select" value={x} onChange={(e) => setX(e.target.value)}>
                                    {['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'].map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Y Coordinate (-3 ... 5)</label>
                                <input
                                    id="y-input"
                                    type="text"
                                    value={y}
                                    onChange={(e) => setY(e.target.value)}
                                    placeholder="Enter Y (-3 to 5)"
                                />
                            </div>

                            <div className="form-group">
                                <label>Radius (R)</label>
                                <select id="r-select" value={r} onChange={(e) => setR(e.target.value)}>
                                    {['-4', '-3', '-2', '-1', '1', '2', '3', '4'].map(val => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {formError && <div id="point-form-error" className="error-msg">{formError}</div>}
                        {apiError && <div id="point-api-error" className="error-msg">API Error: {apiError}</div>}

                        <button id="point-submit-btn" type="submit" className="primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
