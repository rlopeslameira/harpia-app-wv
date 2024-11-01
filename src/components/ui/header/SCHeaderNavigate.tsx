import React from 'react';

import { Divider } from 'primereact/divider';
import { HiOutlineArrowRight } from 'react-icons/hi';
import IHeaderNavigate from '../../../interfaces/components/ui/IHeaderNavigate';

import styled from './SCHeaderNavigate.module.css';


const SCHeaderNavigate: React.FC<IHeaderNavigate> = (props: IHeaderNavigate) => {
    const { headerItens, navigate } = props;

    const redirectTo = (path: any): any => {
        if (path) {
            navigate(path);
        }
    }

    return (
        <>
            <div className={`${styled.header_div_container}`}>
                {headerItens?.map((item, index) => {
                    if (index === headerItens.length - 1) {
                        return (
                            <span
                                style={{ marginLeft: "15px" }}
                                onClick={() => redirectTo(item.path)}
                                onKeyDown={() => redirectTo(item.path)}
                                role="button"
                                aria-hidden="true"
                                className='cursor-pointer'
                                key={`${item.text}-span`}
                            >
                                {item.text}
                            </span>
                        );
                    }
                    // eslint-disable-next-line no-else-return
                    else {
                        return (
                            <React.Fragment key={item.text}>
                                <span
                                    style={{ marginLeft: "15px" }}
                                    onClick={() => redirectTo(item.path)}
                                    onKeyDown={() => redirectTo(item.path)}
                                    role="button"
                                    aria-hidden="true"
                                    className='cursor-pointer'
                                    key={`${item.text}-span`}
                                >
                                    {item.text}
                                </span>
                                <HiOutlineArrowRight
                                    size={15}
                                    style={{ marginTop: '4px', marginLeft: "15px" }}
                                    key={`${item.text}-icon`}
                                />
                            </React.Fragment>
                        );
                    }
                })}

            </div>
            <Divider />
        </>
    );
};
export default SCHeaderNavigate;
