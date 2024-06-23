import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const emergencyPersonRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

emergencyPersonRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
   

    try {
        const emergencyPerson = await prisma.emergencyPerson.create({
            data: {
                name: body.name,
                relationship: body.relationship,
                mobileNo: body.mobileNo,
                child: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
        });

        const token = await sign({ id: emergencyPerson.id }, c.env.JWT_SECRET);

        return c.json({ jwt: token });
    } catch (e) {
        console.error("Error signing up emergency person:", e);
        c.status(500);
        return c.json({ error: "Error signing up emergency person" });
    }
});

emergencyPersonRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const emergencyPersons = await prisma.emergencyPerson.findMany();

        return c.json(emergencyPersons);
    } catch (e) {
        console.error("Error fetching emergency persons:", e);
        c.status(500);
        return c.json({ error: "Error fetching emergency persons" });
    }
});

emergencyPersonRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const emergencyPerson = await prisma.emergencyPerson.findUnique({
            where: { id: parseInt(id) },
        });

        if (!emergencyPerson) {
            c.status(404);
            return c.json({ error: "Emergency person not found" });
        }

        return c.json(emergencyPerson);
    } catch (e) {
        console.error("Error fetching emergency person:", e);
        c.status(500);
        return c.json({ error: "Error fetching emergency person" });
    }
});


emergencyPersonRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    try {
        const updatedEmergencyPerson = await prisma.emergencyPerson.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                relationship: body.relationship,
                mobileNo: body.mobileNo,
                child: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
        });

        return c.json(updatedEmergencyPerson);
    } catch (e) {
        console.error("Error updating emergency person:", e);
        c.status(500);
        return c.json({ error: "Error updating emergency person" });
    }
});


emergencyPersonRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        await prisma.emergencyPerson.delete({
            where: { id: parseInt(id) },
        });

        return c.json({ message: "Emergency person deleted successfully" });
    } catch (e) {
        console.error("Error deleting emergency person:", e);
        c.status(500);
        return c.json({ error: "Error deleting emergency person" });
    }
});
