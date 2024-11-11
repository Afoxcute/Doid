import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoLogout = () => {
  const { logout } = useOkto() as OktoContextType;

  const logoutUser = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
      return true;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  return { logoutUser };
};

// Example usage of logout in a component:
export const useLogout = () => {
  const { logoutUser } = useOktoLogout();

  const handleLogout = async () => {
    try {
      await logoutUser();
      return true;
    } catch (error) {
      console.error("Failed to logout:", error);
      return false;
    }
  };

  return { handleLogout };
}; 