import {
  IonCard,
  IonContent,
  IonIcon,
  IonPage,
  IonRouterLink,
} from '@ionic/react';
import {
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
  Flex,
  Anchor,
  NumberInput,
} from '@mantine/core';
import { useAppSelector } from '../../../store/hooks';
import { useMutation } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { setupAPI } from '../auth.api';
import { checkboxOutline, checkmarkCircle, ticketSharp } from 'ionicons/icons';
import { z } from 'zod';
import { Redirect, useHistory } from 'react-router';
import { updateUser } from '../../../store/slice/userSlice';
import { useDispatch } from 'react-redux';

export function GetStarted() {
  const userDet = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const userInfoMut = useMutation({
    mutationFn: setupAPI,
    onSuccess(data) {
      dispatch(updateUser({ shares: data.shares }));
      history.push('/app/feed');
    },
  });
  const userInfoForm = useForm({
    validate: zodResolver(
      z.object({ equity_shares: z.number().min(0).max(10) })
    ),
    initialValues: {
      equity_shares: 10,
      shares_dilute: null,
    },
  });

  useEffect(() => {
    if (userInfoForm.values?.shares_dilute) setError(null);
  }, [userInfoForm.values?.shares_dilute]);

  if (userDet.shares > 1) return <Redirect to={'/app/feed'} />;

  return (
    <IonPage>
      <IonContent>
        <Title
          mt={100}
          align="center"
          order={2}
          color="#373A40"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Complete Profile
        </Title>

        <form
          onSubmit={userInfoForm.onSubmit((vals: any) => {
            if (!userInfoForm.values.shares_dilute)
              return setError('Please dilute shares');
            return userInfoMut.mutate(vals);
          })}
        >
          <Paper withBorder shadow="md" p={30} m={20} mt={30} radius="md">
            <Flex
              direction={'column'}
              gap={'sm'}
              px={50}
              style={{ justifyContent: 'center', textAlign: 'center' }}
            >
              <Title color="#373A40" order={5}>
                Dilute Shares
              </Title>
              <Button
                color="green"
                loading={loading}
                rightIcon={
                  userInfoForm.values.shares_dilute == 10_00_00_000 && (
                    <IonIcon icon={checkmarkCircle} />
                  )
                }
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 10_00_00_000)
                }
              >
                10 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                rightIcon={
                  userInfoForm.values.shares_dilute == 1_00_00_00_000 && (
                    <IonIcon icon={checkmarkCircle} />
                  )
                }
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 1_00_00_00_000)
                }
              >
                100 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                rightIcon={
                  userInfoForm.values.shares_dilute == 2_00_00_00_000 && (
                    <IonIcon icon={checkmarkCircle} />
                  )
                }
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 2_00_00_00_000)
                }
              >
                200 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                rightIcon={
                  userInfoForm.values.shares_dilute == 5_00_00_00_000 && (
                    <IonIcon icon={checkmarkCircle} />
                  )
                }
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 5_00_00_00_000)
                }
              >
                500 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                rightIcon={
                  userInfoForm.values.shares_dilute == 10_00_00_00_000 && (
                    <IonIcon icon={checkmarkCircle} />
                  )
                }
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 10_00_00_00_000)
                }
              >
                1000 Crore
              </Button>
              <Text color="dimmed" size="sm" align="center">
                *Recommend - 100 cr to 500 cr.
              </Text>
            </Flex>

            <Flex
              mt={'lg'}
              direction={'column'}
              style={{ justifyContent: 'center', textAlign: 'center' }}
              gap={'xl'}
            >
              <div>
                <Title color="#373A40" order={5}>
                  Your Equity in Shares
                </Title>
                <TextInput
                  type="number"
                  styles={{
                    input: {
                      textAlign: 'center',
                    },
                  }}
                  mt={'xs'}
                  defaultValue={10}
                  size="xs"
                  max={100}
                  min={0}
                  {...userInfoForm.getInputProps('equity_shares')}
                />
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  *Recommend - 10%
                </Text>
              </div>
            </Flex>

            <Text color="#373A40" size={'sm'} mt={'xl'} weight={500}>
              Note: Platform Equity of all shares : 2.5%
            </Text>

            {error && (
              <Text size="sm" align="center" color="red" mt={'sm'}>
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Complete
            </Button>
          </Paper>
        </form>
      </IonContent>
    </IonPage>
  );
}
