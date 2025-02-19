import { useAuth } from '../contexts/FakeAuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from "./Login.module.css";
import PageNav from '../components/PageNav';
import Button from "../components/Button";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) { navigate("/app", { replace: true }); }
    }, [isAuthenticated, navigate]);

    function handleSubmit(ev) {
        ev.preventDefault();
        if (!email || !password) return;
        login(email, password);
    }

    return (
        <main className={styles.login} onSubmit={handleSubmit}>
            <PageNav />
            <form className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type='primary' handleClick={login}>Check credentials</Button>
                </div>
            </form>
        </main>
    );
}
