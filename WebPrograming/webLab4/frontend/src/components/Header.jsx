import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';

function Header() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <header>
            <div>
                <h1>Student Name: Jean</h1>
                <p>Group: P3212, Variant: 12345</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>
    );
}
// Note: Hardcoded names/variant as placeholder or if I knew them. Prompt says "FIO student...".
// I'll keep generic or user's name if known. User is "jeanc".
export default Header;
