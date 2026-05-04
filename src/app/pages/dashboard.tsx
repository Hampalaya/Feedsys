import { Users, TrendingUp, TrendingDown, Activity, Plus, FileBarChart, Calendar, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Link } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { useApp } from "../context/app-context";
import { motion } from "motion/react";

export function DashboardPage() {
  const { students, measurements } = useApp();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Suppress Recharts internal key warnings
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Encountered two children with the same key') ||
         args[0].includes('Non-unique keys may cause children to be duplicated'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    // Delay chart rendering to ensure containers have proper dimensions
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      console.error = originalError;
    };
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalBeneficiaries = students.filter(s => s.beneficiary).length;
    const totalStudents = students.length;
    
    // Count nutritional statuses from latest measurements
    const latestMeasurements = new Map<string, string>();
    measurements.forEach(m => {
      const existing = latestMeasurements.get(m.studentId);
      if (!existing || new Date(m.date) > new Date(measurements.find(x => x.id === existing)?.date || 0)) {
        latestMeasurements.set(m.studentId, m.nutritionalStatus);
      }
    });
    
    const statusCounts = {
      underweight: 0,
      normal: 0,
      overweight: 0,
      obese: 0,
    };
    
    latestMeasurements.forEach(status => {
      if (status.includes("Underweight")) statusCounts.underweight++;
      else if (status === "Normal") statusCounts.normal++;
      else if (status === "Overweight") statusCounts.overweight++;
      else if (status === "Obese") statusCounts.obese++;
    });
    
    return {
      totalBeneficiaries,
      totalStudents,
      ...statusCounts,
      attendanceRate: 94.5,
    };
  }, [students, measurements]);

  const nutritionalData = [
    { id: "normal", name: "Normal", value: stats.normal || 5, color: "#16a34a" },
    { id: "underweight", name: "Underweight", value: stats.underweight || 2, color: "#dc2626" },
    { id: "overweight", name: "Overweight", value: stats.overweight || 1, color: "#f59e0b" },
    { id: "obese", name: "Obese", value: stats.obese || 0, color: "#ea580c" },
  ];

  const comparisonData = [
    { id: "baseline", month: "Baseline", underweight: 2, normal: 5, overweight: 1 },
    { id: "month1", month: "Month 1", underweight: 1, normal: 6, overweight: 1 },
    { id: "month2", month: "Month 2", underweight: 0, normal: 7, overweight: 1 },
    { id: "current", month: "Current", underweight: stats.underweight || 0, normal: stats.normal || 7, overweight: stats.overweight || 1 },
  ];

  const trendData = [
    { id: "jan", month: "Jan", underweight: 2 },
    { id: "feb", month: "Feb", underweight: 1 },
    { id: "mar", month: "Mar", underweight: 0 },
    { id: "apr", month: "Apr", underweight: stats.underweight || 0 },
  ];

  const recentActivities = [
    { student: "Juan Dela Cruz", action: "Measurement recorded", time: "5 minutes ago", type: "measurement" },
    { student: "Maria Santos", action: "Feeding attendance marked", time: "12 minutes ago", type: "attendance" },
    { student: "Pedro Reyes", action: "Student profile updated", time: "1 hour ago", type: "profile" },
    { student: "Anna Lopez", action: "Baseline recorded", time: "2 hours ago", type: "measurement" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl text-gray-900 mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your feeding program overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Beneficiaries</p>
                  <p className="text-3xl text-gray-900">{stats.totalBeneficiaries}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Students Encoded</p>
                  <p className="text-3xl text-gray-900">{stats.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Underweight</p>
                  <p className="text-3xl text-gray-900">{stats.underweight}</p>
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    {42 - stats.underweight} improved
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Normal</p>
                  <p className="text-3xl text-gray-900">{stats.normal}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stats.normal - 130} gained
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overweight</p>
                  <p className="text-3xl text-gray-900">{stats.overweight}</p>
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    {18 - stats.overweight} improved
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Attendance Rate</p>
                  <p className="text-3xl text-gray-900">{stats.attendanceRate}%</p>
                  <p className="text-xs text-emerald-600 mt-1">This week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileBarChart className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Quick Actions
              <ArrowUpRight className="w-4 h-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link to="/students">
                <Button variant="outline" className="w-full justify-start gap-2 hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                  Add Student
                </Button>
              </Link>
              <Link to="/measurements">
                <Button variant="outline" className="w-full justify-start gap-2 hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                  Encode Measurement
                </Button>
              </Link>
              <Link to="/monitoring">
                <Button variant="outline" className="w-full justify-start gap-2 hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                  Record Attendance
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" className="w-full justify-start gap-2 hover:scale-105 transition-transform">
                  <FileBarChart className="w-4 h-4" />
                  Generate Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nutritional Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Nutritional Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 min-h-64 w-full">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%" minHeight={256}>
                    <PieChart id="nutritional-status-pie-chart">
                      <Pie
                        data={nutritionalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) =>
                          `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                        }
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                      >
                        {nutritionalData.map((entry) => (
                          <Cell key={entry.id} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {nutritionalData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Baseline vs Endline Comparison */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Baseline vs Endline Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 min-h-64 w-full">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} id="baseline-comparison-bar-chart" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '10px' }} />
                      <Bar 
                        dataKey="underweight" 
                        fill="#dc2626" 
                        name="Underweight"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="normal" 
                        fill="#16a34a" 
                        name="Normal"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="overweight" 
                        fill="#f59e0b" 
                        name="Overweight"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Underweight Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Underweight Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 min-h-64 w-full">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="underweight"
                      stroke="#dc2626"
                      strokeWidth={3}
                      dot={{ fill: '#dc2626', r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0 hover:bg-accent/50 p-2 rounded-lg transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'measurement' ? 'bg-blue-500' :
                    activity.type === 'attendance' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="text-gray-900">{activity.student}</span>
                      <span className="text-muted-foreground"> – {activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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