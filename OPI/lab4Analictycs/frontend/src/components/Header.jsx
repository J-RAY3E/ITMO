import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';

function Header() {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className="app-header">
            <div className="student-info">
                <h1>Web Lab #4</h1>
                <p>Jean C. | Group P3220 | Variant #9999</p>
                {user && <p id="current-user-info" className="current-user">Active User: <strong>{user.username}</strong></p>}
            </div>
            <button id="logout-btn" onClick={handleLogout} className="logout-btn">
                Log Out
            </button>
        </header>
    );
}
// Note: Hardcoded names/variant as placeholder or if I knew them. Prompt says "FIO student...".
// I'll keep generic or user's name if known. User is "jeanc".
export default Header;
