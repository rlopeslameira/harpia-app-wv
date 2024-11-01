import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import { useToast } from '../context/ToastContext';
import apiCep from '../services/apiCep';
import { classNames } from 'primereact/utils';
import TagRequired from './shared/TagRequired';
import SCInputMask from './form/inputMask/SCInputMask';
import SCButton from './form/button/SCButton';
import SCInputText from './form/inputText/SCInputText';
import SelectCidade from './SelectCidade';
import { UF_LISTA } from '../utilities/constantes';
import api from '../services/api';
import { useAuth } from '../providers/auth';

type Props = any;

const FormEndereco: React.FC<Props> = ({ matricula, tipo, showDelete = false, required = false, ...props }) => {
  const toast = useToast();
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { periodoSelecionado } = useAuth();

  const { control, formState: { errors }, getValues, setValue, watch } = useFormContext();

  useEffect(() => {
    console.log('matricula', matricula);
    if (matricula){
      setLoading(true);
      api.get('/endereco', { params: { Matricula: matricula, Tipo: tipo } }).then(({ data }) => {
        setValue(`${tipo}Endereco`, data);        
      }).finally(() => {
        setLoading(false);
      });      
    }
  }, [matricula])

  const buscarCep = async () => {
    setLoadingCep(true);
    const cep = getValues()[`${tipo}Endereco`]?.Cep || '';
    if (cep.length < 8) {
      toast.showToast({ severity: 'error', summary: 'Erro', detail: 'CEP inválido' });
      setLoadingCep(false);
      return;
    }

    const { data } = await apiCep.get(`${cep.replace('-', '')}/json/`);
    if (data.erro) {
      toast.showToast({ severity: 'error', summary: 'Erro', detail: 'CEP não encontrado' });
      setLoadingCep(false);
      return;
    }

    const end = {
      Ano: periodoSelecionado?.Ano,
      Sequencial: periodoSelecionado?.Sequencial,
      Cep: data.cep,
      Logradouro: data.logradouro,
      Numero: data.numero || '',
      Complemento: data.complemento,
      Bairro: data.bairro,
      UF: data.uf,
      Cidade: data.localidade.toUpperCase(),
    }
    setValue(`${tipo}Endereco`, { ...end, Tipo: tipo, Matricula: matricula });
    setLoadingCep(false);
  }

  const copiaEnderecoAluno = (e: any) => {
    const end = e.target.value;

    switch (end) {
      case '=':
        {
          setValue(`${tipo}Endereco.Logradouro`, getValues('ALUNOEndereco.Logradouro'));
          setValue(`${tipo}Endereco.Cep`, getValues('ALUNOEndereco.Cep'));
          setValue(`${tipo}Endereco.Numero`, getValues('ALUNOEndereco.Numero'));
          setValue(`${tipo}Endereco.Complemento`, getValues('ALUNOEndereco.Complemento'));
          setValue(`${tipo}Endereco.Bairro`, getValues('ALUNOEndereco.Bairro'));
          setValue(`${tipo}Endereco.UF`, getValues('ALUNOEndereco.UF'));
          setValue(`${tipo}Endereco.Cidade`, getValues('ALUNOEndereco.Cidade'));
          break;
        }
      case 'PAI':
        {
          setValue(`${tipo}Endereco.Logradouro`, getValues('PAIEndereco.Logradouro'));
          setValue(`${tipo}Endereco.Cep`, getValues('PAIEndereco.Cep'));
          setValue(`${tipo}Endereco.Numero`, getValues('PAIEndereco.Numero'));
          setValue(`${tipo}Endereco.Complemento`, getValues('PAIEndereco.Complemento'));
          setValue(`${tipo}Endereco.Bairro`, getValues('PAIEndereco.Bairro'));
          setValue(`${tipo}Endereco.Uf`, getValues('PAIEndereco.UF'));
          setValue(`${tipo}Endereco.Cidade`, getValues('PAIEndereco.Cidade'));
          break;
        }
      case 'MAE':
        {
          setValue(`${tipo}Endereco.Logradouro`, getValues('MAEEndereco.Logradouro'));
          setValue(`${tipo}Endereco.Cep`, getValues('MAEEndereco.Cep'));
          setValue(`${tipo}Endereco.Numero`, getValues('MAEEndereco.Numero'));
          setValue(`${tipo}Endereco.Complemento`, getValues('MAEEndereco.Complemento'));
          setValue(`${tipo}Endereco.Bairro`, getValues('MAEEndereco.Bairro'));
          setValue(`${tipo}Endereco.UF`, getValues('MAEEndereco.UF'));
          setValue(`${tipo}Endereco.Cidade`, getValues('MAEEndereco.Cidade'));
          break;
        }
      case 'RESPON':
        {
          setValue(`${tipo}Endereco.Logradouro`, getValues('FINEndereco.Logradouro'));
          setValue(`${tipo}Endereco.Cep`, getValues('FINEndereco.Cep'));
          setValue(`${tipo}Endereco.Numero`, getValues('FINEndereco.Numero'));
          setValue(`${tipo}Endereco.Complemento`, getValues('FINEndereco.Complemento'));
          setValue(`${tipo}Endereco.Bairro`, getValues('FINEndereco.Bairro'));
          setValue(`${tipo}Endereco.UF`, getValues('FINEndereco.UF'));
          setValue(`${tipo}Endereco.Cidade`, getValues('FINEndereco.Cidade'));
          break;
        }
    }
  }

  return (
    <>
      <div className='grid'>
        <div className="col-3">
          <label
            htmlFor="CEP"
            className={classNames({
              'p-error': errors[`${tipo}Endereco.Cep`],
              block: true,
            })}>
            CEP {required && <TagRequired />}
          </label>
          <div className="p-inputgroup">
            <SCInputMask
              loading={loadingCep}
              control={control}
              errors={errors}
              name={`${tipo}Endereco.Cep`}
              mask='99999-999'
              maxLength={10}
              required={required}
            />
            {loadingCep ? (
              <SCButton style={{ maxHeight: 28 }} icon='pi pi-spin pi-spinner' className='w-2 p-button-info p-button-outlined' type='button' disabled />
            ) : (
              <SCButton style={{ maxHeight: 28 }} icon='pi pi-search' className='w-2 p-button-info p-button-outlined' type='button' onClick={buscarCep} />
            )}
          </div>

        </div>

        <div className="col-7">
          <SCInputText
            loading={loadingCep}
            control={control}
            errors={errors}
            style={{ textTransform: 'uppercase' }}
            name={`${tipo}Endereco.Logradouro`}
            label={`Endereço ${'PAI,MAE,FIN,ACA'.includes(tipo) ? '(= / PAI / MAE / RESPON)' : ''}`}
            required={required}
            disabled={showDelete}
            maxLength={60}
            onBlur={copiaEnderecoAluno}
          />
        </div>
        <div className="col-2">
          <SCInputText
            loading={loadingCep}
            control={control}
            errors={errors}
            style={{ textTransform: 'uppercase' }}
            name={`${tipo}Endereco.Numero`}
            label='Número'
            required={required}
            disabled={showDelete}
            maxLength={10}
            tooltip='Máximo de 10 caracteres'
            tooltipOptions={{ event: 'focus' }}
          />
        </div>
      </div>

      <div className='grid'>
        <div className="col-12">
          <SCInputText
            control={control}
            loading={loadingCep}
            errors={errors}
            style={{ textTransform: 'uppercase' }}
            name={`${tipo}Endereco.Complemento`}
            label='Complemento'
            disabled={showDelete}
            maxLength={60}
            tooltip='Máximo de 60 caracteres'
            tooltipOptions={{ event: 'focus' }}
          />
        </div>
      </div>

      <div className='grid'>
        <div className="col-5">
          <SCInputText
            loading={loadingCep}
            control={control}
            errors={errors}
            style={{ textTransform: 'uppercase' }}
            name={`${tipo}Endereco.Bairro`}
            label='Bairro'
            required={required}
            disabled={showDelete}
            maxLength={30}
            tooltip='Máximo de 30 caracteres'
            tooltipOptions={{ event: 'focus' }}
          />
        </div>
        <div className="col-3">
          <SCDropdown
            control={control}
            loading={loadingCep}
            errors={errors}
            name={`${tipo}Endereco.UF`}
            label='UF'
            options={UF_LISTA}
            optionLabel='nome'
            optionValue='sigla'
            required={required}
            disabled={showDelete}
          />
        </div>
        <div className="col-4">
          <SelectCidade
            loading={loadingCep}
            uf={watch(`${tipo}Endereco.UF`)}
            control={control}
            errors={errors}
            name={`${tipo}Endereco.Cidade`}
            required={required}
            disabled={showDelete}
            label='Cidade'
          />
        </div>
      </div>
    </>
  )
}

export default FormEndereco