import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import './SCDropdown.css';
import IDropdown from '../../../interfaces/components/form/IDropdown';
import TagRequired from '../../shared/TagRequired';
import AjudaForm from '../../../pages/AjudaForm';
import { Skeleton } from 'primereact/skeleton';

// Documentation: https://www.primefaces.org/primereact/dropdown/
const SCDropdown: React.FC<IDropdown> = ({
    loading = false,
    name = '',
    label,
    showClear = true,
    filter = true,
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
    checkmark= true,
    ...restProps
}) => {
    return (
        <>            
            {label && (
                <div className='flex align-items-end'>
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
                        loading ? <Skeleton width="100%" height="31px"></Skeleton> : (
                        <Dropdown
                            id={`id${field.name}`}
                            {...field}
                            {...restProps}
                            value={field.value}                            
                            onChange={(e) => {
                                e.target.value = e.target.value || null;

                                const { onChange } = restProps;
                                field.onChange(onChange ? (onChange(e), e.target.value) : e.target.value);
                            }}                            
                            showClear={showClear}
                            filter={filter}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': get(errors, name),
                                'p-inputtext-sm': true,
                                block: true,
                            })} `}
                        />
                        )
                    )}
                />
            ) : (
                loading ? <Skeleton width="100%" height="31px"></Skeleton> : <Dropdown id={`id${name}`} {...restProps} showClear={showClear} filter={filter} {...restProps} />
            )}
            {control && (
                <FormErrorMessage
                    errors={get(errors, name)}
                    label={label || ''}
                    maxLength={maxLength}
                    max={max}
                    minLength={minLength}
                    min={min}
                />
            )} 
        </>
    );
};
export default SCDropdown;
