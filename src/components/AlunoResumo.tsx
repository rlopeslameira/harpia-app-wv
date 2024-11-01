import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { useToast } from '../context/ToastContext';
import SCInputText from './form/inputText/SCInputText';
import { SITUACAO_ALUNO, UF_LISTA } from '../utilities/constantes';
import { IAlunoForm } from '../interfaces/IAlunos';
import { Image } from 'primereact/image';
import api from '../services/api';
import semFoto from '../assets/sem-foto.png';
import pendenciaFinanceira from '../assets/icons/pendencias-financeira.png';
import pendenciaDocumentos from '../assets/icons/pendencias-documentos.png';
import alunoNovo from '../assets/icons/new-icon.png';
import imageResize from 'image-resize'

import './AlunoResumo.css';
import SCButton from './form/button/SCButton';

interface Props {
  aluno: IAlunoForm;
  mostraTurma?: boolean;
  mostraFoto?: boolean;
  mostraPlanoPagamento?: boolean;
  alteraFoto?: boolean;
};

const AlunoResumo: React.FC<Props> = ({ mostraTurma = false, mostraFoto = false, mostraPlanoPagamento = false, alteraFoto=false, aluno }) => {
  const { control, formState: { errors }, getValues, setValue, reset, watch } = useFormContext();
  const [loadingFoto, setLoadingFoto] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const watchFoto = watch('Foto')
  
  const imgUpload = async () => {
    if (inputRef?.current?.files && inputRef?.current?.files?.length > 0) 
    {
      let res = await imageResize(inputRef?.current.files[0], {
        width: 800,
        outputType: 'base64',
        quality: 0.7,        
      });
      setValue('Foto', res);
    }
  };

  const carregaFoto = async () => {
    setLoadingFoto(true);
    const resultFoto = await api.get('/aluno/foto', {
      params: { Matricula: aluno.Matricula }
    })
    setValue('Foto', resultFoto.data.Foto);
    setLoadingFoto(false);
  }

  useEffect(() => {
    let isMounted = true
    
    if (aluno.Matricula)
      if (isMounted)
        carregaFoto();

    return () => { isMounted = false };
  }, [aluno.Matricula])

  return (
    <>
      {mostraFoto && (
        <div className="thumbnail-wrapper" style={{ width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
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
              <a onClick={() => alteraFoto && (inputRef?.current?.click())}><Image imageClassName='border-round-md' src={watchFoto || semFoto} alt="sem-foto" width='100' height='116' /></a>
            )}
            {alteraFoto && (
            <SCButton
              style={{ width: '100%', marginTop: 1, fontSize: '0.8rem'}}
              label='Alterar Foto'
              onClick={() => inputRef?.current?.click()}/>
            )}
        </div>
      )}
      <div className="col-10">
        <div className='grid'>
          <div className="col-2">
            <SCInputText
              style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold', fontSize: '1.5rem' }}
              name='Matricula'
              value={aluno.Matricula}
              label='Matrícula'
              disabled
            />
          </div>

          <div className="col-6">
            {aluno.Matricula ? (
              <SCInputText
                style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold', fontSize: '1.5rem' }}
                name='Nome'
                value={aluno.Nome}
                label='Nome'
                disabled                
              />          
            ):(
              <SCInputText
                autoFocus                
                autoComplete='no'                
                style={{ textTransform: 'uppercase', color: '#0f97c7', fontWeight: 'bold', fontSize: '1.5rem' }}
                name='Nome'
                control={control}
                errors={errors}                
                label='Nome'
              />
            )}   
          </div>   
          <div className="col-2">
            <SCInputText
              style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold', fontSize: '1.5rem' }}
              value={aluno?.AlunosPeriodo?.NumeroOrdem || ''}
              label='Nº Ordem'
              disabled
            />
          </div>   
          <div className="col-2 flex justify-content-between">
            {aluno?.AlunoNovo && (<Image className='border-200' src={alunoNovo} alt="Aluno Novo" width='40' height='40'/>)}            
            <Image className='border-200' src={pendenciaFinanceira} alt="sem-foto" width='40' height='40'/>
            {(aluno?.DataDeferimento == undefined) && (<Image className='border-200' src={pendenciaDocumentos} alt="sem-foto" width='40' height='40'/>)}
          </div>                   
        </div>

        <div className='grid'>

          <div className="col-2">
            <SCInputText
              style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold' }}
              defaultValue={SITUACAO_ALUNO.find(x => x.value == aluno?.AlunosPeriodo?.SituacaoAcademica)?.descricao}
              label='Situação'
              disabled
            />
          </div>
          {mostraTurma && (
            <div className="col-6">
              {aluno?.Turma ? (
                <SCInputText
                  style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold' }}
                  value={`${aluno.Turma?.Codigo} - ${aluno.TurmaDescricao}`}
                  label='Turma'
                  disabled
                />
              ) : (
                <SCInputText
                  style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold' }}
                  value={`Não informado.`}
                  label='Turma'
                  disabled
                />
                )}
              </div>
            )}

            {mostraPlanoPagamento && (
              <div className="col-4">
                  <SCInputText
                    style={{ textTransform: 'uppercase', border: 'none', color: '#0f97c7', fontWeight: 'bold' }}
                    defaultValue={aluno?.PlanoPagamentoCodigo ? `${aluno?.PlanoPagamentoCodigo} - ${aluno?.PlanoPagamentoDescricao}` : 'Não informado.'}
                    label='Plano de Pagamento'
                    disabled
                  />
              </div>
            )}

         
        </div>       
      </div>
      
    </>
  )
}

export default AlunoResumo