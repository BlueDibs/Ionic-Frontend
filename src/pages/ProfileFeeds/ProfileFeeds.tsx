import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Flex, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router';
import { getFeedsByUsername } from './ProfileFeeds.api';
import { useRef } from 'react';
import Feeds from '../../components/Feeds';
import queryString from 'query-string';

export function ProfileFeeds() {
  const { username } = useParams<{ username: string }>();
  const { search } = useLocation();
  const values = queryString.parse(search);

  const getFeedsQuery = useQuery({
    queryKey: ['feeds', username],
    queryFn: () => getFeedsByUsername(username),
    placeholderData: [],
  });

  if (getFeedsQuery.isLoading) return <IonPage>Loading...</IonPage>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Title order={5} mr={'auto'}>
              Profile Feeds
            </Title>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ height: '100vh' }}>
        <Feeds
          feeds={getFeedsQuery.data}
          index={values.post ? parseInt(values.post) : null}
        />
      </IonContent>
    </IonPage>
  );
}
