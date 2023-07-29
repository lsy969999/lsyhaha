
import Image from 'next/image'
import Reload from './component/reload'

type param = {hello: string, lsy: string}

export default async function Home() {
  const dynamicData = await fetch('http://localhost:3001/helloworld', {cache: 'no-store'})
  const d = await dynamicData.json()
  return (
    <main className="">
        <h1>Hellow World{d.lsy}</h1>
        <section>
          <div>
            <button>email login</button>
          </div>
          <div>
            <button>google login</button>
          </div>
          <div>
            <button>kakao login</button>
          </div>
          <div>
            <Reload></Reload>
          </div>
        </section>
    </main>
  )
}

// export async function generateStaticParams(){
//   const dynamicData = await fetch('http://localhost:3001/helloworld', {cache: 'no-store'})
//   const d = await dynamicData.json()
//   return {hello: 'test', lsy: 'haha'}
// }