"use client";

import type * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  useToast as useToastHook,
  toast as toastFunction,
} from "@/components/ui/use-toast-hook";

export { useToast, toast, ToastProvider };

function useToast() {
  return useToastHook();
}

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive";
};

const toast = (props: ToastProps) => {
  const { title, description, action, duration, variant } = props;
  toastFunction({
    title,
    description,
    action,
    duration,
    variant,
  });
};

export { Toast, ToastClose, ToastDescription, ToastTitle, ToastViewport };
