import { useState } from "react";
import { UserPlus, Edit, Trash2, Shield, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select } from "../components/ui/select";
import { Modal } from "../components/ui/modal";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useApp } from "../context/app-context";
import { motion } from "motion/react";

export function UserManagementPage() {
  const { users, currentUser } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "Encoder" as "Administrator" | "Encoder" | "Viewer",
    password: "",
  });

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("User added successfully!");
    setShowAddModal(false);
    setFormData({
      username: "",
      fullName: "",
      email: "",
      role: "Encoder",
      password: "",
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    if (role === "Administrator") return "default";
    if (role === "Encoder") return "secondary";
    return "outline";
  };

  const getRoleIcon = (role: string) => {
    if (role === "Administrator") return <Shield className="w-4 h-4" />;
    if (role === "Encoder") return <Edit className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <p className="text-muted-foreground">Manage system users and access levels</p>
        <Button
          onClick={() => setShowAddModal(true)}
          className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </motion.div>

      {/* Current User Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg font-medium">
                {currentUser?.fullName.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="text-lg font-medium text-gray-900">{currentUser?.fullName || "User"}</p>
              </div>
              <Badge variant="default" className="gap-1">
                {getRoleIcon(currentUser?.role || "Viewer")}
                {currentUser?.role || "Viewer"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Username</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
                            {user.fullName.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{user.fullName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-mono">{user.username}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                          {getRoleIcon(user.role)}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <Badge variant={user.isActive ? "default" : "secondary"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => toast.info("Edit user feature coming soon!")}
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => toast.error("Cannot delete demo users")}
                            disabled={user.id === currentUser?.id}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <Label htmlFor="fullName" required>Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Juan Dela Cruz"
            />
          </div>

          <div>
            <Label htmlFor="username" required>Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="juan.delacruz"
            />
          </div>

          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="juan@example.com"
            />
          </div>

          <div>
            <Label htmlFor="role" required>Role</Label>
            <Select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
            >
              <option value="Viewer">Viewer</option>
              <option value="Encoder">Encoder</option>
              <option value="Administrator">Administrator</option>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {formData.role === "Administrator" && "Full access to all features"}
              {formData.role === "Encoder" && "Can add and edit data"}
              {formData.role === "Viewer" && "Read-only access"}
            </p>
          </div>

          <div>
            <Label htmlFor="password" required>Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
              Add User
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
