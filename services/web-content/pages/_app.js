import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'

library.add(faUser)

const theme = {
  font: {
		family: "'Mitr', sans-serif"
	}
}

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>  
    )
  } 
}

export default withReduxStore(MyApp)