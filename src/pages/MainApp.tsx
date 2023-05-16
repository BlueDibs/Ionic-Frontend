import {
  IonContent,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router';
import {
  walletOutline,
  homeOutline,
  searchOutline,
  addOutline,
  personOutline,
} from 'ionicons/icons';
import { Profile } from './Profile/Profile';
import { Feed } from './Feed/Feed';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addPost, getUserDetails } from './main.api';
import { auth, database } from '../utils/firebase';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser } from '../store/slice/userSlice';
import { useFirebaseAuth } from '../hooks/auth.hook';
import { Search } from './Search/Search';
import { PublicProfile } from './User/PublicProfile';
import { queryClient } from '../utils/queryClient';
import { Dorm } from './Chats/Dorm';
import { SingleChat } from './Chats/SingleChat';
import { CommentsPage } from './Comments/Comments';
import Notifications from './Notification/Notifications';
import { ProfileFeeds } from './ProfileFeeds/ProfileFeeds';
import { onValue, ref } from 'firebase/database';
import { setNotifications } from '../store/slice/notificationSlice';

export const MainLayout = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [authLoading, user] = useFirebaseAuth();
  const userDet = useAppSelector((state) => state.user);
  const notificationRefURI = 'notifications/' + userDet.id;

  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess(user) {
      console.log(user);
      dispatch(setUser(user));
    },
  });

  const postUploadMutation = useMutation({
    mutationFn: (file: File) => addPost(userDet.id, file),
    onSuccess({ data }) {
      queryClient.setQueryData(['posts'], () => [
        ...((queryClient.getQueryData(['posts']) as []) || []),
        data,
      ]);
    },
  });

  useEffect(() => {
    if (user) getUserQuery.refetch();
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userR) => {
      if (!userR) history.push('/auth/login');
    });

    const unsubscribeNotifs = onValue(
      ref(database, notificationRefURI),
      (snapshot) => {
        const notif = snapshot.val();
        console.log(notif, notificationRefURI);
        dispatch(setNotifications(notif));
      }
    );

    return () => {
      unsubscribe();
      unsubscribeNotifs();
    };
  }, [history, notificationRefURI]);

  if (authLoading) return <>Loading...</>;
  if (!user) return <Redirect to={'/auth/login'} exact />;

  return (
    <IonPage>
      <IonContent>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/app/feed" exact component={Feed} />
            <Route path="/app/notifications" exact component={Notifications} />
            <Route path="/app/profile" exact component={Profile} />
            <Route path="/app/feed/:username" exact component={ProfileFeeds} />
            <Route path="/app/search" exact component={Search} />
            <Route path="/app/chats" exact component={Dorm} />

            <Route
              path="/app/comments/:postId"
              exact
              component={CommentsPage}
            />

            <Route path="/app/chat/:userId" exact component={SingleChat} />

            <Route path="/app/user/:userId" exact component={PublicProfile} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/app/feed">
              <IonIcon icon={homeOutline} />
            </IonTabButton>

            <IonTabButton tab="search" href="/app/search">
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
