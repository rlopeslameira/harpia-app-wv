import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import './SCMultiSelect.css';
import TagRequired from '../../shared/TagRequired';
import IMultiSelect from '../../../interfaces/components/form/IMultiSelect';

// Documentation: https://www.primefaces.org/primereact/multiselect/
const SCMultiSelect: React.FC<IMultiSelect> = ({
    name,
    showClear = true,
    filter = true,
    maxSelectedLabels = 1,
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
                        <MultiSelect
                            id={field.name}
                            {...field}
                            {...restProps}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            showClear={showClear}
                            filter={filter}
                            maxSelectedLabels={maxSelectedLabels}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                                block: true,
                            })} `}
                        />
                    )}
                />
            ) : (
                <MultiSelect
                    id={name}
                    {...restProps}
                    showClear={showClear}
                    filter={filter}
                    maxSelectedLabels={maxSelectedLabels}
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
export default SCMultiSelect;
