import { SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Header } from './components';
import { Home } from './pages';

function App() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className='p-4'>
          <Header />
          <Home />
        </div>
      </SignedIn>
    </>
  );
}

export default App;
