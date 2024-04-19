import { create } from "zustand";

interface useModalStore {
  isOpen: boolean;
  startAt: string;
  date: string;
  onOpen: () => void;
  onClose: () => void;
  setStart: (startAt: string) => void;
  setDate: (date: string) => void;
}

export const useProModal = create<useModalStore>((set) => ({
  isOpen: false,
  startAt: "",
  date: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setStart: (startAt) => set({ startAt }),
  setDate: (date) => set({ date }),
}));
