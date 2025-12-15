/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { keycloak } from './keycloak';
import { fetchUserInfo, fetchClaims } from './apiHelpers';
import api from './api';
import { hasRole } from './roles';

type Course = { id?: number; title: string; description: string; instructor: string };

export default function App() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [claims, setClaims] = useState<any>(null);
    const isAdmin = hasRole(claims, 'ROLE_ADMIN');
    const isStudent = hasRole(claims, 'ROLE_STUDENT');

    useEffect(() => {
        (async () => {
            const ui = await fetchUserInfo();
            const cl = await fetchClaims();
            setUserInfo(ui);
            setClaims(cl);
        })();
    }, []);

    const logout = () => keycloak.logout({ redirectUri: window.location.origin });

    const [courses, setCourses] = useState<Course[]>([]);
    useEffect(() => {
        if (isAdmin || isStudent) {
            api.get('/courses').then(res => setCourses(res.data));
        }
    }, [isAdmin, isStudent]);

    const [newCourse, setNewCourse] = useState<Course>({ title: '', description: '', instructor: '' });
    const addCourse = async () => {
        const res = await api.post('/courses', newCourse);
        setCourses(prev => [...prev, res.data]);
        setNewCourse({ title: '', description: '', instructor: '' });
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>E-Learning</h1>

            {userInfo && (
                <div>
                    <p>Bonjour {userInfo.given_name} {userInfo.family_name} ({userInfo.email})</p>
                    <button onClick={logout}>Logout</button>
                </div>
            )}

            {(isStudent || isAdmin) && (
                <section>
                    <h2>Cours disponibles</h2>
                    <ul>
                        {courses.map(c => (
                            <li key={c.id}>{c.title} — {c.instructor}</li>
                        ))}
                    </ul>
                </section>
            )}

            {isAdmin && (
                <section>
                    <h2>Gestion des cours</h2>
                    <input placeholder="Titre" value={newCourse.title} onChange={e => setNewCourse({ ...newCourse, title: e.target.value })} />
                    <input placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({ ...newCourse, description: e.target.value })} />
                    <input placeholder="Formateur" value={newCourse.instructor} onChange={e => setNewCourse({ ...newCourse, instructor: e.target.value })} />
                    <button onClick={addCourse}>Ajouter</button>
                </section>
            )}
        </div>
    );
}
