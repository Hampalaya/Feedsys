import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { studentsAPI, measurementsAPI, attendanceAPI } from "../../lib/api";

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
  addStudent: (student: Omit<Student, "id" | "createdAt">) => Promise<void>;
  updateStudent: (id: string, student: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  loading: boolean;

  measurements: Measurement[];
  addMeasurement: (measurement: Omit<Measurement, "id">) => void;
  getMeasurementsByStudent: (studentId: string) => Measurement[];

  attendanceRecords: Attendance[];
  addAttendance: (attendance: Omit<Attendance, "id">) => void;
  getAttendanceByDate: (date: string) => Attendance[];

  users: User[];
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const initialStudents: Student[] = [
  {
    id: "1",
    studentId: "STU001",
    lrn: "123456789012",
    fullName: "Juan Dela Cruz",
    grade: "Grade 1",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2017-05-15",
    guardian: "Maria Dela Cruz",
    contactNumber: "09171234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Allergic to peanuts",
    remarks: "",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    studentId: "STU002",
    lrn: "123456789013",
    fullName: "Maria Santos",
    grade: "Grade 2",
    section: "Section B",
    sex: "Female",
    dateOfBirth: "2016-08-22",
    guardian: "Pedro Santos",
    contactNumber: "09181234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "",
    createdAt: "2024-01-16T08:00:00Z",
  },
  {
    id: "3",
    studentId: "STU003",
    lrn: "123456789014",
    fullName: "Pedro Reyes",
    grade: "Grade 1",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2017-03-10",
    guardian: "Anna Reyes",
    contactNumber: "09191234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "",
    createdAt: "2024-01-17T08:00:00Z",
  },
  {
    id: "4",
    studentId: "STU004",
    lrn: "123456789015",
    fullName: "Anna Lopez",
    grade: "Grade 3",
    section: "Section C",
    sex: "Female",
    dateOfBirth: "2015-11-30",
    guardian: "Jose Lopez",
    contactNumber: "09201234567",
    beneficiary: false,
    hasAllergy: true,
    allergyNotes: "Lactose intolerant",
    remarks: "",
    createdAt: "2024-01-18T08:00:00Z",
  },
  {
    id: "5",
    studentId: "STU005",
    lrn: "123456789016",
    fullName: "Carlos Garcia",
    grade: "Grade 2",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2016-06-12",
    guardian: "Rosa Garcia",
    contactNumber: "09211234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "",
    createdAt: "2024-01-19T08:00:00Z",
  },
  {
    id: "6",
    studentId: "STU006",
    lrn: "123456789017",
    fullName: "Sofia Martinez",
    grade: "Grade 1",
    section: "Section B",
    sex: "Female",
    dateOfBirth: "2017-09-05",
    guardian: "Luis Martinez",
    contactNumber: "09221234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "",
    createdAt: "2024-01-20T08:00:00Z",
  },
  {
    id: "7",
    studentId: "STU007",
    lrn: "123456789018",
    fullName: "Diego Fernandez",
    grade: "Grade 3",
    section: "Section A",
    sex: "Male",
    dateOfBirth: "2015-04-18",
    guardian: "Carmen Fernandez",
    contactNumber: "09231234567",
    beneficiary: true,
    hasAllergy: true,
    allergyNotes: "Allergic to seafood",
    remarks: "",
    createdAt: "2024-01-21T08:00:00Z",
  },
  {
    id: "8",
    studentId: "STU008",
    lrn: "123456789019",
    fullName: "Isabella Cruz",
    grade: "Grade 2",
    section: "Section C",
    sex: "Female",
    dateOfBirth: "2016-12-25",
    guardian: "Roberto Cruz",
    contactNumber: "09241234567",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "",
    createdAt: "2024-01-22T08:00:00Z",
  },
];

const initialMeasurements: Measurement[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Juan Dela Cruz",
    measurementType: "Baseline",
    date: "2024-01-20",
    weight: 18.5,
    height: 110,
    bmi: 15.3,
    nutritionalStatus: "Underweight",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Maria Santos",
    measurementType: "Baseline",
    date: "2024-01-20",
    weight: 22.0,
    height: 120,
    bmi: 15.3,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Pedro Reyes",
    measurementType: "Baseline",
    date: "2024-01-20",
    weight: 17.8,
    height: 108,
    bmi: 15.3,
    nutritionalStatus: "Underweight",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "4",
    studentId: "5",
    studentName: "Carlos Garcia",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 21.5,
    height: 118,
    bmi: 15.4,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "5",
    studentId: "6",
    studentName: "Sofia Martinez",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 19.2,
    height: 112,
    bmi: 15.3,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "6",
    studentId: "7",
    studentName: "Diego Fernandez",
    measurementType: "Baseline",
    date: "2024-01-21",
    weight: 26.5,
    height: 128,
    bmi: 16.2,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "7",
    studentId: "8",
    studentName: "Isabella Cruz",
    measurementType: "Baseline",
    date: "2024-01-22",
    weight: 23.0,
    height: 122,
    bmi: 15.5,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "8",
    studentId: "1",
    studentName: "Juan Dela Cruz",
    measurementType: "Monthly",
    date: "2024-02-20",
    weight: 19.2,
    height: 111,
    bmi: 15.6,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "Showing improvement",
  },
  {
    id: "9",
    studentId: "2",
    studentName: "Maria Santos",
    measurementType: "Monthly",
    date: "2024-02-20",
    weight: 22.5,
    height: 121,
    bmi: 15.4,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "",
  },
  {
    id: "10",
    studentId: "3",
    studentName: "Pedro Reyes",
    measurementType: "Monthly",
    date: "2024-02-20",
    weight: 18.5,
    height: 109,
    bmi: 15.6,
    nutritionalStatus: "Normal",
    measuredBy: "Admin User",
    remarks: "Improved from underweight",
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
  const [students, setStudents] = useState<Student[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [users] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentsData, measurementsData, attendanceData] = await Promise.all([
          studentsAPI.getAll(),
          measurementsAPI.getAll(),
          attendanceAPI.getAll()
        ]);

        // Transform API data to match frontend types
        const transformedStudents: Student[] = studentsData.map((s: any) => ({
          id: s.id.toString(),
          studentId: s.student_id,
          lrn: s.lrn,
          fullName: s.full_name,
          grade: s.grade,
          section: s.section,
          sex: s.sex,
          dateOfBirth: s.date_of_birth,
          guardian: s.guardian,
          contactNumber: s.contact_number,
          beneficiary: Boolean(s.beneficiary),
          hasAllergy: Boolean(s.has_allergy),
          allergyNotes: s.allergy_notes || "",
          remarks: s.remarks || "",
          createdAt: s.created_at,
        }));

        const transformedMeasurements: Measurement[] = measurementsData.map((m: any) => ({
          id: m.id.toString(),
          studentId: m.student_id.toString(),
          studentName: m.student_name,
          measurementType: m.measurement_type,
          date: m.date,
          weight: parseFloat(m.weight),
          height: parseFloat(m.height),
          bmi: parseFloat(m.bmi),
          nutritionalStatus: m.nutritional_status,
          measuredBy: m.measured_by,
          remarks: m.remarks || "",
        }));

        const transformedAttendance: Attendance[] = attendanceData.map((a: any) => ({
          id: a.id.toString(),
          studentId: a.student_id.toString(),
          date: a.date,
          present: Boolean(a.present),
          mealReceived: Boolean(a.meal_received),
          remarks: a.remarks || "",
        }));

        setStudents(transformedStudents);
        setMeasurements(transformedMeasurements);
        setAttendanceRecords(transformedAttendance);
      } catch (error) {
        console.error('Failed to fetch data from API:', error);
        // Fallback to mock data if API fails
        setStudents(initialStudents);
        setMeasurements(initialMeasurements);
        setAttendanceRecords(initialAttendance);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addStudent = async (student: Omit<Student, "id" | "createdAt">) => {
    try {
      // Transform to API format
      const apiData = {
        student_id: student.studentId,
        lrn: student.lrn,
        full_name: student.fullName,
        grade: student.grade,
        section: student.section,
        sex: student.sex,
        date_of_birth: student.dateOfBirth,
        guardian: student.guardian,
        contact_number: student.contactNumber,
        beneficiary: student.beneficiary,
        has_allergy: student.hasAllergy,
        allergy_notes: student.allergyNotes,
        remarks: student.remarks,
      };

      const result = await studentsAPI.create(apiData);

      // Add to local state with the returned ID
      const newStudent: Student = {
        ...student,
        id: result.id.toString(),
        createdAt: new Date().toISOString(),
      };
      setStudents((prev) => [...prev, newStudent]);
    } catch (error) {
      console.error('Failed to add student:', error);
      throw error;
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    try {
      // Transform to API format
      const apiData: any = {};
      if (updates.studentId !== undefined) apiData.student_id = updates.studentId;
      if (updates.lrn !== undefined) apiData.lrn = updates.lrn;
      if (updates.fullName !== undefined) apiData.full_name = updates.fullName;
      if (updates.grade !== undefined) apiData.grade = updates.grade;
      if (updates.section !== undefined) apiData.section = updates.section;
      if (updates.sex !== undefined) apiData.sex = updates.sex;
      if (updates.dateOfBirth !== undefined) apiData.date_of_birth = updates.dateOfBirth;
      if (updates.guardian !== undefined) apiData.guardian = updates.guardian;
      if (updates.contactNumber !== undefined) apiData.contact_number = updates.contactNumber;
      if (updates.beneficiary !== undefined) apiData.beneficiary = updates.beneficiary;
      if (updates.hasAllergy !== undefined) apiData.has_allergy = updates.hasAllergy;
      if (updates.allergyNotes !== undefined) apiData.allergy_notes = updates.allergyNotes;
      if (updates.remarks !== undefined) apiData.remarks = updates.remarks;

      await studentsAPI.update(id, apiData);

      // Update local state
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, ...updates } : student
        )
      );
    } catch (error) {
      console.error('Failed to update student:', error);
      throw error;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await studentsAPI.delete(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Failed to delete student:', error);
      throw error;
    }
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

  const login = async (username: string, password: string) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      if (data.success && data.user) {
        const apiUser: User = {
          id: data.user.id.toString(),
          username: data.user.username,
          fullName: data.user.full_name,
          role: data.user.role,
          email: data.user.email,
          isActive: true,
        };
        setCurrentUser(apiUser);
        return true;
      }
      
      // Fallback to mock authentication if API fails
      if (username === "admin" && password === "admin123") {
        setCurrentUser(users[0]);
        return true;
      } else if (username === "encoder" && password === "encoder123") {
        setCurrentUser(users[1]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock authentication
      if (username === "admin" && password === "admin123") {
        setCurrentUser(users[0]);
        return true;
      } else if (username === "encoder" && password === "encoder123") {
        setCurrentUser(users[1]);
        return true;
      }
      return false;
    }
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
        loading,
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