import { IonIcon, IonPage } from '@ionic/react';
import { ActionIcon, Flex, TextInput, UnstyledButton } from '@mantine/core';
import { send } from 'ionicons/icons';

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
  return (
    <IonPage>
      <Flex p={'sm'} direction={'column'}>
        <OutGoing message={'helli kiya hal hai'} />
        <InComing message={'han bhai sab brdya'} />
      </Flex>
      <TextInput
        size="md"
        styles={{
          root: {
            borderRadius: 0,
          },
        }}
        placeholder="Message..."
        rightSection={
          <ActionIcon>
            <IonIcon icon={send} />
          </ActionIcon>
        }
      />
    </IonPage>
  );
}
