import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import IDropdown from '../interfaces/components/form/IDropdown';
import { PARENTESCO } from '../utilities/constantes';

const SelectParentesco: React.FC<IDropdown> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista(PARENTESCO)    
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

export default SelectParentesco