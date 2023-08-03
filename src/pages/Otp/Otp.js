import React from "react";
import Button from '../../components/Button/Button';
import Form from './components/Form/Form';

function Otp({ valueLength, onChange, value, submitForm, loader, isLoading, isCorrectPassword, isUncorrectPassword }) {
  return (
    <>
      <Button />
      <Form 
      value={value} 
      valueLength={valueLength} 
      onChange={onChange}
      submitForm={submitForm}
      loader={loader}
      isLoading={isLoading}
      isCorrectPassword={isCorrectPassword}
      isUncorrectPassword={isUncorrectPassword}
      />
    </>
  );
}

export default Otp;