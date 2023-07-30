'use client'

import { useEffect } from "react"
import { lsyMob } from "@/util/lsyMob";

export default function Init(){
    useEffect(()=>{
        console.log('useEffect init')
        if(lsyMob.isAOS()){
            document.addEventListener('message', function(e){
                console.log('message:', e)
            })
        }
        if(lsyMob.isIOS()){
            window.addEventListener('message', function(e){
                console.log('message:', e)
            })
        }
        return()=>{
            console.log('useEffect end')
            if(lsyMob.isAOS()){
                document.removeEventListener('message', function(e){
                    console.log('message:', e)
                })
            }
            if(lsyMob.isIOS()){
                window.removeEventListener('message', function(e){
                    console.log('message:', e)
                })
            }
        }
    }, [])
    return (
        <></>
    )
}