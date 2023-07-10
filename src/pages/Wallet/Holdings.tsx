import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Stack,
  Divider,
  Button,
  Paper,
  Flex,
  Text,
  TextInput,
  Table,
  Grid,
  Tabs,
} from "@mantine/core";
import { searchOutline } from "ionicons/icons";
import { Statement } from "./Statement";
import { BuyFrom } from "../User/BuySell/BuyForm";
import { SellForm } from "../User/BuySell/SellForm";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chart } from "../../components/Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../User/api.user";
import { useHistory } from "react-router";
import { roundOff } from "../../utils";

export function Holdings({ query }: { query: any }) {
  const [modalOpenned, setOpen] = useState<boolean>(false);
  const [userDet, setUserDet] = useState<any | null>();
  const history = useHistory();

  const fetchUserProfile = async (id: string) => {
    const details = await fetchUserDetails(id);
    setUserDet(details);
    setOpen(true);
  };

  const chart = useMemo(() => {
    const chartsData = userDet?.graphData?.map((item: any) => ({
      x: new Date(item.date),
      y: item.price,
    }));

    return (
      <Chart
        data={[
          {
            id: 1,
            color: "hsl(140, 70%, 50%)",
            data: chartsData,
          },
        ]}
      />
    );
  }, [userDet]);

  return (
    <div>
      <IonModal trigger="open-modal" isOpen={modalOpenned}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle> Shares</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {!!userDet && (
            <SellForm
              userData={userDet}
              CharHOC={chart}
              closeModal={() => setOpen(false)}
            />
          )}
        </IonContent>
      </IonModal>

      <Stack mt={"sm"}>
        <Divider my={"sm"} />
        <Statement
          label="Balance"
          value={`$ ${roundOff(query.data?.balance || 0)}`}
        />
        <Statement
          label="Total Investment"
          value={`$ ${roundOff(query.data?.ttlInvestment || 0)}`}
        />
        <Statement
          label="Total Returns"
          value={`$ ${roundOff(query.data?.ttlReturns || 0)}`}
        />
        <Button color="green">Add Money</Button>
        <Divider my={"sm"} />
        <Paper>
          <Flex justify={"space-between"}>
            <Text weight={600}>Current Statistics</Text>
            <TextInput
              placeholder="search"
              size="xs"
              icon={<IonIcon icon={searchOutline} />}
            />
          </Flex>
          <div style={{ padding: "10px 15px" }}>
            <Grid
              w={"100%"}
              style={{ fontSize: "0.8rem", fontWeight: 550, color: "#495057" }}
            >
              <Grid.Col span={4}>Name</Grid.Col>
              <Grid.Col span={3}>Held</Grid.Col>
              <Grid.Col span={5}>Value</Grid.Col>
            </Grid>
          </div>

          <IonList style={{ padding: 0, margin: 0 }}>
            {query.data?.holdings.map((item: any) => (
              <IonItemSliding style={{ padding: 0, margin: 0 }}>
                <IonItem>
                  <Grid w={"100%"} style={{ fontSize: "0.8rem" }}>
                    <Grid.Col span={4}>{item.sellerUser.username}</Grid.Col>
                    <Grid.Col span={3}>{item.amount}</Grid.Col>
                    <Grid.Col span={5}>{item.value.toFixed(5)}</Grid.Col>
                  </Grid>
                </IonItem>

                <IonItemOptions style={{ padding: 0, margin: 0 }}>
                  <IonItemOption
                    style={{ backgroundColor: "#228be6", fontWeight: 600 }}
                    onClick={() => {
                      history.push(`/app/user/${item.sellerUser.id}`);
                    }}
                  >
                    Visit
                  </IonItemOption>

                  <IonItemOption
                    color="danger"
                    style={{ backgroundColor: "#fa5252", fontWeight: 600 }}
                    onClick={() => {
                      fetchUserProfile(item.sellerUser.id);
                    }}
                  >
                    Sell
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        </Paper>
      </Stack>
    </div>
  );
}
