import React, { useReducer } from 'react';
import './sign-up.styles.css';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const initialState = {
    email: '',
    password: '',
    confirmPassword: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_EMAIL":
            return { ...state, email: action.value };
        case "UPDATE_PASSWORD":
            return { ...state, password: action.value };
        case "UPDATE_CONFIRMPASSWORD":
            return { ...state, confirmPassword: action.value };

        default:
            return state;
    }
}


const SignUp = ({ toggleIsFlipped }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({ type: `UPDATE_${name.toUpperCase()}`, value })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (state.password !== state.confirmPassword) {
            alert("Passwords Don't Match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                state.email,
                state.password
            );
            await createUserProfileDocument(user);
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <form className='signup-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
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
                <input
                    type='password'
                    name='confirmPassword'
                    value={state.confirmPassword}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                    required />

                <input type='submit' name='' value='Sign Up' />
                <p onClick={toggleIsFlipped}>Already have an account? Sign In</p>
            </form>
        </div>
    )
}

export default SignUp;