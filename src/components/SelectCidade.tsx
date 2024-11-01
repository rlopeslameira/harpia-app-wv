import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import apiIBGE from '../services/apiIBGE';

type Props = any;

const SelectCidade: React.FC<Props> = ({name, control, errors, label, loading, uf='PA', ...props}) => {

    const [lista, setLista] = useState<any>([]);

    useEffect(() => {
        let isMounted = true
        const load = async () => {
            const response = await apiIBGE.get(`/v1/localidades/estados/${uf}/municipios`);
            if (isMounted)
                setLista(response.data?.map((item: any) => ({nome: item.nome.toUpperCase()})));
        }
        
        load();

        return () => {
            isMounted = false
        }
    }, [uf])


    return (
        <SCDropdown 
            loading={loading}
            name={name}
            label={label}
            control={control}
            errors={errors}
            options={lista}
            showFilterClear
            filterBy='nome'
            optionLabel='nome'
            optionValue='nome'
            {...props}
        />
    )
}

export default SelectCidade