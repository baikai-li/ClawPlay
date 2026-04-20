"use client";
import { createContext, useContext, useState } from "react";

export const PendingCountContext = createContext<{
  count: number;
  decrement: () => void;
}>({ count: 0, decrement: () => {} });

export function usePendingCount() {
  return useContext(PendingCountContext);
}
