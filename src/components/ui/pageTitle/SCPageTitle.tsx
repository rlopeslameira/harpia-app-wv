import React from 'react';
import ITitleAndSubtitle from '../../../interfaces/components/ui/ITitleAndSubtitle';
import styled from './PageTitle.module.css';

const SCPageTitle = (props: ITitleAndSubtitle): any => {
    const { title, style } = props;
    return (
        <div className={styled.root} style={style}>
            <p className={styled.paragraphRoot}>{title}</p>
        </div>
    );
};
export default SCPageTitle;
