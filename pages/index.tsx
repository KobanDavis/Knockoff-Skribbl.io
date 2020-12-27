import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { Input } from '../components'
import Button from '../components/Button'
import styles from './index.module.less'
import { Socket } from 'socket.io-client'
import { toPromise } from '../utils'

interface Props {
	socket: Socket
}

const Home: FC<Props> = ({ socket }) => {
	const router = useRouter()
	const [name, setName] = useState<string>('')
	const [roomId, setRoomId] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setName(localStorage.getItem('name'))
	}, [])

	const create = async () => {
		if (loading) return
		setLoading(true)
		socket.emit('createRoom', { name })
		const roomId = await toPromise(socket, 'response/createRoom')
		router.push({ pathname: `/room/${roomId}` })
		setLoading(false)
	}

	const handleBlur = () => {
		if (name !== '') {
			localStorage.setItem('name', name)
		} else {
			localStorage.removeItem('name')
		}
	}

	return (
		<div className={styles.wrapper}>
			<h1>Bootleg skribble.io</h1>
			<div className={[styles.row, styles.name].join(' ')}>
				<span className={styles.label}>Name:</span>
				<Input onBlur={handleBlur} value={name} onChange={(e) => setName((e.target as any).value)} placeholder='Enter name...' />
			</div>
			<div className={styles.join}>
				<div className={styles.row}>
					<span className={styles.label}>Code: </span>
					<Input onChange={(e) => setRoomId((e.target as any).value)} value={roomId} placeholder='Enter code...' />
				</div>
				<Button onClick={() => router.push(`/room/${roomId}`)} disabled={roomId.trim().length < 5} className={styles.joinButton}>
					Join
				</Button>
			</div>
			<span className={styles.or}>or</span>
			<Button onClick={create}>Create</Button>
		</div>
	)
}

export default Home
