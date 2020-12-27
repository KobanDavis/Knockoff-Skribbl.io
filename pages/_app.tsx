import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './_app.less'

const App: NextPage<any> = ({ Component, pageProps }: AppProps) => {
	const [socket] = useState(io(process.env.NEXT_PUBLIC_SERVER_URL))
	useEffect(() => {
		if (sessionStorage.getItem('userId') === null) {
			sessionStorage.setItem('userId', Math.random().toString(36).substring(2))
		}
	}, [])
	return <Component socket={socket} {...pageProps} />
}

export default App
