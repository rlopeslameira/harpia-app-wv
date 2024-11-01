/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

import { classNames } from 'primereact/utils';
import React from 'react';
import IAction from '../../../interfaces/components/data/IButtonAction';
import IMenuAction from '../../../interfaces/components/data/IMenuAction';
import SCButton from '../../form/button/SCButton';
import SCMenu from '../../menu/menu/SCMenu';

const ActionsTable = (
    rowData: any,
    rowInfo: any,
    isActionMenu: boolean,
    actions: IAction<any>[],
    menu: any,
    actionsMenu?: IMenuAction<any>
): any => {
    const { rowIndex } = rowInfo;

    const getMenuItemsForItem = (items?: any[]): any[] => {
        const array: any[] = [];
        items?.map((item) => array.push({ label: item.label, command: () => item.command?.(rowData, rowIndex) }));
        return array;
    };

    return !isActionMenu ? (
        <>
            {actions.map((action) => {
                return (
                    <SCButton
                        key={action.id}
                        id={action.id}
                        icon={action.icon}
                        onClick={() => action.handler?.(rowData, rowIndex)}
                        tooltip={action.title}
                        tooltipOptions={{ position: 'bottom' }}
                        className={`p-row-editor-init  ${classNames({
                            'display-button':
                                action.isHidden?.(rowData, rowIndex) ||
                                (action.hasPermission !== undefined && !action.hasPermission),
                        })} `}
                    />
                );
            })}
        </>
    ) : (
        <>
            <SCButton
                icon="pi pi-ellipsis-v"
                onClick={(event) => menu.current[rowIndex].toggle(event)}
                className={`p-row-editor-init  ${classNames({
                    'display-button':
                        actionsMenu?.isHidden?.(rowData, rowIndex) ||
                        (actionsMenu?.hasPermission !== undefined && !actionsMenu?.hasPermission),
                })} `}
            />
            <SCMenu model={getMenuItemsForItem(actionsMenu?.items)} popup ref={ref => (menu.current[rowIndex] = ref)} id="popup_menu" />
        </>
    );
};
export default ActionsTable;
