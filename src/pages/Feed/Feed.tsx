import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFeed, likePost, unLikePost } from './feed.api';
import { ActionIcon, Avatar, Flex, Image, Paper, Text } from '@mantine/core';
import { imgUrl } from '../../utils/media';
import {
  heartOutline,
  chatboxOutline,
  heart,
  paperPlaneOutline,
  chatbubbleEllipsesOutline,
  notificationsOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { likePostUser, unLikePostUser } from '../../store/slice/userSlice';
import { NotifyUser } from '../../utils/notification';
import Feeds from '../../components/Feeds';

export function Feed() {
  const history = useHistory();
  const user = useAppSelector((state) => state.user);

  const getFeedQuery = useQuery({
    queryKey: ['feeds', user.id],
    queryFn: getFeed,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Text weight={800} mr={'auto'}>
              Logo
            </Text>
            <IonIcon
              icon={notificationsOutline}
              onClick={() => history.push('/app/notifications')}
              style={{ fontSize: 25, marginLeft: 'auto' }}
            ></IonIcon>
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              onClick={() => history.push('/app/chats')}
              style={{ fontSize: 25, marginLeft: 10 }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Feeds feeds={getFeedQuery.data} />
      </IonContent>
    </IonPage>
  );
}
