import { useState, useMemo } from "react";
import { Search, TrendingUp, TrendingDown, Minus, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Modal } from "../components/ui/modal";
import { toast } from "sonner";
import { useApp } from "../context/app-context";
import { motion, AnimatePresence } from "motion/react";

export function NutritionalStatusPage() {
  const { students, measurements } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [improvementFilter, setImprovementFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const nutritionalData = useMemo(() => {
    return students.map(student => {
      const studentMeasurements = measurements
        .filter(m => m.studentId === student.id)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      const baseline = studentMeasurements.find(m => m.measurementType === "Baseline");
      const latest = studentMeasurements[studentMeasurements.length - 1];
      
      let improvement: "improved" | "declined" | "maintained" = "maintained";
      if (baseline && latest && baseline.id !== latest.id) {
        if (latest.bmi > baseline.bmi) {
          if (baseline.nutritionalStatus.includes("Underweight")) {
            improvement = "improved";
          } else if (baseline.nutritionalStatus === "Normal") {
            improvement = "declined";
          }
        } else if (latest.bmi < baseline.bmi) {
          if (baseline.nutritionalStatus.includes("Overweight") || baseline.nutritionalStatus === "Obese") {
            improvement = "improved";
          } else if (baseline.nutritionalStatus === "Normal") {
            improvement = "declined";
          }
        }
      }
      
      return {
        id: student.id,
        studentId: student.studentId,
        name: student.fullName,
        grade: student.grade,
        section: student.section,
        baselineBMI: baseline?.bmi || 0,
        latestBMI: latest?.bmi || 0,
        baselineStatus: baseline?.nutritionalStatus || "No Data",
        latestStatus: latest?.nutritionalStatus || "No Data",
        improvement,
        measurementCount: studentMeasurements.length,
        allMeasurements: studentMeasurements,
      };
    }).filter(d => d.baselineBMI > 0);
  }, [students, measurements]);

  const filteredData = useMemo(() => {
    return nutritionalData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || item.latestStatus === statusFilter;
      const matchesImprovement = !improvementFilter || item.improvement === improvementFilter;
      
      return matchesSearch && matchesStatus && matchesImprovement;
    });
  }, [nutritionalData, searchTerm, statusFilter, improvementFilter]);

  const stats = useMemo(() => {
    const improved = nutritionalData.filter(d => d.improvement === "improved").length;
    const maintained = nutritionalData.filter(d => d.improvement === "maintained").length;
    const declined = nutritionalData.filter(d => d.improvement === "declined").length;
    
    return { improved, maintained, declined, total: nutritionalData.length };
  }, [nutritionalData]);

  const getImprovementIcon = (improvement: string) => {
    if (improvement === "improved") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (improvement === "declined") return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getImprovementColor = (improvement: string) => {
    if (improvement === "improved") return "text-green-600 bg-green-50";
    if (improvement === "declined") return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const getStatusColor = (status: string) => {
    if (status.includes("Underweight")) return "destructive";
    if (status === "Normal") return "default";
    if (status === "Overweight") return "warning";
    if (status === "Obese") return "destructive";
    return "secondary";
  };

  const selectedStudentData = nutritionalData.find(d => d.id === selectedStudent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl text-gray-900 mb-1">Nutritional Status</h1>
          <p className="text-muted-foreground">Track student nutritional progress and improvements</p>
        </div>
        <Button
          variant="outline"
          onClick={() => toast.info("Export feature coming soon!")}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Monitored</p>
              <p className="text-3xl text-gray-900">{stats.total}</p>
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Improved</p>
                  <p className="text-3xl text-gray-900">{stats.improved}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-gray-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Maintained</p>
                  <p className="text-3xl text-gray-900">{stats.maintained}</p>
                </div>
                <Minus className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Declined</p>
                  <p className="text-3xl text-gray-900">{stats.declined}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="search">Search Student</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status-filter">Current Status</Label>
                <Select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Severely Underweight">Severely Underweight</option>
                  <option value="Underweight">Underweight</option>
                  <option value="Normal">Normal</option>
                  <option value="Overweight">Overweight</option>
                  <option value="Obese">Obese</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="improvement-filter">Progress</Label>
                <Select
                  id="improvement-filter"
                  value={improvementFilter}
                  onChange={(e) => setImprovementFilter(e.target.value)}
                >
                  <option value="">All Progress</option>
                  <option value="improved">Improved</option>
                  <option value="maintained">Maintained</option>
                  <option value="declined">Declined</option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Nutritional Status Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Grade/Section</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Baseline BMI</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Latest BMI</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Baseline Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Current Status</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Progress</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredData.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-medium">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.studentId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{item.grade} / {item.section}</td>
                        <td className="p-4 text-center font-mono text-sm">{item.baselineBMI.toFixed(2)}</td>
                        <td className="p-4 text-center font-mono text-sm font-medium">{item.latestBMI.toFixed(2)}</td>
                        <td className="p-4">
                          <Badge variant={getStatusColor(item.baselineStatus)} className="text-xs">
                            {item.baselineStatus}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={getStatusColor(item.latestStatus)} className="text-xs">
                            {item.latestStatus}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getImprovementColor(item.improvement)}`}>
                            {getImprovementIcon(item.improvement)}
                            <span className="capitalize">{item.improvement}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedStudent(item.id);
                                setShowDetailsModal(true);
                              }}
                              className="gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No students found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || statusFilter || improvementFilter
                      ? "Try adjusting your filters"
                      : "Add measurements to track nutritional status"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedStudent(null);
        }}
        title="Measurement History"
      >
        {selectedStudentData && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg font-medium">
                {selectedStudentData.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedStudentData.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedStudentData.grade} / {selectedStudentData.section}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedStudentData.allMeasurements.map((measurement, index) => (
                <div key={measurement.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{measurement.measurementType}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(measurement.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Weight</p>
                      <p className="font-medium">{measurement.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Height</p>
                      <p className="font-medium">{measurement.height} cm</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">BMI</p>
                      <p className="font-medium font-mono">{measurement.bmi.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge variant={getStatusColor(measurement.nutritionalStatus)}>
                      {measurement.nutritionalStatus}
                    </Badge>
                  </div>
                  {measurement.remarks && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      {measurement.remarks}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedStudent(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
