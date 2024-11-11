import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoAuth = () => {
  const { isLoggedIn } = useOkto() as OktoContextType;

  const checkLoginStatus = async () => {
    try {
      const loginStatus = isLoggedIn;
      console.log(loginStatus ? "User is logged in" : "User is logged out");
      return loginStatus;
    } catch (error) {
      console.error("Error checking login status:", error);
      throw error;
    }
  };

  return { checkLoginStatus };
};

// Example usage of auth status in a component:
export const useAuthStatus = () => {
  const { checkLoginStatus } = useOktoAuth();

  const verifyLoginStatus = async () => {
    try {
      const isAuthenticated = await checkLoginStatus();
      return isAuthenticated;
    } catch (error) {
      console.error("Failed to verify login status:", error);
      return false;
    }
  };

  return { verifyLoginStatus };
}; 