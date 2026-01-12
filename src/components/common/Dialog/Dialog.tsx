import type { ReactNode } from "react";
import Footer from "./Footer";
import Description from "./Description";
import Header from "./Header";
import Content from "./Content";

interface DialogProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export default function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-82 flex-col gap-6 rounded-xl bg-white p-6 shadow-[0px_8px_8px_0px_rgba(0,0,0,0.05)]"
      >
        {children}
      </div>
    </div>
  );
}

Dialog.Content = Content;
Dialog.Header = Header;
Dialog.Description = Description;
Dialog.Footer = Footer;

{
  /* <Button variant={"tertiary"} size={"lg"} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant={"primary"} onClick={onConfirm}>
            {confirmText}
          </Button> */
}
