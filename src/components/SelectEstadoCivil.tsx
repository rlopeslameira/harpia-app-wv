import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import { TIPO_ESTADO_CIVIL } from '../utilities/constantes';

type Props = any;

const SelectEstadoCivil: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista(TIPO_ESTADO_CIVIL)
    
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

export default SelectEstadoCivil