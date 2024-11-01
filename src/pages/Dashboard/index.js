import React, { useState } from 'react';

const MobileDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Mock dos itens do menu
  const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home' },
    { label: 'Perfil', icon: 'pi pi-user' },
    { label: 'Configurações', icon: 'pi pi-cog' },
    { label: 'Relatórios', icon: 'pi pi-chart-bar' },
    { label: 'Sair', icon: 'pi pi-power-off' }
  ];

  // Estilo base para o container principal
  const mainContainerStyle = {
    display: 'flex',
    height: '100vh',
    position: 'relative'
  };

  // Estilo para a sidebar
  const sidebarStyle = {
    position: 'fixed',
    left: sidebarVisible ? '0' : '-250px',
    top: 0,
    bottom: 0,
    width: '250px',
    backgroundColor: '#2c3e50',
    transition: 'left 0.3s',
    zIndex: 1000,
    paddingTop: '20px',
    overflowY: 'auto'
  };

  // Estilo para o conteúdo principal
  const contentStyle = {
    flex: 1,
    padding: '20px',
    marginLeft: sidebarVisible ? '250px' : '0',
    transition: 'margin-left 0.3s',
    backgroundColor: '#f4f4f4'
  };

  // Estilo para o botão do menu
  const menuButtonStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    zIndex: 1001,
    padding: '10px',
    backgroundColor: '#2c3e50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white'
  };

  // Estilo para cada item do menu
  const menuItemStyle = {
    padding: '15px 20px',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  // Estilo para o ícone do menu
  const iconStyle = {
    marginRight: '10px'
  };

  // Overlay para fechar o menu quando clicar fora
  const overlayStyle = {
    display: sidebarVisible ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  };

  return (
    <div style={mainContainerStyle}>
      {/* Botão do menu */}
      <button 
        style={menuButtonStyle}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        <i className="pi pi-bars"></i>
      </button>

      {/* Overlay */}
      <div 
        style={overlayStyle}
        onClick={() => setSidebarVisible(false)}
      />

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {menuItems.map((item, index) => (
          <div 
            key={index}
            style={menuItemStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <i className={item.icon} style={iconStyle}></i>
            {item.label}
          </div>
        ))}
      </div>

      {/* Conteúdo principal */}
      <main style={contentStyle}>
        <h1>Dashboard</h1>
        <p>Seu conteúdo principal aqui</p>
      </main>
    </div>
  );
};

export default MobileDashboard;
