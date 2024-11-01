import React, { forwardRef } from 'react';
import { Tree } from 'primereact/tree';
import './SCTree.css';
import ITree from '../../../interfaces/components/panel/ITree';

// Documentation: https://www.primefaces.org/primereact/tree/
const SCTree = forwardRef((props: ITree, ref: any) => {
    return (
        <Tree {...props} ref={ref} />
    );
});

export default SCTree;
