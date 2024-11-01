import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import { FORMA_INGRESSO } from '../utilities/constantes';

type Props = any;

const SelectFormaIngresso: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista(FORMA_INGRESSO)    
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

export default SelectFormaIngresso