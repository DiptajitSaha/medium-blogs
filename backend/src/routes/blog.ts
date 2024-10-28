import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt";

export const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

// create blog
blog.post('/', async (c) => {
    try {
        const Authorization = c.req.header('authorization');
        const token = Authorization?.split(' ')[1];
        if (token) {
            verify(token, c.env.JWT_SECRET).catch(() => {
                throw new Error("unauthorized user");
            });
        }
        else {
            throw new Error("unauthorized user");
        }

        const body = await c.req.json();
        const blog: {
            title: string,
            content: string
        } = body.blog;

        const authorId: string = body.authorId;

        const blog_client = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate()).blog;

        const res = await blog_client.create({
            data: {
                title: blog.title,
                content: blog.content,
                authorId: authorId
            }
        })
        return c.json({
            msg: "blog created successfully!",
            data: {
                id: res.id,
                title: res.title,
                content: res.content,
                published: res.published
            }
        }, 200);
    }

    catch (e: any) {
        if (e.message == "unauthorized user") {
            return c.json({
                error: e.message,
            }, 404);
        }
        return c.json({
            error: "encounted some error!",
        }, 401);
    }
});

// edit blogs
blog.put('/', async (c) => {
    try {
        const Authorization = c.req.header('authorization');
        const token = Authorization?.split(' ')[1];
        if (token) {
            verify(token, c.env.JWT_SECRET).catch(() => {
                throw new Error("unauthorized user");
            });
        }
        else {
            throw new Error("unauthorized user");
        }

        const body = await c.req.json();
        const update: {
            authorId: string,
            blogId: string,
            publish: boolean
        } = body.update;

        const blog_client = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate()).blog;

        const res = await blog_client.update({
            where: {
                id: update.blogId,
                authorId: update.authorId
            },
            data: {
                published: update.publish
            }
        })
        return c.json({
            msg: "blog updated successfully!",
            data: {
                id: res.id,
                title: res.title,
                content: res.content,
                published: res.published
            }
        }, 200);

    }
    catch (e: any) {
        if (e.message == "unauthorized user") {
            return c.json({
                error: e.message,
            }, 404);
        }
        return c.json({
            error: "encounted some error!",
        }, 401);
    }
});

//get every blog
blog.get('/bulk', async (c) => {
    try {
        const Authorization = c.req.header('authorization');
        const token = Authorization?.split(' ')[1];
        if (token) {
            verify(token, c.env.JWT_SECRET).catch(() => {
                throw new Error("unauthorized user");
            });
        }
        else {
            throw new Error("unauthorized user");
        }
        
        const blog_client = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate()).blog;

        const res = await blog_client.findMany();
        
        return c.json({
            blogs: res.map((i) => {
                return {
                    id: i.id,
                    title: i.title,
                    content: i.content,
                    published: i.published
                }
            })
        }, 200);
    }
    catch (e: any) {
        if (e.message == "unauthorized user") {
            return c.json({
                error: e.message,
            }, 404);
        }
        return c.json({
            error: "encounted some error!",
        }, 401);
    }
});

// get a blog
blog.get(':id', async (c) => {
    try {
        const Authorization = c.req.header('authorization');
        const token = Authorization?.split(' ')[1];
        if (token) {
            verify(token, c.env.JWT_SECRET).catch(() => {
                throw new Error("unauthorized user");
            });
        }
        else {
            throw new Error("unauthorized user");
        }

        const blogId = c.req.param().id;

        const blog_client = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate()).blog;

        const res = await blog_client.findFirst({
            where: {
                id: blogId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return c.json({
            result: {
                id: res?.id,
                title: res?.title,
                content: res?.content,
                published: res?.published
            }
        });

    }
    catch (e: any) {
        if (e.message == "unauthorized user") {
            return c.json({
                error: e.message,
            }, 404);
        }
        return c.json({
            error: "encounted some error!",
        }, 401);
    }
});
