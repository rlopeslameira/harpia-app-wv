import React, { forwardRef } from 'react';

import imgAguarde from '../assets/aguarde.gif';

interface IPros {
    full?: boolean
}

const LoadingReport = forwardRef ((props: IPros, ref: any) => {

    return (
        <div style={{
            display: "flex", 
            flex: 1,
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#FFF',
            width: '100%',
            position: props.full ? 'absolute' : 'relative',
            height: '100%',
            minHeight: '10vh',
            zIndex: 9999,
            opacity: 0.8,
            top: 0,
            left: 0
            }}>
            <img src={imgAguarde} alt="Aguarde..." />
        </div>
    )

});

export default LoadingReport;