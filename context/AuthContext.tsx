import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  needsSetup: boolean;
  login: (pass: string) => Promise<boolean>;
  logout: () => void;
  setupPassword: (pass: string) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper para gerar hash SHA-256
const hashString = async (string: string): Promise<string> => {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((bytes) => bytes.toString(16).padStart(2, '0')).join('');
};

// Recuperar hash da senha salvo em localStorage
const getStoredPasswordHash = (): string | null => {
  return localStorage.getItem('rbtech_admin_password_hash');
};

// Salvar hash da senha em localStorage
const setStoredPasswordHash = (hash: string): void => {
  localStorage.setItem('rbtech_admin_password_hash', hash);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // Pré-configura senha padrão na primeira visita
      let storedHash = getStoredPasswordHash();
      
      if (!storedHash) {
        // Primeira visita - define senha padrão (vem de variável de ambiente)
        const defaultPassword = import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD;
        const hash = await hashString(defaultPassword);
        setStoredPasswordHash(hash);
        storedHash = hash;
      }

      // Verifica se existe uma sessão válida
      const session = localStorage.getItem('rbtech_session');
      if (session) {
        try {
          const { expiry, hash } = JSON.parse(session);
          const now = new Date().getTime();
          
          // Verifica se a sessão não expirou (24 horas)
          if (now < expiry) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('rbtech_session');
          }
        } catch (e) {
          localStorage.removeItem('rbtech_session');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const setupPassword = async (pass: string): Promise<boolean> => {
    try {
      if (pass.length < 4) {
        console.error("Senha deve ter no mínimo 4 caracteres");
        return false;
      }

      const hash = await hashString(pass);
      setStoredPasswordHash(hash);
      setNeedsSetup(false);
      return true;
    } catch (error) {
      console.error("Erro ao configurar senha", error);
      return false;
    }
  };

  const login = async (pass: string): Promise<boolean> => {
    try {
      const storedHash = getStoredPasswordHash();
      if (!storedHash) {
        console.error("Nenhuma senha configurada");
        return false;
      }

      const hash = await hashString(pass);
      
      if (hash === storedHash) {
        setIsAuthenticated(true);
        
        // Cria sessão com validade de 24 horas
        const sessionData = {
          expiry: new Date().getTime() + (24 * 60 * 60 * 1000)
        };
        localStorage.setItem('rbtech_session', JSON.stringify(sessionData));
        return true;
      }
    } catch (error) {
      console.error("Erro ao processar autenticação", error);
    }
    return false;
  };

  const changePassword = async (oldPass: string, newPass: string): Promise<boolean> => {
    try {
      if (newPass.length < 4) {
        console.error("Nova senha deve ter no mínimo 4 caracteres");
        return false;
      }

      // Verifica se a senha antiga está correta
      const oldHash = await hashString(oldPass);
      const storedHash = getStoredPasswordHash();
      
      if (oldHash !== storedHash) {
        console.error("Senha atual incorreta");
        return false;
      }

      // Define a nova senha
      const newHash = await hashString(newPass);
      setStoredPasswordHash(newHash);
      return true;
    } catch (error) {
      console.error("Erro ao alterar senha", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('rbtech_session');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, needsSetup, login, logout, setupPassword, changePassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
