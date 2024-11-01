import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { useToast } from '../context/ToastContext';
import SCInputText from './form/inputText/SCInputText';
import { SITUACAO_ALUNO, UF_LISTA } from '../utilities/constantes';
import SelectTurma from './SelectTurma';
import { useAuth } from '../providers/auth';

type Props = any;

const DocumentosAluno: React.FC<Props> = ({ showDelete, nivelSequencia, ...props }) => {
  const toast = useToast();
  const { periodoSelecionado } = useAuth();
  const { control, formState: { errors }, getValues, setValue, watch } = useFormContext();
  const [documentos, setDocumentos] = useState<any[]>([]);

  useEffect(() => {
    // const result = await api.get('/nivelSequenciaDocumento/list', {
    //   params:
    //   {
    //     EmpresaId: periodoSelecionado?.EmpresaId,
    //     Ano: periodoSelecionado?.Ano,
    //     NivelSequenciaId: nivelSequencia?.NivelSequenciaId
    //   }
    // });

    // setDocumentos(result.data.map((doc: any) => { doc.Checked = doc.checked === true; return doc }));


  }, [])
  
  return (
    <>
      <div className="col-10">
          <div className='grid'>
            
          </div>
        </div>
    </>
  )
}

export default DocumentosAluno