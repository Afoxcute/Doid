import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoTokens = () => {
  const { getSupportedTokens } = useOkto() as OktoContextType;

  const fetchSupportedTokens = async () => {
    try {
      const tokens = await getSupportedTokens();
      console.log("Supported tokens:", tokens);
      return tokens;
    } catch (error) {
      console.error("Error fetching tokens:", error);
      throw error;
    }
  };

  return { fetchSupportedTokens };
};

// Example usage of supported tokens in a component:
export const useTokenInfo = () => {
  const { fetchSupportedTokens } = useOktoTokens();

  const loadTokens = async () => {
    try {
      const tokens = await fetchSupportedTokens();
      return tokens;
    } catch (error) {
      console.error("Failed to load tokens:", error);
      return [];
    }
  };

  return { loadTokens };
}; 