import React, { FC, SVGAttributes } from 'react'

interface CrownIconProps extends SVGAttributes<SVGElement> {}

const CrownIcon: FC<CrownIconProps> = ({ ...rest }) => {
	return (
		<svg {...rest} xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'>
			<path d='M3 16l-3-10 7.104 4 4.896-8 4.896 8 7.104-4-3 10h-18zm0 2v4h18v-4h-18z' />
		</svg>
	)
}

export default CrownIcon
