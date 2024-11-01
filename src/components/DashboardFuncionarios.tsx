import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../providers/auth";
import Loading from "./Loading";
import IDisciplina from "../interfaces/IDisciplina";
import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";


const DashboardFuncionarios: React.FC = () => {
  const [dados, setDados] = useState<IDisciplina[]>([]);
  const { periodoSelecionado } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      let result = null;
      result = await api.get('/funcionarios/list')

      setDados(result.data);

      setLoading(false);
    }

    load();

  }, [])


  return (
    <Link className="col-12 md:col-6 lg:col-3" to='/Cadastro/Funcionarios'>
      <div className="overview-box card" style={{ minHeight: 110, }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="overview-box-value">{dados?.length}</div>
            <div className="flex justify-content-between align-items-top">
              <div className="overview-box-title">Funcionários</div>
              <FaUserTie size={50} color="#1cb9d7" />
            </div>
          </>
        )}
      </div>
    </Link>
  )

}

export default DashboardFuncionarios;