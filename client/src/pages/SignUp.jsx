import React, { useState } from 'react';
import InputField from '../components/ui/InputField';
import { Link, Redirect } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { selectImage } from '../redux/recipe/recipe-selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postPatch, upload } from '../util/request-sender';
import { selectCurrentUser } from '../redux/user/user-selector';
import { setCurrentUser, setToken } from '../redux/user/user-actions';

const SignUp = ({ image, currentUser, setCurrentUser, setToken }) => {

  const [userState, setUserState] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });

  const validateUser = () => {

    if (!userState.name.trim()) {
      throw new Error('Name is mandatory.');
    }
    if (!userState.email.trim()) {
      throw new Error('Email is mandatory.');
    }
    if (!userState.password.trim()) {
      throw new Error('Password is mandatory.');
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
      console.log(error);
      alert(error.message);
    }
  };

  const onUserChange = event => {
    const { value, name } = event.target;

    setUserState({ ...userState, [name]: value });
  };

  return (
    <React.Fragment>
      {
        currentUser ? <Redirect to="/" /> :

          <div className='sign-up'>

            <div className="user-data">


              <div className="user-data__title">
                <h2 className="heading-primary">Create Account</h2>
              </div>

              <div className="user-data__container">

                <InputField>
                  <input type="text" name="name" id="user-data-user-name" placeholder="User Name" required value={userState.name}
                    onChange={onUserChange} />
                </InputField>

                <InputField>
                  <input type="email" name="email" id="user-data-email" placeholder="Email" required value={userState.email}
                    onChange={onUserChange} />
                </InputField>

                <InputField>
                  <input type="password" name="password" id="user-data-password" placeholder="Password" required value={userState.password}
                    onChange={onUserChange} />
                </InputField>

                <InputField>
                  <input type="password" name="confirmPassword" id="user-data-confirm-password" placeholder="Confirm Password" required
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
              <h2 className="heading-secondary text">Avatar</h2>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
