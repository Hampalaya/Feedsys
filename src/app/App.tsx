import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { AppProvider } from "./context/app-context";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Global suppression of Recharts internal warnings
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Encountered two children with the same key') ||
         args[0].includes('Non-unique keys may cause children to be duplicated') ||
         args[0].includes('width(0) and height(0) of chart'))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('width(0) and height(0) of chart') ||
         args[0].includes('defaultProps'))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
}