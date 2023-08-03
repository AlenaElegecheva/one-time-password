import React, { useMemo, useState, useEffect } from 'react';
import styles from './Form.module.css';
import { REGEX_DIGIT } from '../../../../utils/constants';
import ProcessingHeading from '../../../../components/ProcessingHeading/ProcessingHeading';
import classNames from 'classnames';

function Form({ value, valueLength, onChange, submitForm, isLoading, isCorrectPassword, isUncorrectPassword }) {
  // таймер
  const [seconds, setSeconds] = useState(59);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(setSeconds, 1000, seconds - 1);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  const inputPasswordClass = classNames(styles.password, {
    [styles.passwordCorrect]: isCorrectPassword,
    [styles.passwordUncorrect]: isUncorrectPassword,
  });


  // логика otp
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (REGEX_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }
    return items;
  }, [value, valueLength]);

  const inputOnChange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = REGEX_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' '; // разрешаем пустой инпут чтобы можно было удалять

    const targetValueLength = targetValue.length;
    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);
      onChange(newValue);
      if (!isTargetValueDigit) {
        return;
      }

      const nextElementSibling = target.nextElementSibling; // устанавливаем фокус на следующем инпуте
      if (nextElementSibling) {
        nextElementSibling.focus();
      }

    } else if (targetValueLength === valueLength) {
      onChange(targetValue);
      target.blur(); // убираем фокус
    }
    console.log(valueItems)
  };

  const inputOnKeyDown = (e) => { // удаляем цифры из инпута
    const target = e.target;
    const targetValue = target.value;

    target.setSelectionRange(0, targetValue.length); // устанавливаем начало диапазона в начало инпута, чтобы заменять цифру в фокусном инпуте

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }

    const previousElementSibling = target.previousElementSibling; // ставим фокус на предыдущем импуте, если уже удалил
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnFocus = (e) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Verify Your Number</h1>
      <p className={styles.formDescription}>Enter the OTP we sent to +7-111-111-11-11</p>
      <form className={styles.form} id="form" name='form' onSubmit={submitForm} noValidate>
        {valueItems.map((digit, idx) => (
          <input
            key={idx}
            className={inputPasswordClass}
            name='password'
            id={`password-input-${idx}`}
            type='text'
            inputMode='numeric'
            autoComplete='one-time-code'
            pattern='\d{1}'
            maxLength={valueLength}
            value={digit}
            onChange={(e) => inputOnChange(e, idx)}
            onKeyDown={inputOnKeyDown}
            onFocus={inputOnFocus}
            onBlur={submitForm}
            required
          ></input>
        ))}
      </form>
      {timerActive && !isLoading &&!isCorrectPassword && <ProcessingHeading text={`Having trouble? Request a new OTP in 00:${seconds.toString().padStart(2, '0')}`} />}
      {!timerActive && !isLoading && <ProcessingHeading text={'Having trouble?'} link={'Request a new OTP'} />}
      {isLoading && <ProcessingHeading text={'Verifying OTP...'} />}
      {isCorrectPassword && <ProcessingHeading isCorrectPassword={isCorrectPassword} text={'OTP is correct!'} />}
      {isCorrectPassword && <ProcessingHeading text={'Redirecting to your account...'} />}
      {isUncorrectPassword && !isLoading && <ProcessingHeading isUncorrectPassword={isUncorrectPassword} text={'Seems that entered OTP is not correct.'} />}
    </div>
  )
}

export default Form;