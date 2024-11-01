import React, { useCallback, useEffect, useState } from 'react'
import api from '../services/api';
import axios, { Canceler } from 'axios';
import SCAutoComplete from './form/autocomplete/SCAutoComplete';
import { useAuth } from '../providers/auth';
import IAluno from '../interfaces/IAlunos';

let cancel: Canceler;

type Props = any;

const SelectAlunoAutoComplete: React.FC<Props> = ({name, control, errors, label, setError, clearErrors, setValue, minLength=3, ...props}) => {
    
    const { periodoSelecionado } = useAuth();
    const [lista, setLista] = useState<IAluno[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const search = async (event: any): Promise<void> => {
        if (cancel !== undefined){
            cancel('Operação cancelada pelo usuário');
        }

        const query: string = event.query || event?.filter || '';
        if (query.trim().length < minLength){
            setError(name, {type: 'minLength', message: `Informe no mínimo ${minLength} caracteres`});
            setLista([]);
        }else{
            clearErrors(name);
            setLoading(true);
            const response = await api.get('/aluno/list', { 
            params: { 
                EmpresaId: periodoSelecionado?.EmpresaId,
                Nome: query.toUpperCase() }, 
                cancelToken: new axios.CancelToken(c => cancel = c) 
            });
            setLista(response.data?.map((a: any) => ({
                ...a,
                MatriculaNome: a.Matricula + ' - ' + a.Nome + ' (' + a.TurmaCodigo + ')'
            })));
            setLoading(false);
        }
    }

    


    return (
        <SCAutoComplete                         
            loading={loading}
            name={name}
            label={label}
            control={control}
            errors={errors}
            suggestions={lista}
            completeMethod={search}
            onSelect={async (e: any) => {
                if (e.value)
                {
                    const alu = lista.find((a: any) => a.AlunoId === e.value?.AlunoId);    
                    setValue('Aluno', alu);
                }
            }}
            field={'MatriculaNome'}
            dropdown
            forceSelection
            minLength={minLength}           
            className='w-full' 
            {...props}
        />
    )
}

export default SelectAlunoAutoComplete