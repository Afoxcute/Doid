import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoNetworks = () => {
  const { getSupportedNetworks } = useOkto() as OktoContextType;

  const fetchSupportedNetworks = async () => {
    try {
      const networks = await getSupportedNetworks();
      console.log("Supported networks:", networks);
      return networks;
    } catch (error) {
      console.error("Error fetching networks:", error);
      throw error;
    }
  };

  return { fetchSupportedNetworks };
};

// Example usage of supported networks in a component:
export const useNetworkInfo = () => {
  const { fetchSupportedNetworks } = useOktoNetworks();

  const loadNetworks = async () => {
    try {
      const networks = await fetchSupportedNetworks();
      return networks;
    } catch (error) {
      console.error("Failed to load networks:", error);
      return [];
    }
  };

  return { loadNetworks };
}; 