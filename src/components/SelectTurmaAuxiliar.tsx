import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';
import { useAuth } from '../providers/auth';

type Props = any;

const SelectTurmaAuxiliar: React.FC<Props> = ({name, control, errors,  label, setValue=undefined, listaFiltro=[], ...props}) => {

    const { periodoSelecionado } = useAuth();
    const [lista, setLista] = useState<any>([]);
   
    useEffect(() => {
        let isMounted = true

        api.get('/turmaAuxiliar/list', { 
            params: { 
                EmpresaId: periodoSelecionado?.EmpresaId, 
                Ano: periodoSelecionado?.Ano, 
                Sequencial: periodoSelecionado?.Sequencial 
        }}).then((result) => {
            if (isMounted)
            {
                setLista(result.data?.map((item: any) => { 
                    return { 
                        ...item,
                        DescricaoCompleta:  item.Codigo + ' - ' + item.Descricao
                    }
                }));                
            }
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
            options={listaFiltro.length > 0 ? lista.filter((item: any) => !listaFiltro.find((i:any) => i.TurmaAuxiliarId === item.TurmaAuxiliarId)) : lista}
            optionLabel='DescricaoCompleta'
            optionValue='TurmaAuxiliarId'         
            onChange={(e) => {
                if (setValue !== undefined)
                    setValue('TurmaAuxiliar', lista.find((item: any) => item.TurmaAuxiliarId === e.value));
            }}                   
            {...props}
        />
    )
}

export default SelectTurmaAuxiliar