import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
} from '@ionic/react';
import { useAppSelector } from '../../store/hooks';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { get, onValue, ref, remove } from 'firebase/database';
import { database } from '../../utils/firebase';
import { ActionIcon, Avatar, Flex, Paper } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getProfiles } from './api.chat';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import { Dialog } from '@capacitor/dialog';

import './style.css';
import { useHistory } from 'react-router';

export function Dorm() {
  const user = useAppSelector((state) => state.user);
  const history = useHistory();

  const userIdsRef: MutableRefObject<string[]> = useRef([]);

  const dormStoreRefURI = `dorm/${user.id}`;

  const getProfilesQuery = useQuery({
    queryKey: ['profiles', user.id],
    queryFn: () => getProfiles(userIdsRef.current),
    enabled: false,
    refetchOnWindowFocus: false,
    placeholderData: [],
  });

  useEffect(() => {
    const dormStoreRef = ref(database, dormStoreRefURI);
    const unsub = onValue(dormStoreRef, (snapshot) => {
      const data = snapshot.val();
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
      {getProfilesQuery.data?.map(
        (profile: { username: string; avatarPath: string; id: string }) => (
          <IonItemSliding id={`ionic-swiper-${profile.id}`}>
            <IonItem
              href="#"
              onClick={(e) => {
                e.preventDefault();
                history.push(`/app/chat/${profile.id}`);
              }}
              lines="full"
            >
              <Avatar />
              <IonLabel style={{ marginLeft: '10px' }}>
                {profile.username}
              </IonLabel>
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
    </IonPage>
  );
}