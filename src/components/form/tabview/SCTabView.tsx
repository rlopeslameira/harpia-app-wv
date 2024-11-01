import React from 'react';
import { TabPanel, TabView } from 'primereact/tabview';
import './SCTabView.css';
import ITabView from '../../../interfaces/components/form/ITabView';

// Documentation: https://www.primefaces.org/primereact/tabview/
const SCTabView: React.FC<ITabView> = ({ tabs, renderActiveOnly = false, ...restProps }) => {
    return (
        <TabView {...restProps} renderActiveOnly={renderActiveOnly}>
            {tabs.map((props) => (
                <TabPanel key={props.id} {...props}>
                    {props.component}
                </TabPanel>
            ))}
        </TabView>
    );
};
export default SCTabView;
