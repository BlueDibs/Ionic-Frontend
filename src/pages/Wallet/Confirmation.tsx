import { IonContent, IonPage } from '@ionic/react';
import { Title, Text } from '@mantine/core';

export function Confirmation() {
  return (
    <IonPage>
      <IonContent>
        <Title color="#495057" order={2} align="center" mt={'md'}>
          Confirm Order
        </Title>
        <div style={{ alignItems: 'center', marginTop: '50%' }}>
          <Text align="center">You Will Receive</Text>
          <Title align="center" order={1} size={50}>
            567
          </Title>
          <Text align="center">Shares</Text>
        </div>
      </IonContent>
    </IonPage>
  );
}
