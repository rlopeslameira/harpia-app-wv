import React, { forwardRef } from 'react';
import { Fieldset } from 'primereact/fieldset';
import './SCFieldset.css';
import IFieldset from '../../../interfaces/components/panel/IFieldset';

// Documentation: https://www.primefaces.org/primereact/fieldset/
const SCFieldset = forwardRef((props: IFieldset, ref: any) => {
    const { children } = props;
    return (
        <Fieldset {...props} ref={ref}>
            {children}
        </Fieldset>
    );
});
export default SCFieldset;
