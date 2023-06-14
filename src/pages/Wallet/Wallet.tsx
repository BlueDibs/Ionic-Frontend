import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import {
  Button,
  Container,
  Flex,
  SimpleGrid,
  Title,
  Stack,
  Text,
  Divider,
  Paper,
  TextInput,
  Table,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { settingsOutline, searchOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { getHoldings } from './wallt.api';
import { useAppSelector } from '../../store/hooks';

type TStatement = {
  label: string;
  value: string | number;
};

const Statement = (data: TStatement) => (
  <Flex
    style={{
      padding: '4px 20px',
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: '8px',
      backgroundColor: 'white',
    }}
    justify={'space-between'}
  >
    <Text weight={700} size={'md'}>
      {data.label}
    </Text>
    <Text weight={500} size={'md'}>
      {data.value}
    </Text>
  </Flex>
);

export function Wallet() {
  const history = useHistory();

  const user = useAppSelector((state) => state.user);

  const getHoldingQuery = useQuery({
    queryKey: ['holdings'],
    queryFn: getHoldings,
    placeholderData: {
      holdings: [],
      balance: 0,
      ttlInvestment: 0,
      ttlReturns: 0,
    },
  });

  console.log(getHoldingQuery.data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px', '--background': 'white' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Title order={5} mr={'auto'}>
              Wallet
            </Title>
          </Flex>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container p={'lg'}>
          <Stack>
            <SimpleGrid cols={2}>
              <Button>Holdings</Button>
              <Button variant="outline">TIIYS</Button>
            </SimpleGrid>
            <Divider my={'sm'} />
            <Statement
              label="Balance"
              value={`$ ${getHoldingQuery.data?.balance || 0}`}
            />
            <Statement
              label="Total Investment"
              value={`$ ${getHoldingQuery.data?.ttlInvestment || 0}`}
            />
            <Statement
              label="Total Returns"
              value={`$ ${getHoldingQuery.data?.ttlReturns || 0}`}
            />
            <Button color="green">Add Money</Button>
            <Divider my={'sm'} />
            <Paper>
              <Flex justify={'space-between'}>
                <Text weight={600}>Current Statistics</Text>
                <TextInput
                  placeholder="search"
                  size="xs"
                  icon={<IonIcon icon={searchOutline} />}
                />
              </Flex>
              <Table mt={'sm'}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Held</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {getHoldingQuery.data?.holdings.map((item) => (
                    <tr>
                      <td>{item.sellerUser.username}</td>
                      <td>{item.amount}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>
          </Stack>
        </Container>
      </IonContent>
    </IonPage>
  );
}