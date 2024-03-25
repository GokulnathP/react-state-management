export interface ITodo {
  id: string;
  name: string;
  completedBy?: string;
  isCompleted: boolean;
}

const todos: ITodo[] = [
  {
    id: '1',
    name: 'React query: test select rendering',
    isCompleted: false
  },
  {
    id: '2',
    name: 'Look for react query code generator using open api spec',
    isCompleted: true
  },
  {
    id: '3',
    name: 'Finalise react query code generator using open api spec',
    isCompleted: true
  },
  {
    id: '4',
    name: 'Testing react query',
    isCompleted: false
  }
]

const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const todoById = (id: string) => (todo: ITodo) => todo.id === id;

const todoService = {
  getTodo: async (id: string) => {
    console.log("[getTodo]");
    await wait(800);

    const todo = todos.find(todoById(id));
    if (!todo) throw Error("No todo found");

    return { ...todo };
  },
  completeTodo: async (request: { id: string, completedBy: string }) => {
    console.log("[completeTodo]");
    await wait(300);

    const todo = todos.find(todoById(request.id));
    if (!todo) throw Error('No todo found');

    todo.isCompleted = true;
    todo.completedBy = request.completedBy;

    return { ...todo };
  }
};

export default todoService;