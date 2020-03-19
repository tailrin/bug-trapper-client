const fakeDB = {
    issues: [
        {
            id: 1,
            projectId: 1,
            description: "test",
            dateModified: "today",
            assignedTo: "user1"
        },
        {
            id: 2,
            projectId: 1,
            description: "test",
            dateModified: "today",
            assignedTo: "user1"
        },
        {
            id: 3,
            projectId: 1,
            description: "test",
            dateModified: "today",
            assignedTo: "user1"
        },
        {
            id: 4,
            projectId: 1,
            description: "test",
            dateModified: "today",
            assignedTo: "user1"
        },
    ],

    users: [
        {
            id: 1,
            name: "test",
            role: "standard",
            password: "user1"
        },
        {
            id: 2,
            name: "test",
            role: "standard",
            password: "user2"
        },
        {
            id: 3,
            name: "test",
            role: "standard",
            password: "user3"
        },
    ],

    projects: [
        {
            id: 1,
            userId: 1,
            name: "test1",
            dateCreated: "today"
        },
        {
            id: 2,
            userId: 1,
            name: "test2",
            dateCreated: "today"
        },
        {
            id: 3,
            userId: 1,
            name: "test3",
            dateCreated: "today"
        },
        {
            id: 4,
            userId: 1,
            name: "test4",
            dateCreated: "today"
        },
       
    ]
}

export default fakeDB;