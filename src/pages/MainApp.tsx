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
import { useMutation, useQuery } from '@tanstack/react-query';
import { addPost, getUserDetails } from './main.api';
import { axiosInstance } from '../utils/axios';
import { getAuth } from 'firebase/auth';
import { app, auth } from '../utils/firebase';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/slice/userSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFirebaseAuth } from '../hooks/auth.hook';

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [authLoading, user] = useFirebaseAuth();
  const userDet = useAppSelector((state) => state.user);

  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess(user) {
      dispatch(setUser(user));
    },
  });

  const postUploadMutation = useMutation({
    mutationFn: (file: File) => addPost(userDet.id, file),
  });

  useEffect(() => {
    if (user) getUserQuery.refetch();
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userR) => {
      if (!userR) history.push('/auth/login');
    });

    return unsubscribe;
  }, [history]);

  if (authLoading) return <>Loading...</>;
  if (!user) return <Redirect to={'/auth/login'} exact />;

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

            <IonTabButton
              tab="add"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const input = document.createElement('input');
                input.type = 'file';
                input.onchange = (_) => {
                  const [file] = Array.from(input.files);
                  postUploadMutation.mutate(file);
                };
                input.click();
              }}
            >
              <IonIcon icon={addOutline} />
            </IonTabButton>

            <IonTabButton
              tab="wallet"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                auth.signOut();
              }}
            >
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
