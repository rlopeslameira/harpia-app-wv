import React, { forwardRef } from 'react';

interface IPros {
    full?: boolean
}

const Loading = forwardRef ((props: IPros, ref: any) => {

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
            minHeight: '30vh',
            zIndex: 999999,
            opacity: 0.7,
            top: 0,
            left: 0
            }}>
                <ul className="loader" style={{backgroundColor: '#FFF'}}>
                    <li className="dot-a"></li>
                    <li className="dot-b"></li>
                    <li className="dot-c"></li>
                    <li className="dot-d"></li>
                    <li className="dot-e"></li>
                    <li className="dot-f"></li>
                    <li className="dot-g"></li>
                    <li className="dot-h"></li>
                    <li className="dot-i"></li>
                </ul>
        </div>
    )

});

export default Loading;