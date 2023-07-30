const lsyMob = {
    isAOS(){
        return this._isMobSub() === 'A'
    },
    isIOS(){
        return this._isMobSub() === 'I'
    },
    isWEB(){
        return this._isMobSub() === 'W'
    },
    _isMobSub(){
        let result = 'W'
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Android')) {
            result = 'A'
        } else if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) {
            result = 'I'
        } else {
            result = 'W'
        }
        return result
    }
}

export {lsyMob}