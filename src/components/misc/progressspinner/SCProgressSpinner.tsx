import React, { forwardRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import './SCProgressSpinner.css';
import IProgressSpinner from '../../../interfaces/components/misc/IProgressspinner';

// Documentation: https://www.primefaces.org/primereact/progressspinner/
const SCProgressSpinner = forwardRef((props: IProgressSpinner, ref: any) => {
    const { strokeWidth = '4' } = props;
    return <ProgressSpinner {...props} style={{ width: '50px', height: '50px' }} strokeWidth={strokeWidth} ref={ref} />;
});
export default SCProgressSpinner;
