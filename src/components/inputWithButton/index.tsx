import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { useState } from 'react';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { api } from '../../../convex/_generated/api';

function InputWithButton() {
  const [value, setValue] = useState<string>('');
  const { user } = useUser();

  const addTask = useMutation(api.tasks.createTask);

  console.log(user?.id);

  return (
    <div className='flex w-full max-w-sm items-center space-x-2'>
      <Input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Add task'
      />
      <Button
        onClick={() => addTask({ text: value, userId: `${user?.id}` })}
        type='submit'
      >
        Add
      </Button>
    </div>
  );
}

export default InputWithButton;
