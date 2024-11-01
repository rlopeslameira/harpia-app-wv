import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../providers/auth";
import Loading from "./Loading";

interface Props {
  tipo: string;
}

interface IDados {
  value?: string;
  title?: string;
  status?: number;
}

const DashboardCount: React.FC<Props> = ({ tipo }) => {
  const [dados, setDados] = useState<IDados>({});
  const { empresaSelecionada } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      let result = null;
      switch (tipo) {
        case 'cursos':
          result = await api.get('/curso', { params: { EmpresaId: empresaSelecionada?.EmpresaId } });
          setDados(result.data);
          console.log(result.data)
          break;

        case 'disciplinas':
          result = await api.get('/disciplina', { params: { EmpresaId: empresaSelecionada?.EmpresaId } });
          setDados(result.data);
          console.log(result.data)
          break;

        default:
          result = await api.get('/curso', { params: { EmpresaId: empresaSelecionada?.EmpresaId } });
          setDados(result.data);
          break;
      }

      setLoading(false);
    }

    load();

  }, [tipo])

  return (
    <div className="col-12 md:col-6 lg:col-3">
      <div className="overview-box card" style={{ minHeight: 110, }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="overview-box-value">{dados?.value}</div>
            <div className="overview-box-title">{dados?.title}</div>
            <img src="assets/layout/images/dashboard/graph-tasks.svg" alt="roma" />
            {dados?.status && (
              <div className="overview-box-status">
                +{dados?.status}% {+dados?.status > 0 ? <i className="pi pi-arrow-circle-up"></i> : <i className="pi pi-arrow-circle-down"></i>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )

}

export default DashboardCount;