import React, { ButtonHTMLAttributes, FC } from 'react'

import styles from './index.module.less'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
	return (
		<button {...rest} className={[styles.wrapper, className].join(' ')}>
			{children}
		</button>
	)
}

export default Button
