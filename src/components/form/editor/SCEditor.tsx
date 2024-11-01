import React from 'react';
import { Editor } from 'primereact/editor';
import IEditor from '../../../interfaces/components/form/IEditor';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import TagRequired from '../../shared/TagRequired';

// Documentation: https://www.primefaces.org/primereact/editor/
const SCEditor: React.FC<IEditor> = ({
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
                        <Editor
                            id={field.name}
                            {...field}
                            {...restProps}
                            onTextChange={(e) => {
                                const { onTextChange } = restProps;
                                field.onChange(onTextChange ? onTextChange(e) : e.htmlValue)
                            }}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': get(errors, name),
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <Editor id={name} {...restProps} />
            )}
            {control ? (
                <FormErrorMessage
                    errors={get(errors, name)}
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
export default SCEditor;
