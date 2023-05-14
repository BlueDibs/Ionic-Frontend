import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useAppSelector } from '../../store/hooks';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { get, onValue, ref, remove } from 'firebase/database';
import { database } from '../../utils/firebase';
import { ActionIcon, Avatar, Flex, Paper, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from './api.chat';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import { Dialog } from '@capacitor/dialog';

import './style.css';
import { useHistory } from 'react-router';
import { createDorm } from '../User/createDorm';
import { imgUrl } from '../../utils/media';

export function Dorm() {
  const user = useAppSelector((state) => state.user);
  const history = useHistory();
  const [dormRooms, setDormRooms] = useState<Record<
    string,
    { roomId: string; unread: number }
  > | null>(null);

  const userIdsRef: MutableRefObject<string[]> = useRef([]);

  const dormStoreRefURI = `dorm/${user.id}`;

  const getProfilesQuery = useQuery({
    queryKey: ['profiles', user.id],
    queryFn: () => getProfiles(userIdsRef.current),
    enabled: false,
    refetchOnWindowFocus: false,
    placeholderData: [],
    select(data: { username: string; avatarPath: string; id: string }[]) {
      const filteredUnread: {
        username: string;
        avatarPath: string;
        id: string;
      }[] = [];
      data.forEach((profile) => {
        if (dormRooms && dormRooms[profile.id].unread)
          filteredUnread.unshift(profile);
        else filteredUnread.push(profile);
      });
      return filteredUnread;
    },
  });

  useEffect(() => {
    const dormStoreRef = ref(database, dormStoreRefURI);
    const unsub = onValue(dormStoreRef, (snapshot) => {
      const data = snapshot.val();
      setDormRooms(data);
      userIdsRef.current = Object.keys(data || {});
      getProfilesQuery.refetch();
    });

    return unsub;
  }, [dormStoreRefURI]);

  const deleteDorm = async (targetUserId: string) => {
    const itemSwiper = document.getElementById(`ionic-swiper-${targetUserId}`);
    if (itemSwiper) itemSwiper?.close();
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Confirm delete chat?`,
    });
    if (value) remove(ref(database, `${dormStoreRefURI}/${targetUserId}`));
  };

  return (
    <IonPage style={{ display: 'block' }}>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Title order={4}>Chats</Title>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {getProfilesQuery.data?.map(
          (profile: { username: string; avatarPath: string; id: string }) => (
            <IonItemSliding id={`ionic-swiper-${profile.id}`}>
              <IonItem
                href="#"
                onClick={async (e) => {
                  e.preventDefault();
                  await createDorm(user.id, profile.id);
                  history.push(`/app/chat/${profile.id}`);
                }}
                lines="full"
              >
                <Avatar src={imgUrl(profile.avatarPath)} />
                <IonLabel style={{ marginLeft: '10px' }}>
                  {profile.username}
                </IonLabel>
                {!!dormRooms && dormRooms[profile.id].unread != 0 && (
                  <Text weight={600} size={'xs'}>
                    Unread
                  </Text>
                )}
              </IonItem>

              <IonItemOptions>
                <IonItemOption
                  onClick={() => deleteDorm(profile.id)}
                  color="danger"
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          )
        )}
      </IonContent>
    </IonPage>
  );
}
