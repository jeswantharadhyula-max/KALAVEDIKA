import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar          from './components/Navbar';
import Footer          from './components/Footer';
import Home            from './pages/Home';
import Events          from './pages/Events';
import Members         from './pages/Members';
import Activities      from './pages/Activities';
import Achievements    from './pages/Achievements';
import Founders        from './pages/Founders';
import Feedback        from './pages/Feedback';
import AdminLogin      from './pages/Admin/Login';
import AdminDashboard  from './pages/Admin/Dashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const HIDE_LAYOUT = ['/admin/login'];

function Layout({ children }) {
  const { pathname } = useLocation();
  const hide = HIDE_LAYOUT.includes(pathname);
  return (
    <>
      {!hide && <Navbar />}
      <main>{children}</main>
      {!hide && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/"             element={<Home />}           />
            <Route path="/events"       element={<Events />}         />
            <Route path="/members"      element={<Members />}        />
            <Route path="/activities"   element={<Activities />}     />
            <Route path="/achievements" element={<Achievements />}   />
            <Route path="/founders"     element={<Founders />}       />
            <Route path="/feedback"     element={<Feedback />}       />
            <Route path="/admin/login"  element={<AdminLogin />}     />
            <Route path="/admin"        element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
