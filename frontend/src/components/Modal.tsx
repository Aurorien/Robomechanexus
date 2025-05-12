import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { ModalState } from "../utils/interfaces";

interface ModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  state?: ModalState;
  message?: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick?: () => void;
  };
}

function Modal({
  title,
  children,
  state = "default",
  message,
  primaryAction = { text: "Confirm", onClick: () => {} },
  secondaryAction = { text: "Cancel", onClick: undefined },
  onClose,
}: ModalProps) {
  const handleSecondaryAction = () => {
    if (secondaryAction.onClick) secondaryAction.onClick();
    else onClose();
  };

  const modalContent = (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h1>{title}</h1>
        </div>
        <div className="modal-content">
          {state === "loading" && (
            <div className="modal-loading">
              <p>{message || "Loading..."}</p>
              <div className="loading-indicator" />
            </div>
          )}
          {state === "success" && (
            <div className="modal-success">
              {message || "Operation successful."}
            </div>
          )}
          {state === "error" && (
            <div className="modal-error">
              {message || "An error occurred. Try again."}
            </div>
          )}
          {state === "default" && children}
        </div>
        <div className="modal-footer">
          {state === "success" || state === "error" ? (
            <button className="modal-close-button" onClick={onClose}>
              Close
            </button>
          ) : (
            <>
              {secondaryAction && (
                <button
                  className="modal-secondary-button"
                  onClick={handleSecondaryAction}
                  disabled={state === "loading"}
                >
                  {secondaryAction.text}
                </button>
              )}
              <button
                className="modal-primary-button"
                onClick={primaryAction.onClick}
                disabled={state === "loading"}
              >
                {primaryAction.text}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default Modal;
