import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.route';
const app: Application = express();




// parsers
app.use(express.json());
app.use(cors());



app.use('/api/users', userRouter)


app.get('/', (req: Request, res: Response) => {
  res.send('Assingment 2 API running')
})




export default app;