import React, { FC, InputHTMLAttributes } from 'react'

import styles from './index.module.less'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...rest }) => {
	return <input {...rest} className={[styles.wrapper, className].join(' ')} />
}

export default Input
