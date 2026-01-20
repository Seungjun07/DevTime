import Button from "../../common/Button";
import Dialog from "../../common/Dialog/Dialog";

interface BaseModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function BaseModal({
  isOpen,
  title,
  description,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: BaseModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <Dialog.Content>
        <Dialog.Header>{title}</Dialog.Header>
        {description && <Dialog.Description>{description}</Dialog.Description>}
      </Dialog.Content>

      <Dialog.Footer>
        {cancelText && (
          <Button variant={"tertiary"} onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        {confirmText && (
          <Button variant={"primary"} onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Dialog.Footer>
    </Dialog>
  );
}
