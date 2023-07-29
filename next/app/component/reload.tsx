'use client'

import React from "react"

export default function Reload(){
    return (
        <>
            <div onClick={()=>location.reload()}>refresh</div>
        </>
    )
}