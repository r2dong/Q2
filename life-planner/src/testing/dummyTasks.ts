import { TimeSlot, TaskModel } from '../app/tasks/task.model'

// internal value of time
const hourVal: number =
    new Date(2018, 3, 8, 10).valueOf() -
    new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
    new Date(2018, 3, 8, 10, 2).valueOf() -
    new Date(2018, 3, 8, 10, 1).valueOf()
// ten minutes (1 / 6 of an hour)
const defaultWeight: number = 1 / 6

// dummy tasks for testing algorithms
// year month day hour minute second millisecond
export const dummyTasks: TaskModel[] = [
    {
        name: "rob a bank",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 5, 9, 0),
        isComplete: false,
        hours: 10
    },
    {
        name: "pass this course",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 10, 9, 0),
        isComplete: false,
        hours: 6
    },
    {
        name: "go to the gym",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 15, 9, 0),
        isComplete: false,
        hours: 5
    },
    {
        name: "eat tacos",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 20, 9, 0),
        isComplete: false,
        hours: 1
    },
    {
        name: "length-2400-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 240
    },
    {
        name: "length-100-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 100
    },
    {
        name: "length-3-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 3
    },
    {
        name: "length-5-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 5
    },
    {
        name: "no-due-10-urg-imp",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 10
    },
    {
        name: "no-due-5-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 5
    },
]

export const pushRightTest: TaskModel[] = [
    {
        name: "rob a bank",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 5, 9, 0),
        isComplete: false,
        hours: 10
    },
    {
        name: "pass this course",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 10, 9, 0),
        isComplete: false,
        hours: 6
    },
    {
        name: "go to the gym",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 15, 9, 0),
        isComplete: false,
        hours: 5
    },
    {
        name: "eat tacos",
        urgent: true,
        important: true,
        dueDateTime: new Date(2018, 3, 20, 9, 0),
        isComplete: false,
        hours: 1
    },
]

export const emptyTaskList: TaskModel[] = []

export const noDueTaskList: TaskModel[] = [
    {
        name: "rob a bank",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 10
    },
    {
        name: "pass this course",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 6
    },
    {
        name: "go to the gym",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 5
    },
    {
        name: "eat tacos",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 1
    },
    {
        name: "length-2400-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 240
    },
    {
        name: "length-100-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 100
    },
    {
        name: "length-3-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 3
    },
    {
        name: "length-5-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 5
    },
    {
        name: "no-due-10-urg-imp",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 10
    },
    {
        name: "no-due-5-nonurg-nonimp",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 5
    }
]

export const allSortsOfTasks: TaskModel[] = [
    {
        name: "rob a bank",
        urgent: true,
        important: true,
        isComplete: false,
        hours: 10
    },
    {
        name: "pass this course",
        urgent: true,
        important: false,
        isComplete: false,
        hours: 6
    },
    {
        name: "go to the gym",
        urgent: false,
        important: true,
        isComplete: false,
        hours: 5
    },
    {
        name: "eat tacos",
        urgent: false,
        important: false,
        isComplete: false,
        hours: 1
    },
    {
        name: "sleep for 3 days",
        urgent: true,
        important: true,
        isComplete: false,
        dueDateTime: new Date(2018, 10, 10, 10),
        hours: 10
    },
    {
        name: "buy Rahsin a cheese cake",
        urgent: true,
        important: false,
        isComplete: false,
        dueDateTime: new Date(2018, 10, 11, 16),
        hours: 6
    },
    {
        name: "bash head against computer",
        urgent: false,
        important: true,
        isComplete: false,
        dueDateTime: new Date(2018, 10, 12, 13),
        hours: 5
    },
    {
        name: "learn how to python",
        urgent: false,
        important: false,
        isComplete: false,
        dueDateTime: new Date(2018, 10, 13, 14),
        hours: 1
    },
]