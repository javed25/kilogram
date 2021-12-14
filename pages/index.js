import Head from 'next/head'
import Body from '../components/Body'
import Header from '../components/Header'
import Modal from '../components/Modal'

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Kilogram</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <Header/>
      <Body />
      <Modal />
      
    </div>
  )
}
