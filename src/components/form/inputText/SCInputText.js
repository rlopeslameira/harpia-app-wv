import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import './SCInputText.css';
import TagRequired from '../../shared/TagRequired';
import { Skeleton } from 'primereact/skeleton';

const SCInputText = ({
    loading = false,
    upperCase = true,
    numberOnly = false,
    name = '',
    label,
    iconClassName,
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
    labelClassName='',
    ...restProps
}) => {
    
    const handleFocus = (event) => event.target.select();

    return (
        <>
            {label && (
                <div className={`flex ${labelClassName}`}>
                    <label
                        htmlFor={name}
                        className={classNames({
                            'p-error': get(errors, name),
                            block: true,                            
                        })}>
                        {label} {required ? <TagRequired /> : null}
                    </label>
                    {/* {tarefa && <AjudaForm tarefa={tarefa} campo={name}/>} */}
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
                        <div className="p-input-icon-right w-full" >
                            <i className={iconClassName} />
                            {loading ? <Skeleton width="100%" height="31px"></Skeleton> : (
                            <InputText  
                            onFocus={handleFocus}
                                tooltip={maxLength?`Máximo de ${maxLength} caracteres`:''}
                                tooltipOptions={{ event: 'hover', position: 'bottom'}}                                         
                                id={field.name}
                                autoCapitalize='off'
                                autoComplete="off"
                                {...field}
                                {...restProps}
                                onChange={(e) => {
                                    const { onChange } = restProps;
                                    e.target.value = numberOnly ? e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1') : e.target.value;
                                    field.onChange(onChange ? onChange(e): e.target.value);
                                }}
                                className={`${restProps.className} ${classNames({
                                    'p-invalid': get(errors, name),
                                    block: true,
                                })}`}   
                            />
                            )}
                        </div>
                    )}
                />
            ) : (
                <InputText id={name} {...restProps} autoComplete="off" />
            )}
            {control && (
                <FormErrorMessage
                    errors={get(errors, name)}
                    label={label}
                    maxLength={maxLength}
                    max={max}
                    minLength={minLength}
                    min={min}
                />
            )}
        </>
    );
};
export default SCInputText;
