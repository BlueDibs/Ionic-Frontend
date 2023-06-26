import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Text,
} from '@mantine/core';
import { IonContent, IonPage } from '@ionic/react';

import { Redirect, useHistory } from 'react-router';
import { app } from '../../../utils/firebase';
import { useForm, zodResolver } from '@mantine/form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signupSchema } from '../schemas';
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import { IonRouterLink } from '@ionic/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { signupValidationAPI, createUser } from '../auth.api';
import { ProfileSetup } from './profile';
import { DiluteShares } from './diluteShares';

interface ISignUpForm
  extends Omit<z.infer<typeof signupSchema>, 'firebaseId'> {}

const signup_screns = (props: any) => ({
  PROFILE: <ProfileSetup {...props} />,
  SHARES_DILUTE: <DiluteShares {...props} />,
});

export function SignUp() {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState<'PROFILE' | 'SHARES_DILUTE'>('PROFILE');
  const history = useHistory();
  // could not have used these many states
  const [error, setError] = useState('');

  const postLoginMut = useMutation({
    mutationFn: createUser,
  });

  const signupForm = useForm<ISignUpForm>({
    validate: zodResolver(signupSchema.omit({ firebaseId: true })),
  });

  useEffect(() => {
    const user = auth.currentUser;
    setScreen('PROFILE');
    if (user) {
      history.push('/app/feed');
    }
  }, [history]);

  const signup = async (vals: ISignUpForm) => {
    setLoading(true);

    try {
      const userExsists = await signupValidationAPI({
        username: vals.username,
      });
      if (!!userExsists)
        return signupForm.setFieldError('username', 'Username already exsist');
      const resp = await createUserWithEmailAndPassword(
        auth,
        vals.email,
        vals.password
      );

      const rslt = await postLoginMut.mutateAsync({
        ...vals,
        firebaseId: resp.user.uid,
      });

      localStorage.setItem('user', JSON.stringify(resp));
      return <Redirect exact from="/app/signup" to="/app/feed" />;
    } catch (err) {
      let errMsg = '';
      if ((err as Error).message.includes('auth/email-already-in-use'))
        errMsg = 'Email Already In Use';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage style={{ display: 'block', margin: '10px 20px' }}>
      <IonContent>
        {signup_screns({ rootForm: signupForm, setScreen })[screen]}
      </IonContent>
    </IonPage>
  );
}
