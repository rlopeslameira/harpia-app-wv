import React from 'react';
import { ToggleButton } from 'primereact/togglebutton';
import ITogglebutton from '../../../interfaces/components/form/ITogglebutton';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import TagRequired from '../../shared/TagRequired';
import './SCTogglebutton.css';

// Documentation: https://www.primefaces.org/primereact/togglebutton/
const SCTogglebutton: React.FC<ITogglebutton> = ({
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
                        <ToggleButton
                            id={field.name}
                            {...field}
                            {...restProps}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <ToggleButton id={name} {...restProps} />
            )}
        </>
    );
};
export default SCTogglebutton;
