import { UserButton } from '@clerk/clerk-react';

function Header() {
  return (
    <div className='flex justify-between'>
      <h1>Todo</h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}

export default Header;
