import React, { forwardRef } from 'react';
import { Menu } from 'primereact/menu';
import './SCMenu.css';
import IMenu from '../../../interfaces/components/menu/IMenu';

// Documentation: https://www.primefaces.org/primereact/menu/
const SCMenu = forwardRef((props: IMenu, ref: any) => {
    return <Menu {...props} ref={ref} />;
});
export default SCMenu;
