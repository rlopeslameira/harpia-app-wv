import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NoAccess = () => {
    const navigate = useNavigate();

    return (
        <div className="exception-body accessdenied">
            <div className="exception-panel">
                <div className="exception-content">
                    <img src="assets/layout/images/pages/icon-access.svg" alt="roma" />
                    <h1>Acesso não permitido</h1>
                    <p>Você não tem a permissão necessária.</p>

                    <button
                        label="Go To Dashboard"
                        icon="pi pi-arrow-left"
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
