import { useState, useMemo } from "react";
import { Search, Filter, Plus, Edit, Trash2, AlertTriangle, X, UserPlus, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Modal } from "../components/ui/modal";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useApp, Student } from "../context/app-context";
import { motion, AnimatePresence } from "motion/react";

export function StudentProfilesPage() {
  const { students, addStudent, updateStudent, deleteStudent, loading } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [beneficiaryFilter, setBeneficiaryFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [formData, setFormData] = useState({
    studentId: "",
    lrn: "",
    fullName: "",
    grade: "",
    section: "",
    sex: "Male" as "Male" | "Female",
    dateOfBirth: "",
    guardian: "",
    contactNumber: "",
    beneficiary: true,
    hasAllergy: false,
    allergyNotes: "",
    remarks: "",
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.lrn.includes(searchTerm);
      const matchesGrade = !gradeFilter || student.grade === gradeFilter;
      const matchesSection = !sectionFilter || student.section === sectionFilter;
      const matchesBeneficiary = !beneficiaryFilter || 
                                (beneficiaryFilter === "Yes" && student.beneficiary) ||
                                (beneficiaryFilter === "No" && !student.beneficiary);
      
      return matchesSearch && matchesGrade && matchesSection && matchesBeneficiary;
    });
  }, [students, searchTerm, gradeFilter, sectionFilter, beneficiaryFilter]);

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.grade || !formData.section || !formData.sex) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (showEditModal && selectedStudent) {
        await updateStudent(selectedStudent.id, formData);
        toast.success("Student profile updated successfully!");
        setShowEditModal(false);
      } else {
        await addStudent(formData);
        toast.success("Student profile added successfully!");
        setShowAddModal(false);
      }

      resetForm();
    } catch (error) {
      toast.error("Failed to save student. Please try again.");
      console.error(error);
    }
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      studentId: student.studentId,
      lrn: student.lrn,
      fullName: student.fullName,
      grade: student.grade,
      section: student.section,
      sex: student.sex,
      dateOfBirth: student.dateOfBirth,
      guardian: student.guardian,
      contactNumber: student.contactNumber,
      beneficiary: student.beneficiary,
      hasAllergy: student.hasAllergy,
      allergyNotes: student.allergyNotes,
      remarks: student.remarks,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedStudent) {
      try {
        await deleteStudent(selectedStudent.id);
        toast.success("Student deleted successfully");
        setShowDeleteModal(false);
        setSelectedStudent(null);
      } catch (error) {
        toast.error("Failed to delete student. Please try again.");
        console.error(error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      studentId: "",
      lrn: "",
      fullName: "",
      grade: "",
      section: "",
      sex: "Male",
      dateOfBirth: "",
      guardian: "",
      contactNumber: "",
      beneficiary: true,
      hasAllergy: false,
      allergyNotes: "",
      remarks: "",
    });
    setSelectedStudent(null);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    resetForm();
  };

  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
  const sections = ["Section A", "Section B", "Section C", "Section D"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <p className="text-muted-foreground">Manage student information and beneficiary status</p>
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
            Add Student
          </Button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, Student ID, or LRN..."
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
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-hidden"
                  >
                    <div>
                      <Label htmlFor="grade-filter">Grade Level</Label>
                      <Select
                        id="grade-filter"
                        value={gradeFilter}
                        onChange={(e) => setGradeFilter(e.target.value)}
                      >
                        <option value="">All Grades</option>
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="section-filter">Section</Label>
                      <Select
                        id="section-filter"
                        value={sectionFilter}
                        onChange={(e) => setSectionFilter(e.target.value)}
                      >
                        <option value="">All Sections</option>
                        {sections.map(section => (
                          <option key={section} value={section}>{section}</option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="beneficiary-filter">Beneficiary Status</Label>
                      <Select
                        id="beneficiary-filter"
                        value={beneficiaryFilter}
                        onChange={(e) => setBeneficiaryFilter(e.target.value)}
                      >
                        <option value="">All Students</option>
                        <option value="Yes">Beneficiaries Only</option>
                        <option value="No">Non-Beneficiaries</option>
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
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between text-sm text-muted-foreground"
      >
        <p>Showing {filteredStudents.length} of {students.length} students</p>
        {(searchTerm || gradeFilter || sectionFilter || beneficiaryFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setGradeFilter("");
              setSectionFilter("");
              setBeneficiaryFilter("");
            }}
            className="gap-1"
          >
            <X className="w-3 h-3" />
            Clear Filters
          </Button>
        )}
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-3"></div>
                <p className="text-muted-foreground">Loading students...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student ID</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">LRN</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Full Name</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Grade/Section</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Sex</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {filteredStudents.map((student, index) => (
                        <motion.tr
                          key={student.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                        >
                          <td className="p-4 text-sm">{student.studentId}</td>
                          <td className="p-4 text-sm font-mono">{student.lrn}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-medium">
                                {student.fullName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                                {student.hasAllergy && (
                                  <p className="text-xs text-amber-600 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    Has allergies
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm">{student.grade} / {student.section}</td>
                          <td className="p-4 text-sm">{student.sex}</td>
                          <td className="p-4">
                            <Badge variant={student.beneficiary ? "default" : "secondary"}>
                              {student.beneficiary ? "Beneficiary" : "Non-Beneficiary"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditStudent(student)}
                                className="gap-1"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteClick(student)}
                                className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {filteredStudents.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No students found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchTerm || gradeFilter || sectionFilter ? "Try adjusting your filters" : "Add your first student to get started"}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Student Modal */}
      <Modal
        isOpen={showAddModal || showEditModal}
        onClose={handleCloseModal}
        title={showEditModal ? "Edit Student Profile" : "Add New Student"}
      >
        <form onSubmit={handleSaveStudent} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentId" required>Student ID</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="STU001"
              />
            </div>
            <div>
              <Label htmlFor="lrn" required>LRN</Label>
              <Input
                id="lrn"
                value={formData.lrn}
                onChange={(e) => setFormData({ ...formData, lrn: e.target.value })}
                placeholder="123456789012"
                maxLength={12}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="fullName" required>Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Juan Dela Cruz"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="grade" required>Grade Level</Label>
              <Select
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                <option value="">Select grade</option>
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="section" required>Section</Label>
              <Select
                id="section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              >
                <option value="">Select section</option>
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sex" required>Sex</Label>
              <Select
                id="sex"
                value={formData.sex}
                onChange={(e) => setFormData({ ...formData, sex: e.target.value as "Male" | "Female" })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guardian">Parent/Guardian</Label>
              <Input
                id="guardian"
                value={formData.guardian}
                onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                placeholder="Maria Dela Cruz"
              />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="09171234567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="beneficiary">Beneficiary Status</Label>
              <Select
                id="beneficiary"
                value={formData.beneficiary ? "Yes" : "No"}
                onChange={(e) => setFormData({ ...formData, beneficiary: e.target.value === "Yes" })}
              >
                <option value="Yes">Beneficiary</option>
                <option value="No">Non-Beneficiary</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="hasAllergy">Has Food Allergies?</Label>
              <Select
                id="hasAllergy"
                value={formData.hasAllergy ? "Yes" : "No"}
                onChange={(e) => setFormData({ ...formData, hasAllergy: e.target.value === "Yes" })}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Select>
            </div>
          </div>

          {formData.hasAllergy && (
            <div>
              <Label htmlFor="allergyNotes">Allergy Details</Label>
              <Input
                id="allergyNotes"
                value={formData.allergyNotes}
                onChange={(e) => setFormData({ ...formData, allergyNotes: e.target.value })}
                placeholder="e.g., Allergic to peanuts, shellfish"
              />
            </div>
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
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              {showEditModal ? "Update Student" : "Add Student"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Student"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-900 font-medium">Are you sure you want to delete this student?</p>
              <p className="text-sm text-red-800 mt-1">
                Student: <strong>{selectedStudent?.fullName}</strong>
              </p>
              <p className="text-sm text-red-700 mt-2">
                This action cannot be undone. All measurement records and attendance data for this student will also be removed.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Student
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
