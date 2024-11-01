import React, { forwardRef } from 'react';
import { Toolbar } from 'primereact/toolbar';
import './SCToolbar.css';
import IToolbar from '../../../interfaces/components/panel/IToolbar';

// Documentation: https://www.primefaces.org/primereact/toolbar/
const SCToolbar = forwardRef((props: IToolbar, ref: any) => {
    return <Toolbar {...props} ref={ref} />;
});
export default SCToolbar;
