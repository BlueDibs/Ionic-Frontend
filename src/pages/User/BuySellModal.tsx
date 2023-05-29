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
import { Flex, Button, Tabs, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef, useState } from 'react';

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
              <Flex direction={'column'} gap={'lg'} p={'lg'}>
                <TextInput
                  variant="filled"
                  label="At Price"
                  style={{ pointerEvents: 'none' }}
                  value={`₹ ${userData.price}`}
                />

                <TextInput
                  variant="filled"
                  label="Total"
                  style={{ pointerEvents: 'none' }}
                  {...buySellForm.getInputProps('amount')}
                  value={`₹ ${buySellForm.values.amount * userData.price}`}
                />

                <TextInput
                  type="number"
                  variant="filled"
                  label="Amount"
                  {...buySellForm.getInputProps('total')}
                  onChange={(e) => {
                    buySellForm.setValues({
                      amount: parseInt(e.target.value),
                      total: parseInt(e.target.value) * userData.price,
                    });
                  }}
                />
              </Flex>

              <Button
                size="md"
                variant="filled"
                color="green"
                style={{
                  bottom: 0,
                  position: 'fixed',
                  width: '100%',
                  borderRadius: 0,
                }}
              >
                Buy
              </Button>
            </Tabs.Panel>

            <Tabs.Panel value="sell" pt="xs">
              Messages tab content
            </Tabs.Panel>
          </Tabs>
        </IonContent>
      </IonModal>
    </div>
  );
}
