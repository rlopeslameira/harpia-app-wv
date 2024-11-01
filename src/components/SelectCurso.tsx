import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';

type Props = any;

const SelectCurso: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        let isMounted = true

        api.get('/curso').then(({data}) => {
            if (isMounted)            
                setLista(data);
        }).catch(error => {
            console.log('Erro ao carregar cursos', error);
        })

        return () => { isMounted = false };
    }, [])

    return (
        <SCDropdown 
        loading={lista.length === 0}
        name={name}
        label={label}
        control={control}
        errors={errors}
        options={lista}
        optionLabel='Descricao'
        optionValue='CursoId'
        {...props}
        />
    )
}

export default SelectCurso