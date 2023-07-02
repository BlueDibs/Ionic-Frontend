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
import { GetStarted } from './diluteShares';

interface ISignUpForm
  extends Omit<z.infer<typeof signupSchema>, 'firebaseId'> {}

export function SignUp() {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);

  const postLoginMut = useMutation({
    mutationFn: createUser,
  });

  const signupForm = useForm({
    validate: zodResolver(
      signupSchema.omit({
        shares_dilute: true,
        firebaseId: true,
        password: true,
      })
    ),
  });

  const profValidation = async (vals: {
    username: any;
    email: any;
    password: any;
  }) => {
    setLoading(true);

    try {
      // can be done when creating account
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
        username: vals.username,
        email: vals.email,
        firebaseId: resp.user.uid,
      });

      localStorage.setItem('user', JSON.stringify(resp));
    } catch (err) {
      if ((err as Error).message.includes('auth/email-already-in-use'))
        return signupForm.setFieldError('email', 'Email Already In Use');
      if ((err as Error).message.includes('auth/weak-password'))
        return signupForm.setFieldError(
          'password',
          'Password should be at least 6 characters'
        );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage style={{ display: 'block', margin: '10px 20px' }}>
      <IonContent>
        <form
          onSubmit={signupForm.onSubmit((vals: any) => {
            profValidation(vals);
          })}
        >
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
          <Paper withBorder shadow="md" p={30} m={20} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="someone"
              {...signupForm.getInputProps('username')}
              disabled={loading}
            />
            <TextInput
              label="Email"
              mt={'sm'}
              placeholder="you@email.dev"
              {...signupForm.getInputProps('email')}
              disabled={loading}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...signupForm.getInputProps('password')}
              disabled={loading}
            />

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Sign Up
            </Button>
          </Paper>
        </form>
      </IonContent>
    </IonPage>
  );
}
