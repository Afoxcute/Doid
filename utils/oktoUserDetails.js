import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoUserDetails = () => {
  const { getUserDetails } = useOkto() as OktoContextType;

  const fetchUserDetails = async () => {
    try {
      const userDetails = await getUserDetails();
      console.log("User details:", userDetails);
      return userDetails;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  return { fetchUserDetails };
};

// Example usage of user details in a component:
export const useUserInfo = () => {
  const { fetchUserDetails } = useOktoUserDetails();

  const getUserInfo = async () => {
    try {
      const userInfo = await fetchUserDetails();
      return userInfo;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      return null;
    }
  };

  return { getUserInfo };
}; 