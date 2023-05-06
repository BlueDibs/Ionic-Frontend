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
import { useRef } from 'react';
import { Avatar } from '@mantine/core';
import { config } from '../../config';
import { queryClient } from '../../utils/queryClient';

export function Search() {
  const query = useRef<string | null | undefined>('');

  const searchQuery = useQuery({
    queryKey: ['search'],
    queryFn: () => searchUsername(query.current?.toLocaleLowerCase()),
    refetchOnWindowFocus: false,
    enabled: false,
    placeholderData: [],
  });

  return (
    <IonPage style={{ display: 'block' }}>
      <IonSearchbar
        debounce={1000}
        onIonClear={() => queryClient.setQueryData(['search'], [])}
        onIonChange={(ev) => {
          query.current = ev.target.value;
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
