import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/login";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardPage } from "./pages/dashboard";
import { StudentProfilesPage } from "./pages/student-profiles";
import { MeasurementsPage } from "./pages/measurements";
import { FeedingMonitoringPage } from "./pages/feeding-monitoring";
import { NutritionalStatusPage } from "./pages/nutritional-status";
import { ReportsPage } from "./pages/reports";
import { DataValidationPage } from "./pages/data-validation";
import { UserManagementPage } from "./pages/user-management";
import { SettingsPage } from "./pages/settings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "students", Component: StudentProfilesPage },
      { path: "measurements", Component: MeasurementsPage },
      { path: "monitoring", Component: FeedingMonitoringPage },
      { path: "nutritional-status", Component: NutritionalStatusPage },
      { path: "reports", Component: ReportsPage },
      { path: "validation", Component: DataValidationPage },
      { path: "users", Component: UserManagementPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
