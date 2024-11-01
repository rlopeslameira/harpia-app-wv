import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { Image } from 'primereact/image';
import semFoto from '../assets/sem-foto.png';
import imageResize from 'image-resize'

import './AlunoResumo.css';
import SCButton from './form/button/SCButton';

interface Props {
  foto?: string;
  alteraFoto?: boolean;
  name?: string;
  setValue(name: string, value: any): void;
};

const Foto: React.FC<Props> = ({name='Foto', alteraFoto=false, foto, ...props}) => {
  const [loadingFoto, setLoadingFoto] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const imgUpload = async () => {
    setLoadingFoto(true);
    if (inputRef?.current?.files && inputRef?.current?.files?.length > 0) 
    {
      let res = await imageResize(inputRef?.current.files[0], {
        width: 800,
        outputType: 'base64',
        quality: 0.7,        
      });
      props.setValue(name, res);
    }
    setLoadingFoto(false);
  };

  return (
    <>
        <div className="thumbnail-wrapper" style={{ width: 100, height: 116, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            name="myImage"
            onChange={imgUpload}
          />
          {loadingFoto ?
            <div className='flex w-full align-items-center justify-content-center '><i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i></div>
            : (
              <a onClick={() => alteraFoto && (inputRef?.current?.click())}><Image imageClassName='border-round-md border-1' src={foto || semFoto} alt="sem-foto" width='100' height='116' /></a>
            )}
            {alteraFoto && (
            <SCButton
              type='button'
              style={{ width: '100%', marginTop: 1, fontSize: '0.8rem'}}
              label='Alterar Foto'
              onClick={() => inputRef?.current?.click()}/>
            )}
        </div>
    </>
  )
}

export default Foto