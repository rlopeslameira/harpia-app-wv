import React, { forwardRef } from 'react';
import { Dialog } from 'primereact/dialog';
import './SCDialog.css';
import IDialog from '../../../interfaces/components/overlay/IDialog';

// Documentation: https://www.primefaces.org/primereact/sidebar/
const SCDialog = forwardRef((props: IDialog, ref: any) => {
    return (
        <Dialog  blockScroll={true} {...props} ref={ref}>
            {props.children}
        </Dialog>
    );
});
export default SCDialog;
