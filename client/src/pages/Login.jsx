import React, { useState } from 'react';
import InputField from '../components/ui/InputField';
import { Link, Redirect } from 'react-router-dom';
import { postPatch } from '../util/request-sender';
import { connect } from 'react-redux';
import { setCurrentUser, setToken } from '../redux/user/user-actions';
import { selectCurrentUser } from '../redux/user/user-selector';
import { createStructuredSelector } from 'reselect';

const Login = ({ currentUser, setCurrentUser, setToken }) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const onLoginClick = async event => {

        try {
            const { user, token } = await postPatch('/users/login', 'POST', credentials);
            setCurrentUser(user);
            setToken(token);
        } catch (error) {
            alert(error.message);
        }
    };

    const onUserChange = event => {
        const { value, name } = event.target;

        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <React.Fragment>
            {
                currentUser ? <Redirect to="/" /> :

                    <div className='login'>

                        <div className="login__title ">
                            <h2 className="heading-primary title-margin">Login</h2>
                        </div>

                        <div className="login__container">

                            <InputField>
                                <input className="input-margin" type="email" name="email" id="login-email" placeholder="Email" required value={credentials.email}
                                    onChange={onUserChange} />
                            </InputField>

                            <InputField>
                                <input className="input-margin" type="password" name="password" id="login-password" placeholder="Password" required value={credentials.password}
                                    onChange={onUserChange} />
                            </InputField>
                        </div>

                        <div className="login__button-container">

                            <button onClick={onLoginClick}>Login</button>

                            <Link className="login__button-container--sign-up" to='/signUp'>
                                Create Account
                </Link>
                        </div>
                    </div>
            }
        </React.Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setToken: token => dispatch(setToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
