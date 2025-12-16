/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { keycloak } from './keycloak';
import { fetchUserInfo, fetchClaims } from './apiHelpers';
import api from './api';
import { hasRole } from './roles';
import { Navbar } from './components/Navbar';
import { CourseCard } from './components/CourseCard';
import { AdminCourseForm } from './components/AdminCourseForm';

type Course = { id?: number; title: string; description: string; instructor: string };

export default function App() {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [claims, setClaims] = useState<any>(null);
    const [courses, setCourses] = useState<Course[]>([]);

    // Rôles
    const isAdmin = hasRole(claims, 'ROLE_ADMIN');
    const isStudent = hasRole(claims, 'ROLE_STUDENT');

    useEffect(() => {
        (async () => {
            try {
                const ui = await fetchUserInfo();
                const cl = await fetchClaims();
                setUserInfo(ui);
                setClaims(cl);
            } catch (error) {
                console.error("Erreur de chargement profil", error);
            }
        })();
    }, []);

    const logout = () => keycloak.logout({ redirectUri: window.location.origin });

    const refreshCourses = () => {
        api.get('/courses').then(res => setCourses(res.data));
    };

    useEffect(() => {
        if (isAdmin || isStudent) {
            refreshCourses();
        }
    }, [isAdmin, isStudent]);

    const addCourse = async (newCourse: Course) => {
        await api.post('/courses', newCourse);
        refreshCourses();
    };

    // État de chargement initial
    if (!userInfo) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-blue-600 text-6xl animate-pulse">school</span>
                    <p className="text-gray-500 font-medium animate-pulse">Chargement de la plateforme...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Navbar userInfo={userInfo} logout={logout} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Section Admin */}
                {isAdmin && (
                    <section className="mb-10">
                        <AdminCourseForm onAdd={addCourse} />
                    </section>
                )}

                {/* Liste des cours */}
                {(isStudent || isAdmin) && (
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-700">library_books</span>
                                Catalogue des cours
                            </h2>
                            <span className="bg-white border border-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-medium shadow-sm">
                                {courses.length} modules
                            </span>
                        </div>

                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((c, index) => (
                                    <CourseCard key={c.id || index} course={c} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
                                <span className="material-symbols-outlined text-gray-300 text-6xl mb-3">tv_off</span>
                                <p className="text-gray-500 font-medium">Aucun cours disponible pour le moment.</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}