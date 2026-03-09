import { StaticImageData } from "next/image";

import collegeLogo from "@/assets/images/education/college.webp";
import schoolLogo from "@/assets/images/education/school.png";

export interface Education {
  id: string;
  institution: string;
  institutionUrl?: string;
  logo?: StaticImageData;
  degree: string;
  period: string;
  grade?: string;
  description?: string;
  highlights?: string[];
  achievements?: string[];
  coursework?: string[];
  isActive?: boolean;
}

export const educationData: Education[] = [
  {
    id: "1",
    institution: "Jamia Millia Islamia",
    institutionUrl: "https://www.jmi.ac.in/",
    logo: collegeLogo,
    degree: "B.Tech, Computer Engineering",
    period: "2020 – 2024",
    grade: "9.87 CGPA",
    highlights: [
      // "Coursework: Data Structures and Algorithms, Database Management Systems, Object-Oriented Programming, Computer Networks, Operating Systems, etc.",
    ],
    achievements: [
      "Secured 3rd rank in the university in 2nd year.",
      "Secured 1st rank in the university in 3rd year.",
    ],
    coursework: [
      "Data Structures",
      "Algorithms",
      "Database Management System (DBMS)",
      "Computer Network",
      "Operating Systems",
      "Object-Oriented Programming (OOP)",
    ],
    isActive: false,
  },
  {
    id: "2",
    institution: "Oxford Public School",
    logo: schoolLogo,
    degree: "Intermediate, Science Stream",
    period: "2018 – 2020",
    grade: "94.8%",
    description:
      "Activities and societies: Active member of the school football team and House Captain, leading and organizing events.",
    coursework: ["Physics", "Chemistry", "Mathematics", "IT"],
  },
];
