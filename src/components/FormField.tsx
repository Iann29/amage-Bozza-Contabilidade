import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  id: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  type, 
  id, 
  required = false, 
  placeholder = '',
  rows = 4,
  options = [],
  value: externalValue,
  onChange: externalOnChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Use external value if provided, otherwise use internal state
  const value = externalValue !== undefined ? externalValue : internalValue;

  const validate = (val: string) => {
    if (!required || val.length > 0) {
      if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(val));
      } else if (type === 'tel') {
        const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
        setIsValid(phoneRegex.test(val));
      } else {
        setIsValid(true);
      }
    } else {
      setIsValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    
    // If external onChange provided, use it
    if (externalOnChange) {
      externalOnChange(e);
    } else {
      // Otherwise use internal state
      setInternalValue(newValue);
    }
    
    validate(newValue);
  };

  const fieldVariants = {
    focus: { y: -3, boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)' },
    blur: { y: 0, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <motion.div
        variants={fieldVariants}
        animate={isFocused ? 'focus' : 'blur'}
        transition={{ duration: 0.2 }}
        className={`relative rounded-lg overflow-hidden ${
          !isValid ? 'border-2 border-red-400' : ''
        }`}
      >
        {type === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            rows={rows}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isFocused ? 'border-blue-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              validate(value);
            }}
            onChange={handleChange}
            value={value}
            required={required}
          />
        ) : type === 'select' ? (
          <select
            id={id}
            name={id}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isFocused ? 'border-blue-500' : 'border-gray-300'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              validate(value);
            }}
            onChange={handleChange}
            value={value}
            required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isFocused ? 'border-blue-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              validate(value);
            }}
            onChange={handleChange}
            value={value}
            required={required}
          />
        )}
      </motion.div>
      {!isValid && (
        <motion.p 
          className="mt-1 text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {type === 'email' 
            ? 'Por favor, informe um email válido.' 
            : type === 'tel' 
              ? 'Por favor, informe um telefone válido (ex: 11 98765-4321).'
              : 'Este campo é obrigatório.'}
        </motion.p>
      )}
    </div>
  );
};

export default FormField;
