import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useAuth } from '../../providers/auth';
import { useNavigate } from 'react-router';

import config from '../../utilities/config';
import SCInputMask from '../../components/form/inputMask/SCInputMask';
import SCPassword from '../../components/form/password/SCPassword';
import SCButton from '../../components/form/button/SCButton';
import SCInputText from '../../components/form/inputText/SCInputText';
import {Card} from 'primereact/card'

import styles from './Styles';

const LoginScreen = () => {
  
  const navigate = useNavigate();
    
    const { signIn, isLoged, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = {
        Codigo: '12345',
        Matricula: '1234567',
        Senha: '@password*',
    }

    const uform = useForm({defaultValues})

    const { control, handleSubmit, formState: {errors} } = uform;
   
    const onSubmit = async ({Email, Senha}) =>{
        setIsLoading(true);
        const resLogin = await signIn({Email, Senha});
        setIsLoading(false);
        // toast.success('Login efetuado com sucesso!');
        navigate('/dashboard');

        // if (!resLogin?.Error)
        // {
        //     toast.showToast({severity: 'success', summary:'Login', detail: 'Login efetuado com sucesso!', life: 3000});
        //     navigate('/Periodos');
        // }
        // else
        //     toast.showToast({ severity: 'error', summary: 'Atenção', detail: resLogin?.Error, life: 3000});
    }    

    useEffect(() => {
        if (isLoged)
            navigate('/dashboard');
    }, [isLoged])
 
 

  if (isLoading || loading ) 
    return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logo}>
        <span>LOGO</span>
      </div>

      <Card style={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={styles.formGroup}>
            <SCInputMask
            label='Código do Cliente'
              id="Codigo"
              name="Codigo"
              errors={errors}
              control={control}
              mask="99999"
              placeholder="Digite o código da Instituição"
              required={true}
              maxLength={5}
              className="w-full"
            />
          </div>

          {/* Matrícula */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="registration">
            </label>
            <SCInputText
              label="Matrícula"
              id="Matricula"
              name="Matricula"
              errors={errors}
              control={control}
              placeholder="Digite sua matrícula"
              className="w-full"
            />
          </div>

          {/* Senha */}
          <div style={styles.formGroup}>
            <SCPassword
              label="Senha"
              id="senha"
              name='senha'
              control={control}
              errors={errors}
              placeholder="Digite sua senha"
              toggleMask
              feedback={false}
              className="w-full"
            />
          </div>

          {/* Botão de Login */}
          <SCButton
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            severity="primary"
            style={styles.button}
            size="large"
          />
        </form>
      </Card>

      {/* Versão do App */}
      <div style={styles.version}>
        {config.versao}
      </div>
    </div>
  );
};

export default LoginScreen;