import { Outlet } from 'react-router';
import Header from './header/Header';


const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet />
      </main>
   
    </div>
  );
};

export default Layout;