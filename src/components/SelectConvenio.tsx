import React, { useCallback, useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';

type Props = any;

const SelectConvenio: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        let isMounted = true
        setLoading(true);
        const load = async () => {
            const response = await api.get(`/convenio/list`);
            if (isMounted)
            {
                setLista(response.data);
                setLoading(false);
            }
        }
        
        load();

        return () => {
            isMounted = false
        }
    }, [])


    return (
        <SCDropdown 
        loading={loading}
        name={name}
        label={label}
        control={control}
        errors={errors}
        options={lista}
        showFilterClear
        filterBy='Descricao'
        optionLabel='Descricao'
        optionValue='ConvenioId'
        {...props}
        />
    )
}

export default SelectConvenio