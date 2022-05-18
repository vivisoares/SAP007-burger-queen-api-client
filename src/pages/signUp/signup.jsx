import React from 'react';

import useFormSignup from './useSignupForm';

import logo from '../../img/logo.png'
import styles from '../login/login-signup.modules.css'

const SignUp = () => {
  const { handleChange, handleSubmit, error } = useFormSignup();
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <picture>
          <img src={logo} alt='Logo Vai Dar Bom' className={styles.logo} />
        </picture>
        <form>
          <h2 className={styles.formTitle}>Cadastro</h2>
          <input className={styles.inputForm} type='text' name='name' placeholder='Nome completo' autoComplete='off' onChange={handleChange}/>
          <input className={styles.inputForm} type='email' placeholder='username@example.com' name='email' autoComplete='off' onChange={handleChange}/>
          <input className={styles.inputForm} type='password' placeholder='Senha' name='password' onChange={handleChange} />
          <span className={styles.errorMessage}>{error}</span>
          <div className={styles.registrationSection}>
            <select className={styles.selectForm} autoComplete='off' name='role' onChange={handleChange}>
              <option className={styles.optionSelectForm} value=''>Cargo</option>
              <option className={styles.optionSelectForm} value='attendant'>Atendente</option>
              <option className={styles.optionSelectForm} value='chef'>Chef de Cozinha</option>
            </select>
            <button className={styles.btnRegister} type='submit' onClick={handleSubmit}>Cadastrar</button>  
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp;