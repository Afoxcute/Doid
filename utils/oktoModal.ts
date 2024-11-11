import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoModal = () => {
  const { showWidgetModal, closeModal } = useOkto() as OktoContextType;

  const openOktoWidget = async () => {
    try {
      await showWidgetModal();
      console.log("Widget modal opened successfully");
    } catch (error) {
      console.error("Error opening widget modal:", error);
      throw error;
    }
  };

  const closeOktoWidget = async () => {
    try {
      await closeModal();
      console.log("Widget modal closed successfully");
    } catch (error) {
      console.error("Error closing widget modal:", error);
      throw error;
    }
  };

  return { openOktoWidget, closeOktoWidget };
};

// Example usage of modal in a component:
export const useWidgetModal = () => {
  const { openOktoWidget, closeOktoWidget } = useOktoModal();

  const handleOpenWidget = async () => {
    try {
      await openOktoWidget();
      return true;
    } catch (error) {
      console.error("Failed to open widget:", error);
      return false;
    }
  };

  const handleCloseWidget = async () => {
    try {
      await closeOktoWidget();
      return true;
    } catch (error) {
      console.error("Failed to close widget:", error);
      return false;
    }
  };

  return { handleOpenWidget, handleCloseWidget };
}; 