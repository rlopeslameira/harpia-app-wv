import React, { forwardRef } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
// import './SCPanelMenu.css';
import IPanelMenu from '../../../interfaces/components/menu/IPanelMenu';

// Documentation: https://www.primefaces.org/primereact/tabview/
const SCPanelMenu = forwardRef((props: IPanelMenu, ref: any) => {
    return <PanelMenu {...props} ref={ref} />;
});
export default SCPanelMenu;
