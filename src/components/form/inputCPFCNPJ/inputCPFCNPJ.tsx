import React from 'react';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import IInputMask from '../../../interfaces/components/form/IInputMask';
import TagRequired from '../../shared/TagRequired';
import { Skeleton } from 'primereact/skeleton';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

// Documentation: https://www.primefaces.org/primereact/inputmask/
const InputCPFCNPJ: React.FC<IInputMask> = ({
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
    ...restProps
}) => {

    const handleFocus = (event: any) => event.target.select();

    return (
        <div className='w-full'>
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
                        loading ? <Skeleton width="100%" height="31px"></Skeleton> : (
                        <CpfCnpj
                            onFocus={handleFocus}
                            id={field.name}
                            {...field}
                            {...restProps}
                            value={field.value}
                            onChange={(e: any) => {
                                const { onChange } = restProps;
                                field.onChange(onChange ? onChange(e) : e.target.value);
                            }}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': get(errors, name),
                                'p-inputtext-sm': true,
                                'w-full': true,
                                block: true,
                            })}`}
                        />
                        )
                    )}
                />
            ) : (
                loading ? <Skeleton width="100%" height="31px"></Skeleton> : <CpfCnpj id={name} {...restProps} />
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
        </div>
    );
};
export default InputCPFCNPJ;
