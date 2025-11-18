import { type FC, useEffect, useRef, useState } from 'react';

import { getOptionIcon } from '@/helpers/getOptionIcon';

import styles from './index.module.scss';

import type { InputPropsType } from '../types';
import type { GeoEntity } from 'api';

export const DropdownInput: FC<InputPropsType> = ({
  value = '',
  closeDropdown,
  optionsList = [],
  onChangeInput = () => {},
  onKeyDown: onKeyDownFromProps,
  onOptionClick,
  open,
  openDropdown,
  placeholder = 'Пошук...',
  refs: { inputRef, dropdownRef },
  setValue,
}) => {
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const optionsListRef = useRef<GeoEntity[]>(optionsList);

  useEffect(() => {
    optionsListRef.current = optionsList;
  }, [optionsList]);

  const clearInput = () => {
    setValue('');
    closeDropdown();
    setHighlightIndex(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDownFromProps(e);

    if (['ArrowDown', 'ArrowUp'].includes(e.key)) e.preventDefault();

    const currentOptions = optionsListRef.current;
    const len = currentOptions.length;

    if (e.key === 'ArrowDown' && open && len > 0)
      setHighlightIndex((p) => (p + 1) % len);

    if (e.key === 'ArrowUp' && open && len > 0)
      setHighlightIndex((p) => (p <= 0 ? len - 1 : p - 1));

    if (e.key === 'Enter' && open && highlightIndex >= 0) {
      e.preventDefault();
      onOptionClick(currentOptions[highlightIndex].name);
    }

    if (e.key === 'Escape') {
      setHighlightIndex(-1);
    }

    onKeyDownFromProps(e);
  };

  const onOptionHover = (index: number) => setHighlightIndex(index);

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
