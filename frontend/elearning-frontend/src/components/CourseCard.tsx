import React from 'react';

interface Course {
    id?: number;
    title: string;
    description: string;
    instructor: string;
}

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <span className="material-symbols-outlined">book_2</span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Actif
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {course.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                {course.description}
            </p>

            <div className="border-t border-gray-100 pt-4 mt-auto flex items-center text-sm text-gray-500">
                <span className="material-symbols-outlined text-[18px] mr-2">person</span>
                <span className="font-medium">{course.instructor}</span>
            </div>
        </div>
    );
};