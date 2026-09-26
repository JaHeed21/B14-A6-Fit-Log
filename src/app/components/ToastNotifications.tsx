"use client";

import { ToastContainer } from "react-toastify";

export default function ToastNotifications() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      closeOnClick
      pauseOnFocusLoss
      draggable
      theme="dark"
    />
  );
}
