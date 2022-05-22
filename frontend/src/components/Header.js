import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdBubbleChart, MdDashboard, MdList } from 'react-icons/md';
import { GoGraph } from 'react-icons/go';
import { BiDoorOpen, BiNews, BiBuilding } from 'react-icons/bi';
import { AiFillGold, AiOutlineDollarCircle, AiOutlineStock, AiFillCalculator, AiFillHome } from 'react-icons/ai';

const Header = () => {
  return (
    <header>
      <Link to="/" className="brand-name">
        <MdBubbleChart />
        <span>Nepal Stock</span>
      </Link>
      <nav id="nav">
        <span className="menu-title">Menu</span>
        <ul className="navigation-menu">
          <li>
            <NavLink to="/" exact activeClassName="active">
              <AiFillHome />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <MdDashboard />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" activeClassName="active">
              <GoGraph />
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/watchlist" activeClassName="active">
              <MdList />
              <span>Watchlist</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/current-openings" activeClassName="active">
              <BiDoorOpen />
              <span>Current Openings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" activeClassName="active">
              <BiNews />
              <span>News</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/gold-silver-rates" activeClassName="active">
              <AiFillGold />
              <span>Gold/Silver Rates</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/exchange-rates" activeClassName="active">
              <AiOutlineDollarCircle />
              <span>Exchange Rates</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-stocks" activeClassName="active">
              <AiOutlineStock />
              <span>All Stocks Current Price</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-brokers" activeClassName="active">
              <BiBuilding />
              <span>Listed Brokers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/calculator" activeClassName="active">
              <AiFillCalculator />
              <span>Calculator</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <ul className="extra-links">
        <li>© {new Date().getFullYear()} Binaya Baral</li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
        <li>
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
