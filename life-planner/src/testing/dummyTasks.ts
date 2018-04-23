// internal value of time
const hourVal: number =
    new Date(2018, 3, 8, 10).valueOf() -
    new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
    new Date(2018, 3, 8, 10, 2).valueOf() -
    new Date(2018, 3, 8, 10, 1).valueOf()
// ten minutes (1 / 6 of an hour)
const defaultWeight: number = 1 / 6

export interface TimeSlot {
    start: Date
    end: Date
}

// stubbing interface, use imported interface when actual one completed
export interface DummyTaskModel {
    name: string
    urgent: boolean
    important: boolean
    due?: Date
    isComplete: boolean
    weight?: number
    schedule?: TimeSlot[] // start/end of time slots assigned
}

// dummy tasks for testing algorithms
// year month day hour minute second millisecond
export const dummyTasks: DummyTaskModel[] = [
    {
        name: "rob a bank",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 5, 9, 0),
        isComplete: false,
        weight: 10
    },
    {
        name: "pass this course",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 10, 9, 0),
        isComplete: false,
        weight: 6
    },
    {
        name: "go to the gym",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 15, 9, 0),
        isComplete: false,
        weight: 5
    },
    {
        name: "eat tacos",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 20, 9, 0),
        isComplete: false,
        weight: 1
    },
    {
        name: "length-2400-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        weight: 2400
    },
    {
        name: "length-100-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        weight: 100
    },
    {
        name: "length-3-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        weight: 3
    },
    {
        name: "length-5-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        weight: 5
    },
    {
        name: "no-due-10-urg-imp",
        urgent: true,
        important: true,
        isComplete: false,
        weight: 10
    },
    {
        name: "no-due-5-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        weight: 5
    },
]

export const pushRightTest: DummyTaskModel[] = [
    {
        name: "rob a bank",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 5, 9, 0),
        isComplete: false,
        weight: 10
    },
    {
        name: "pass this course",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 10, 9, 0),
        isComplete: false,
        weight: 6
    },
    {
        name: "go to the gym",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 15, 9, 0),
        isComplete: false,
        weight: 5
    },
    {
        name: "eat tacos",
        urgent: true,
        important: true,
        due: new Date(2018, 3, 20, 9, 0),
        isComplete: false,
        weight: 1
    },
]