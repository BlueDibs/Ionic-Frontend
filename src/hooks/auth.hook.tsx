import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';

export function useFirebaseAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userR) => {
      setLoading(false);
      if (userR) setUser(userR);
    });

    return unsubscribe;
  }, []);

  return [loading, user];
}
