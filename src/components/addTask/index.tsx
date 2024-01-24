import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { useState } from 'react';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { api } from '../../../convex/_generated/api';

function AddTask() {
  const [value, setValue] = useState<string>('');
  const { user } = useUser();

  const addTask = useMutation(api.tasks.createTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === '') return;
    addTask({ text: value, userId: `${user?.id}` });
    setValue('');
  };

  return (
    <form
      className='flex w-full max-w-sm items-center !mb-4'
      onSubmit={handleSubmit}
    >
      <Input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Add task'
        className='mr-4'
      />
      <Button type='submit' disabled={value === ''}>
        Add
      </Button>
    </form>
  );
}

export default AddTask;
