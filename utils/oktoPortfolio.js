import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoPortfolio = () => {
  const { getPortfolio } = useOkto() as OktoContextType;

  const fetchPortfolio = async () => {
    try {
      const portfolio = await getPortfolio();
      console.log("Portfolio details:", portfolio);
      return portfolio;
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      throw error;
    }
  };

  return { fetchPortfolio };
};

// Example usage of portfolio in a component:
export const usePortfolioInfo = () => {
  const { fetchPortfolio } = useOktoPortfolio();

  const getPortfolioDetails = async () => {
    try {
      const portfolioInfo = await fetchPortfolio();
      return portfolioInfo;
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
      return null;
    }
  };

  return { getPortfolioDetails };
}; 