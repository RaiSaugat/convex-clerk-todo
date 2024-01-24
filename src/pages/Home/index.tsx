import { Card, CardHeader, CardTitle } from '@/src/components/ui/card';

import { AddTask, TaskList } from '@/src/components';

function Home() {
  return (
    <div className='flex justify-center'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle className='text-2xl !mb-2'>Todos</CardTitle>
          <AddTask />
          <TaskList />
        </CardHeader>
      </Card>
    </div>
  );
}

export default Home;
