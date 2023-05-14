import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { Flex, Text, Title } from '@mantine/core';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import { useParams } from 'react-router';

export function CommentsPage() {
  const { postId } = useParams();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Title order={5} mr={'auto'}>
              Comments
            </Title>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>s</IonContent>
    </IonPage>
  );
}
