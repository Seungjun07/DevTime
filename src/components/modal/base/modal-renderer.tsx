import { useModalStore } from "../../../store/modals";
import BaseModal from "./base-modal";

export default function ModalRenderer() {
  const { currentModal, payload, closeModal } = useModalStore();

  switch (currentModal) {
    case "CONFIRM":
      if (!payload) return null;
      return (
        <BaseModal
          isOpen
          title={payload.title}
          description={payload.description}
          cancelText={payload.cancelText}
          confirmText={payload.confirmText}
          onConfirm={() => {
            payload.onConfirm?.();
            closeModal();
          }}
          onCancel={() => {
            payload.onCancel?.();
            closeModal();
          }}
        />
      );
    case "START_TIMER":
    default:
      return null;
  }
}
