import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { UserObject } from '../../serverTypes'
import { Socket } from 'socket.io-client'
import { toPromise } from '../../utils'

import styles from './index.module.less'
import { CopyIcon, Input } from '../../components'
import CrownIcon from '../../components/CrownIcon'

interface RoomProps {
	socket: Socket
}

const Room: NextPage<RoomProps> = ({ socket }) => {
	const [users, setUsers] = useState<UserObject[]>(null)
	const router = useRouter()

	const roomId = router.query.id as string

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

	const copyCode = () => {
		navigator.clipboard.writeText(roomId)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<span>Waiting room:</span>
				<div className={styles.code}>
					<Input contentEditable={false} value={roomId} />
					<span title='Copy code'>
						<CopyIcon onClick={copyCode} className={styles.copyIcon} />
					</span>
				</div>
			</div>
			<div>
				<span>Users:</span>
				<div className={styles.users}>
					{users?.map((user) => (
						<div className={styles.user} key={user.id}>
							{user.name}
							{user.isHost ? <CrownIcon className={styles.crownIcon} /> : null}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Room
