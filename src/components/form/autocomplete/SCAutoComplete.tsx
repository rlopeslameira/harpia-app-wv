import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import './SCAutoComplete.css';
import TagRequired from '../../shared/TagRequired';
import IAutoComplete from '../../../interfaces/components/form/IAutoComplete';

// Documentation: https://www.primefaces.org/primereact/autocomplete/
const SCAutoComplete: React.FC<IAutoComplete> = ({
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
                <div className='flex align-items-end'>
                    <label
                        htmlFor={name}
                        className={classNames({
                            'p-error': errors[name],
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
                        <AutoComplete
                            id={`id${field.name}`}
                            {...field}
                            {...restProps}
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.value);
                            }}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': get(errors, name),
                                'p-inputtext-sm': true,
                                block: true,
                            })} `}
                        />
                    )}
                />
            ) : (
                <AutoComplete id={`id${name}`} {...restProps} />
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
export default SCAutoComplete;
