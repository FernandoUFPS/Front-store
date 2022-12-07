import { AuthProvider } from "./auth/context/AuthProvider";
import AppRouter from "./router/AppRouter";

function StoreApp() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default StoreApp;
