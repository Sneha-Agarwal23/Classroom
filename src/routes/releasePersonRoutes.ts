import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const releasePersonRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


releasePersonRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    

    try {
        const releasePerson = await prisma.releasePerson.create({
            data: {
                name: body.name,
                relationship: body.relationship,
                mobileNo: body.mobileNo,
                child: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
        });

        const token = await sign({ id: releasePerson.id }, c.env.JWT_SECRET);

        return c.json({ jwt: token });
    } catch (e) {
        console.error("Error signing up release person:", e);
        c.status(500);
        return c.json({ error: "Error signing up release person" });
    }
});

releasePersonRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const releasePersons = await prisma.releasePerson.findMany({
            include: { child: true },
        });

        return c.json(releasePersons);
    } catch (e) {
        console.error("Error fetching release persons:", e);
        c.status(500);
        return c.json({ error: "Error fetching release persons" });
    }
});

releasePersonRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const releasePerson = await prisma.releasePerson.findUnique({
            where: { id: parseInt(id) },
            include: { child: true },
        });

        if (!releasePerson) {
            c.status(404);
            return c.json({ error: "Release person not found" });
        }

        return c.json(releasePerson);
    } catch (e) {
        console.error("Error fetching release person:", e);
        c.status(500);
        return c.json({ error: "Error fetching release person" });
    }
});

releasePersonRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    try {
        const updatedReleasePerson = await prisma.releasePerson.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                relationship: body.relationship,
                mobileNo: body.mobileNo,
                child: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
            include: { child: true },
        });

        return c.json(updatedReleasePerson);
    } catch (e) {
        console.error("Error updating release person:", e);
        c.status(500);
        return c.json({ error: "Error updating release person" });
    }
});


releasePersonRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        await prisma.releasePerson.delete({
            where: { id: parseInt(id) },
        });

        return c.json({ message: "Release person deleted successfully" });
    } catch (e) {
        console.error("Error deleting release person:", e);
        c.status(500);
        return c.json({ error: "Error deleting release person" });
    }
});
