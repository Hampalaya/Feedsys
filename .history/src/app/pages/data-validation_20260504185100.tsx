import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useApp } from "../context/app-context";
import { motion } from "motion/react";

export function DataValidationPage() {
  const { students, measurements } = useApp();
  const [isValidating, setIsValidating] = useState(false);

  const validationResults = useMemo(() => {
    const issues = [];

    // Check for students without measurements
    students.forEach(student => {
      if (student.beneficiary) {
        const studentMeasurements = measurements.filter(m => m.studentId === student.id);
        if (studentMeasurements.length === 0) {
          issues.push({
            type: "missing-measurement",
            severity: "high",
            student: student.fullName,
            message: "No measurements recorded",
          });
        }
      }
    });

    // Check for incomplete student profiles
    students.forEach(student => {
      if (!student.dateOfBirth) {
        issues.push({
          type: "incomplete-profile",
          severity: "medium",
          student: student.fullName,
          message: "Missing date of birth",
        });
      }
      if (!student.guardian) {
        issues.push({
          type: "incomplete-profile",
          severity: "low",
          student: student.fullName,
          message: "Missing guardian information",
        });
      }
    });

    // Check for duplicate LRNs
    const lrns = new Map();
    students.forEach(student => {
      if (student.lrn) {
        if (lrns.has(student.lrn)) {
          issues.push({
            type: "duplicate-lrn",
            severity: "high",
            student: student.fullName,
            message: `Duplicate LRN with ${lrns.get(student.lrn)}`,
          });
        } else {
          lrns.set(student.lrn, student.fullName);
        }
      }
    });

    return issues;
  }, [students, measurements]);

  const stats = useMemo(() => {
    const high = validationResults.filter(r => r.severity === "high").length;
    const medium = validationResults.filter(r => r.severity === "medium").length;
    const low = validationResults.filter(r => r.severity === "low").length;
    
    return { high, medium, low, total: validationResults.length };
  }, [validationResults]);

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      toast.success("Data validation complete!");
    }, 1500);
  };

  const getSeverityColor = (severity: string) => {
    if (severity === "high") return "text-red-600 bg-red-50 border-red-200";
    if (severity === "medium") return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-blue-600 bg-blue-50 border-blue-200";
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "high") return <XCircle className="w-4 h-4" />;
    if (severity === "medium") return <AlertTriangle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <p className="text-muted-foreground">Identify and resolve data quality issues</p>
        <Button
          onClick={handleValidate}
          disabled={isValidating}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          <RefreshCw className={`w-4 h-4 ${isValidating ? 'animate-spin' : ''}`} />
          {isValidating ? "Validating..." : "Run Validation"}
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
              <p className="text-sm text-muted-foreground mb-1">Total Issues</p>
              <p className="text-3xl text-gray-900">{stats.total}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">High Priority</p>
              <p className="text-3xl text-gray-900">{stats.high}</p>
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
              <p className="text-sm text-muted-foreground mb-1">Medium Priority</p>
              <p className="text-3xl text-gray-900">{stats.medium}</p>
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
              <p className="text-sm text-muted-foreground mb-1">Low Priority</p>
              <p className="text-3xl text-gray-900">{stats.low}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Validation Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Validation Results</CardTitle>
          </CardHeader>
          <CardContent>
            {validationResults.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                <p className="text-lg text-gray-900 mb-1">All Clear!</p>
                <p className="text-muted-foreground">No data quality issues found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {validationResults.map((issue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className={`p-4 border rounded-lg ${getSeverityColor(issue.severity)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{issue.student}</p>
                          <Badge variant="outline" className="text-xs">
                            {issue.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm">{issue.message}</p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Resolve
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
