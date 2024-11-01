import React, { useState, useEffect } from 'react';

const FormErrorMessage = ({ errors, label, maxLength, minLength, max, min }) => {
    const [messageValidation, setMessageValidation] = useState('');
    
    useEffect(() => {
        setMessageValidation('');
        if (errors) {
            const { type, message } = errors;
            switch (type) {
                case 'required':
                    setMessageValidation(`${label} é obrigatório`);
                    break;
                case 'maxLength':
                    setMessageValidation(`O tamanho máximo de ${label} é ${maxLength}`);
                    break;
                case 'max':
                    setMessageValidation(`O valor máximo de ${label} é ${max}`);
                    break;
                case 'minLength':
                    setMessageValidation(`O tamanho mínimo de ${label} é ${minLength}`);
                    break;
                case 'min':
                    setMessageValidation(`O valor mínimo de ${label} é ${min}`);
                    break;
                default:
                    setMessageValidation(message);
                    break;
            }
        }
    }, [errors, label, max, maxLength, min, minLength]);

    return <small className="p-error">{messageValidation}</small>;
};

export default FormErrorMessage;
