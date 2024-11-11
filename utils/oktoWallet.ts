import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoWallet = () => {
  const { createWallet } = useOkto() as OktoContextType;

  const createEmbeddedWallet = async () => {
    try {
      const walletResult = await createWallet();
      console.log("Wallet created successfully:", walletResult);
      return walletResult;
    } catch (error) {
      console.error("Error creating wallet:", error);
      throw error;
    }
  };

  return { createEmbeddedWallet };
};

// Example usage of wallet creation in a component:
export const useWalletCreation = () => {
  const { createEmbeddedWallet } = useOktoWallet();

  const initializeWallet = async () => {
    try {
      const wallet = await createEmbeddedWallet();
      return wallet;
    } catch (error) {
      console.error("Failed to create wallet:", error);
      throw error;
    }
  };

  return { initializeWallet };
}; 