import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import { SITUACAO_FINAL_ALUNO } from '../utilities/constantes';

type Props = any;

const SelectSituacaoFinal: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        setLista(SITUACAO_FINAL_ALUNO)    
    
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

export default SelectSituacaoFinal