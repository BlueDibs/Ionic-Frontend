import { IonIcon, IonPage } from '@ionic/react';
import {
  ActionIcon,
  Avatar,
  Flex,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { send } from 'ionicons/icons';
import { database } from '../../utils/firebase';
import { child, get, onValue, push, ref, set } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchUserDetails } from '../User/api.user';
import CryptoJS from 'crypto-js';

const OutGoing = ({ message }: { message: string }) => (
  <UnstyledButton
    style={{
      color: 'white',
      backgroundColor: '#5C5F66',
      padding: '10px 15px',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: '15px',
      marginRight: 'auto',
      wordBreak: 'break-word',
    }}
  >
    {message}
  </UnstyledButton>
);

const InComing = ({ message }: { message: string }) => (
  <UnstyledButton
    style={{
      color: 'white',
      backgroundColor: '#339AF0',
      padding: '10px 15px',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: '15px',
      marginLeft: 'auto',
      wordBreak: 'break-word',
    }}
  >
    {message}
  </UnstyledButton>
);

export function SingleChat() {
  const message = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user);
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState([]);
  const rawRoomId =
    user.id < userId ? `${user.id}.${userId}` : `${userId}.${user.id}`;
  const roomId = CryptoJS.SHA256(rawRoomId).toString();
  console.log(roomId);

  const storeRefURI = 'room/' + roomId;
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const targetUserQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserDetails(userId),
    refetchOnWindowFocus: false,
  });

  const sendMessage = () => {
    if (!message.current) return;
    push(ref(database, storeRefURI), {
      from: user.id,
      message: message.current?.value,
    });
    message.current.value = '';
  };

  const scroll = () =>
    chatBoxRef.current &&
    chatBoxRef.current.scrollTo(0, chatBoxRef.current.scrollHeight);

  useEffect(() => {
    scroll();
  }, [messages]);

  useEffect(() => {
    const chatsRef = ref(database, storeRefURI);
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(Object.values(data || {}));
    });

    return unsubscribe;
  }, [storeRefURI]);

  return (
    <IonPage>
      <Flex
        justify={'space-between'}
        align={'center'}
        style={{
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          position: 'fixed',
          width: '100%',
          padding: '5px 15px',
          backgroundColor: 'white',
          borderColor: 'gray',
        }}
      >
        <Avatar />
        <Title order={4} color="#5C5F66" weight={500}>
          {targetUserQuery.data?.username}
        </Title>
      </Flex>
      <Flex
        mt={50}
        ref={chatBoxRef}
        p={'sm'}
        direction={'column'}
        gap={'sm'}
        style={{ overflow: 'auto', overflowX: 'clip' }}
        pb={50}
      >
        {messages.map(({ from, message }) =>
          from == user.id ? (
            <OutGoing message={message} />
          ) : (
            <InComing message={message} />
          )
        )}
      </Flex>
      <TextInput
        ref={message}
        size="md"
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
        styles={{
          root: {
            borderRadius: 0,
          },
        }}
        placeholder="Message..."
        rightSection={
          <ActionIcon onClick={() => sendMessage()}>
            <IonIcon icon={send} />
          </ActionIcon>
        }
      />
    </IonPage>
  );
}