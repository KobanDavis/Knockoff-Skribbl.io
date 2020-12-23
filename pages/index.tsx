import { useRouter } from 'next/dist/client/router'
import React, { FC, useState } from 'react'
import { Input } from '../components'
import Button from '../components/Button'
import { CreateResponse } from '../server/API'
import { APIResponse } from '../server/Response'
import styles from './index.module.less'

const Home: FC = () => {
	const router = useRouter()
	const [name, setName] = useState<string>('')
	const [roomCode, setRoomCode] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const join = async () => {
		if (loading) return
		try {
			console.log(roomCode)
			setLoading(true)
			const res = await (
				await fetch('/api/join', {
					method: 'POST',
					body: JSON.stringify({ id: roomCode, name }),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			).json()
			localStorage.setItem('userId', res.data.userId)
			router.push(`/room/${res.data.sessionId}`)
		} catch {
			// handle error
		} finally {
			setLoading(false)
		}
	}

	const create = async () => {
		if (loading) return
		try {
			setLoading(true)
			const res: APIResponse<CreateResponse> = await (
				await fetch('/api/create', {
					method: 'POST',
					body: JSON.stringify({ name }),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			).json()
			console.log(res)
			localStorage.setItem('userId', res.data.userId)
			router.push(`/room/${res.data.sessionId}`)
		} catch {
			// handle error
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.wrapper}>
			<h1>Bootleg skribble.io</h1>
			<div className={[styles.row, styles.name].join(' ')}>
				<span className={styles.label}>Name:</span>
				<Input onChange={(e) => setName((e.target as any).value)} placeholder='Enter name...' />
			</div>
			<div className={styles.join}>
				<div className={styles.row}>
					<span className={styles.label}>Code: </span>
					<Input onChange={(e) => setRoomCode((e.target as any).value)} placeholder='Enter code...' />
				</div>
				<Button onClick={join} className={styles.joinButton}>
					Join
				</Button>
			</div>
			<span className={styles.or}>or</span>
			<Button onClick={create}>Create</Button>
		</div>
	)
}

export default Home
