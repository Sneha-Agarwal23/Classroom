import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const attendanceRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

attendanceRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const attendance = await prisma.attendance.create({
            data: {
                date: new Date(body.date),
                isPresent: body.isPresent,
                childId: body.childId,
            },
        });

        return c.json(attendance);
    } catch (e) {
        console.error("Error creating attendance record:", e);
        c.status(500);
        return c.json({ error: "Error creating attendance record" });
    }
});

attendanceRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const attendance = await prisma.attendance.findMany();

        return c.json(attendance);
    } catch (e) {
        console.error("Error fetching attendance records:", e);
        c.status(500);
        return c.json({ error: "Error fetching attendance records" });
    }
});

attendanceRouter.get('/child/:childId', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const childId = c.req.param("childId");
    try {
        const attendance = await prisma.attendance.findMany({
            where: { childId: parseInt(childId) },
        });

        return c.json(attendance);
    } catch (e) {
        console.error("Error fetching attendance records for child:", e);
        c.status(500);
        return c.json({ error: "Error fetching attendance records for child" });
    }
});

attendanceRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");;
    const body = await c.req.json();

    try {
        const updatedAttendance = await prisma.attendance.update({
            where: { id: parseInt(id) },
            data: {
                date: new Date(body.date),
                isPresent: body.isPresent,
                childId: body.childId,
            },
        });

        return c.json(updatedAttendance);
    } catch (e) {
        console.error("Error updating attendance record:", e);
        c.status(500);
        return c.json({ error: "Error updating attendance record" });
    }
});


attendanceRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        await prisma.attendance.delete({
            where: { id: parseInt(id) },
        });

        return c.json({ message: "Attendance record deleted successfully" });
    } catch (e) {
        console.error("Error deleting attendance record:", e);
        c.status(500);
        return c.json({ error: "Error deleting attendance record" });
    }
});
