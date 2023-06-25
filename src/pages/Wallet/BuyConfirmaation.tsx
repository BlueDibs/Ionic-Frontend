import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Title, Text, Flex, Button } from '@mantine/core';
import { useAppSelector } from '../../store/hooks';

const LabelVale = (data: any) => (
  <Flex justify={'space-between'}>
    <Text size={'xl'} weight={500} color="#868E96">
      {data.label}
    </Text>
    <Text size={'md'} weight={600} lh={2} color="#868E96">
      {parseInt(data.value).toFixed(2)}
    </Text>
  </Flex>
);

export function BuyConfirmation({
  txn,
  data,
  onWillDismiss,
  isOpen,
}: {
  txn: () => void;
  data: any;
  onWillDismiss: any;
  isOpen: boolean;
}) {
  const user = useAppSelector((state) => state.user);

  return (
    <IonModal
      isOpen={isOpen}
      trigger="open-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <Flex justify={'space-between'} px={10}>
            <Title
              mr={'auto'}
              weight={400}
              order={5}
              onClick={() => onWillDismiss()}
            >
              Cancel
            </Title>

            <Title
              left={'50%'}
              pos={'absolute'}
              weight={500}
              order={4}
              style={{
                transform: `translateX(-50%)`,
              }}
            >
              Confirm Buy
            </Title>
          </Flex>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Title color="#495057" order={1} align="center" mt={'50%'}>
          Confirm Order
        </Title>
        <div style={{ alignItems: 'center', marginTop: '50px' }}>
          <Text align="center" size={'lg'}>
            You Will Receive
          </Text>
          <Title align="center" order={1} size={70}>
            {data.share_amont}
          </Title>
          <Text align="center" size={'lg'}>
            Shares
          </Text>
        </div>
        <div style={{ margin: '15%' }}>
          <LabelVale label="Share Price" value={data.share_price} />
          <LabelVale label="Total Spend" value={data.total_amount} />
          <LabelVale label="Fee (%0.2)" value={data.txn_fee} />

          <LabelVale label="Balance" value={user.balance} />
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
    </IonModal>
  );
}
