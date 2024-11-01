import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';
import { useAuth } from '../providers/auth';

type Props = any;

const SelectTurmaResumido: React.FC<Props> = ({name, control, errors,  label, carregaDetalhe=false, ...props}) => {

    const { periodoSelecionado } = useAuth();
    const [lista, setLista] = useState<any>([]);
   
    useEffect(() => {
        let isMounted = true

        api.get('/turmas', { 
            params: { 
                EmpresaId: periodoSelecionado?.EmpresaId, 
                Ano: periodoSelecionado?.Ano, 
                Sequencial: periodoSelecionado?.Sequencial 
        }}).then((result) => {
            if (isMounted)
                setLista(result.data);                
        }).catch(error => {
            console.log('Erro ao carregar turmas', error);
        })  

        return () => {
            isMounted = false
        }
    }, [])


    return (
        <SCDropdown 
            loading={lista.length === 0}
            name={name}
            label={label}
            control={control}
            errors={errors}
            options={lista}
            optionLabel='TurmaDescricao'
            optionValue='Codigo'                            
            {...props}
        />
    )
}

export default SelectTurmaResumido