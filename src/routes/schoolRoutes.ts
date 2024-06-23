import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const schoolRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


schoolRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
  

    try {
        const school = await prisma.school.create({
            data: {
                instituteName: body.instituteName,
                address: body.address,
                identificationNo: body.identificationNo,
                principalName: body.principalName,
                mobileNo: body.mobileNo,
                children: {
                    connect: body.childrenIds.map((id: number) => ({ id })),
                },
            },
        });

        const token = await sign({ id: school.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token
        });
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while creating school" });
    }
});


schoolRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const schools = await prisma.school.findMany();

    return c.json(schools);
});


schoolRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const school = await prisma.school.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!school) {
        c.status(404);
        return c.json({ error: "School not found" });
    }

    return c.json(school);
});


schoolRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    const school = await prisma.school.update({
        where: {
            id: parseInt(id),
        },
        data: {
            ...body,
        },
    });

    return c.json(school);
});


schoolRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    await prisma.school.delete({
        where: {
            id: parseInt(id),
        },
    });

    return c.json({ message: "School deleted successfully" });
});
