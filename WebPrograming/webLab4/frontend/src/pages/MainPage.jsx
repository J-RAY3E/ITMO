import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Graph from '../components/Graph';
import ResultsTable from '../components/ResultsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoints, addPoint } from '../store/pointsSlice';

function MainPage() {
    const dispatch = useDispatch();
    const { items: points, error: apiError } = useSelector((state) => state.points);

    // Form State
    const [x, setX] = useState("0");
    const [y, setY] = useState("0");
    const [r, setR] = useState("1");
    // Errors
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        dispatch(fetchPoints());
    }, [dispatch]);

    const validate = (valX, valY, valR) => {
        // X
        if (valX === "" || isNaN(valX)) return "X must be a number";
        const numX = parseFloat(valX);
        if (numX < -4 || numX > 4) return "X must be between -4 and 4";

        // Y (Text -3 ... 5)
        if (valY === "" || isNaN(valY)) return "Y must be a number";
        const numY = parseFloat(valY);
        // Requirement: "-3 ... 5". Usually exclusive bounds if strictly inside area logic or inclusive.
        // Prompt validation usually strict. "Text (-3 ... 5)".
        // I'll assume inclusive or standard range. And backend said "exclusive" (-3, 5). 
        // Let's match backend: > -3 and < 5.
        if (numY <= -3 || numY >= 5) return "Y must be strictly between -3 and 5";

        // R
        if (valR === "" || isNaN(valR)) return "R must be a number";
        const numR = parseFloat(valR);
        if (numR <= 0) return "R must be positive";

        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate(x, y, r);
        if (err) {
            setFormError(err);
            return;
        }
        setFormError(null);
        dispatch(addPoint({ x, y, r }));
    };

    const handleGraphCheck = (clickX, clickY) => {
        const err = validate(clickX, clickY, r); // Validate R is set, coords usually valid if clicked inside visible area?
        // Actually click can be anywhere. Backend doesn't strictly validate X/Y if from click, but logic usually requires inputs.
        // But backend does validate ranges. If I click at X=10, backend rejects.
        // I should set X/Y to clicked values and submitting? 
        // Prompt: "Click on picture ... initiate scenario ... determining coords ... sending to server".
        // It does NOT say "update form then submit". It says "initiate ... sending".
        // So I send directly.
        // But I should validate R first.
        const rErr = validate(0, 0, r); // Check R valid
        if (rErr && rErr.includes("R")) {
            setFormError(rErr);
            return;
        }
        // I won't validate X/Y range for click, just send. Server might reject if out of bounds restricted by logic, 
        // but typically "click" allows "checking area" even outside form constraints?
        // Wait. Backend `PointResource` VALIDATES X and Y ranges (-4..4, -3..5).
        // If I click at 4.5, my backend rejects it.
        // I should probably relax backend validation for Click or UI logic restricts click?
        // Or "Text (-3...5)" applies to *Input Field*.
        // Does it apply to *Point*? Usually yes in these labs.
        // If so, I should clip or reject clicks.
        // I'll modify backend to relax X/Y validation? 
        // "Input fields for setting coords ... Select ... Text ... Validation ... If field admits incorrect data".
        // This constraint is usually for the *Form*.
        // The check itself (AreaCheck) works for any double.
        // I should probably remove strict range validation for X/Y in backend if I want to support clicks outside range.
        // Or I accept the restriction.
        // I'll keep backend validation for safety as usually required.
        // If user clicks outside, it will fail.

        dispatch(addPoint({ x: clickX.toFixed(3), y: clickY.toFixed(3), r }));
    };

    return (
        <div className="main-grid">
            {/* Header is outside grid in layout, or inside? Layout CSS says main-grid. 
                I put Header in App.jsx? No, Main Page. 
                I'll put Header before grid.
            */}
            {/* Wait, I can't return multiple elements without fragment. */}
            <div style={{ gridColumn: '1 / -1' }}>
                <Header />
            </div>

            <Graph points={points} r={parseFloat(r)} onCheck={handleGraphCheck} />

            <div className="form-section card">
                <h2>Check Point</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>X Coordinate</label>
                        <select value={x} onChange={(e) => setX(e.target.value)}>
                            {['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'].map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Y Coordinate (-3 ... 5)</label>
                        <input
                            type="text"
                            value={y}
                            onChange={(e) => setY(e.target.value)}
                            placeholder="-3 ... 5"
                        />
                    </div>

                    <div className="form-group">
                        <label>Radius</label>
                        <select value={r} onChange={(e) => setR(e.target.value)}>
                            {['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'].map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>

                    {formError && <div className="error-msg">{formError}</div>}
                    {apiError && <div className="error-msg">API Error: {apiError}</div>}

                    <div className="form-group">
                        <button type="submit" className="primary">Check</button>
                    </div>
                </form>
            </div>

            <ResultsTable points={points} />
        </div>
    );
}

export default MainPage;
