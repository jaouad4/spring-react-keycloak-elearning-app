/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface NavbarProps {
    userInfo: any;
    logout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userInfo, logout }) => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Titre */}
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 text-3xl">school</span>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">E-Learning</span>
                    </div>

                    {/* Infos Utilisateur & Logout */}
                    {userInfo && (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-medium text-gray-900">
                                    {userInfo.given_name} {userInfo.family_name}
                                </span>
                                <span className="text-xs text-gray-500">{userInfo.email}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                                <span>Déconnexion</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};