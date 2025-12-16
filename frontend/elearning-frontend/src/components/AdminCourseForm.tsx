import React, { useState } from 'react';

interface Course {
    title: string;
    description: string;
    instructor: string;
}

interface Props {
    onAdd: (course: Course) => Promise<void>;
}

export const AdminCourseForm: React.FC<Props> = ({ onAdd }) => {
    const [newCourse, setNewCourse] = useState<Course>({ title: '', description: '', instructor: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onAdd(newCourse);
        setLoading(false);
        setNewCourse({ title: '', description: '', instructor: '' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <span className="material-symbols-outlined text-blue-600">add_circle</span>
                <h2 className="text-lg font-bold text-gray-900">Nouveau Module</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Titre du cours</label>
                    <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ex: Sécurité des SI"
                        value={newCourse.title}
                        onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Formateur</label>
                    <input
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Ex: M. Ouaguid"
                        value={newCourse.instructor}
                        onChange={e => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                        placeholder="Description détaillée du module..."
                        value={newCourse.description}
                        onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
                    >
                        {loading ? (
                            <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        ) : (
                            <span className="material-symbols-outlined">save</span>
                        )}
                        <span>Enregistrer</span>
                    </button>
                </div>
            </form>
        </div>
    );
};