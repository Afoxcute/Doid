import { useOkto, OktoContextType } from 'okto-sdk-react';

export const useOktoModal = () => {
  const { showWidgetModal, closeModal } = useOkto() as OktoContextType;

  const openOktoWidget = async () => {
    try {
      await showWidgetModal();
      console.log("Widget modal opened successfully");
      return true;
    } catch (error) {
      console.error("Error opening widget modal:", error);
      throw error;
    }
  };

  const closeOktoWidget = async () => {
    try {
      await closeModal();
      console.log("Widget modal closed successfully");
      return true;
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

  const handleModal = async (action: 'open' | 'close') => {
    try {
      if (action === 'open') {
        await openOktoWidget();
      } else {
        await closeOktoWidget();
      }
      return true;
    } catch (error) {
      console.error(`Failed to ${action} widget:`, error);
      return false;
    }
  };

  return { 
    openWidget: () => handleModal('open'),
    closeWidget: () => handleModal('close')
  };
}; 