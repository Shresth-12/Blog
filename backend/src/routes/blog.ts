import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@shresth12/blog-common-app"


export const bookRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId:string
    }
  }>();

  bookRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
      c.status(401);
      return c.json({ error: 'unauthorized' });
    }
  
    const token = jwt.split(' ')[1];
    try {
        // @ts-ignore
      const payload = await verify<{ id: string }>(token, c.env.JWT_SECRET);
      if (payload) {
        // @ts-ignore
        c.set('userId', payload.id); // Set userId in context
        await next();
      } else {
        c.status(401);
        return c.json({ error: 'unauthorized' });
      }
    } catch (e) {
      c.status(401);
      return c.json({ error: 'unauthorized' });
    }
  });
  

bookRouter.post('/', async (c) => {
    const authorId = c.get('userId');
    if (!authorId) {
      c.status(400);
      return c.json({ error: 'Author ID is missing' });
    }
  
    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate());
      const blog = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content,
          authorId: authorId, // Correctly use authorId here
        }
      });
      return c.json({ id: blog.id });
    } catch (e) {
      console.error(e);
      c.status(500);
      return c.json({ error: 'Error creating the blog post' });
    }
  });


bookRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const body = await c.req.json();
      const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

      const blog= await prisma.post.update({
        where:{
        id:body.id
        },
        data:{
        title:body.title,
        content:body.content,
        }
      })

      return c.json({
        id:blog.id
      })
})
bookRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const blogs = await prisma.post.findMany({
        select:{
          content:true,
          title:true,
          id:true,
          author:{
            select:{
            name:true
            }
          }
        }
      })
      return c.json({
        blogs
      })
         
})
bookRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Extract the blog ID from the URL parameters
  const blogId = c.req.param('id');

  try {
    // Fetch the blog post from the database using the provided ID
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ error: 'Blog post not found' });
    }

    // Return the fetched blog post as a JSON response
    return c.json(blog);
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ error: 'Error fetching the blog post' });
  }
});
