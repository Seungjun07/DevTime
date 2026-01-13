import { create } from "zustand";

// type ModalType =
//   | "ALERT"
//   | "CONFIRM"
//   | "CUSTOM"
//   | "DUPLICATE_LOGIN"
//   | "SKIP_PROFILE"
//   | "START_TIMER"
//   | "TASK_MANAGE"
//   | "FINISH_TIMER"
//   | null;

export interface AlertModalProps {
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

export interface ConfirmModalProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

type CustomModalType = "START_TIMER" | "MANAGE_TASK" | "FINISH_TIMER";

export interface CustomModalProps {
  type: CustomModalType;
}

type ModalState =
  | { type: null; props: null }
  | { type: "ALERT"; props: AlertModalProps }
  | { type: "CONFIRM"; props: ConfirmModalProps }
  | { type: "CUSTOM"; props: CustomModalProps };

interface ModalActions {
  openAlertModal: (props: AlertModalProps) => void;
  openConfirmModal: (props: ConfirmModalProps) => void;
  openCustomModal: (props: CustomModalProps) => void;
  closeModal: () => void;
}

type ModalStore = ModalState & ModalActions;

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  props: null,

  openAlertModal: (props) =>
    set({
      type: "ALERT",
      props,
    }),

  openConfirmModal: (props) =>
    set({
      type: "CONFIRM",
      props,
    }),

  openCustomModal: (props) =>
    set({
      type: "CUSTOM",
      props,
    }),

  closeModal: () => {
    set(() => ({
      type: null,
      props: null,
    }));
  },
}));
