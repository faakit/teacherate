import React, { ChangeEvent } from 'react';
import { Control, FieldError, FieldValues, Path, useController } from 'react-hook-form';
import {
  GetOptionLabel,
  GetOptionValue,
  OptionsOrGroups,
  GroupBase,
  OptionProps,
  SingleValue,
} from 'react-select';
import AsyncSelect, { AsyncProps } from 'react-select/async';
import tinyDebounce from 'tiny-debounce';

export interface ISelectProps<T extends Record<string, unknown>, Fields extends FieldValues> {
  control: Control<Fields, unknown>;
  name: Path<Fields>;
  className?: string;
  label?: string | React.ReactNode;
  required?: boolean;
  error?: FieldError;
  options?: T[];
  defaultOptions?: T[];
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  showValue?: boolean;
  labelAs?: string;
  valueAs?: string;
  select_props?: AsyncProps<T, false, GroupBase<T>>;
  onFetch?(inputText: string): Promise<T[]> | T[];
  search_debounce_time?: number;
  shouldUnregister?: boolean;
  isSearchable?: boolean;
  optionComponent?: React.ComponentType<OptionProps<T, false, GroupBase<T>>>;
  onChange?: (option?: SingleValue<T>) => void;
  getOptionValue?: GetOptionValue<T>;
  getOptionLabel?: GetOptionLabel<T>;
}

export const Select = <T extends Record<string, unknown>, Fields extends FieldValues>(
  props: ISelectProps<T, Fields>,
) => {
  const {
    name,
    label,
    className,
    required,
    control,
    error,
    options,
    defaultOptions = options,
    disabled,
    placeholder = 'Selecione uma opção',
    clearable = false,
    onChange,
    showValue = true,
    labelAs,
    valueAs,
    onFetch,
    shouldUnregister,
    search_debounce_time = 500,
    select_props,
    optionComponent,
    getOptionLabel = ((option: T) =>
      labelAs ? option[labelAs as keyof T] || '' : option.label || '') as GetOptionLabel<T>,
    getOptionValue = ((option: T) =>
      valueAs ? option[valueAs as keyof T] || '' : option.value || '') as GetOptionValue<T>,
    isSearchable = false,
  } = props;

  const { field } = useController({ name, control, shouldUnregister });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onLoadOptions = React.useCallback(
    tinyDebounce(async (inputText: string, callback: (options: OptionsOrGroups<T, GroupBase<T>>) => void) => {
      callback((await onFetch?.(inputText)) || []);
    }, search_debounce_time),
    [search_debounce_time, onFetch],
  );

  const components = optionComponent ? { Option: optionComponent } : undefined;

  const value = React.useMemo(() => {
    // force to not show selected value
    if (!showValue || field.value === undefined) return null;

    return (options || defaultOptions || [])?.find(
      (e: T) => e[valueAs || 'value'] === field.value?.toString(),
    );
  }, [showValue, field.value, options, defaultOptions, valueAs]);

  return (
    <div className={`flex flex-col ${className}`}>
      {!!label && typeof label === 'string' ? (
        <label className="input-label">
          {required && <span className="mt-2 text-red-500">*</span>}
          {label}
        </label>
      ) : (
        label
      )}

      <div className="block">
        <div id="content w-full">
          <AsyncSelect
            noOptionsMessage={() => 'Nenhum registro encontrado'}
            loadingMessage={() => 'Carregando'}
            className="w-full"
            isDisabled={disabled}
            defaultOptions={defaultOptions}
            options={options}
            placeholder={placeholder}
            onChange={option => {
              onChange?.(option); // onChange prop
              if (!option) field.onChange(null as unknown as ChangeEvent<Element>);
              else field.onChange(getOptionValue(option) as unknown as ChangeEvent<Element>);
            }}
            value={value}
            loadOptions={onLoadOptions}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isSearchable={isSearchable}
            components={components}
            isClearable={clearable}
            {...select_props}
          />
        </div>
      </div>

      {error?.message && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};
