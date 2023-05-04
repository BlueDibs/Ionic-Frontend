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
import { Redirect, useHistory } from 'react-router';
import { app, auth } from '../../utils/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth';
import { useForm, zodResolver } from '@mantine/form';
import { loginSchema } from './schemas';
import { z } from 'zod';
import { useEffect, useLayoutEffect, useState } from 'react';
import { IonRouterLink } from '@ionic/react';
import { useFirebaseAuth } from '../../hooks/auth.hook';

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authLoading, user] = useFirebaseAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    validate: zodResolver(loginSchema),
  });

  if (authLoading) return <>Loading...</>;
  if (user) return <Redirect to={'/app/feed'} exact />;

  console.log('gg');

  const login = async (vals: z.infer<typeof loginSchema>) => {
    await setPersistence(auth, browserLocalPersistence);
    setLoading(true);
    try {
      const resp = await signInWithEmailAndPassword(
        auth,
        vals.email,
        vals.password
      );
      localStorage.setItem('user', JSON.stringify(resp));
      return <Redirect exact from="/app/login" to="/app/feed" />;
    } catch (err) {
      let errMsg = '';
      if ((err as Error).message.includes('auth/user-not-found'))
        errMsg = 'Email doesnt exsist';
      if ((err as Error).message.includes('auth/wrong-password'))
        errMsg = 'Wrong Password';
      console.log(err);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        mt={220}
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <IonRouterLink routerLink="/auth/signup">Create account</IonRouterLink>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        m={20}
        mt={30}
        radius="md"
        component="form"
        onSubmit={form.onSubmit((vals) => login(vals))}
      >
        <TextInput
          label="Email"
          placeholder="you@email.dev"
          {...form.getInputProps('email')}
          disabled={loading}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          {...form.getInputProps('password')}
          disabled={loading}
        />

        {error && (
          <Text mt={'sm'} color="red" size={'sm'}>
            {error}
          </Text>
        )}

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
