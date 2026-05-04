import { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Student {
  id: string;
  studentId: string;
  lrn: string;
  fullName: string;
  grade: string;
  section: string;
  sex: "Male" | "Female";
  dateOfBirth: string;
  guardian: string;
  contactNumber: string;
  beneficiary: boolean;
  hasAllergy: boolean;
  allergyNotes: string;
  remarks: string;
  createdAt: string;
}

export interface Measurement {
  id: string;
  studentId: string;
  studentName: string;
  measurementType: "Baseline" | "Monthly" | "Endline";
  date: string;
  weight: number;
  height: number;
  bmi: number;
  nutritionalStatus: "Severely Underweight" | "Underweight" | "Normal" | "Overweight" | "Obese";
  measuredBy: string;
  remarks: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  present: boolean;
  mealReceived: boolean;
  remarks: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: "Administrator" | "Encoder" | "Viewer";
  email: string;
  isActive: boolean;
}

interface AppContextType {
  students: Student[];
  addStudent: (student: Omit<Student, "id" | "createdAt">) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  measurements: Measurement[];
  addMeasurement: (measurement: Omit<Measurement, "id">) => void;
  getMeasurementsByStudent: (studentId: string) => Measurement[];
  
  attendanceRecords: Attendance[];
  addAttendance: (attendance: Omit<Attendance, "id">) => void;
  getAttendanceByDate: (date: string) => Attendance[];
  
  users: User[];
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data - Realistic data for school feeding program
const initialStudents: Student[] = [
  {
    id: "1",
    studentId: "STU001",
    lrn: "100232100020",
    fullName: "Juan Dela Cruz",
    grade: "Grade 1",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2018-05-15",
    guardian: "Maria Dela Cruz",
    contactNumber: "09171234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Allergic to peanuts",
    remarks: "Lives with grandmother",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    studentId: "STU002",
    lrn: "100232100021",
    fullName: "Maria Santos",
    grade: "Grade 2",
    section: "Section B",
    sex: "Female",
    dateOfBirth: "2017-08-22",
    guardian: "Pedro Santos",
    contactNumber: "09181234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Regular attendance",
    createdAt: "2024-01-16T08:00:00Z",
  },
  {
    id: "3",
    studentId: "STU003",
    lrn: "100232100022",
    fullName: "Pedro Reyes",
    grade: "Grade 1",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2018-03-10",
    guardian: "Anna Reyes",
    contactNumber: "09191234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Transferred from other school",
    createdAt: "2024-01-17T08:00:00Z",
  },
  {
    id: "4",
    studentId: "STU004",
    lrn: "100232100023",
    fullName: "Anna Lopez",
    grade: "Grade 3",
    section: "Section C",
    sex: "Female",
    dateOfBirth: "2016-11-30",
    guardian: "Jose Lopez",
    contactNumber: "09201234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Lactose intolerant - dairy free meals required",
    remarks: "Needs special meal accommodation",
    createdAt: "2024-01-18T08:00:00Z",
  },
  {
    id: "5",
    studentId: "STU005",
    lrn: "100232100024",
    fullName: "Carlos Garcia",
    grade: "Grade 2",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2017-06-12",
    guardian: "Rosa Garcia",
    contactNumber: "09211234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Both parents working abroad",
    createdAt: "2024-01-19T08:00:00Z",
  },
  {
    id: "6",
    studentId: "STU006",
    lrn: "100232100025",
    fullName: "Sofia Martinez",
    grade: "Grade 1",
    section: "Section B",
    sex: "Female",
    dateOfBirth: "2018-09-05",
    guardian: "Luis Martinez",
    contactNumber: "09221234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Scholarship student",
    createdAt: "2024-01-20T08:00:00Z",
  },
  {
    id: "7",
    studentId: "STU007",
    lrn: "100232100026",
    fullName: "Diego Fernandez",
    grade: "Grade 3",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2016-04-18",
    guardian: "Carmen Fernandez",
    contactNumber: "09231234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Allergic to fish and shellfish",
    remarks: "Comes from low-income family",
    createdAt: "2024-01-21T08:00:00Z",
  },
  {
    id: "8",
    studentId: "STU008",
    lrn: "100232100027",
    fullName: "Isabella Cruz",
    grade: "Grade 2",
    section: "Section C",
    sex: "Female",
    dateOfBirth: "2017-12-25",
    guardian: "Roberto Cruz",
    contactNumber: "09241234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Star pupil",
    createdAt: "2024-01-22T08:00:00Z",
  },
  {
    id: "9",
    studentId: "STU009",
    lrn: "100232100028",
    fullName: "Lourdes Aquino",
    grade: "Grade 1",
    section: "Section B",
    sex: "Female",
    dateOfBirth: "2018-07-08",
    guardian: "Evelyn Aquino",
    contactNumber: "09251234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Regular health checkup needed",
    createdAt: "2024-01-23T08:00:00Z",
  },
  {
    id: "10",
    studentId: "STU010",
    lrn: "100232100029",
    fullName: "Miguel Toruno",
    grade: "Grade 3",
    section: "Section B",
    sex: "Male",
    dateOfBirth: "2016-02-14",
    guardian: "Elena Toruno",
    contactNumber: "09261234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Allergic to eggs",
    remarks: "Requires egg-free meals",
    createdAt: "2024-01-24T08:00:00Z",
  },
  {
    id: "11",
    studentId: "STU011",
    lrn: "100232100030",
    fullName: "Angela Morales",
    grade: "Grade 2",
    section: "Section A",
    sex: "Female",
    dateOfBirth: "2017-10-20",
    guardian: "Antonio Morales",
    contactNumber: "09271234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Active in sports",
    createdAt: "2024-01-25T08:00:00Z",
  },
  {
    id: "12",
    studentId: "STU012",
    lrn: "100232100031",
    fullName: "Ricardo Santos",
    grade: "Grade 1",
    section: "Section C",
    sex: "Male",
    dateOfBirth: "2018-01-25",
    guardian: "Teresa Santos",
    contactNumber: "09281234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Nutrition monitoring recommended",
    createdAt: "2024-01-26T08:00:00Z",
  },
  {
    id: "13",
    studentId: "STU013",
    lrn: "100232100032",
    fullName: "Claudia Ramos",
    grade: "Grade 3",
    section: "Section B",
    sex: "Female",
    dateOfBirth: "2015-09-12",
    guardian: "Marco Ramos",
    contactNumber: "09291234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Soy allergy",
    remarks: "Needs alternative meal options",
    createdAt: "2024-01-27T08:00:00Z",
  },
  {
    id: "14",
    studentId: "STU014",
    lrn: "100232100033",
    fullName: "Vincent Lim",
    grade: "Grade 2",
    section: "Section C",
    sex: "Male",
    dateOfBirth: "2017-04-30",
    guardian: "Sylvia Lim",
    contactNumber: "09301234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "Academic excellence awardee",
    createdAt: "2024-01-28T08:00:00Z",
  },
  {
    id: "15",
    studentId: "STU015",
    lrn: "100232100034",
    fullName: "Florence Ng",
    grade: "Grade 1",
    section: "Section A",
    sex: "Female",
    dateOfBirth: "2018-11-11",
    guardian: "Henry Ng",
    contactNumber: "09311234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "New student this year",
    createdAt: "2024-02-01T08:00:00Z",
  },
];

const initialMeasurements: Measurement[] = [
  // Baseline measurements - January 2024
  {
    id: "1",
    studentId: "1",
    studentName: "Juan Dela Cruz",
    measurementType: "Baseline",
    date: "2024-01-20",
    weight: 17.8,
    height: 110,
    bmi: 14.7,
    nutritionalStatus: "Underweight",
    measuredBy: "Dr. Maria Santos",
    remarks: "Requires nutritional support",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Maria Santos",
    measurementType: "Baseline",
    date: "2024-01-20",
    weight: 22.5,
    height: 120,
    bmi: 15.6,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Pedro Reyes",
    measurementType: "Baseline",
    date: "2024-01-20",
    weight: 16.5,
    height: 108,
    bmi: 14.2,
    nutritionalStatus: "Severely Underweight",
    measuredBy: "Dr. Maria Santos",
    remarks: "High priority for feeding program",
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Anna Lopez",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 32.0,
    height: 130,
    bmi: 18.9,
    nutritionalStatus: "Overweight",
    measuredBy: "Dr. Maria Santos",
    remarks: "Monitor caloric intake",
  },
  {
    id: "5",
    studentId: "5",
    studentName: "Carlos Garcia",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 21.2,
    height: 118,
    bmi: 15.2,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "",
  },
  {
    id: "6",
    studentId: "6",
    studentName: "Sofia Martinez",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 18.5,
    height: 112,
    bmi: 14.8,
    nutritionalStatus: "Underweight",
    measuredBy: "Dr. Maria Santos",
    remarks: "Needs monitoring",
  },
  {
    id: "7",
    studentId: "7",
    studentName: "Diego Fernandez",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 28.5,
    height: 130,
    bmi: 16.9,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Healthy weight range",
  },
  {
    id: "8",
    studentId: "8",
    studentName: "Isabella Cruz",
    measurementType: "Baseline",
    date: "2024-01-22",
    weight: 23.8,
    height: 122,
    bmi: 16.0,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "",
  },
  {
    id: "9",
    studentId: "9",
    studentName: "Lourdes Aquino",
    measurementType: "Baseline",
    date: "2024-01-22",
    weight: 17.2,
    height: 109,
    bmi: 14.5,
    nutritionalStatus: "Underweight",
    measuredBy: "Dr. Maria Santos",
    remarks: "Priority nutrition support",
  },
  {
    id: "10",
    studentId: "10",
    studentName: "Miguel Toruno",
    measurementType: "Baseline",
    date: "2024-01-23",
    weight: 32.5,
    height: 135,
    bmi: 17.8,
    nutritionalStatus: "Overweight",
    measuredBy: "Dr. Maria Santos",
    remarks: "Physical activity recommended",
  },
  // Monthly measurements - February 2024
  {
  // March 14, 2024 - Wednesday
  { id: "1", studentId: "1", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "2", studentId: "2", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "3", studentId: "3", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "4", studentId: "4", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "5", studentId: "5", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "6", studentId: "6", date: "2024-03-14", present: false, mealReceived: false, remarks: "Sick leave" },
  { id: "7", studentId: "7", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "8", studentId: "8", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "9", studentId: "9", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  { id: "10", studentId: "10", date: "2024-03-14", present: true, mealReceived: true, remarks: "" },
  // March 15, 2024 - Thursday
  { id: "11", studentId: "1", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "12", studentId: "2", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "13", studentId: "3", date: "2024-03-15", present: false, mealReceived: false, remarks: "Family emergency" },
  { id: "14", studentId: "4", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "15", studentId: "5", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "16", studentId: "6", date: "2024-03-15", present: true, mealReceived: true, remarks: "Back from absence" },
  { id: "17", studentId: "7", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "18", studentId: "8", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "19", studentId: "9", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  { id: "20", studentId: "10", date: "2024-03-15", present: true, mealReceived: true, remarks: "" },
  // March 18, 2024 - Monday
  { id: "21", studentId: "1", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "22", studentId: "2", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "23", studentId: "3", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "24", studentId: "4", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "25", studentId: "5", date: "2024-03-18", present: false, mealReceived: false, remarks: "Parent visit" },
  { id: "26", studentId: "6", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "27", studentId: "7", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "28", studentId: "8", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "29", studentId: "9", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "30", studentId: "10", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "31", studentId: "11", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "32", studentId: "12", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "33", studentId: "13", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  { id: "34", studentId: "14", date: "2024-03-18", present: false, mealReceived: false, remarks: "Late enrolled" },
  { id: "35", studentId: "15", date: "2024-03-18", present: true, mealReceived: true, remarks: "" },
  // March 19, 2024 - Tuesday
  { id: "36", studentId: "1", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "37", studentId: "2", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "38", studentId: "3", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "39", studentId: "4", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "40", studentId: "5", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "41", studentId: "6", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "42", studentId: "7", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "43", studentId: "8", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "44", studentId: "9", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "45", studentId: "10", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "46", studentId: "11", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "47", studentId: "12", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "48", studentId: "13", date: "2024-03-19", present: false, mealReceived: false, remarks: "Medical appointment" },
  { id: "49", studentId: "14", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  { id: "50", studentId: "15", date: "2024-03-19", present: true, mealReceived: true, remarks: "" },
  // March 20, 2024 - Wednesday
  { id: "51", studentId: "1", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "52", studentId: "2", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "53", studentId: "3", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "54", studentId: "4", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "55", studentId: "5", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "56", studentId: "6", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "57", studentId: "7", date: "2024-03-20", present: true, mealReceived: true, remarks: "" },
  { id: "58", sDr. Maria Santos",
    role: "Administrator",
    email: "maria.santos@school.edu.ph",
    isActive: true,
  },
  {
    id: "2",
    username: "encoder",
    fullName: "Grace Reyes",
    role: "Encoder",
    email: "grace.reyes@school.edu.ph",
    isActive: true,
  },
  {
    id: "3",
    username: "viewer",
    fullName: "Teacher Juan Castillo",
    role: "Viewer",
    email: "juan.castillo@school.edu.ph",
    isActive: true,
  },
  {
    id: "4",
    username: "encoder2",
    fullName: "Nurse Rosa Garcia",
    role: "Encoder",
    email: "rosa.garcia@school.edu.ph
    bmi: 15.5,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Good growth trajectory",
  },
  {
    id: "16",
    studentId: "6",
    studentName: "Sofia Martinez",
    measurementType: "Monthly",
    date: "2024-02-21",
    weight: 19.5,
    height: 113,
    bmi: 15.2,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Improved to normal weight",
  },
  // Monthly measurements - March 2024
  {
    id: "17",
    studentId: "1",
    studentName: "Juan Dela Cruz",
    measurementType: "Monthly",
    date: "2024-03-20",
    weight: 19.5,
    height: 112,
    bmi: 15.5,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Significant improvement - now in normal range",
  },
  {
    id: "18",
    studentId: "7",
    studentName: "Diego Fernandez",
    measurementType: "Monthly",
    date: "2024-03-20",
    weight: 29.2,
    height: 131,
    bmi: 17.1,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Maintaining healthy weight",
  },
  {
    id: "19",
    studentId: "8",
    studentName: "Isabella Cruz",
    measurementType: "Monthly",
    date: "2024-03-21",
    weight: 24.5,
    height: 123,
    bmi: 16.2,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Normal development",
  },
  {
    id: "20",
    studentId: "9",
    studentName: "Lourdes Aquino",
    measurementType: "Monthly",
    date: "2024-03-21",
    weight: 18.8,
    height: 110,
    bmi: 15.5,
    nutritionalStatus: "Normal",
    measuredBy: "Dr. Maria Santos",
    remarks: "Good improvement trajectory",
  },
];

const initialAttendance: Attendance[] = [
  {
    id: "1",
    studentId: "1",
    date: "2024-03-14",
    present: true,
    mealReceived: true,
    remarks: "",
  },
  {
    id: "2",
    studentId: "2",
    date: "2024-03-14",
    present: true,
    mealReceived: true,
    remarks: "",
  },
  {
    id: "3",
    studentId: "3",
    date: "2024-03-14",
    present: true,
    mealReceived: true,
    remarks: "",
  },
  {
    id: "4",
    studentId: "5",
    date: "2024-03-14",
    present: true,
    mealReceived: true,
    remarks: "",
  },
  {
    id: "5",
    studentId: "6",
    date: "2024-03-14",
    present: false,
    mealReceived: false,
    remarks: "Absent",
  },
  {
    id: "6",
    studentId: "7",
    date: "2024-03-14",
    present: true,
    mealReceived: true,
    remarks: "",
  },
  {
    id: "7",
    studentId: "8",
    date: "2024-03-14",
    present: true,
    mealReceived: true,
    remarks: "",
  },
];

const initialUsers: User[] = [
  {
    id: "1",
    username: "admin",
    fullName: "Admin User",
    role: "Administrator",
    email: "admin@feed.local",
    isActive: true,
  },
  {
    id: "2",
    username: "encoder",
    fullName: "Encoder User",
    role: "Encoder",
    email: "encoder@feed.local",
    isActive: true,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [measurements, setMeasurements] = useState<Measurement[]>(initialMeasurements);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>(initialAttendance);
  const [users] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addStudent = (student: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const addMeasurement = (measurement: Omit<Measurement, "id">) => {
    const newMeasurement: Measurement = {
      ...measurement,
      id: Date.now().toString(),
    };
    setMeasurements((prev) => [...prev, newMeasurement]);
  };

  const getMeasurementsByStudent = (studentId: string) => {
    return measurements.filter((m) => m.studentId === studentId);
  };

  const addAttendance = (attendance: Omit<Attendance, "id">) => {
    const newAttendance: Attendance = {
      ...attendance,
      id: Date.now().toString(),
    };
    setAttendanceRecords((prev) => [...prev, newAttendance]);
  };

  const getAttendanceByDate = (date: string) => {
    return attendanceRecords.filter((a) => a.date === date);
  };

  const login = (username: string, password: string) => {
    // Mock authentication
    if (username === "admin" && password === "admin123") {
      setCurrentUser(users[0]);
      return true;
    } else if (username === "encoder" && password === "encoder123") {
      setCurrentUser(users[1]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        measurements,
        addMeasurement,
        getMeasurementsByStudent,
        attendanceRecords,
        addAttendance,
        getAttendanceByDate,
        users,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}