import type { FC } from 'react';

import styles from './index.module.scss';

import type { ButtonPropsType } from './types';

export const Button: FC<ButtonPropsType> = ({
  children,
  icon,
  id,
  onClick,
  title,
  variant = 'default',
  ...props
}) => {
  const ButtonComponent = ButtonVariants[variant];

  const onClickHandler = () => onClick(id);

  return (
    <ButtonComponent onClick={onClickHandler} {...props}>
      {!!title && title}
      {!!icon && <Image src={icon} />}
      {children}
    </ButtonComponent>
  );
};

const DefaultButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => <button className={styles.defaultButton} {...props} />;

const PrimaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => <button className={styles.primaryButton} {...props} />;

const SecondaryButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => <button className={styles.secondaryButton} {...props} />;

const Image = (props: { src: string }) => (
  <img className="image" src={props.src} alt="button icon" />
);

const ButtonVariants = {
  default: DefaultButton,
  primary: PrimaryButton,
  secondary: SecondaryButton,
};
