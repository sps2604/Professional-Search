// src/context/UserContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
}

interface UserContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
