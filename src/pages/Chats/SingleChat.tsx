import { IonIcon, IonPage } from '@ionic/react';
import { ActionIcon, Flex, TextInput, UnstyledButton } from '@mantine/core';
import { send } from 'ionicons/icons';
import { database } from '../../utils/firebase';
import { push, ref, set } from 'firebase/database';
import { useRef } from 'react';

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
    }}
  >
    {message}
  </UnstyledButton>
);

export function SingleChat() {
  const message = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!message.current) return;
    push(ref(database, 'chats'), {
      message: message.current?.value,
    });
    message.current.value = '';
  };

  return (
    <IonPage>
      <Flex p={'sm'} direction={'column'}>
        <OutGoing message={'helli kiya hal hai'} />
        <InComing message={'han bhai sab brdya'} />
      </Flex>
      <TextInput
        ref={message}
        size="md"
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
