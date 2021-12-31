import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/antd-custom.css'
import type { AppProps } from 'next/app'
import { Layout } from 'antd'

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
