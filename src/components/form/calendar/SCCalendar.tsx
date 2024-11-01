import React from 'react';
import { Calendar } from 'primereact/calendar';
import { Controller, get } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import FormErrorMessage from '../../shared/FormErrorMessage';
import ICalendar from '../../../interfaces/components/form/ICalendar';
import './SCCalendar.css';
import TagRequired from '../../shared/TagRequired';
import { addLocale } from 'primereact/api';
import { isValid, set } from 'date-fns';
import util from '../../../utilities/util';
import { useToast } from '../../../context/ToastContext';

// Documentation: https://www.primefaces.org/primereact/calendar/
const SCCalendar: React.FC<ICalendar> = ({
    name = '',
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

    addLocale('pt-BR', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jab', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Claro'
    });
    const toast = useToast();

    

    return (
        <>
            {label && (
                <label
                    htmlFor={name}
                    className={classNames({
                        'p-error': get( errors, name),
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
                        <Calendar                                                   
                            id={field.name}
                            locale="pt-BR"
                            {...field}
                            {...restProps}
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            // onChange={(e) => {
                            //     const { onChange } = restProps;
                            //     field.onChange(onChange ? onChange(e) : e.value);
                            // }}
                            className={`${restProps.className}  ${classNames({
                                'p-invalid': errors[name],
                                'p-inputtext-sm': true,
                                block: true,
                            })} `}
                        />
                    )}
                />
            ) : (
                <Calendar {...restProps} id={name} />
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
export default SCCalendar;
