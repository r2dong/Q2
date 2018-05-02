import { TaskModel } from "../app/tasks/task.model";

const hrs5: number = 1.8e+7
export const dummySchedule1: TaskModel[] = [
    {
        name: "rob a bank",
        rid: "1",
        hours: 5,
        urgent: true,
        important: true,
        isComplete: false,
        schedule: [
            {
                start: new Date(2018, 4, 1, 15),
                end: new Date(2018, 4, 1, 17)
            },
            {
                start: new Date(2018, 5, 1, 15),
                end: new Date(2018, 5, 1, 17)
            }
        ]
    },
    {
        name: "rob two banks",
        rid: "2",
        hours: 5,
        urgent: true,
        important: true,
        isComplete: false,
        schedule: [
            {
                start: new Date(2018, 6, 1, 15),
                end: new Date(2018, 6, 1, 17)
            },
            {
                start: new Date(2018, 7, 1, 15),
                end: new Date(2018, 7, 1, 17)
            }
        ]
    }
]

export const dummySchedue2: TaskModel[] = [
    {
        name: "rob even more banks!",
        rid: "2",
        hours: 5,
        urgent: true,
        important: true,
        isComplete: false,
        schedule: [
            {
                start: new Date(2018, 8, 1, 15),
                end: new Date(2018, 8, 1, 17)
            },
            {
                start: new Date(2018, 9, 1, 15),
                end: new Date(2018, 9, 1, 17)
            }
        ]
    }
]