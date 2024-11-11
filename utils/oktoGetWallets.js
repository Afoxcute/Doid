import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoGetWallets = () => {
  const { getWallets } = useOkto() as OktoContextType;

  const fetchUserWallets = async () => {
    try {
      const wallets = await getWallets();
      console.log("User wallets:", wallets);
      return wallets;
    } catch (error) {
      console.error("Error fetching wallets:", error);
      throw error;
    }
  };

  return { fetchUserWallets };
};

// Example usage of wallet fetching in a component:
export const useWallets = () => {
  const { fetchUserWallets } = useOktoGetWallets();

  const getUserWallets = async () => {
    try {
      const wallets = await fetchUserWallets();
      return wallets;
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
      return [];
    }
  };

  return { getUserWallets };
}; 