import React, { useEffect } from 'react';
import { ThemeProvider, HashRouter as Router, Routes, Route, useLocation, Navigate } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Equipment } from './pages/Equipment';
import { Parts } from './pages/Parts';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/equipamentos" element={<Equipment />} />
                <Route path="/pecas" element={<Parts />} />
                <Route path="/servicos" element={<Services />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Layout>
          </Router>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;