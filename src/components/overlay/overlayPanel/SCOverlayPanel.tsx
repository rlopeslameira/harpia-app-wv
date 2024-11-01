import React, { forwardRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import './SCOverlayPanel.css';
import IOverlayPanel from '../../../interfaces/components/overlay/IOverlayPanel';

// Documentation: https://www.primefaces.org/primereact/overlaypanel/
const SCOverlayPanel = forwardRef((props: IOverlayPanel, ref: any) => {
    return (
        <OverlayPanel {...props} ref={ref}>
            {props.children}
        </OverlayPanel>
    );
});
export default SCOverlayPanel;
