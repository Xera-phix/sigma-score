// Copied from template/hooks/use-toast.ts
import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);
  // Dummy implementation for demo
  return {
    toasts,
    addToast: (toast: any) => setToasts((prev) => [...prev, toast]),
    removeToast: (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
  };
}
