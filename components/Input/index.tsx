import React, { FC } from 'react'

import styles from './index.module.less'

interface InputProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...rest }) => {
	return <input {...rest} className={[styles.wrapper, className].join(' ')} />
}

export default Input
