import { useMutation, useQuery } from 'convex/react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/src/components/ui/button';

import { InputWithButton } from '@/src/components';
import { api } from '../../../convex/_generated/api';

function Home() {
  const tasks = useQuery(api.tasks.get);

  const incompleteTasks = tasks?.filter((task) => !task.isCompleted);

  const completedTasks = tasks?.filter((task) => task.isCompleted);

  const isCompleted = useMutation(api.tasks.completeTask);

  return (
    <div className='flex justify-center'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle>Todos</CardTitle>
          <CardDescription>List of Todos</CardDescription>

          <InputWithButton />

          <Tabs defaultValue='incomplete'>
            <TabsList>
              <TabsTrigger value='incomplete'>Incomplete</TabsTrigger>
              <TabsTrigger value='password'>Completed</TabsTrigger>
            </TabsList>
            <TabsContent value='incomplete'>
              {incompleteTasks?.map(({ _id, text }) => (
                <div key={_id}>
                  <div className='flex justify-between mb-2'>
                    {text}
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() =>
                        isCompleted({ id: _id, isCompleted: true })
                      }
                    >
                      <PlusIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value='password'>
              {completedTasks?.map(({ _id, text }) => (
                <div key={_id}>
                  <div className='flex justify-between mb-2'>
                    {text}
                    <Button
                      variant='outline'
                      size='icon'
                      onClick={() =>
                        isCompleted({ id: _id, isCompleted: false })
                      }
                    >
                      <MinusIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Home;
