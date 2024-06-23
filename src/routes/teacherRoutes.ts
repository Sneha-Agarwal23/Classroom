import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";


export const teacherRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

// Create a new teacher
teacherRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const teacher = await prisma.teacher.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                mobileNo: body.mobileNo,
                email: body.email,
                password: body.password,
                schoolId: body.schoolId,
            },
        });

        const token = await sign({ id: teacher.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token
        });
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while creating teacher" });
    }
});

// Get all teachers
teacherRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const teachers = await prisma.teacher.findMany();

    return c.json(teachers);
});

// Get teacher by ID
teacherRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const teacher = await prisma.teacher.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!teacher) {
        c.status(404);
        return c.json({ error: "Teacher not found" });
    }

    return c.json(teacher);
});

// Update teacher by ID
teacherRouter.put('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    const body = await c.req.json();

    const teacher = await prisma.teacher.update({
        where: {
            id: parseInt(id),
        },
        data: {
            ...body,
        },
    });

    return c.json(teacher);
});

// Delete teacher by ID
teacherRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    await prisma.teacher.delete({
        where: {
            id: parseInt(id),
        },
    });

    return c.json({ message: "Teacher deleted successfully" });
});
