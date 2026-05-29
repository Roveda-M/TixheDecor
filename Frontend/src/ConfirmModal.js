import { useCallback, useState } from "react";

const APP_NAME = "Tixhe Decor";

export default function ConfirmModal({
  open,
  title = APP_NAME,
  message,
  variant = "info",
  confirmText = "OK",
  cancelText = "Anulo",
  showCancel = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  const isDanger = variant === "danger";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
      >
        <div className="border-b border-gray-100 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6f47]">
            {APP_NAME}
          </p>
          <h2 id="confirm-modal-title" className="mt-2 text-xl font-semibold text-gray-950">
            {title}
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">{message}</p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition ${
              isDanger ? "bg-red-600 hover:bg-red-700" : "bg-black hover:bg-gray-800"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useConfirmModal() {
  const [dialog, setDialog] = useState(null);

  const closeDialog = useCallback((result) => {
    setDialog((current) => {
      if (current) {
        current.resolve(result);
      }
      return null;
    });
  }, []);

  const showDialog = useCallback((options) => {
    return new Promise((resolve) => {
      setDialog({
        title: APP_NAME,
        confirmText: "OK",
        cancelText: "Anulo",
        showCancel: false,
        variant: "info",
        ...options,
        resolve,
      });
    });
  }, []);

  const alertDialog = useCallback(
    (message, options = {}) =>
      showDialog({
        message,
        title: options.title || APP_NAME,
        confirmText: options.confirmText || "OK",
        variant: options.variant || "info",
      }),
    [showDialog]
  );

  const confirmDialog = useCallback(
    (message, options = {}) =>
      showDialog({
        message,
        title: options.title || APP_NAME,
        confirmText: options.confirmText || "Po",
        cancelText: options.cancelText || "Anulo",
        showCancel: true,
        variant: options.variant || "danger",
      }),
    [showDialog]
  );

  const Modal = useCallback(
    () => (
      <ConfirmModal
        open={Boolean(dialog)}
        title={dialog?.title}
        message={dialog?.message}
        variant={dialog?.variant}
        confirmText={dialog?.confirmText}
        cancelText={dialog?.cancelText}
        showCancel={dialog?.showCancel}
        onConfirm={() => closeDialog(true)}
        onCancel={() => closeDialog(false)}
      />
    ),
    [closeDialog, dialog]
  );

  return { alertDialog, confirmDialog, ConfirmModal: Modal };
}
