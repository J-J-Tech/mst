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

const SignIn = ({ handleClick }) => {
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
                <p onClick={handleClick}>Don't have an account?  Sign Up</p>
            </form>
        </div>
    )
}

export default SignIn;

