import { Outlet } from 'react-router';
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = () => {
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
