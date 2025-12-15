import { apiClient } from "./apiClient";

export type Course = {
    id?: number;
    title: string;
    description: string;
    instructor: string;
};

export async function getCourses(): Promise<Course[]> {
    const res = await apiClient.get<Course[]>("/courses");
    return res.data;
}

export async function addCourse(course: Course): Promise<Course> {
    const res = await apiClient.post<Course>("/courses", course);
    return res.data;
}
