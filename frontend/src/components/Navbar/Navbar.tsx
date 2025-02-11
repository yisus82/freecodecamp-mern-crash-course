import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to='/'>Home</Link>
        <Link to='/create'>Create</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
