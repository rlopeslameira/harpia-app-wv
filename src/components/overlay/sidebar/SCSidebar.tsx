import React, { forwardRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import './SCSidebar.css';
import ISidebar from '../../../interfaces/components/overlay/ISidebar';

// Documentation: https://www.primefaces.org/primereact/sidebar/
const SCSidebar = forwardRef((props: ISidebar, ref: any) => {
    return (
        <Sidebar {...props} ref={ref}>
            {props.children}
        </Sidebar>
    );
});
export default SCSidebar;
