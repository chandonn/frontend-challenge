import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import * as Theme from '@theme';
import { UserContext } from '@providers';
import { useForm } from 'react-hook-form';
import { createSupportTicket } from '@api';

/* TODO:
### Layout
1. Implement a layout with a menu on the left and views on the right. Use grid and/or flexbox.
2. Implement a way to navigate between base and support views. Use "react-router-dom".

### Base view
1. Display user's full name and their email. Use UserProvider's functionality (see providers.js)
2. Display user's masked phone number, and implement a way to unmask it. Use UserProvider's context.
3. Display user's address.

### Support view
1. Use your preferred form library to implement a form that will call API's createSupportTicket.
2. Display a success message after the form is submitted.
Make sure to handle field validation.
*/

const menuStyle = {
  display: 'flex',
  'flex-direction': 'column',
  height: '100vh',
  OverflowY: 'scroll',
  maxWidth: '200px',
  flexGrow: '1',
  padding: '24px'
};

const linkStyles = {
  textDecoration: 'none',
  fontSize: '20px',
  marginTop: '16px'
}

const Menu = () => {
  return (
    <div id="menu" style={menuStyle}>
      <Link to="/profile" style={linkStyles}>Base</Link>
      <Link to="/profile/support" style={linkStyles}>Support</Link>
    </div>
  );
};

export const BaseView = () => {
  const { user, phone, togglePhoneMask } = useContext(UserContext)
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState(true)

  const handleToggle = () => {
    setMaskedPhoneNumber(current => !current)
    togglePhoneMask(maskedPhoneNumber)
  }

  return (
    <div id="base-view">
      {user ? (
        <main>
          <p>
            <span>Full name: </span>
            <span>{`${user.first_name} ${user.last_name}`}</span>
          </p>
          <p>
            <span>Email: </span>
            <span>{user.email}</span>
          </p>
          <p>
            <span>Phone number: </span>
            <div>
              <span>{phone}</span>
              <button type='button' onClick={handleToggle}>{maskedPhoneNumber ? "Mask" : "Unmask"}</button>
            </div>
          </p>
          <p>
            <span>Address: </span>
            <span>{`${user.address.line1}, ${user.address.city}, ${user.address.state} (${user.address.country})`}</span>
          </p>
        </main>
      ) : (
        <div>
          Loading...
        </div>
      )}
    </div>
  ); 
};

const supportFormStyle = {
  display: 'flex',
  'flex-direction': 'column',
  width: '100%',
  maxWidth: '500px'
}

const supportViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  'flex-direction': 'column',
  height: 'inherit'
}

export const SupportView = () => {
  const { register, handleSubmit, formState } = useForm()
  const [success, setSuccess] = useState(false)

  const onFormSubmit = (data: { title: string, message: string }) => {
    createSupportTicket(data.title, data.message).then(response => {
      if (response?.message) {
        setSuccess(true)

        setTimeout(() => {
          setSuccess(false)
        }, 5000);
      }
    })
  }
  
  return (
    <div id="support-view" style={supportViewStyle}>
      {success ? <p>Ticket created with success!</p> : null}

      <form onSubmit={handleSubmit(onFormSubmit)} style={supportFormStyle}>
        <label htmlFor="title">Title</label>
        <input
          name='title'
          id='title'
          aria-invalid={formState?.errors["title"]?.type === "required"}
          type="text"
          placeholder='Give it a title'
          {...register("title", { required: true })}
        />
        {formState?.errors["title"]?.type === "required" ? (
          <p role='alert'>The title is required</p>
        ) : null}

        <label htmlFor="message">Message</label>
        <textarea
          name='message'
          id='message'
          aria-invalid={formState?.errors["message"]?.type === "required" || formState?.errors["message"]?.type === "minLength"}
          placeholder='Describe the ticket'
          {...register("message", { required: true, minLength: 80 })}
        />
        {formState?.errors["message"]?.type === "required" ? (
          <p role='alert'>A message is required</p>
        ) : null}
        {formState?.errors["message"]?.type === "minLength" ? (
          <p role='alert'>The message needs to have at least 80 characters</p>
        ) : null}

        <button type='submit'>create ticket</button>
      </form>
    </div>
  );
};

const profileStyle = {
  backgroundColor: Theme.colors.beige,
  width: '100vw',
  height: '100vh',
  display: 'flex'
};

const viewsStyle = {
  height: 'inherit',
  flexGrow: '1'
}

export const Profile = () => {
  return (
    <div id="profile" style={profileStyle}>
      <Menu />
      <div id="views" style={viewsStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
