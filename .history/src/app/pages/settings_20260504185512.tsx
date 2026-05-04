import { useState } from "react";
import { Save, Building, User, Bell, Lock, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useApp } from "../context/app-context";
import { motion } from "motion/react";

export function SettingsPage() {
  const { currentUser } = useApp();
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: "Sample Elementary School",
    schoolId: "123456",
    division: "Division of Sample City",
    region: "Region IV-A",
    schoolYear: "2024-2025",
  });

  const [profileSettings, setProfileSettings] = useState({
    fullName: currentUser?.fullName || "",
    email: currentUser?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    measurementReminders: true,
    reportGeneration: true,
  });

  const handleSaveSchoolSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("School settings saved successfully!");
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileSettings.newPassword && profileSettings.newPassword !== profileSettings.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success("Profile updated successfully!");
    setProfileSettings({
      ...profileSettings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification settings saved!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-muted-foreground">Manage system and account settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSchoolSettings} className="space-y-4">
                <div>
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={schoolSettings.schoolName}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolName: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="schoolId">School ID</Label>
                  <Input
                    id="schoolId"
                    value={schoolSettings.schoolId}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolId: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="division">Division</Label>
                  <Input
                    id="division"
                    value={schoolSettings.division}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, division: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select
                    id="region"
                    value={schoolSettings.region}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, region: e.target.value })}
                  >
                    <option value="Region I">Region I - Ilocos Region</option>
                    <option value="Region II">Region II - Cagayan Valley</option>
                    <option value="Region III">Region III - Central Luzon</option>
                    <option value="Region IV-A">Region IV-A - CALABARZON</option>
                    <option value="NCR">NCR - National Capital Region</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="schoolYear">School Year</Label>
                  <Input
                    id="schoolYear"
                    value={schoolSettings.schoolYear}
                    onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolYear: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  <Save className="w-4 h-4" />
                  Save School Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileSettings.fullName}
                    onChange={(e) => setProfileSettings({ ...profileSettings, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={profileSettings.currentPassword}
                        onChange={(e) => setProfileSettings({ ...profileSettings, currentPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={profileSettings.newPassword}
                        onChange={(e) => setProfileSettings({ ...profileSettings, newPassword: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={profileSettings.confirmPassword}
                        onChange={(e) => setProfileSettings({ ...profileSettings, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  <Save className="w-4 h-4" />
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveNotifications} className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Measurement Reminders</p>
                  <p className="text-sm text-muted-foreground">Get reminded for monthly measurements</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.measurementReminders}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, measurementReminders: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Report Generation</p>
                  <p className="text-sm text-muted-foreground">Notify when reports are ready</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.reportGeneration}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, reportGeneration: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600"
                />
              </div>

              <Button type="submit" className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Export All Data</p>
                  <p className="text-sm text-muted-foreground">Download complete database backup</p>
                </div>
                <Button variant="outline" onClick={() => toast.info("Export feature coming soon!")}>
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50/50">
                <div>
                  <p className="font-medium text-red-900">Clear All Data</p>
                  <p className="text-sm text-red-700">Permanently delete all records</p>
                </div>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => toast.error("This action is disabled in demo mode")}
                >
                  Clear Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
