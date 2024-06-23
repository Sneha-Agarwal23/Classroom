import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";


export const childRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


childRouter.post('/child/create', async (c) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    
    try {
        const child = await prisma.child.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                dob: body.dob,
                pob: body.pob,
                nationality: body.nationality,
                gender: body.gender,
                bloodGroup: body.bloodGroup,
                age: body.age,
                preSchool: body.preSchool,
                school: { connect: { id: body.schoolId } },
                admissionNo: body.admissionNo,
                class: body.class, 
                mother: { connect: { id: body.motherId } },
                father: { connect: { id: body.fatherId } },
                releasePerson: { connect: { id: body.releasePersonId } },
                emergencyPerson: { connect: { id: body.emergencyPersonId } },
                attendance: {
                    create: body.attendance.map((entry: any) => ({
                        date: new Date(entry.date),
                        isPresent: entry.isPresent,
                    })),
                },
            },
        });

        return c.json(child);
    } catch (e) {
        console.error("Error creating child:", e);
        c.status(500);
        return c.json({ error: "Error creating child" });
    }
});

childRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const children = await prisma.child.findMany();

    return c.json(children);
});


childRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const child = await prisma.child.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!child) {
        c.status(404);
        return c.json({ error: "Child not found" });
    }

    return c.json(child);
});


childRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    try {
        const updatedChild = await prisma.child.update({
            where: { id: parseInt(id) },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                dob: new Date(body.dob),
                pob: body.pob,
                nationality: body.nationality,
                gender: body.gender,
                bloodGroup: body.bloodGroup,
                age: body.age,
                preSchool: body.preSchool,
                schoolId: body.schoolId,
                admissionNo: body.admissionNo,
                motherId: body.motherId,
                fatherId: body.fatherId,
                releasePersonId: body.releasePersonId,
                emergencyPersonId: body.emergencyPersonId,
                attendance: {
                    upsert: body.attendance.map((entry: any) => ({
                        where: { id: entry.id },
                        create: {
                            date: new Date(entry.date),
                            isPresent: entry.isPresent,
                        },
                        update: {
                            date: new Date(entry.date),
                            isPresent: entry.isPresent,
                        },
                    })),
                },
            },
            include: { attendance: true },
        });

        return c.json(updatedChild);
    } catch (e) {
        console.error("Error updating child:", e);
        c.status(500);
        return c.json({ error: "Error updating child" });
    }
});


childRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    await prisma.child.delete({
        where: {
            id: parseInt(id),
        },
    });

    return c.json({ message: "Child deleted successfully" });
});
