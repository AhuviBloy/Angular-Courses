export interface Course {
    id: number;
    title: string;
    description: string;
  }

  export interface UpdateCourse {
    teacherId: number;
    title: string;
    description: string;
  }