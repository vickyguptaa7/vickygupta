export interface Education {
  id: string;
  institution: string;
  institutionUrl?: string;
  degree: string;
  period: string;
  grade?: string;
  highlights?: string[];
  isActive?: boolean;
}

export const educationData: Education[] = [
  {
    id: "1",
    institution: "Jamia Millia Islamia, New Delhi",
    institutionUrl: "https://www.jmi.ac.in/",
    degree: "B.Tech, Computer Engineering",
    period: "2020 – 2024",
    grade: "9.87 CGPA",
    isActive: false,
  },
  {
    id: "2",
    institution: "Oxford Public School, New Delhi",
    degree: "Intermediate, Science Stream",
    period: "2018 – 2020",
    grade: "94.8%",
  },
];
