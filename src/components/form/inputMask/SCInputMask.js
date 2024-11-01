import React from 'react';
import { InputMask } from 'primereact/inputmask';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import TagRequired from '../../shared/TagRequired';
import { Skeleton } from 'primereact/skeleton';

// Documentation: https://www.primefaces.org/primereact/inputmask/
const SCInputMask = ({
    loading = false,
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
    iconClassName = '',
    labelClassName='',
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
                        <div className="p-input-icon-right w-full" >
                            <i className={iconClassName} />
                            {loading ? <Skeleton width="100%" height="31px"></Skeleton> : (
                                <InputMask
                                    onFocus={handleFocus} 
                                    id={field.name}
                                    {...field}
                                    {...restProps}
                                    value={field.value}
                                    // onChange={(e) => field.onChange(e.target.value)}
                                    onChange={(e) => {
                                        const { onChange } = restProps;
                                        field.onChange(onChange ? onChange(e) : e.target.value);
                                    }}
                                    className={`${restProps.className} ${classNames({
                                        'p-invalid': get(errors, name),
                                    })}`}
                                />
                                )}
                        </div>
                    )}
                />
            ) : (
                loading ? <Skeleton width="100%" height="31px"></Skeleton> : <InputMask id={name} {...restProps} />
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
export default SCInputMask;
