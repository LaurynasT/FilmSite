import { AuthProvider } from "./context/AuthContext";
import {ScrollUp} from "./components/scroll/scrollIndex"
import AppRoutes from "./Routes/Routes";
import { NavBar } from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import NotificationList from "./components/notifications/notificationList";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
        <ScrollUp/>
        <NotificationList/>
      </div>
    </AuthProvider>
  );
}