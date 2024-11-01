import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';
import { useAuth } from '../providers/auth';
import { TURNOS } from '../utilities/constantes';

type Props = any;

const SelectTurma: React.FC<Props> = ({name, control, errors,  label, carregaDetalhe=false, ...props}) => {

    const { periodoSelecionado } = useAuth();
    const [lista, setLista] = useState<any>([]);
    const { setValue, getValues, watch } = useFormContext();
   
    const watchTurmaCodigo = watch('TurmaCodigo');

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

    useEffect(() => {
        if (watchTurmaCodigo && lista.length > 0)
        {
            const turma = lista.find((item: any) => item.Codigo == watchTurmaCodigo);
            if (turma)
            {
                setValue('AlunosPeriodo.TurmaCodigo', turma.Codigo);
                setValue('CursoId', turma.CursoId);
                setValue('TurmaEF', turma.CodigoTurmaEF);
                setValue('Turno', TURNOS.find((item: any) => item.value == turma.Turno)!.descricao);
                setValue('NivelSequenciaId', turma.NivelSequenciaId);
                setValue('AlunosPeriodo.NivelSequenciaId', turma.NivelSequenciaId);
                setValue('ItinerarioFormativoId', null);
                setValue('ExigeItinerario', turma.ExigeItinerario);
                setValue('NaoAplicaEF', turma.NaoAplicaEF);
            }
        }
    }, [watchTurmaCodigo, lista])

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
            onChange={(e: any) => {
                if (carregaDetalhe)
                {
                    const turma = lista.find((item: any) => item.Codigo == e.value);
                    if (turma)
                    {  
                        setValue('AlunosPeriodo.TurmaCodigo', turma.Codigo);
                        setValue('CursoId', turma.CursoId);
                        setValue('TurmaEF', turma.CodigoTurmaEF);
                        setValue('Turno', turma.Turno);
                        setValue('NivelSequenciaId', turma.NivelSequenciaId);
                        setValue('AlunosPeriodo.NivelSequenciaId', turma.NivelSequenciaId);
                        setValue('ItinerarioFormativoId', null);
                        setValue('ExigeItinerario', turma.ExigeItinerario);
                        setValue('NaoAplicaEF', turma.NaoAplicaEF);
                    }else{
                        setValue('AlunosPeriodo.TurmaCodigo', '');
                        setValue('CursoId', null);
                        setValue('TurmaEF', '');
                        setValue('Turno', '');
                        setValue('NivelSequenciaId', null);
                        setValue('AlunosPeriodo.NivelSequenciaId', null);
                        setValue('NaoAplicaEF', false);
                        setValue('ItinerarioFormativoId', null);
                    }
                }
            }}
            {...props}
        />
    )
}

export default SelectTurma