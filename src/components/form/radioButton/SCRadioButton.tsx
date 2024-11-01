import React from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import IRadioButton from '../../../interfaces/components/form/IRadioButton';

// Documentation: https://www.primefaces.org/primereact/checkbox/
const SCRadioButton: React.FC<IRadioButton> = ({
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
    ...restProps
}) => {
    return (
        <div className="field-radiobutton mb-1">
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
                        <RadioButton
                            {...field}
                            {...restProps}
                            checked={restProps.value === field.value}
                            onChange={(e) => {
                                field.onChange(e.value);
                            }}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <RadioButton inputId={name} {...restProps} />
            )}
            {label && (
                <label
                    htmlFor={name}
                    className={classNames({
                        'p-error': errors[name],
                        block: true,
                    })}>
                    {label}
                </label>
            )}
        </div>
    );
};
export default SCRadioButton;
