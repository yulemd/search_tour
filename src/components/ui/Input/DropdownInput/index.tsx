import type { FC } from 'react';

import { getOptionIcon } from '@/helpers/getOptionIcon';

import styles from './index.module.scss';

import type { InputPropsType } from '../types';

export const DropdownInput: FC<InputPropsType> = ({
  value = '',
  closeDropdown,
  optionsList = [],
  highlightIndex,
  onChangeInput = () => {},
  onKeyDown,
  onOptionClick,
  onOptionHover,
  open,
  openDropdown,
  placeholder = 'Пошук...',
  refs: { inputRef, dropdownRef },
  setValue,
}) => {
  const clearInput = () => {
    setValue('');
    closeDropdown();
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChangeInput}
          onFocus={openDropdown}
          onKeyDown={onKeyDown}
        />

        {value.length > 0 && (
          <button className={styles.clearBtn} onClick={clearInput}>
            ×
          </button>
        )}
      </div>

      {open && optionsList.length > 0 && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {optionsList.map((option, index) => (
            <div
              key={option.id}
              className={`${styles.option} ${
                highlightIndex === index ? styles.highlighted : ''
              }`}
              onMouseEnter={() => onOptionHover(index)}
              onMouseDown={(e) => {
                e.preventDefault();
                onOptionClick(option.name);
              }}
            >
              {`${getOptionIcon(option)} ${option.name}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
