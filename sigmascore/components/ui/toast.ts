// Minimal ToastAction placeholder for Toaster
import React from "react";

export function ToastAction(props: any) {
  return (
    <button {...props} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
      {props.label || "Action"}
    </button>
  );
}
