// Copied from template/components/ui/toaster.tsx
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col px-4 py-6 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="mb-2">
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
            <div className="flex-1">
              {toast.title && <div className="font-bold">{toast.title}</div>}
              {toast.description && <div>{toast.description}</div>}
            </div>
            {toast.action && <ToastAction {...toast.action} />}
          </div>
        </div>
      ))}
    </div>
  );
}
