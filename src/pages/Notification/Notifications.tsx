import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Flex, Text, Title } from '@mantine/core';

function Notifications() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Title order={5} mr={'auto'}>
            Notifications
          </Title>
        </IonToolbar>
      </IonHeader>

      <IonContent>s</IonContent>
    </IonPage>
  );
}

export default Notifications;
