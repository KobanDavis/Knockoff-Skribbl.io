import { AppProps } from 'next/app'
import React, { FC } from 'react'
import './_app.less'

const App = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />
}

export default App
