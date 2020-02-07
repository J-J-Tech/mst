import React, { useReducer } from 'react';
import './sign-in.styles.css';

const initialState = {
    email: '',
    password: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_EMAIL":
            return { ...state, email: action.value };
        case "UPDATE_PASSWORD":
            return { ...state, password: action.value };

        default:
            return state;
    }
}

const SignIn = ({ toggleIsFlipped }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("SignUp Form", state);
    }

    return (
        <div>
            <form className='signin-form' onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input
                    type='email'
                    name='email'
                    value={state.email}
                    placeholder='Email'
                    onChange={handleChange}
                    required />
                <input
                    type='password'
                    name='password'
                    value={state.password}
                    placeholder='Password'
                    onChange={handleChange}
                    required />
                <input type='submit' name='' value='Sign In' />
                <p>Don't have an account?
                    <span className='sign-in-span'
                        onClick={toggleIsFlipped}> Sign Up</span>
                </p>
            </form>
        </div>
    )
}

export default SignIn;

