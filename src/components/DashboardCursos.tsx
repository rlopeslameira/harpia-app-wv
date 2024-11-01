import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../providers/auth";
import Loading from "./Loading";
import ICurso from "../interfaces/ICurso";
import { Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";


const DashboardCursos: React.FC = () => {
  const [dados, setDados] = useState<ICurso[]>([]);
  const { empresaSelecionada } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      let result = null;
      result = await api.get('/curso', { params: { EmpresaId: empresaSelecionada?.EmpresaId } });
      setDados(result.data);
      setLoading(false);
    }

    load();

  }, [])

  return (
    <Link className="col-12 md:col-6 lg:col-3" to='/Tabelas/Curso'>
      <div className="overview-box card" style={{ minHeight: 110, }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="overview-box-value">{dados?.length}</div>
            <div className="flex justify-content-between align-items-top">
              <div className="overview-box-title">Cursos</div>
              <FaUserGraduate size={50} color="#1cb9d7" />
            </div>
            {/* <img src="assets/layout/images/dashboard/graph-tasks.svg" alt="roma" /> */}
          </>
        )}
      </div>
    </Link>
  )

}

export default DashboardCursos;