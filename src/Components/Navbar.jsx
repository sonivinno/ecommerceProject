
import { GiShoppingBag } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BsFillSuitHeartFill} from "react-icons/bs";
import logo from '../O_Shopping-Logo.wine.svg'
import './Navbar.css';
import { Link } from "react-router-dom";


const Navbar = (props)=>{

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <div className="container-fluid">
       <a className="navbar-brand" href="#">
         <img src={logo} alt="" width="1px" height="1px" className="d-inline-block align-text-top" />
        </a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item"> 
          <a className="nav-link active" aria-current="page" href="#">MEN</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">WOMEN</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">BEAUTY</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">STUDIO</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">HOME & LIVING</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">KIDS</a>
        </li>

      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <button type="button" className="iconButton"><CgProfile /></button>
      <Link to='/wishlist'>
      <button type="button" className="iconButton"><BsFillSuitHeartFill />
      </button>
      </Link>
      <button type="button" className="iconButton"><GiShoppingBag/></button>
    </div>
  </div>
</nav>
    )
}
export default Navbar;