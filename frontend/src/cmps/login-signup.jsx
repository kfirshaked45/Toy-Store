import { useState } from 'react';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { login, signup } from '../store/user.action.js';
import { MyForm } from './my-form.jsx';

function getEmptyCredentials() {
  return {
    fullname: '',
    username: 'muki',
    password: 'muki1',
  };
}

export function LoginSignup({ dispatch }) {
  const [credentials, setCredentials] = useState(getEmptyCredentials());
  const [isSignupState, setIsSignupState] = useState(false);

  const { username, password, fullname } = credentials;
  function handleCredentialsChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    const updatedCredentials = { ...credentials, [field]: value };
    setCredentials(updatedCredentials);
  }

  function onSubmit() {
    if (isSignupState) {
      signup({ username, password, fullname })
        .then((user) => {
          showSuccessMsg(`Welcome ${user.fullname}`);
        })
        .catch((err) => {
          showErrorMsg('Oops try again');
        });
    } else {
      login({ username, password })
        .then((user) => {
          showSuccessMsg(`Hi again ${user.fullname}`);
        })
        .catch((err) => {
          showErrorMsg('OOps try again');
        });
    }
  }

  function onToggleSignupState() {
    setIsSignupState(!isSignupState);
  }

  return (
    <div className="login-page">
      <MyForm
        onChange={handleCredentialsChange}
        credentials={credentials}
        onSubmit={onSubmit}
        isSignupState={isSignupState}
        onToggleSignupState={onToggleSignupState}
      />
    </div>
  );
}
