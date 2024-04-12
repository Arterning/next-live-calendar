import { create } from "zustand";

interface useModalStore {
  isOpen: boolean;
  startAt: string;
  onOpen: () => void;
  onClose: () => void;
  setStart: (startAt: string) => void;
}

export const useProModal = create<useModalStore>((set) => ({
  isOpen: false,
  startAt: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setStart: (startAt) => set({ startAt }),
}));
