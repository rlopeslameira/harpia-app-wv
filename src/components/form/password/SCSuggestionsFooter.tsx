import { Divider } from 'primereact/divider';
import React from 'react';

const SCSuggestionsFooter: React.FC<{
    title: string;
    roles: string[];
}> = ({ title, roles }) => {
    return (
        <>
            <Divider />
            <p className="mt-2">{title}</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                {roles.map((props) => (
                    <li key={props}>{props}</li>
                ))}
            </ul>
        </>
    );
};
export default SCSuggestionsFooter;
