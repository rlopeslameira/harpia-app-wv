import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';

type Props = any;

const SelectCorRaca: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista([
            { label: 'Branco', value: '1' },
            { label: 'Preto', value: '2' },
            { label: 'Pardo', value: '3' },
            { label: 'Amarelo', value: '4' },
            { label: 'Indígena', value: '5' },
            { label: 'Não declarado', value: '6' },
            { label: 'Não dispõe da informação', value: '0' }
        ])
    
    }, [])

    return (
        <SCDropdown 
        name={name}
        label={label}
        control={control}
        errors={errors}
        options={lista}
        {...props}
        />
    )
}

export default SelectCorRaca