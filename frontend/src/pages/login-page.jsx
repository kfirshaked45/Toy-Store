import { useDispatch, useSelector } from 'react-redux';
import { showErrorMsg } from '../services/event-bus.service.js';
import { logout } from '../store/user.action.js';
import { Link } from 'react-router-dom';
import { LoginSignup } from '../cmps/login-signup.jsx';

export function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);
  console.log(user);
  function onLogout() {
    logout().catch((err) => {
      showErrorMsg('Cannot logout');
    });
  }
  return (
    <div>
      {user && (
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
      )}
    </div>
  );
}
