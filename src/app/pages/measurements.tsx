import { useState, useMemo } from "react";
import { Search, Plus, Filter, X, TrendingUp, TrendingDown, AlertCircle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Modal } from "../components/ui/modal";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useApp, Measurement } from "../context/app-context";
import { motion, AnimatePresence } from "motion/react";

export function MeasurementsPage() {
  const { students, measurements, addMeasurement, currentUser } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [measurementTypeFilter, setMeasurementTypeFilter] = useState("");
  const [nutritionalStatusFilter, setNutritionalStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    measurementType: "Baseline" as "Baseline" | "Monthly" | "Endline",
    date: new Date().toISOString().split('T')[0],
    weight: "",
    height: "",
    remarks: "",
  });

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const getNutritionalStatus = (bmi: number, age: number): Measurement["nutritionalStatus"] => {
    // Simplified BMI-for-age classification (this should be based on WHO charts in production)
    if (bmi < 13.5) return "Severely Underweight";
    if (bmi < 15.5) return "Underweight";
    if (bmi < 18.5) return "Normal";
    if (bmi < 23) return "Overweight";
    return "Obese";
  };

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const filteredMeasurements = useMemo(() => {
    return measurements.filter(measurement => {
      const matchesSearch = measurement.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !measurementTypeFilter || measurement.measurementType === measurementTypeFilter;
      const matchesStatus = !nutritionalStatusFilter || measurement.nutritionalStatus === nutritionalStatusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [measurements, searchTerm, measurementTypeFilter, nutritionalStatusFilter]);

  const handleSaveMeasurement = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentId || !formData.weight || !formData.height) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const student = students.find(s => s.id === formData.studentId);
    if (!student) {
      toast.error("Student not found.");
      return;
    }

    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (weight <= 0 || height <= 0) {
      toast.error("Weight and height must be positive numbers.");
      return;
    }

    const bmi = calculateBMI(weight, height);
    const age = getAge(student.dateOfBirth);
    const nutritionalStatus = getNutritionalStatus(bmi, age);

    const newMeasurement: Omit<Measurement, "id"> = {
      studentId: formData.studentId,
      studentName: student.fullName,
      measurementType: formData.measurementType,
      date: formData.date,
      weight,
      height,
      bmi: parseFloat(bmi.toFixed(2)),
      nutritionalStatus,
      measuredBy: currentUser?.fullName || "Unknown",
      remarks: formData.remarks,
    };

    addMeasurement(newMeasurement);
    toast.success(`Measurement recorded successfully! Status: ${nutritionalStatus}`);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      measurementType: "Baseline",
      date: new Date().toISOString().split('T')[0],
      weight: "",
      height: "",
      remarks: "",
    });
  };

  const getStatusColor = (status: string) => {
    if (status.includes("Underweight")) return "text-red-600 bg-red-50 border-red-200";
    if (status === "Normal") return "text-green-600 bg-green-50 border-green-200";
    if (status === "Overweight") return "text-amber-600 bg-amber-50 border-amber-200";
    if (status === "Obese") return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getStatusIcon = (status: string) => {
    if (status.includes("Underweight")) return <TrendingDown className="w-4 h-4" />;
    if (status === "Normal") return null;
    if (status === "Overweight" || status === "Obese") return <TrendingUp className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl text-gray-900 mb-1">Anthropometric Measurements</h1>
          <p className="text-muted-foreground">Record and track student measurements</p>
        </div>
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
            onClick={() => setShowAddModal(true)}
            className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
          >
            <Plus className="w-4 h-4" />
            Add Measurement
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Measurements</p>
            <p className="text-3xl text-gray-900">{measurements.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Baseline</p>
            <p className="text-3xl text-gray-900">
              {measurements.filter(m => m.measurementType === "Baseline").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Monthly</p>
            <p className="text-3xl text-gray-900">
              {measurements.filter(m => m.measurementType === "Monthly").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Endline</p>
            <p className="text-3xl text-gray-900">
              {measurements.filter(m => m.measurementType === "Endline").length}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-hidden"
                  >
                    <div>
                      <Label htmlFor="type-filter">Measurement Type</Label>
                      <Select
                        id="type-filter"
                        value={measurementTypeFilter}
                        onChange={(e) => setMeasurementTypeFilter(e.target.value)}
                      >
                        <option value="">All Types</option>
                        <option value="Baseline">Baseline</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Endline">Endline</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status-filter">Nutritional Status</Label>
                      <Select
                        id="status-filter"
                        value={nutritionalStatusFilter}
                        onChange={(e) => setNutritionalStatusFilter(e.target.value)}
                      >
                        <option value="">All Statuses</option>
                        <option value="Severely Underweight">Severely Underweight</option>
                        <option value="Underweight">Underweight</option>
                        <option value="Normal">Normal</option>
                        <option value="Overweight">Overweight</option>
                        <option value="Obese">Obese</option>
                      </Select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <p>Showing {filteredMeasurements.length} of {measurements.length} measurements</p>
        {(searchTerm || measurementTypeFilter || nutritionalStatusFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setMeasurementTypeFilter("");
              setNutritionalStatusFilter("");
            }}
            className="gap-1"
          >
            <X className="w-3 h-3" />
            Clear Filters
          </Button>
        )}
      </motion.div>

      {/* Measurements Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Weight (kg)</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Height (cm)</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">BMI</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Measured By</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredMeasurements.map((measurement, index) => (
                      <motion.tr
                        key={measurement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 text-sm">
                          {new Date(measurement.date).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm font-medium">{measurement.studentName}</td>
                        <td className="p-4">
                          <Badge variant="outline">{measurement.measurementType}</Badge>
                        </td>
                        <td className="p-4 text-sm font-mono">{measurement.weight.toFixed(1)}</td>
                        <td className="p-4 text-sm font-mono">{measurement.height.toFixed(1)}</td>
                        <td className="p-4 text-sm font-mono">{measurement.bmi.toFixed(2)}</td>
                        <td className="p-4">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(measurement.nutritionalStatus)}`}>
                            {getStatusIcon(measurement.nutritionalStatus)}
                            {measurement.nutritionalStatus}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{measurement.measuredBy}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {filteredMeasurements.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No measurements found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || measurementTypeFilter || nutritionalStatusFilter
                      ? "Try adjusting your filters"
                      : "Add your first measurement to get started"}
                  </p>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Measurement Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Record New Measurement"
      >
        <form onSubmit={handleSaveMeasurement} className="space-y-4">
          <div>
            <Label htmlFor="student" required>
              Select Student
            </Label>
            <Select
              id="student"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            >
              <option value="">Choose a student...</option>
              {students
                .filter(s => s.beneficiary)
                .map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName} - {student.grade} {student.section}
                  </option>
                ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="measurementType" required>
                Measurement Type
              </Label>
              <Select
                id="measurementType"
                value={formData.measurementType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    measurementType: e.target.value as "Baseline" | "Monthly" | "Endline",
                  })
                }
              >
                <option value="Baseline">Baseline</option>
                <option value="Monthly">Monthly</option>
                <option value="Endline">Endline</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="date" required>
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight" required>
                Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="18.5"
              />
            </div>
            <div>
              <Label htmlFor="height" required>
                Height (cm)
              </Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                min="0"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="110.0"
              />
            </div>
          </div>

          {formData.weight && formData.height && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-sm text-blue-900">
                <strong>Calculated BMI:</strong>{" "}
                {calculateBMI(parseFloat(formData.weight), parseFloat(formData.height)).toFixed(2)}
              </p>
            </motion.div>
          )}

          <div>
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Input
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Additional notes"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Save Measurement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
