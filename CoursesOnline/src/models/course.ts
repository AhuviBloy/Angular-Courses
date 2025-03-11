export interface Course {
    id: number;
    title: string;
    description: string;
    teacherId: number;
  }

  export interface UpdateCourse {
    teacherId: number;
    title: string;
    description: string;
  }