import {
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { Title, Text, Flex, Button } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { HeaderComponent } from "../../components/Header";
import { getFormattedSmallPrice, humanizeNum } from "../../utils";

const LabelVale = (data: any) => (
  <Flex justify={"space-between"}>
    <Text size={"xl"} weight={500} color="#868E96">
      {data.label}
    </Text>
    <Text size={"xl"} weight={600} color="#868E96">
      {data.value}
    </Text>
  </Flex>
);

export function SellConfirmation({
  txn,
  data,
  onWillDismiss,
  isOpen,
  isLoading,
}: {
  txn: () => void;
  data: any;
  onWillDismiss: any;
  isOpen: boolean;
  isLoading: boolean;
}) {
  const user = useAppSelector((state) => state.user);
  const final_amount = data.amount_receive - (data.amount_receive * 0.2) / 100;

  return (
    <IonModal
      isOpen={isOpen}
      trigger="open-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar>
          <HeaderComponent title={"Confirm Buy"} back={onWillDismiss} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Title color="#495057" order={1} align="center" mt={"50%"}>
          Confirm Order
        </Title>
        <div style={{ alignItems: "center", marginTop: "50px" }}>
          <Text align="center" size={"lg"}>
            You Will Receive
          </Text>
          <Title align="center" order={1} size={70}>
            {humanizeNum(getFormattedSmallPrice(final_amount))}
          </Title>
          <Text align="center" size={"lg"}>
            Rupees
          </Text>
        </div>
        <div style={{ margin: "15%" }}>
          <LabelVale
            label="Share Price"
            value={getFormattedSmallPrice(data.share_price)}
          />
          <LabelVale label="Total Amount" value={data.shares_amount} />
          <LabelVale
            label="Fee (%0.2)"
            value={getFormattedSmallPrice((data.amount_receive * 0.2) / 100)}
          />

          <LabelVale label="Balance" value={humanizeNum(user.balance)} />
        </div>
        <Button
          loading={isLoading}
          size="md"
          onClick={() => txn()}
          variant="filled"
          color="red"
          style={{
            bottom: 0,
            position: "fixed",
            width: "100%",
            borderRadius: 0,
          }}
        >
          Confirm
        </Button>
      </IonContent>
    </IonModal>
  );
}
