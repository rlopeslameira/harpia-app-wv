import React, { forwardRef } from 'react';
import { Message } from 'primereact/message';
import IMessage from '../../../interfaces/components/form/IMessage';

// Documentation: https://www.primefaces.org/primereact/messages/
const SCMessage = forwardRef((props: IMessage, ref: any) => {
    return <Message {...props} ref={ref} />;
});
export default SCMessage;
