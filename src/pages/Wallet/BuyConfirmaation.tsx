import { IonContent, IonPage } from '@ionic/react';
import { Title, Text, Flex, Button } from '@mantine/core';

const LabelVale = (data: any) => (
  <Flex justify={'space-between'}>
    <Text size={'xl'} weight={500} color="#868E96">
      {data.label}
    </Text>
    <Text size={'xl'} weight={600} color="#868E96">
      {data.value}
    </Text>
  </Flex>
);

export function BuyConfirmation({ txn }: { txn: () => void }) {
  return (
    <IonPage>
      <IonContent>
        <Title color="#495057" order={1} align="center" mt={'50%'}>
          Confirm Order
        </Title>
        <div style={{ alignItems: 'center', marginTop: '50px' }}>
          <Text align="center" size={'lg'}>
            You Will Receive
          </Text>
          <Title align="center" order={1} size={70}>
            567
          </Title>
          <Text align="center" size={'lg'}>
            Shares
          </Text>
        </div>
        <div style={{ margin: '15%' }}>
          <LabelVale label="Share Price" value="3040" />
          <LabelVale label="Total Spend" value="3040" />
          <LabelVale label="Fee (%0.2)" value="3040" />

          <LabelVale label="Balance" value="3040" />
        </div>
        <Button
          size="md"
          onClick={() => txn()}
          variant="filled"
          color="green"
          style={{
            bottom: 0,
            position: 'fixed',
            width: '100%',
            borderRadius: 0,
          }}
        >
          Confirm
        </Button>
      </IonContent>
    </IonPage>
  );
}
