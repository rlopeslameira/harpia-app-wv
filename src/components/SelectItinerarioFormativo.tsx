import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';

type Props = any;

const SelectItinerarioFormativo: React.FC<Props> = ({name, label, control, errors, ...props}) => {

    const [lista, setLista] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        let isMounted = true
        setLoading(true);
        api.get('itinerarios/list').then(({data}) => {
            if (isMounted)
            {
                setLista(data);
                setLoading(false);
            }
        }).catch(error => {
            console.log('Erro ao carregar itinerários', error);
        })
            
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
            optionLabel='Descricao'
            optionValue='ItinerariosFormativosId'          
            filter={false}  
            {...props}
        />
    )
}

export default SelectItinerarioFormativo