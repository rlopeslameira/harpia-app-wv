import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';

type Props = any;

const SelectPerfil: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        let isMounted = true
        api.get('/perfil/list').then(({data}) => {
            if (isMounted)
                setLista(data);
        }).catch(error => {
            console.log('Erro ao carregar perfis', error);
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
        optionLabel='DescricaoDropdown'
        optionValue='PerfilId'        
        {...props}
        />
    )
}

export default SelectPerfil