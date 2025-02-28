import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { signUpStart } from '../../redux/user/userActions';
import { selectError, selectFetching, selectDone } from '../../redux/user/userSelectors';
//import useWindowSize from 'react-use/lib/useWindowSize'


import {
  validateEmail,
  validateFullName,
  validateUsername,
  validatePassword,
  validatePronoun,
  validateBirthday
} from '../../utils/validation';

import Button from '../Button/Button';
import TextButton from '../Button/TextButton/TextButton';
import Divider from '../Divider/Divider';
import Card from '../Card/Card';
import FormInput from '../FormInput/FormInput';

const SignUpCard = ({ signUpStart, error, fetching, done }) => {

   // const { width, height } = useWindowSize()
  const history = useHistory()

  const validate = (values) => {
    const errors = {};
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    const fullNameError = validateFullName(values.fullName);
    if (fullNameError) errors.fullName = fullNameError;

    const proNounError = validatePronoun(values.pronoun);
    if (proNounError) errors.pronoun = proNounError;

    const birthdayError = validateBirthday(values.birthday);
    if (birthdayError) errors.birthday = birthdayError;

    const usernameError = validateUsername(values.username);
    if (usernameError) errors.username = usernameError;

    const passwordError = validatePassword(values.password);
    if (passwordError) errors.password = passwordError;
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      pronoun:'',
      username: '',
      birthday: '',
      password: '',
    },
    validate,
    onSubmit: async (values) =>{
      let userdata = {
        email: values.email,
        fullName: values.fullName,
        pronoun: values.pronoun,
        birthday: values.birthday,
        username: values.username,
        password: values.password,
      }
      signUpStart(userdata)
    }
      
  });

  if(done){
    history.push('/signupdone')
  }

  return (
    <Fragment>
      <Card className="form-card">
        <h1 className="heading-logo text-center">Dogegram</h1>
        <h2
          style={{ fontSize: '1.7rem' }}
          className="heading-2 color-grey text-center"
        >
          Join us, make more friends and stay happy!
        </h2> 
        {Object.keys(formik.errors).map((field) => {
          if (formik.touched[field]) {
            return (
              <p
                className="error"
                key={formik.errors[field]}
                style={{ marginTop: '0' }}
              >
                {formik.errors[field]}
              </p>
            );
          }
        })}
        <form className="form-card__form" onSubmit={formik.handleSubmit}>
          <FormInput
            name="email"
            fieldProps={formik.getFieldProps('email')}
            valid={formik.touched.email && !formik.errors.email}
            placeholder="Email address"
          />
         <FormInput
            name="fullName"
            fieldProps={formik.getFieldProps('fullName')}
            valid={formik.touched.fullName && !formik.errors.fullName}
            placeholder="Full Name"
          />
          <FormInput
            name="pronoun"
            fieldProps={formik.getFieldProps('pronoun')}
            valid={formik.touched.pronoun && !formik.errors.pronoun}
            placeholder="Pronoun (What you would like people to call you)"
          />
          <FormInput 
          type="date" 
          name="birthday" 
          placeholder="Your Birthday"
          valid={formik.touched.birthday && !formik.errors.birthday}
          fieldProps={formik.getFieldProps('birthday')}
          />
          <FormInput
            name="username"
            fieldProps={formik.getFieldProps('username')}
            valid={formik.touched.username && !formik.errors.username}
            placeholder="Username"
          />
          <FormInput
            name="password"
            fieldProps={formik.getFieldProps('password')}
            placeholder="Password"
            valid={formik.touched.password && !formik.errors.password}
            type="password"
          />
          <Button
            loading={fetching}
            style={{backgroundColor: done ? '#4caf50' : undefined}}
            disabled={
              done ? true : (Object.keys(formik.touched).length === 0 ? true : !formik.isValid)
            }
          >
            {done ? "Done ✔" : "Sign Up" }
          </Button>
          <p></p>
        </form>
        <p className="done">
          {done
            ? done.message
            : null
            }
        </p>
        <p className="error">
          {error
            ? error
            : formik.submitCount > 0 && Object.values(formik.errors)[0]}
        </p>
        <p className="heading-5 color-grey">
          By signing up, you agree to our <a herf="https://dogegram.xyz/terms"> Terms & conditions </a> and Privacy Policy which are pretty simple anyway you just need to make a look there.
        </p>
        <p className="color-grey" style={{fontSize:'1rem'}}>
        Problems? hit up for support at signup@dogegram.xyz
        </p>
      </Card>
      <Card>
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <h4 style={{ marginRight: '5px' }} className="heading-4 font-thin">
            Have an account?
          </h4>
          <Link to="/login">
            <TextButton medium blue bold>
              Log in
            </TextButton>
          </Link>
        </section>
      </Card>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, fullName, birthday, username, password) =>
    dispatch(signUpStart(email, fullName, birthday, username, password)),
});

const mapStateToProps = createStructuredSelector({
  error: selectError,
  fetching: selectFetching,
  done: selectDone,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpCard);
