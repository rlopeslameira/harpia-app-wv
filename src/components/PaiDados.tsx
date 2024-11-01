import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { useToast } from '../context/ToastContext';
import SCInputText from './form/inputText/SCInputText';
import { SITUACAO_ALUNO, UF_LISTA } from '../utilities/constantes';
import SelectTurma from './SelectTurma';

type Props = any;

const PaiDados: React.FC<Props> = ({ showDelete, showTurma = false, ...props }) => {
  const toast = useToast();
  const { control, formState: { errors }, getValues, setValue, watch } = useFormContext();

  return (
    <>
      <div className="col-10">
        <div className='grid'>
          <div className="col-6">
            <SCInputText
              control={control}
              errors={errors}
              style={{ textTransform: 'uppercase' }}
              name="Nome"
              label='Nome'
              required={!showDelete}
              disabled={showDelete}
              maxLength={60}
              tooltip='Máximo de 60 caracteres'
              tooltipOptions={{ event: 'focus' }}
            />
          </div>

          {/* <div className="col-2 flex">
                <SCButton icon='pi pi-search' className='w-3 p-button-info p-button-outlined flex align-self-end' type='button' onClick={buscarAluno}/>
                <SCDialog id="dlg" visible={showConsultaAluno} style={{ width: '60vw', minHeight: '50vh'}} onHide={() => setShowConsultaAluno(false)}
                >
                    {loading ? <Loading full={false} /> : (
                      <>
                      <div className='grid'>
                          <div className="col-2">
                            <SCInputText
                              className='w-full'
                              value={matriculaConsulta}
                              onChange={(e) => setMatriculaConsulta(e.target.value)}
                              label='Matrícula'
                            />
                          </div>
                          <div className="col-8">
                            <SCInputText
                              className='w-full'
                              value={nomeConsulta}
                              onChange={(e) => setNomeConsulta(e.target.value)}
                              label='Nome'
                            />
                          </div>
                      </div>
                      <DataTable
                        size='small'
                        stripedRows
                        value={lista.filter(x => x.Nome?.toUpperCase().includes(nomeConsulta.toUpperCase()) && x.Matricula?.toString().includes(matriculaConsulta))}
                        dataKey="AlunoId"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[10, 20, 40]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="{first} a {last} de {totalRecords}"
                        emptyMessage="Nenhum registro encontrado."
                        header={null}
                        responsiveLayout="scroll">
                        <Column field="Matricula" header="Matrícula" sortable headerStyle={{ width: 92 }}></Column>
                        <Column field="Nome" header="Nome" sortable ></Column>
                        <Column body={(rowData: any) => {
                          return (
                            <div className="actions flex align-items-center justify-content-between">
                              <Button icon="pi pi-check" className="p-button-rounded p-button-info" onClick={() => selecionar(rowData)} />
                            </div>
                          );
                        }} style={{ width: 90 }}
                        />
                      </DataTable>
                    </>
                    )}
                </SCDialog>
              </div> */}
        </div>
        <div className='grid'>
          <div className="col-2">
            <SCInputText
              control={control}
              errors={errors}
              name="Matricula"
              label='Matrícula'
              disabled
            />
          </div>
          <div className="col-2">
            <SCInputText
              defaultValue={SITUACAO_ALUNO.find(x => x.value == watch('AlunosPeriodo')?.SituacaoAcademica)?.descricao}
              label='Situação'
              disabled
            />
          </div>
          {showTurma && (
            <div className="col-6">
              <SelectTurma
                control={control}
                errors={errors}
                carregaDetalhe={true}
                name="TurmaCodigo"
                label='Turma'
                disabled
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PaiDados