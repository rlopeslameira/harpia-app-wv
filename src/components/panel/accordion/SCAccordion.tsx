import React, { forwardRef } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './SCAccordion.css';
import IAccordion from '../../../interfaces/components/panel/IAccordion';

// Documentation: https://www.primefaces.org/primereact/accordion/
const SCAccordion = forwardRef((props: IAccordion, ref: any) => {
    const { accordionTab } = props;
    return (
        <Accordion {...props} ref={ref}>
            {accordionTab.map((tab) => (
                <AccordionTab key={tab.id} {...tab}>
                    {tab.component}
                </AccordionTab>
            ))}
        </Accordion>
    );
});
export default SCAccordion;
