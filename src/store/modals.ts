import { create } from "zustand";

type ModalType =
  | "CONFIRM"
  | "DUPLICATE_LOGIN"
  | "SKIP_PROFILE"
  | "START_TIMER"
  | "TASK_MANAGE"
  | "FINISH_TIMER"
  | null;

interface ModalPayload {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalState {
  currentModal: ModalType;
  payload?: ModalPayload;
  openModal: (modal: ModalType, payload?: ModalPayload) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  currentModal: null,
  payload: undefined,

  openModal: (modal, payload) => {
    set(() => ({
      currentModal: modal,
      payload,
    }));
  },

  closeModal: () => {
    set(() => ({
      currentModal: null,
      payload: undefined,
    }));
  },
}));
