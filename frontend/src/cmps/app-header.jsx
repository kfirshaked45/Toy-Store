// const { NavLink, Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux';
import { showErrorMsg } from '../services/event-bus.service.js';
import { SET_CART_IS_SHOWN } from '../store/toy.reducer.js';
import { logout } from '../store/user.action.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginSignup } from './login-signup.jsx';
import { Link, NavLink } from 'react-router-dom';
import { MenuItem, OutlinedInput, Select } from '@mui/material';

export default function AppHeader() {
  const dispatch = useDispatch();
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);

  // TODO: get from storeState

  function onLogout() {
    logout().catch((err) => {
      showErrorMsg('Cannot logout');
    });
  }

  return (
    <header className="app-header">
      <div className="top-logo-section">
        <Select value="" displayEmpty>
          <MenuItem value="" disabled>
            EN
          </MenuItem>

          <MenuItem value="HE">HE</MenuItem>
        </Select>

        <h1>TOY & BEYOND</h1>
        <div className="header-icons">
          <p>Sign In</p>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <FontAwesomeIcon
            className="cart-icon"
            icon={faCartShopping}
            onClick={(ev) => {
              ev.preventDefault();
              dispatch({ type: SET_CART_IS_SHOWN, isCartShown: true });
            }}
          />
        </div>
        {/* {user && (
            <section className="user-info">
              <p>
                <Link to={`/user/${user._id}`}>{user.fullname}</Link>
                <span>${user.score.toLocaleString()}</span>
              </p>

              <button onClick={onLogout}>Logout</button>
            </section>
          )}
          {!user && (
            <section className="user-info">
              <LoginSignup dispatch={dispatch} />
            </section>
          )} */}
      </div>
      <nav className="nav-header">
        <NavLink to="/">Home</NavLink> <NavLink to="/toy">Toys</NavLink> <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {/* eslint-disable-next-line */}
        {/* <a
          href="#"
          onClick={(ev) => {
            ev.preventDefault();
            dispatch({ type: SET_CART_IS_SHOWN, isCartShown: true });
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </a> */}
      </nav>
    </header>
  );
}
