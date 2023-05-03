import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router';
import {
  call,
  library,
  person,
  playCircle,
  radio,
  search,
  settings,
  walletOutline,
  homeOutline,
  searchOutline,
  addOutline,
  personOutline,
} from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import { Profile } from './Profile/Profile';
import { Feed } from './Feed/Feed';
import { useEffect, useLayoutEffect } from 'react';
import { ActionIcon, Button, Group, Text, Flex } from '@mantine/core';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from './main.api';
import { axiosInstance } from '../utils/axios';

export const MainLayout = () => {
  if (!localStorage.getItem('user')) {
    return <Redirect exact to="/auth/login" />;
  }

  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
  });

  if (getUserQuery.isLoading) return <>Loading...</>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Text weight={800} mr={'auto'}>
              Logo
            </Text>
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              style={{ fontSize: 25, marginLeft: 'auto' }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/app/feed" exact component={Feed} />
            <Route path="/app/profile" exact component={Profile} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/app/feed">
              <IonIcon icon={homeOutline} />
            </IonTabButton>

            <IonTabButton tab="search" href="/app/search" disabled>
              <IonIcon icon={searchOutline} />
            </IonTabButton>

            <IonTabButton tab="add" href="/app/add" disabled>
              <IonIcon icon={addOutline} />
            </IonTabButton>

            <IonTabButton tab="wallet" href="/app/wallet" disabled>
              <IonIcon icon={walletOutline} />
            </IonTabButton>

            <IonTabButton tab="profile" href="/app/profile">
              <IonIcon icon={personOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonContent>
    </IonPage>
  );
};
