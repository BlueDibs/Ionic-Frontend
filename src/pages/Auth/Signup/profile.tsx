import { IonRouterLink } from '@ionic/react';
import {
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { error } from 'console';
import { signupSchema } from '../schemas';

export function ProfileSetup({ rootForm, loading, setScreen }: any) {
  const signupForm = useForm({
    validate: zodResolver(
      signupSchema.omit({ shares_dilute: true, firebaseId: true })
    ),
  });
  return (
    <form
      onSubmit={signupForm.onSubmit((vals) => {
        rootForm.setValues(vals);
        setScreen('SHARES_DILUTE');
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
  );
}
