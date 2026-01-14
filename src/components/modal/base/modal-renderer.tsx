import { useModalStore } from "../../../store/modals";
import AlertModal from "../alert-modal";
import ConfirmModal from "../confirm-modal";
import FinishTimerModal from "../finish-timer-modal";
import ManageTaskModal from "../manage-task-modal";
import StartTimderModal from "../start-timer-modal";
import BaseModal from "./base-modal";

export default function ModalRenderer() {
  const { type, props, closeModal } = useModalStore();

  if (!type || !props) return null;

  switch (type) {
    case "ALERT":
      return <AlertModal {...props} open={true} onClose={closeModal} />;
    case "CONFIRM":
      return <ConfirmModal {...props} open={true} onClose={closeModal} />;
    case "CUSTOM":
      switch (props.type) {
        case "START_TIMER":
          return <StartTimderModal open={true} onClose={closeModal} />;

        case "MANAGE_TASK":
          return <ManageTaskModal open={true} onClose={closeModal} />;

        case "FINISH_TIMER":
          return <FinishTimerModal open={true} onClose={closeModal} />;

        default:
          return null;
      }
    default:
      return null;
  }
}
