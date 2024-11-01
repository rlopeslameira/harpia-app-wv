import React, { forwardRef } from 'react';
import { Messages } from 'primereact/messages';
import IMessages from '../../../interfaces/components/form/IMessages';

// Documentation: https://www.primefaces.org/primereact/messages/
const SCMessages = forwardRef((props: IMessages, ref: any) => {
    return <Messages {...props} ref={ref} />;
});
export default SCMessages;
