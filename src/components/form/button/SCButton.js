import React from 'react';
import { Button } from 'primereact/button';
import './SCButton.css';

const SCButton = ({ label, ...restProps }) => {
    return <Button label={label} {...restProps} />;
};
export default SCButton;
