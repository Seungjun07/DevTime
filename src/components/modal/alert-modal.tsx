import type { AlertModalProps } from "../../store/modals";
import Button from "../common/Button";
import Dialog from "../common/Dialog/Dialog";

interface ModalProps extends AlertModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AlertModal({
  open,
  title,
  description,
  confirmText = "확인",
  onConfirm,
  onClose,
}: ModalProps) {
  function handleConfirm() {
    onConfirm?.();
    onClose();
  }

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <Dialog.Content>
        <Dialog.Header>{title}</Dialog.Header>
        {description && <Dialog.Description>{description}</Dialog.Description>}
      </Dialog.Content>

      <Dialog.Footer>
        {confirmText && (
          <Button variant={"primary"} onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </Dialog.Footer>
    </Dialog>
  );
}
