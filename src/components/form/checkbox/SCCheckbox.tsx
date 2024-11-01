import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import './SCCheckbox.css';
import TagRequired from '../../shared/TagRequired';
import ICheckbox from '../../../interfaces/components/form/ICheckbox';
import AjudaForm from '../../../pages/AjudaForm';

// Documentation: https://www.primefaces.org/primereact/checkbox/
const SCCheckbox: React.FC<ICheckbox> = ({
    name,
    label,
    maxLength,
    minLength,
    max,
    min,
    pattern,
    validate,
    control,
    errors = [],
    required,
    tarefa,
    ...restProps
}) => {
    return (
        <div className="field-checkbox mb-1">
            {control ? (
                <Controller
                    name={name}
                    control={control}
                    rules={{
                        required,
                        minLength,
                        maxLength,
                        min,
                        max,
                        pattern,
                        validate,
                    }}
                    render={({ field }) => (
                        <Checkbox
                            inputId={field.name}
                            {...field}
                            {...restProps}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.checked)}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': get(errors, name),
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <Checkbox inputId={name} {...restProps} />
            )}
            {label && (
                <div className='flex align-items-end ml-1'>
                    <label
                        htmlFor={name}
                        className={classNames({
                            'p-error': get(errors, name),
                            block: true,
                        })}>
                        {label} {required ? <TagRequired /> : null}
                    </label>
                    {tarefa && <AjudaForm tarefa={tarefa} campo={name}/>}
                </div>
            )}
        </div>
    );
};
export default SCCheckbox;
