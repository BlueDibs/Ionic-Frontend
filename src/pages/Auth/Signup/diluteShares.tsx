import { IonCard, IonContent, IonPage, IonRouterLink } from '@ionic/react';
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
} from '@mantine/core';
import { useAppSelector } from '../../../store/hooks';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { setupAPI } from '../auth.api';

export function GetStarted() {
  const userDet = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState();

  const userInfoMut = useMutation({
    mutationFn: setupAPI,
  });
  const userInfoForm = useForm();

  return (
    <IonPage>
      <IonContent>
        <Title
          mt={200}
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Dilute Shares
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          *Recommend - 100 cr to 500 cr.
        </Text>
        <form
          onSubmit={userInfoForm.onSubmit((vals: any) =>
            userInfoMut.mutate(vals)
          )}
        >
          <Paper withBorder shadow="md" p={30} m={20} mt={30} radius="md">
            <Flex direction={'column'} gap={'sm'} px={50}>
              <Button
                color="green"
                loading={loading}
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 1_00_00_000)
                }
              >
                1 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 10_00_00_000)
                }
              >
                10 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 1_00_00_00_000)
                }
              >
                100 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 2_00_00_00_000)
                }
              >
                200 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 5_00_00_00_000)
                }
              >
                500 Crore
              </Button>
              <Button
                color="green"
                loading={loading}
                onClick={() =>
                  userInfoForm.setFieldValue('shares_dilute', 10_00_00_00_000)
                }
              >
                1000 Crore
              </Button>
            </Flex>

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Complete
            </Button>
          </Paper>
        </form>
      </IonContent>
    </IonPage>
  );
}
