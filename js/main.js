
(() => {
    const timeForm = document.querySelector('#timeForm')
    const startTimeA = document.querySelector('#startTimeA')
    const endTimeA = document.querySelector('#endTimeA')
    const timeOutputA = document.querySelector('#timeOutputA')
    const decOutputA = document.querySelector('#decOutputA')
    
    const startTimeB = document.querySelector('#startTimeB')
    const endTimeB = document.querySelector('#endTimeB')
    const timeOutputB = document.querySelector('#timeOutputB')
    const decOutputB = document.querySelector('#decOutputB')
    const timeOutputT = document.querySelector('#timeOutputT')
    const decOutputT = document.querySelector('#decOutputT')

    function leadingZero(time) {
        const temp = new Date(time)
        return temp.toLocaleTimeString(undefined, {
            hour: "2-digit", 
            minute: "2-digit",
            timeZone: "UTC"
        })
    }

    const getTimestampFromHHMM = (timeHHMM) => {
        const [ hh, mm ] = timeHHMM.split(':') 
        const time = new Date(Date.UTC(0))
        time.setUTCHours(hh)
        time.setUTCMinutes(mm)
        time.setUTCSeconds('0')
        time.setUTCMilliseconds('0')
        return time.getTime()
    }

    const getDecTime = (time) => {
        const workTimeHours = time.getUTCHours()
        const workTimeMinutes = time.getUTCMinutes()
        return [ workTimeHours, Math.round((workTimeMinutes / 60) * 100) ].join(',')
    }

    getWorkTimeDuratons = (startTimeStamp, endTimeStamp) => {
        const workTime = new Date(Date.UTC(0))
        workTime.setTime(endTimeStamp - startTimeStamp)

        return ({
            workingTimeInHHMM: leadingZero(workTime),
            workingTimeInDec: getDecTime(workTime),
            workingTimeAsTimestamp: workTime.getTime()
        })
    }

    const calculateDuration = (start, end) => {
        const startTimeStampA = getTimestampFromHHMM(start)
        const endTimeStampA = getTimestampFromHHMM(end)
        return getWorkTimeDuratons(startTimeStampA, endTimeStampA)
    }

    const calculateTotalDuration = (timeA, timeB) => {
        const totalTime = new Date(Date.UTC(0))
        totalTime.setTime(timeA + timeB)

        return ({
            workingTimeInHHMM: leadingZero(totalTime),
            workingTimeInDec: getDecTime(totalTime),
            workingTimeAsTimestamp: totalTime.getTime()
        })
    }

    const executeCalculation = (e) => {
        e.preventDefault()

        const A = calculateDuration(startTimeA.value, endTimeA.value)
        timeOutputA.textContent = A.workingTimeInHHMM
        decOutputA.textContent = A.workingTimeInDec
        
        const B = calculateDuration(startTimeB.value, endTimeB.value)
        timeOutputB.textContent = B.workingTimeInHHMM
        decOutputB.textContent = B.workingTimeInDec

        const total = calculateTotalDuration(A.workingTimeAsTimestamp, B.workingTimeAsTimestamp)
        timeOutputT.textContent = total.workingTimeInHHMM
        decOutputT.textContent = total.workingTimeInDec
    } 

    timeForm.addEventListener('submit', executeCalculation)
    startTimeA.addEventListener('input', executeCalculation)
    endTimeA.addEventListener('input', executeCalculation)
    startTimeB.addEventListener('input', executeCalculation)
    endTimeB.addEventListener('input', executeCalculation)

    window.addEventListener('load', executeCalculation)


})()
