import { useRouter } from 'next/dist/client/router'
import React, { FC } from 'react'

interface RoomProps {}

const Room: FC<RoomProps> = (props) => {
	const router = useRouter()
	return <div>{router.query.id}</div>
}

export default Room
