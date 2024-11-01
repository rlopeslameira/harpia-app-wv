import React, { useEffect, useState } from 'react'
import SCDropdown from './form/dropdown/SCDropdown';
import api from '../services/api';
import { useAuth } from '../providers/auth';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { IAlunoForm } from '../interfaces/IAlunos';

type Props = any;

const SelectPlanoPagamento: React.FC<Props> = ({name, control, errors, label, ...props}) => {

    const [lista, setLista] = useState<any>([]);

    const { periodoSelecionado } = useAuth();
    const {  watch, getValues, setValue } = useFormContext();
    const queryClient = useQueryClient()

    const watchPlanoPagamentoId = watch('AlunosPeriodo.PlanoPagamentoId');
    const watchTurmaCodigo = watch('TurmaCodigo');

    useQuery('planopagamento-detalhe', () => {
        return api.get('/planosPagamento/parcelas', {
        params: {
            PlanosPagamentoId: watchPlanoPagamentoId,
        }
    });
    }, {
        refetchInterval: false,
        enabled: false,
        refetchOnWindowFocus: false,   
        onSuccess({data: parcelas}) {
            const dados: IAlunoForm = getValues();
            if (!dados.AlunosPeriodo?.ValorContrato) {
                setValue('AlunosPeriodo.ValorContrato', parcelas.length * parcelas[0].Valor);
                setValue('AlunosPeriodo.PrimeiraParcelaContrato', parcelas[0].Valor);
                setValue('AlunosPeriodo.DescontoPrimeiraContrato', parcelas[0].Desconto);
                if (parcelas[1])
                {
                    setValue('AlunosPeriodo.ParcelaContrato', parcelas.length - 1);
                    setValue('AlunosPeriodo.ValorParcelaContrato', parcelas[1]?.Valor);
                    setValue('AlunosPeriodo.ValorDescontoContrato', parcelas[1]?.Desconto);
                }else{
                    setValue('AlunosPeriodo.ParcelaContrato', null);
                    setValue('AlunosPeriodo.ValorParcelaContrato', null);
                    setValue('AlunosPeriodo.ValorDescontoContrato', null);
                }       
                setValue('RecalcularContrato', !getValues('RecalcularContrato'));         
            }
        },     
    })


    const { isLoading } = useQuery('planopagamento-lista', () => {
        return api.get('/planoPagamentoTurma/getByTurmaCodigo', { 
            params: { 
                Ano: periodoSelecionado?.Ano,
                EmpresaId: periodoSelecionado?.EmpresaId, 
                Sequencial: periodoSelecionado?.Sequencial,
                TurmaCodigo: watchTurmaCodigo
            }
        });
    }, { 
        refetchInterval: false, 
        refetchOnWindowFocus: false,         
        onSuccess(data) {
            setLista(data.data);
        },
    })

    useEffect(() => {
        queryClient.fetchQuery('planopagamento-lista');
    }, [watchTurmaCodigo])

    
    useEffect(() => {
        if(watchPlanoPagamentoId) {
            queryClient.fetchQuery('planopagamento-detalhe')
        }
    }, [watchPlanoPagamentoId])
    
    return (
        <SCDropdown 
        loading={isLoading}
        name={name}
        label={label}
        control={control}
        errors={errors}
        options={lista}
        onChange={(e) => !getValues().Matricula && setValue('AlunosPeriodo.ConvenioId', lista.find((item: any) => item.PlanosPagamentoId === e.value).ConvenioId)}
        optionLabel='Descricao'
        optionValue='PlanosPagamentoId'     
        {...props}
        />
    )
}

export default SelectPlanoPagamento