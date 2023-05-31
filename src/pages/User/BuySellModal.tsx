import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { Flex, Button, Tabs, TextInput, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef, useState } from 'react';
import { BuyFrom } from './BuySell/BuyForm';
import { SellForm } from './BuySell/SellForm';

export function BuySellModal({ userData }: { userData: any }) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [modalOpenned, setOpen] = useState(false);

  const buySellForm = useForm({
    initialValues: {
      amount: 0,
      total: 0,
    },
  });

  return (
    <div>
      <Flex
        style={{
          position: 'fixed',
          bottom: 0,
          backgroundColor: 'white',
          width: '100%',
          padding: '10px 40px',
        }}
        gap={'lg'}
      >
        <Button
          style={{ flexGrow: 1, borderColor: '#2f9e44', color: '#2f9e44' }}
          variant="outline"
          color="#2f9e44"
          onClick={() => setOpen(true)}
        >
          Sell
        </Button>
        <Button
          style={{ flexGrow: 1, color: 'white' }}
          variant="filled"
          color="green"
          onClick={() => setOpen(true)}
        >
          Buy
        </Button>
      </Flex>
      <IonModal ref={modal} trigger="open-modal" isOpen={modalOpenned}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  buySellForm.reset();
                  setOpen(false);
                }}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>{userData.username}'s' Shares</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Tabs variant="outline" defaultValue="buy">
            <Tabs.List grow>
              <Tabs.Tab value="buy">Buy</Tabs.Tab>
              <Tabs.Tab value="sell">Sell</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="buy" pt="xs">
              <BuyFrom userData={userData} />
            </Tabs.Panel>

            <Tabs.Panel value="sell" pt="xs">
              <SellForm userData={userData} />
            </Tabs.Panel>
          </Tabs>
        </IonContent>
      </IonModal>
    </div>
  );
}
