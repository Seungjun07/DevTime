import type { ConfirmModalProps } from "../../store/modals";
import Button from "../common/Button";
import Dialog from "../common/Dialog/Dialog";

interface ModalProps extends ConfirmModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  cancelText = "취소",
  confirmText = "확인",
  onConfirm,
  onCancel,
  onClose,
}: ModalProps) {
  function handleConfirm() {
    onConfirm?.();
    onClose();
  }

  function handleCancel() {
    onCancel?.();
    onClose();
  }

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <Dialog.Content>
        <Dialog.Header>{title}</Dialog.Header>
        {description && <Dialog.Description>{description}</Dialog.Description>}
      </Dialog.Content>

      <Dialog.Footer>
        {cancelText && (
          <Button variant={"tertiary"} onClick={handleCancel}>
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button variant={"primary"} onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </Dialog.Footer>
    </Dialog>
  );
}
