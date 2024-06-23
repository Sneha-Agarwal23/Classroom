import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const fatherRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


fatherRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
 
    try {
        const father = await prisma.father.create({
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

        const token = await sign({ id: father.id }, c.env.JWT_SECRET);

        return c.json({ jwt: token });
    } catch (e) {
        console.error("Error signing up father:", e);
        c.status(500);
        return c.json({ error: "Error signing up father" });
    }
});

fatherRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const fathers = await prisma.father.findMany();

        return c.json(fathers);
    } catch (e) {
        console.error("Error fetching fathers:", e);
        c.status(500);
        return c.json({ error: "Error fetching fathers" });
    }
});

fatherRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const father = await prisma.father.findUnique({
            where: { id: parseInt(id) },
        });

        if (!father) {
            c.status(404);
            return c.json({ error: "Father not found" });
        }

        return c.json(father);
    } catch (e) {
        console.error("Error fetching father:", e);
        c.status(500);
        return c.json({ error: "Error fetching father" });
    }
});


fatherRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    try {
        const updatedFather = await prisma.father.update({
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

        return c.json(updatedFather);
    } catch (e) {
        console.error("Error updating father:", e);
        c.status(500);
        return c.json({ error: "Error updating father" });
    }
});

fatherRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        await prisma.father.delete({
            where: { id: parseInt(id) },
        });

        return c.json({ message: "Father deleted successfully" });
    } catch (e) {
        console.error("Error deleting father:", e);
        c.status(500);
        return c.json({ error: "Error deleting father" });
    }
});
