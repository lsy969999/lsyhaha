'use client'
export default function SampleRnBtn(){
    const onC = ()=>{
        // window.ReactNa
        window.ReactNativeWebView.postMessage(JSON.stringify({callFn:'moduleTest'}))
    }

    return (<button onClick={onC}>sampleBtn</button>)
}