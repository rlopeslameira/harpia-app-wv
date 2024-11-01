import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import './SCInputSwitch.css';
import IInputSwitch from '../../../interfaces/components/form/IInputswitch';
import TagRequired from '../../shared/TagRequired';

// Documentation: https://www.primefaces.org/primereact/inputswitch/
const SCInputSwitch: React.FC<IInputSwitch> = ({
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
                        <InputSwitch
                            id={field.name}
                            inputId={field.name}
                            {...field}
                            {...restProps}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                                block: true,
                            })} `}
                        />
                    )}
                />
            ) : (
                <InputSwitch id={name} {...restProps} />
            )}
        </>
    );
};
export default SCInputSwitch;