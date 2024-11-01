import React, { forwardRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import './SCConfirmDialog.css';
import IConfirmDialog from '../../../interfaces/components/overlay/IConfirmDialog';

// Documentation: https://www.primefaces.org/primereact/sidebar/
const SCConfirmDialog = forwardRef((props: IConfirmDialog, ref: any) => {
    return <ConfirmDialog {...props} ref={ref} />;
});
export default SCConfirmDialog;
