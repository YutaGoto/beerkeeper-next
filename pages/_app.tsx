import '../styles/globals.css'
import 'antd/dist/antd.css'
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
