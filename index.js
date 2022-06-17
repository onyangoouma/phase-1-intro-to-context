// Your code here
const createEmployeeRecord = (valueIndex) => {
    const details = {
        firstName: valueIndex[0],
        familyName: valueIndex[1],
        title: valueIndex[2],
        payPerHour: valueIndex[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return details;
}

const createEmployeeRecords = (employee) => {
    return employee.map((valueIndex) =>{
        return createEmployeeRecord(valueIndex)
    })
}

const createTimeInEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

const createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

const hoursWorkedOnDate = (employee, soughtDate) => {
    let inEvent = employee.timeInEvents.find((event) =>{
        return event.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find((event) =>{
        return event.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = (employee, dateSought) => {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

const allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map((event) =>{
        return event.date
    })

    let payable = eligibleDates.reduce((memo, d) =>{
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find((data) => {
    return data.firstName === firstName
  })
}

const calculatePayroll = (arrayOfEmployeeRecords) => {
    return arrayOfEmployeeRecords.reduce((memo, data) =>{
        return memo + allWagesFor(data)
    }, 0)
}