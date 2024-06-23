import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const adminRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();


adminRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    

    try {
        const admin = await prisma.admin.create({
            data: {
                email: body.email,
                password: body.password,
                firstName: body.firstName,
                lastName: body.lastName,
                orgName: body.orgName,
                mobileNo: body.mobileNo,
            },
        });

        const token = await sign({ id: admin.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token
        });
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while signing up" });
    }
});


adminRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { email, password } = body;

    const admin = await prisma.admin.findFirst({
        where: {
            email,
            password,
        },
    });

    if (!admin) {
        c.status(403);
        return c.json({ error: "Invalid email or password" });
    }

    const token = await sign({ id: admin.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token });
});


adminRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const admins = await prisma.admin.findMany();

    return c.json(admins);
});


adminRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const admin = await prisma.admin.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!admin) {
        c.status(404);
        return c.json({ error: "Admin not found" });
    }

    return c.json(admin);
});

adminRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    const admin = await prisma.admin.update({
        where: {
            id: parseInt(id),
        },
        data: {
            ...body,
        },
    });

    return c.json(admin);
});


adminRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    await prisma.admin.delete({
        where: {
            id: parseInt(id),
        },
    });

    return c.json({ message: "Admin deleted successfully" });
});
