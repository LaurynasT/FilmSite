import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutRequest } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    async function performLogout() {
      try {
        await logoutRequest();

        logout();

        navigate("/login");

      } catch (error) {
        console.error("Error logging out:", error);

        logout();

        navigate("/login");
      }
    }

    performLogout();
  }, [navigate, logout]);

  return <div>Logging out...</div>;
};

export default Logout;