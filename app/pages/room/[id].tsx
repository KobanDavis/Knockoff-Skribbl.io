import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { UserObject } from '../../../server/src/User'
import { Socket } from 'socket.io-client'
import { toPromise } from '../../utils'

interface RoomProps {
	socket: Socket
}

const Room: NextPage<RoomProps> = ({ socket }) => {
	const [users, setUsers] = useState<UserObject[]>(null)
	const router = useRouter()

	const roomId = router.query.id
	console.log(roomId, users)

	useEffect(() => {
		const name = localStorage.getItem('name')
		const id = sessionStorage.getItem('userId')
		const init = async () => {
			socket.emit('checkRoomExists', { roomId })
			const roomExists = await toPromise(socket, 'response/checkRoomExists')
			if (!roomExists) return router.replace('/')

			socket.emit('getUser', { id })
			if ((await toPromise(socket, 'response/getUser')) !== undefined) {
				socket.emit('joinRoom', { id, name, roomId })
				await toPromise(socket, 'response/joinRoom')
			} else {
				socket.emit('reconnectUser', { id, roomId })
				await toPromise(socket, 'response/reconnectUser')
			}

			socket.emit('getUsers', { roomId })
			socket.on('response/getUsers', setUsers)
		}

		if (!roomId) return

		if (name) {
			init()
		} else {
			router.replace('/')
		}
	}, [roomId])

	return (
		<div>
			{users?.map((user) => (
				<div>{user.name}</div>
			))}
		</div>
	)
}

export default Room
