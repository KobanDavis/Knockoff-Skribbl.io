import type { Socket } from 'socket.io-client'

const toPromise = <T = any>(socket: Socket, ev: string): Promise<T> => {
	return new Promise((resolve) => socket.once(ev, resolve))
}

export { toPromise }
