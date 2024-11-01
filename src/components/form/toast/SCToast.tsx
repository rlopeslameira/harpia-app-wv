import React, { forwardRef } from 'react';
import { Toast } from 'primereact/toast';
import IToast from '../../../interfaces/components/form/IToast';

// Documentation: https://www.primefaces.org/primereact/toast/
const SCToast = forwardRef((props: IToast, ref: any) => {
    return <Toast {...props} ref={ref} />;
});
export default SCToast;
