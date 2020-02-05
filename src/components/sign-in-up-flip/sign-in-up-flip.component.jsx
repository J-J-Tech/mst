import React from 'react';

import ReactCardFlip from 'react-card-flip';

import useToggle from '../../hooks/useToggle';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInUpFlip = () => {
    const [isFlipped, toggleIsFlipped] = useToggle(false);

    return (
        <div>
            <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection='horizontal'
                flipSpeedFrontToBack='1'
                flipSpeedBackToFront='1'
            >
                <SignIn toggleIsFlipped={toggleIsFlipped} />
                <SignUp toggleIsFlipped={toggleIsFlipped} />
            </ReactCardFlip>
        </div>
    )
}

export default SignInUpFlip;