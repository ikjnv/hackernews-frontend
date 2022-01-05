import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {AUTH_TOKEN} from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation SigninMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    email: '',
    name: '',
    password: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/')
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    }
  });

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            type="text"
            onChange={(e) => {
              setFormState({
                ...formState,
                name: e.target.value
              })
            }}
            placeholder="Name"
          />
        )}

        <input
          type="text"
          value={formState.email}
          onChange={(e) => {
            setFormState({
              ...formState,
              email: e.target.value
            })
          }}
          placeholder="Email"
        />

        <input
          type="password"
          value={formState.password}
          onChange={(e) => {
            setFormState({
              ...formState,
              password: e.target.value
            })
          }}
          placeholder="Password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          // @ts-ignore
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) => {
            setFormState({
              ...formState,
              login: !formState.login
            })
          }}
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'
          }
        </button>
      </div>
    </div>
  );
};
