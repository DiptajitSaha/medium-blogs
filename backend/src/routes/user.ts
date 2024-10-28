import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const user = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

// signup
user.post('/signup', async (c) => {
    try {
        const body: {
            data: {
                email: string,
                username?: string,
                password: string
            }
        } = await c.req.json();

        const user_client = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate()).user;

        const res = await user_client.create({
            data: {
                email: body.data.email,
                username: body.data.username,
                password: body.data.password
            }
        })

        const token = await sign({id: res.id, email: res.email, username: res.username}, c.env.JWT_SECRET);

        return c.json({
            status: "success!",
            token: {
                authorization: `Bearer ${token}`
            }
        }, 200);
    }
    catch(e: any) {
        return c.json({
            error: "encounted some error!",
        }, 501);
    }
})

// signin
user.post('/signin', async (c) => {
    try{
        const body: {
            data: {
                email: string,
                password: string
            }
        } = await c.req.json();

        const user_client = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate()).user;

        const res = await user_client.findFirst({
            where: {
                email: body.data.email,
                password: body.data.password
            }
        });
        if(!res) {
            return c.json({
                error: "invalid email or password!"
            }, 401);
        }
        
        const token = await sign({
            id: res.id,
            email: res.email,
            username: res.username
        }, c.env.JWT_SECRET);

        return c.json({
            status: "success!",
            token: {
                authorization: `Bearer ${token}`
            }
        }, 200);
    }
    catch(e: any) {
        return c.json({
            error: "encounted some error!",
        }, 501);
    }
})