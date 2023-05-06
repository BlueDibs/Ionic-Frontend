import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSearchbar,
  IonText,
} from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { searchUsername } from './search.api';
import { useEffect, useRef } from 'react';
import { Avatar } from '@mantine/core';
import { config } from '../../config';
import { queryClient } from '../../utils/queryClient';
import { useHistory } from 'react-router';

export function Search() {
  const history = useHistory();
  const searchRef = useRef<HTMLIonSearchbarElement | null>(null);

  const searchQuery = useQuery({
    queryKey: ['search'],
    queryFn: () =>
      searchUsername(searchRef.current?.value?.toLocaleLowerCase()),
    refetchOnWindowFocus: false,
    enabled: false,
    placeholderData: [],
  });

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = null;

    if (queryClient.getQueriesData(['search'])) {
      queryClient.setQueryData(['search'], []);
    }
  }, [history.location]);

  return (
    <IonPage style={{ display: 'block' }}>
      <IonSearchbar
        ref={searchRef}
        debounce={1000}
        onIonClear={() => queryClient.setQueryData(['search'], [])}
        onIonChange={(ev) => {
          searchQuery.refetch();
        }}
        animated={true}
        placeholder="username"
      ></IonSearchbar>
      <IonList>
        {Array.isArray(searchQuery.data) &&
          searchQuery.data.map((user) => (
            <IonItem>
              <Avatar
                style={{ marginRight: 10, borderRadius: '50%' }}
                src={
                  user.avatarPath
                    ? `${config.STATIC_FILE_BASE_URL}${user.avatarPath}?alt=media`
                    : null
                }
              />
              <IonLabel>{user.username}</IonLabel>
            </IonItem>
          ))}
      </IonList>
    </IonPage>
  );
}
