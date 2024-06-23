import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const motherRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


motherRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const mother = await prisma.mother.create({
            data: {
                name: body.name,
                mobileNo: body.mobileNo,
                address: body.address,
                email: body.email,
                password: body.password,
                profession: body.profession,
                child: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
        });

        const token = await sign({ id: mother.id }, c.env.JWT_SECRET);

        return c.json({ jwt: token });
    } catch (e) {
        console.error("Error signing up mother:", e);
        c.status(500);
        return c.json({ error: "Error signing up mother" });
    }
});


motherRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const mothers = await prisma.mother.findMany();

        return c.json(mothers);
    } catch (e) {
        console.error("Error fetching mothers:", e);
        c.status(500);
        return c.json({ error: "Error fetching mothers" });
    }
});

motherRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const mother = await prisma.mother.findUnique({
            where: { id: parseInt(id) },
        });

        if (!mother) {
            c.status(404);
            return c.json({ error: "Mother not found" });
        }

        return c.json(mother);
    } catch (e) {
        console.error("Error fetching mother:", e);
        c.status(500);
        return c.json({ error: "Error fetching mother" });
    }
});

motherRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    try {
        const updatedMother = await prisma.mother.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                mobileNo: body.mobileNo,
                address: body.address,
                email: body.email,
                profession: body.profession,
                child: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
        });

        return c.json(updatedMother);
    } catch (e) {
        console.error("Error updating mother:", e);
        c.status(500);
        return c.json({ error: "Error updating mother" });
    }
});

motherRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        await prisma.mother.delete({
            where: { id: parseInt(id) },
        });

        return c.json({ message: "Mother deleted successfully" });
    } catch (e) {
        console.error("Error deleting mother:", e);
        c.status(500);
        return c.json({ error: "Error deleting mother" });
    }
});
