import { create } from "zustand";
import toast from "react-hot-toast";

const useStore = create((set) => ({
  pastes: (() => {
    try {
      const storedPastes = localStorage.getItem("pastes");
      return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
      console.error("Error parsing pastes from localStorage:", error);
      return [];
    }
  })(),

  // Add a new paste
  addToPaste: (newPaste) =>
    set((state) => {
      const updatedPastes = [...state.pastes, newPaste];
      try {
        localStorage.setItem("pastes", JSON.stringify(updatedPastes));
        toast.success("Paste Created");
        console.log(updatedPastes);
      } catch (error) {
        console.error("Error saving pastes to localStorage:", error);
      }
      return { pastes: updatedPastes };
    }),

  // Update an existing paste
  updatedPastes: (updatedPaste) =>
    set((state) => {
      const index = state.pastes.findIndex(
        (item) => item._id === updatedPaste._id
      );
      if (index >= 0) {
        const updatedPastes = [...state.pastes];
        updatedPastes[index] = updatedPaste;

        try {
          localStorage.setItem("pastes", JSON.stringify(updatedPastes));
          toast.success("Paste Updated");
        } catch (error) {
          console.error("Error updating pastes in localStorage:", error);
        }

        return { pastes: updatedPastes };
      } else {
        toast.error("Paste not found");
        return state;
      }
    }),

  // Reset all pastes
  resetAllPaste: () =>
    set(() => {
      try {
        localStorage.removeItem("pastes");
        toast.success("All Pastes Reset");
      } catch (error) {
        console.error("Error resetting pastes in localStorage:", error);
      }
      return { pastes: [] };
    }),

  // Remove a specific paste
  removeFromPaste: (pasteId) =>
    set((state) => {
      // Filter out the paste with the matching ID
      const updatedPastes = state.pastes.filter((item) => item._id !== pasteId);

      try {
        // Update localStorage with the new pastes array
        localStorage.setItem("pastes", JSON.stringify(updatedPastes));
        toast.success("Paste Removed");
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }

      // Return the updated state
      return { pastes: updatedPastes };
    }),
}));

export default useStore;
