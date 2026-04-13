"use client";

import { createContext, useContext, ReactNode } from "react";

interface SectionContextType {
  activeSection: string;
  loadingComplete: boolean;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ 
  children, 
  value 
}: { 
  children: ReactNode; 
  value: SectionContextType 
}) => {
  return (
    <SectionContext.Provider value={value}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};
