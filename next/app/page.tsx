
import Image from 'next/image'
import Reload from './component/reload'
import Init from './component/init'
import SampleRnBtn from './component/sampleRnBtn'

type param = {hello: string, lsy: string}

export default async function Home() {
  // const dynamicData = await fetch('http://api.lsyhaha.xyz/hello', {cache: 'no-store'})
  // const d = await dynamicData.json()

  return (
    <main className="">
        <h1>Hellow World TEST!</h1>
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
          <SampleRnBtn></SampleRnBtn>
            <Reload></Reload>
            <Init></Init>
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