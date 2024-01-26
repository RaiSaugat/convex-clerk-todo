import { TrashIcon } from '@radix-ui/react-icons';
import { Id } from 'convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '.././../../convex/_generated/api';
import { Button } from '../ui/button';

function DeleteTask({ id }: { id: Id<'tasks'> }) {
  const deleteTask = useMutation(api.tasks.deleteTask);

  return (
    <Button
      variant='outline'
      size='icon'
      className='bg-red-500 hover:bg-red-600'
      onClick={() => deleteTask({ id })}
    >
      <TrashIcon className='h-4 w-4 text-white' />
    </Button>
  );
}

export default DeleteTask;
