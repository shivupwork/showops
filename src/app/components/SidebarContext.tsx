"use client"
import { createContext, useContext } from 'react';
type ContextType = {
    isOpenDrawer: boolean;
    open: () => void;
};
const ContextDefaultValues: ContextType = {
    isOpenDrawer: false,
    open: () => {},
};

export const SidebarContext = createContext<ContextType>(ContextDefaultValues);
export function useSidebarContext() {
    return useContext(SidebarContext);
}