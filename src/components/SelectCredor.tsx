import React, { useCallback, useEffect, useState } from 'react'
import api from '../services/api';
import axios, { Canceler } from 'axios';
import SCAutoComplete from './form/autocomplete/SCAutoComplete';

let cancel: Canceler;

type Props = any;

const SelectCredor: React.FC<Props> = ({name, control, errors, label, setError, clearErrors, setValue, loading, minLength=3, ...props}) => {
    
    const [lista, setLista] = useState<any>([]);

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
            const response = await api.get('/credor/list', { params: { nome: query.toUpperCase() }, cancelToken: new axios.CancelToken(c => cancel = c) });
            setLista(response.data);
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
            onSelect={(e: any) => {
                if (e.value)
                {
                    setValue('CredorId', e.value?.CredorId);
                    setValue('Nome', e.value?.Nome);
                }
            }}
            field={'Nome'}
            dropdown
            minLength={minLength}            
            {...props}
        />
    )
}

export default SelectCredor