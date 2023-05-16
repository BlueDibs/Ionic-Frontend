import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Avatar, Flex, Paper, Text, Title } from '@mantine/core';
import { useAppSelector } from '../../store/hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../../utils/firebase';
dayjs.extend(relativeTime);

function Notifications() {
  const notifications = useAppSelector((state) => state.notifications);
  const history = useHistory();
  const user = useAppSelector((state) => state.user);

  // unread notifs
  // useEffect(() => {
  //   return () => {
  //     console.log('called');
  //     set(
  //       ref(database, 'notifications/' + user.id),
  //       Object.keys(notifications).map((key: string) => ({
  //         ...notifications[key],
  //         unread: false,
  //       }))
  //     );
  //   };
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Title order={5} mr={'auto'}>
            Notifications
          </Title>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {!!Object.values(notifications || {})?.length &&
          Object.values(notifications)
            .reverse()
            .map((notification) => (
              <Paper
                withBorder
                style={{
                  padding: '10px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                onClick={() => history.push(notification.relativeHref)}
              >
                <Text>
                  <span style={{ fontWeight: 600 }}>
                    @{notification.username}{' '}
                  </span>
                  {notification.message}
                </Text>
                <Text size={'xs'} color="gray" mr={'xs'}>
                  {dayjs(notification.time).fromNow()}
                </Text>
              </Paper>
            ))}
      </IonContent>
    </IonPage>
  );
}

export default Notifications;
