import React, { forwardRef } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import FormErrorMessage from '../../shared/FormErrorMessage';
import TagRequired from '../../shared/TagRequired';
import IFileUpload from '../../../interfaces/components/form/IFileUpload';

// Documentation: https://www.primefaces.org/primereact/fileupload/
const SCFileUpload = forwardRef((props: IFileUpload, ref: any) => {
    const {
        name,
        label,
        multiple = true,
        onTemplateRemove,
        onDownload,
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
    } = props;

    const itemTemplate = (file: any, propsFile: any): any => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={propsFile.formatSize} severity="warning" className="px-3 py-1" />
                <div className="ml-auto">
                    <div className="field grid">
                        <div className="col-5">
                            <Button
                                type="button"
                                icon="pi pi-times"
                                onClick={() => (onTemplateRemove ? onTemplateRemove(file, propsFile.onRemove) : null)}
                                className="p-button-outlined p-button-rounded ml-auto"
                            />
                        </div>
                        <div className="col-5">
                            <Button
                                type="button"
                                icon="pi pi-download"
                                className="p-button-outlined p-button-rounded ml-auto"
                                onClick={() => (onDownload ? onDownload(file) : null)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="field sizes">
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
                        <FileUpload
                            id={field.name}
                            {...field}
                            {...restProps}
                            ref={ref}
                            mode="advanced"
                            multiple={multiple}
                            auto
                            customUpload
                            itemTemplate={itemTemplate}
                            uploadHandler={(e) => {
                                const { uploadHandler } = restProps;
                                field.onChange(uploadHandler ? uploadHandler(e) : e.files);
                            }}
                            className={`form-control round-lg ${classNames({
                                'p-invalid': errors[name],
                                block: true,
                            })}`}
                        />
                    )}
                />
            ) : (
                <FileUpload id={name} {...restProps} className="p-inputtext-sm block mb-2" />
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
        </div>
    );
});
export default SCFileUpload;
