import React from 'react';
import { Password } from 'primereact/password';
import './SCPassword.css';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import TagRequired from '../../shared/TagRequired';

const SCPassword = ({
    label,
    name,
    required,
    maxLength,
    minLength,
    min,
    max,
    pattern,
    validate,
    control,
    errors = [],
    weakLabel,
    mediumLabel,
    strongLabel,
    feedback = false,
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
                        <Password
                            onFocus={handleFocus}
                            id={field.name}
                            weakLabel={weakLabel}
                            mediumLabel={mediumLabel}
                            strongLabel={strongLabel}
                            feedback={feedback}
                            autoComplete="off"
                            {...restProps}
                            {...field}
                            className={`${restProps.className} ${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                            })}`}
                        />
                        </div>
                    )}
                />
            ) : (
                <Password
                    onFocus={handleFocus}
                    id={name}
                    weakLabel={weakLabel}
                    mediumLabel={mediumLabel}
                    strongLabel={strongLabel}
                    feedback={feedback}
                    autoComplete="off"
                    {...restProps}
                />
            )}
            {control && (
                <FormErrorMessage
                    errors={errors[name]}
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
export default SCPassword;
