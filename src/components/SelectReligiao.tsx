import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';

type Props = any;

const SelectReligiao: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista([
            { label: 'Não Informado', value: '0' },
            { label: 'Católica', value: '1' },
            { label: 'Evangélica', value: '2' },
            { label: 'Espírita', value: '3' },
            { label: 'Atau', value: '4' },
            { label: 'Judeu', value: '5' },
            { label: 'Umbanda, candomblé ou outra Afro-Brasileira', value: '6' },
            { label: 'Outra', value: '7' }
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

export default SelectReligiao