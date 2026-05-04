import { useState } from "react";
import { FileText, Download, Calendar, FileBarChart, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { useApp } from "../context/app-context";
import { motion } from "motion/react";

export function ReportsPage() {
  const { students, measurements, attendanceRecords } = useApp();
  const [reportType, setReportType] = useState("nutritional-summary");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [gradeFilter, setGradeFilter] = useState("");

  const reportTypes = [
    { value: "nutritional-summary", label: "Nutritional Status Summary" },
    { value: "attendance-report", label: "Feeding Attendance Report" },
    { value: "beneficiary-list", label: "Beneficiary Master List" },
    { value: "measurement-report", label: "Anthropometric Measurements" },
    { value: "progress-report", label: "Progress Report (Baseline vs Endline)" },
    { value: "monthly-summary", label: "Monthly Summary Report" },
  ];

  const handleGenerateReport = () => {
    if (!reportType) {
      toast.error("Please select a report type");
      return;
    }
    
    toast.success(`Generating ${reportTypes.find(r => r.value === reportType)?.label}...`);
    
    // Simulate report generation
    setTimeout(() => {
      toast.success("Report generated successfully!");
    }, 1500);
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
  };

  const stats = {
    totalStudents: students.length,
    totalBeneficiaries: students.filter(s => s.beneficiary).length,
    totalMeasurements: measurements.length,
    totalAttendance: attendanceRecords.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-muted-foreground">Generate and export program reports</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Students</p>
              <p className="text-3xl text-gray-900">{stats.totalStudents}</p>
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
              <p className="text-sm text-muted-foreground mb-1">Beneficiaries</p>
              <p className="text-3xl text-gray-900">{stats.totalBeneficiaries}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Measurements</p>
              <p className="text-3xl text-gray-900">{stats.totalMeasurements}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Attendance Records</p>
              <p className="text-3xl text-gray-900">{stats.totalAttendance}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Report Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="w-5 h-5" />
              Generate Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select
                id="report-type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="grade">Filter by Grade (Optional)</Label>
                <Select
                  id="grade"
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                >
                  <option value="">All Grades</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleGenerateReport}
                className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <FileText className="w-4 h-4" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("pdf")}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export as PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport("excel")}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export as Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((type, index) => (
                <motion.div
                  key={type.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer"
                  onClick={() => setReportType(type.value)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {type.value === "nutritional-summary" && "Overview of current nutritional status distribution"}
                        {type.value === "attendance-report" && "Daily feeding attendance and meal distribution"}
                        {type.value === "beneficiary-list" && "Complete list of program beneficiaries"}
                        {type.value === "measurement-report" && "All anthropometric measurements recorded"}
                        {type.value === "progress-report" && "Comparison between baseline and endline data"}
                        {type.value === "monthly-summary" && "Monthly feeding program summary"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
