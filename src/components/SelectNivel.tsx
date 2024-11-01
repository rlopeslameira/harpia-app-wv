import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import { FORMA_INGRESSO, TIPO_CURSO } from '../utilities/constantes';

type Props = any;

const SelectNivel: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista(TIPO_CURSO)    
    }, [])

    return (
        <SCDropdown 
        name={name}
        label={label}
        control={control}
        errors={errors}
        options={lista}
        optionLabel='descricao'
        optionValue='value'
        {...props}
        />
    )
}

export default SelectNivel