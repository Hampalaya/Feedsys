import { useState, useMemo } from "react";
import { Calendar, CheckCircle, XCircle, Save, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useApp } from "../context/app-context";
import { motion } from "motion/react";

export function FeedingMonitoringPage() {
  const { students, attendanceRecords, addAttendance } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, { present: boolean; mealReceived: boolean; remarks: string }>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const beneficiaries = useMemo(() => {
    return students.filter(s => s.beneficiary);
  }, [students]);

  // Initialize attendance from existing records
  useMemo(() => {
    const existingAttendance = attendanceRecords.filter(a => a.date === selectedDate);
    const newAttendance: typeof attendance = {};
    
    beneficiaries.forEach(student => {
      const existing = existingAttendance.find(a => a.studentId === student.id);
      newAttendance[student.id] = existing
        ? { present: existing.present, mealReceived: existing.mealReceived, remarks: existing.remarks }
        : { present: true, mealReceived: true, remarks: "" };
    });
    
    setAttendance(newAttendance);
    setHasChanges(false);
  }, [selectedDate, beneficiaries, attendanceRecords]);

  const handleTogglePresent = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        present: !prev[studentId]?.present,
        mealReceived: !prev[studentId]?.present ? false : prev[studentId]?.mealReceived,
      },
    }));
    setHasChanges(true);
  };

  const handleToggleMeal = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        mealReceived: !prev[studentId]?.mealReceived,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    let savedCount = 0;
    beneficiaries.forEach(student => {
      const record = attendance[student.id];
      if (record) {
        addAttendance({
          studentId: student.id,
          date: selectedDate,
          present: record.present,
          mealReceived: record.mealReceived,
          remarks: record.remarks,
        });
        savedCount++;
      }
    });
    
    toast.success(`Attendance saved for ${savedCount} students!`);
    setHasChanges(false);
  };

  const stats = useMemo(() => {
    const present = Object.values(attendance).filter(a => a.present).length;
    const mealsServed = Object.values(attendance).filter(a => a.mealReceived).length;
    const total = beneficiaries.length;
    
    return {
      present,
      absent: total - present,
      mealsServed,
      attendanceRate: total > 0 ? ((present / total) * 100).toFixed(1) : 0,
    };
  }, [attendance, beneficiaries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <p className="text-muted-foreground">Track daily attendance and meal distribution</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => toast.info("Export feature coming soon!")}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            <Save className="w-4 h-4" />
            Save Attendance
          </Button>
        </div>
      </motion.div>

      {/* Date Selection and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Present</p>
              <p className="text-3xl text-gray-900">{stats.present}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Absent</p>
              <p className="text-3xl text-gray-900">{stats.absent}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Meals Served</p>
              <p className="text-3xl text-gray-900">{stats.mealsServed}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
              <p className="text-3xl text-gray-900">{stats.attendanceRate}%</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attendance Sheet - {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</CardTitle>
              {hasChanges && (
                <span className="text-sm text-amber-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
                  Unsaved changes
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student ID</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Full Name</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Grade/Section</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Present</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Meal Received</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {beneficiaries.map((student, index) => {
                    const record = attendance[student.id] || { present: true, mealReceived: true, remarks: "" };
                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${
                          !record.present ? 'bg-red-50/50' : ''
                        }`}
                      >
                        <td className="p-4 text-sm">{student.studentId}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-medium">
                              {student.fullName.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{student.fullName}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{student.grade} / {student.section}</td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleTogglePresent(student.id)}
                              className={`p-2 rounded-lg transition-all ${
                                record.present
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                            >
                              {record.present ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <XCircle className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleMeal(student.id)}
                              disabled={!record.present}
                              className={`p-2 rounded-lg transition-all ${
                                !record.present
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : record.mealReceived
                                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                              }`}
                            >
                              {record.mealReceived ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <XCircle className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <Input
                            value={record.remarks}
                            onChange={(e) => {
                              setAttendance(prev => ({
                                ...prev,
                                [student.id]: {
                                  ...prev[student.id],
                                  remarks: e.target.value,
                                },
                              }));
                              setHasChanges(true);
                            }}
                            placeholder="Add note..."
                            className="text-sm"
                            disabled={!record.present}
                          />
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>

              {beneficiaries.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No beneficiaries found</p>
                  <p className="text-sm text-muted-foreground mt-1">Add students first to track attendance</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
