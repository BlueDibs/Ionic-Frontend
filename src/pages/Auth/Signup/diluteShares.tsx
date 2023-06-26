import { IonRouterLink } from '@ionic/react';
import {
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
  Flex,
} from '@mantine/core';

export function DiluteShares({ signupForm, loading }: any) {
  return (
    <>
      <Title
        mt={200}
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Dilute Shares!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        *Recommend - 100 cr to 500 cr.
      </Text>
      <Paper withBorder shadow="md" p={30} m={20} mt={30} radius="md">
        <Flex direction={'column'} gap={'sm'} px={50}>
          <Button
            color="green"
            loading={loading}
            onClick={() =>
              signupForm.setFieldValue('shares_dilute', 1_00_00_000)
            }
          >
            1 Crore
          </Button>
          <Button
            color="green"
            loading={loading}
            onClick={() =>
              signupForm.setFieldValue('shares_dilute', 10_00_00_000)
            }
          >
            10 Crore
          </Button>
          <Button
            color="green"
            loading={loading}
            onClick={() =>
              signupForm.setFieldValue('shares_dilute', 1_00_00_00_000)
            }
          >
            100 Crore
          </Button>
          <Button
            color="green"
            loading={loading}
            onClick={() =>
              signupForm.setFieldValue('shares_dilute', 2_00_00_00_000)
            }
          >
            200 Crore
          </Button>
          <Button
            color="green"
            loading={loading}
            onClick={() =>
              signupForm.setFieldValue('shares_dilute', 5_00_00_00_000)
            }
          >
            500 Crore
          </Button>
          <Button
            color="green"
            loading={loading}
            onClick={() =>
              signupForm.setFieldValue('shares_dilute', 10_00_00_00_000)
            }
          >
            1000 Crore
          </Button>
        </Flex>

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Complete
        </Button>
      </Paper>
    </>
  );
}
