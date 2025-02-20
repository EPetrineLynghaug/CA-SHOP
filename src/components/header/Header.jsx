import { Link } from 'react-router';

const Header = () => {
  return (
    <header>
      <nav>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;