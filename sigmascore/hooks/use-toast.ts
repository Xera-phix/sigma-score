import * as React from "react";

// Minimal in-place toast state for compatibility
export interface ToastItem {
  id: string;
  content?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  [key: string]: any;
}
const listeners: React.Dispatch<React.SetStateAction<{ toasts: ToastItem[] }>>[] = [];
let memoryState: { toasts: ToastItem[] } = { toasts: [] };

function toast(input: string | Partial<Omit<ToastItem, "id">>) {
  const id = Math.random().toString(36).substr(2, 9);
  let toastObj: ToastItem;
  if (typeof input === "string") {
    toastObj = { id, content: input, title: input };
  } else {
    toastObj = { id, ...input };
  }
  memoryState = { ...memoryState, toasts: [...memoryState.toasts, toastObj] };
  listeners.forEach((listener) => listener(memoryState));
  setTimeout(() => dismiss(id), 3000);
  return id;
}

function dismiss(id?: string) {
  memoryState = {
    ...memoryState,
    toasts: id
      ? memoryState.toasts.filter((t) => t.id !== id)
      : [],
  };
  listeners.forEach((listener) => listener(memoryState));
}

function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);
  return {
    ...state,
    toast,
    dismiss,
  };
}

export { useToast, toast };
