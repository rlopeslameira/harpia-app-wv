import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';

type Props = any;

const SelectOrigem: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        let isMounted = true
        api.get('/origens').then(({data}: any) => {
            if (isMounted)
                setLista(data);                                
        }).catch((error: any) => {
            console.log('Erro ao carregar origens', error);
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
        optionValue='Codigo'
        {...props}
        />
    )
}

export default SelectOrigem