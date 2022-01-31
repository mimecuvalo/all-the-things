import { createContext } from 'react';

export default createContext<{ user: User | null }>({
  user: null,
});
