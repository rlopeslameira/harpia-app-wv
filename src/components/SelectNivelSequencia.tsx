import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';
import { useAuth } from '../providers/auth';

type Props = any;

const SelectNivelSequencia: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        let isMounted = true
        api.get('/nivelSequencia/list').then(({data}) => {
            if (isMounted)
                setLista(data);
        }).catch(error => {
            console.log('Erro ao carregar niveis/sequenciais', error);
        })

        return () => { isMounted = false };
    }, [])

    return (
        <SCDropdown 
        name={name}
        label={label}
        control={control}
        errors={errors}
        options={lista}
        optionLabel='Descricao'
        optionValue='NivelSequenciaId'        
        {...props}
        />
    )
}

export default SelectNivelSequencia