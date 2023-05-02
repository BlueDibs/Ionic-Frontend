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
import { app } from '../../utils/firebase';
import { useForm, zodResolver } from '@mantine/form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signupSchema } from './schemas';
import { z } from 'zod';
import { useState } from 'react';
import { IonRouterLink } from '@ionic/react';
import { useMutation } from '@tanstack/react-query';
import { createUser } from './auth.api';

interface ISignUpForm
  extends Omit<z.infer<typeof signupSchema>, 'firebaseId'> {}

export function SignUp() {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  // could not have used these many states
  const [error, setError] = useState('');

  const postLoginMut = useMutation({
    mutationFn: createUser,
  });

  const form = useForm<ISignUpForm>({
    validate: zodResolver(signupSchema.omit({ firebaseId: true })),
  });

  if (localStorage.getItem('user')) {
    return <Redirect exact to="/app/feed" />;
  }

  const signup = async (vals: ISignUpForm) => {
    setLoading(true);

    try {
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
    <Container size={420} my={40}>
      <Title
        mt={200}
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <IonRouterLink routerLink="/auth/login">Login</IonRouterLink>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        m={20}
        mt={30}
        radius="md"
        component="form"
        onSubmit={form.onSubmit((vals) => signup(vals))}
      >
        <TextInput
          label="Username"
          placeholder="someone"
          {...form.getInputProps('username')}
          disabled={loading}
        />
        <TextInput
          label="Email"
          mt={'sm'}
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
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
