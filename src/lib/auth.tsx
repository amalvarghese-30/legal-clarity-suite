import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Role = "admin" | "employee";

export interface SessionUser {
  name: string;
  email: string;
  role: Role;
  initials: string;
  title: string;
}

const STORAGE_KEY = "stillworks.session";

/** Demo directory — replace with real auth when a backend is connected. */
const directory: Record<string, { password: string; user: SessionUser }> = {
  "admin@stillworks.legal": {
    password: "admin123",
    user: {
      name: "Adv. Rohan Desai",
      email: "admin@stillworks.legal",
      role: "admin",
      initials: "RD",
      title: "Managing Partner · Administrator",
    },
  },
  "employee@stillworks.legal": {
    password: "employee123",
    user: {
      name: "Adv. Meera Nair",
      email: "employee@stillworks.legal",
      role: "employee",
      initials: "MN",
      title: "Senior Associate",
    },
  },
};

interface AuthValue {
  user: SessionUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => { ok: true; user: SessionUser } | { ok: false; error: string };
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as SessionUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      signIn: (email, password) => {
        const entry = directory[email.trim().toLowerCase()];
        if (!entry || entry.password !== password) {
          return { ok: false as const, error: "Incorrect email or password." };
        }
        setUser(entry.user);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.user));
        return { ok: true as const, user: entry.user };
      },
      signOut: () => {
        setUser(null);
        window.localStorage.removeItem(STORAGE_KEY);
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
