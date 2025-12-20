import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../store/authSlice';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [isLogin, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(loginUser({ username, password }));
        } else {
            dispatch(registerUser({ username, password })).then((res) => {
                if (!res.error) {
                    alert("Registered successfully! Please login.");
                    setIsLogin(true);
                }
            });
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-msg">{error}</div>}
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <button type="submit" className="primary">
                            {isLogin ? 'Enter' : 'Register'}
                        </button>
                    </div>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    {isLogin ? "No account? " : "Have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', width: 'auto', padding: 0 }}
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
