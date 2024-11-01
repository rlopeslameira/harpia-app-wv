import React from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import './SCInputNumber.css';
import TagRequired from '../../shared/TagRequired';

const SCInputNumber = ({
    name = '',
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
    ...restProps
}) => {
    
    const handleFocus = (event) => event.target.select();

    return (
        <>
            {label && (
                <label
                    htmlFor={name}
                    className={classNames({
                        'p-error': get(errors, name),                        
                        block: true,
                    })}>

                    {label} {required ? <TagRequired /> : null}
                </label>
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
                        <InputNumber          
                            onFocus={handleFocus}                  
                            id={field.name}
                            {...field}
                            {...restProps}
                            onChange={(e) => {
                                const { onChange } = restProps;
                                field.onChange(onChange ? onChange(e) : e.value);
                            }}
                            inputClassName={`${restProps.className} ${classNames({
                                'p-invalid': get(errors, name),   
                                'p-inputtext-sm': true,
                                'w-full': true,                            
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <InputNumber id={name} {...restProps} />
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
export default SCInputNumber;
