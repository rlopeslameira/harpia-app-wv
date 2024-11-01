import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import ITextarea from '../../../interfaces/components/form/ITextarea';
import TagRequired from '../../shared/TagRequired';

// Documentation: https://www.primefaces.org/primereact/inputtext/
const SCInputTextarea: React.FC<ITextarea> = ({
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
    autoResize = true,
    ...restProps
}) => {
    
    const handleFocus = (event: any) => event.target.select();

    return (
        <>
            {label && (
                <label
                    htmlFor={name}
                    className={classNames({
                        'p-error': errors[name],
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
                        <InputTextarea
                            onFocus={handleFocus}
                            id={field.name}
                            autoComplete="off"
                            autoResize={autoResize}
                            {...field}
                            {...restProps}
                            onChange={(e) => {
                                const { onChange } = restProps;
                                field.onChange(onChange ? onChange(e) : e.target.value);
                            }}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <InputTextarea id={name} autoResize={autoResize} {...restProps} autoComplete="off" />
            )}
            {control ? (
                <FormErrorMessage
                    errors={errors[name]}
                    label={label}
                    maxLength={maxLength}
                    max={max}
                    minLength={minLength}
                    min={min}
                />
            ) : null}
        </>
    );
};
export default SCInputTextarea;
