import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';
import { useAuth } from '../providers/auth';

type Props = any;

const SelectTurmaEF: React.FC<Props> = ({name, label, control, errors, ...props}) => {

    const { periodoSelecionado } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [lista, setLista] = useState<any>([]);
    const { setValue, getValues } = useFormContext();

    useEffect(() => {
        let isMounted = true
        setLoading(true);
        api.get('turmasEF', { 
            params: { 
                EmpresaId: periodoSelecionado?.EmpresaId, 
                Ano: periodoSelecionado?.Ano, 
                Sequencial: periodoSelecionado?.Sequencial 
            } 
        }).then(({data}) => {
            if (isMounted)
            {
                setLista(data);
                setLoading(false);
            }
        }).catch(error => {
            console.log('Erro ao carregar turmas', error);
        })      
        
        return () => { isMounted = false }
    }, [])
        
    return (
        <SCDropdown 
            loading={loading}
            name={name}
            label={label}
            control={control}
            errors={errors}
            options={lista}
            optionLabel='TurmaDescricao'
            optionValue='Codigo'
            // onChange={(e: any) => {
            //     //setValue('TurmaEF', lista.find((item: any) => item.Codigo == e.value));
            // }}
            {...props}
        />
    )
}

export default SelectTurmaEF