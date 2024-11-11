import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoAuthentication = () => {
  const { authenticate } = useOkto() as OktoContextType;

  const authenticateUser = async (idToken) => {
    return new Promise((resolve, reject) => {
      authenticate(idToken, (result, error) => {
        if (result) {
          console.log('Authentication successful:', result);
          resolve(result);
        }
        if (error) {
          console.error('Authentication error:', error);
          reject(error);
        }
      });
    });
  };

  return { authenticateUser };
};

// Example usage of authentication in a component:
export const useAuth = () => {
  const { authenticateUser } = useOktoAuthentication();

  const login = async (idToken) => {
    try {
      const authResult = await authenticateUser(idToken);
      return authResult;
    } catch (error) {
      console.error("Failed to authenticate:", error);
      throw error;
    }
  };

  return { login };
}; 