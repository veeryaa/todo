import express, { Request, Response } from 'express';
import { PrismaClient, todo } from '@prisma/client';

const PORT = 8000;
const prisma = new PrismaClient({ rejectOnNotFound: true });
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 200,
    msg: 'OK',
  });
});

app.get('/todo', async (req: Request, res: Response) => {
  try {
    const todo: todo[] = await prisma.todo.findMany();

    console.log(todo);

    res.status(200).json({
      status: 200,
      msg: 'OK',
      result: todo,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 500,
      msg: 'ERROR',
    });
  }
});

app.post('/todo', async (req: Request, res: Response) => {
  try {
    const todo: todo = await prisma.todo.create({
      data: {
        task: req.body.task,
        task_status: req.body.istatus,
      },
    });

    console.log(todo);

    res.status(200).json({
      status: 201,
      msg: 'CREATED',
      result: todo,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 500,
      msg: 'ERROR',
    });
  }
});

app.put('/todo/:id', async (req: Request, res: Response) => {
  try {
    const todo: todo = await prisma.todo.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        task_status: req.body.istatus,
      },
    });

    console.log(todo);

    res.status(200).json({
      status: 200,
      msg: 'UPDATED',
      result: todo,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 500,
      msg: 'ERROR',
    });
  }
});

app.delete('/todo/:id', async (req: Request, res: Response) => {
  try {
    const todo: todo = await prisma.todo.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    console.log(todo);

    res.status(200).json({
      status: 200,
      msg: 'DELETED',
      result: todo,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 500,
      msg: 'ERROR',
    });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on PORT 8000');
});
