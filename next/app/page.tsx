import Image from 'next/image'

export default async function Home() {
  const dynamicData = await fetch('http://localhost:3001/helloworld', {cache: 'no-store'})
  const d = await dynamicData.json()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Hellow World {d.lsy}</h1>
    </main>
  )
}
