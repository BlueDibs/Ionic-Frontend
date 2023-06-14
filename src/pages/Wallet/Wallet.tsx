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
import { useState } from 'react';
import { Holdings } from './Holdings';
import { Tiiys } from './Tiiys';

export function Wallet() {
  const history = useHistory();
  const [tab, setTab] = useState<'HOLDINGS' | 'TIIYS'>('HOLDINGS');

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
          <SimpleGrid cols={2}>
            <Button
              variant={tab == 'HOLDINGS' ? 'filled' : 'outline'}
              onClick={() => setTab('HOLDINGS')}
            >
              Holdings
            </Button>
            <Button
              variant={tab == 'TIIYS' ? 'filled' : 'outline'}
              onClick={() => setTab('TIIYS')}
            >
              TIIYS
            </Button>
          </SimpleGrid>
          {tab == 'HOLDINGS' ? (
            <Holdings query={getHoldingQuery} />
          ) : (
            <Tiiys query={getHoldingQuery} />
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
}
