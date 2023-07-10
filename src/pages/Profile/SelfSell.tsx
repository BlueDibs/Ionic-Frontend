import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonModal,
  IonButtons,
} from "@ionic/react";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { SellForm } from "../User/BuySell/SellForm";
import { Chart } from "../../components/Chart";
import { Button, Flex, NumberInput, Text, TextInput } from "@mantine/core";
import { humanizeNum } from "../../utils";
import { SellConfirmation } from "../Wallet/Sell Confirmaation";
import { useMutation } from "@tanstack/react-query";
import { selfSellSharesAPI } from "../User/BuySell/buySell.api";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slice/userSlice";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export function SelfSellModal({ opened, onClose }: Props) {
  const modal = useRef<HTMLIonModalElement>(null);
  const user = useAppSelector((state) => state.user);
  const [isConfirmModalOpened, setIsConfirmModalOpened] = useState(false);
  const dispatch = useDispatch();

  const buySellForm = useForm({
    initialValues: {
      amount: 0,
      total: 0,
    },
  });

  const availableShares = Math.round((user.shares / 100) * user.userEquity);

  const form = useForm({
    initialValues: { amount: 0 },

    validate: {
      amount(value) {
        if (!value) return "Amount must be greater than 0";

        if (value > availableShares) return "Not enough available shares";
      },
    },
  });

  const selfSellMutation = useMutation({
    mutationFn: (vals: typeof form.values) =>
      selfSellSharesAPI({
        percentage: (vals.amount / user.shares) * 100,
      }),

    onSuccess() {
      dispatch(
        updateUser({
          userEquity:
            user.userEquity - (form.values.amount / user.shares) * 100,
        })
      );
      form.reset();
      setIsConfirmModalOpened(false);
      onClose();
    },

    onError(error: AxiosError, variables, context) {
      // if (error.status === 403) {
      notifications.show({
        title: "Default notification",
        message: "Hey there, your code is awesome! 🤥",
      });
      // }
    },
  });
  return (
    <div>
      <IonModal ref={modal} trigger="open-modal" isOpen={opened}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  buySellForm.reset();
                  onClose();
                }}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>{user.username}'s Shares</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <SellConfirmation
            txn={() => selfSellMutation.mutate(form.values)}
            data={{
              shares_amount: form.values.amount,
              amount_receive: form.values.amount * user.price,
              share_price: user.price,
            }}
            onWillDismiss={() => setIsConfirmModalOpened(false)}
            isOpen={isConfirmModalOpened}
            isLoading={selfSellMutation.isLoading}
          />

          <form
            onSubmit={form.onSubmit((val) => setIsConfirmModalOpened(true))}
          >
            <Flex direction={"column"} gap={"md"} p={"lg"}>
              <TextInput
                variant="filled"
                label="Market Rate"
                style={{ pointerEvents: "none" }}
                value={`₹ ${humanizeNum(user.price)}`}
              />

              <TextInput
                variant="filled"
                label="Total Shares"
                style={{ pointerEvents: "none" }}
                value={user.shares}
              />

              <TextInput
                variant="filled"
                label="Available Shares"
                style={{ pointerEvents: "none" }}
                value={availableShares}
              />

              <NumberInput
                label="Amount"
                hideControls
                {...form.getInputProps("amount")}
              />

              <Flex gap={"xs"}>
                <Text size={"sm"} weight={500}>
                  Platform Fees:{" "}
                </Text>

                <Text size={"sm"}> 0.2% </Text>
                <Text size={"sm"} weight={500} ml={"auto"}>
                  Balance:{" "}
                </Text>

                <Text size={"sm"}> ₹ 10000 </Text>
              </Flex>
            </Flex>

            <Button
              size="md"
              type="submit"
              variant="filled"
              color="red"
              style={{
                bottom: 0,
                position: "fixed",
                width: "100%",
                borderRadius: 0,
              }}
            >
              Sell
            </Button>
          </form>
        </IonContent>
      </IonModal>
    </div>
  );
}
