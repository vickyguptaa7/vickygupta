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
    institution: "University Name",
    institutionUrl: "https://university.edu",
    degree: "B.Tech in Computer Science & Engineering",
    period: "08.2019 – 06.2023",
    grade: "8.5 CGPA",
    highlights: [
      "Specialized in Data Structures, Algorithms, and Software Engineering",
      "Led the university's coding club and organized hackathons",
      "Published research on efficient web rendering techniques",
    ],
  },
  {
    id: "2",
    institution: "Higher Secondary School",
    degree: "Class XII — Science (PCM + CS)",
    period: "04.2017 – 03.2019",
    grade: "92%",
    highlights: [
      "School topper in Computer Science",
      "Participated in national-level olympiads",
    ],
  },
];
