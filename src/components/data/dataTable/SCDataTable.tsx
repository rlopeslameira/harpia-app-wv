import React, { forwardRef, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
// import './DataTable.css';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import IDataTable from '../../../interfaces/components/data/IDataTable';
import ActionsTable from './ActionsTable';

// Documentation: https://www.primefaces.org/primereact/datatable/
const SCDataTable = forwardRef((props: IDataTable, ref: any): any => {
    const {
        columns = [],
        buttonActions = [],
        expandable = false,
        rowsPerPageOptions = [10, 20, 50],
        rows = 10,
        actionsLength = '8rem',
        actionsFrozen = false,
        isActionMenu = false,
        menuActions,
        selectWithCheckbox,
        selectionMode,
        editMode,

        ...restProps
    } = props;
    const menu = useRef<any[]>([]);

    return (
        <>
            <Tooltip target=".export-buttons>button" position="bottom" />
            <DataTable
                ref={ref}
                {...restProps}
                rowsPerPageOptions={rowsPerPageOptions}
                rows={rows}
                selectionMode={selectionMode}
                editMode={editMode}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                // currentPageReportTemplate={t('DataTable.page', {first: '{first}',last: '{last}', totalRecords: '{totalRecords}',})}
                >
                {/* expandle rows */}
                {expandable && <Column expander style={{ width: '3em' }} />}

                {/* select with Checkbox */}
                {selectWithCheckbox && <Column selectionMode={selectionMode} headerStyle={{ width: '3em' }} />}

                {/* show columns */}
                {columns.map((col) => {
                    return <Column key={col.field} {...col} />;
                })}

                {/* show actions button */}
                {(buttonActions.length > 0 || menuActions) && (
                    <Column
                        body={(data, propss) =>
                            ActionsTable(data, propss, isActionMenu, buttonActions, menu, menuActions)
                        }
                        exportable={false}
                        header={'Ações'}
                        style={{ minWidth: actionsLength }}
                        frozen={actionsFrozen}
                        alignFrozen={props.ActionsAlignFrozen}
                    />
                )}

                {/* show edit mode row */}
                {editMode === 'row' && (
                    <Column
                        rowEditor
                        headerStyle={{ width: '10%', minWidth: '7rem' }}
                        bodyStyle={{ textAlign: 'center' }}
                    />
                )}
            </DataTable>
        </>
    );
});
export default SCDataTable;
