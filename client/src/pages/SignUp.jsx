import React, { useState } from 'react';
import InputField from '../components/ui/InputField';
import { Link, Redirect } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { selectImage } from '../redux/recipe/recipe-selector';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postPatch, upload } from '../util/request-sender';
import { selectCurrentUser } from '../redux/user/user-selector';
import { setCurrentUser, setToken } from '../redux/user/user-actions';
import { displayMessage } from '../redux/message/message-actions';
import DisplayMessage from '../components/ui/DisplayMessage';

const SignUp = ({ image, currentUser, setCurrentUser, setToken, displayMessage }) => {

  const [userState, setUserState] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });

  const { type, message } = useSelector(state => state.message);

  const validateUser = () => {

    if (!userState.name.trim()) {
      throw new Error('User Name is mandatory.');
    }
    if (!userState.email.trim()) {
      throw new Error('Email is mandatory.');
    }
    if (!userState.password.trim()) {
      throw new Error('Password is mandatory.');
    }
    if (userState.password.length < 4 ) {
      throw new Error('Password has to contain at least 4 characters.');
    }
    if (!userState.confirmPassword.trim()) {
      throw new Error('Confirm Password is mandatory.');
    }
    if (userState.password != userState.confirmPassword) {
      throw new Error("Password and Confirm Password don't match.");
    }
  }

  const onSignUpClick = async () => {
    try {

      validateUser();

      const { user, token } = await postPatch('/users', 'POST', userState);

      if (image) {
        await upload('/users/me/avatar', image, null, token);
      }

      setCurrentUser(user);
      setToken(token);
    } catch (error) {
      window.scrollTo(0, 0);
      displayMessage({type:'error', message: error.message});
    }
  };

  const onUserChange = event => {
    const { value, name } = event.target;

    setUserState({ ...userState, [name]: value });
  };

  return (
    <React.Fragment>
      {
          type && message ? <DisplayMessage type={type} message={message} /> : null
      }

      {
        currentUser ? <Redirect to="/" /> :


          <div className='sign-up'>


            <div className="user-data">


              <div className="user-data__title title-margin">
                <h2 className="heading-primary">Sign Up</h2>
              </div>

              <div className="user-data__container">

                <InputField>
                  <input type="text" name="name" id="user-data-user-name" className="input-margin" placeholder="User Name" required value={userState.name}
                    onChange={onUserChange} />
                </InputField>

                <InputField>
                  <input type="email" name="email" id="user-data-email" className="input-margin" placeholder="Email" required value={userState.email}
                    onChange={onUserChange} />
                </InputField>

                <InputField>
                  <input type="password" name="password" id="user-data-password" className="input-margin" placeholder="Password" required value={userState.password}
                    onChange={onUserChange} />
                </InputField>

                <InputField>
                  <input type="password" name="confirmPassword" id="user-data-confirm-password" className="input-margin" placeholder="Confirm Password" required
                    value={userState.confirmPassword} onChange={onUserChange} />
                </InputField>
              </div>


              <div className="user-data__button-container">

                <button onClick={onSignUpClick}>Sign Up</button>

                <Link className="user-data__button-container--sign-in" to='/login'>
                  Login
                </Link>
              </div>
            </div>

            <div className="sign-up__avatar">
              <h2 className="heading-primary title-margin">Avatar</h2>
              <ImageUpload />
            </div>
          </div>
      }
    </React.Fragment >
  );
}

const mapStateToProps = createStructuredSelector({
  image: selectImage,
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setToken: token => dispatch(setToken(token)),
  displayMessage: msgObj => dispatch(displayMessage(msgObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
