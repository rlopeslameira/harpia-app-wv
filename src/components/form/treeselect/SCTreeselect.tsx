import React from "react";
import { TreeSelect } from "primereact/treeselect";
import { classNames } from "primereact/utils";
import { Controller } from "react-hook-form";
import ITreeSelect from "../../../interfaces/components/form/ITreeSelect";
import FormErrorMessage from "../../shared/FormErrorMessage";
import TagRequired from "../../shared/TagRequired";
import './SCTreeSelect.css'



const SCTreeSelect: React.FC<ITreeSelect> = ({
    name,
    filter = true,
    label,
    metaKeySelection=false,
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
                        <TreeSelect
                            id={field.name}
                            {...field}
                            {...restProps}
                            value={field.value}
                            metaKeySelection={metaKeySelection}
                            onChange={(e) => field.onChange(e.value)}
                            filter={filter}
                            className={`${restProps.className} ${classNames({
                                'p-invalid': errors[name],
                                block: false,
                            })}`}
                        />
                    )}
                />
            ) : (
                <TreeSelect
                    id={name}
                    {...restProps}
                    filter={filter}
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
    )
};
export default SCTreeSelect;
