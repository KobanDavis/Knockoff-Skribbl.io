import React, { FC } from 'react'

import styles from './index.module.less'

interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
	return (
		<div {...rest} className={[styles.wrapper, className].join(' ')}>
			{children}
		</div>
	)
}

export default Button
