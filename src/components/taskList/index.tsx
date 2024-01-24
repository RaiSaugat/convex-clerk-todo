import { useMutation, useQuery } from 'convex/react';

import { Skeleton } from '@/src/components/ui/skeleton';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';

import { Button } from '@/src/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { api } from '../../../convex/_generated/api';

function TaskList() {
  const { user } = useUser();

  const tasks = useQuery(api.tasks.get, {
    userId: `${user?.id}`,
  });

  const inCompleteTasks = tasks?.filter((task) => !task.isCompleted);

  const completedTasks = tasks?.filter((task) => task.isCompleted);

  const isCompleted = useMutation(api.tasks.completeTask);

  return (
    <>
      <Tabs defaultValue='incomplete'>
        <TabsList className='!mb-4'>
          <TabsTrigger value='incomplete'>
            Incomplete ({inCompleteTasks?.length})
          </TabsTrigger>
          <TabsTrigger value='complete'>
            Completed ({completedTasks?.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value='incomplete'>
          {tasks === undefined && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='flex justify-between w-full items-center'>
                <Skeleton className='h-8 w-[250px]' />
                <Skeleton className='h-8 w-8 rounded-sm' />
              </div>

              <div className='flex justify-between w-full items-center'>
                <Skeleton className='h-8 w-[250px]' />
                <Skeleton className='h-8 w-8 rounded-sm' />
              </div>
            </div>
          )}

          {inCompleteTasks?.length === 0 && (
            <p className='text-slate-400'>Hurrraaaaaay!!!!!</p>
          )}

          {inCompleteTasks?.map(({ _id, text }) => (
            <div key={_id}>
              <div className='flex justify-between mb-2'>
                {text}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => isCompleted({ id: _id, isCompleted: true })}
                >
                  <PlusIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value='complete'>
          {completedTasks?.length === 0 && (
            <p className='text-slate-400'>Go finish some tasks</p>
          )}

          {completedTasks?.map(({ _id, text }) => (
            <div key={_id}>
              <div className='flex justify-between mb-2'>
                {text}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => isCompleted({ id: _id, isCompleted: false })}
                >
                  <MinusIcon className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TaskList;
