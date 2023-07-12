import {
  Avatar,
  Container,
  Flex,
  Text,
  Title,
  createStyles,
  Button,
  Image,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { config } from "../../config";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { fetchUserDetails, followUser, unFollowUser } from "./api.user";
import { fetchPosts } from "../Profile/profile.api";
import { createDorm } from "./createDorm";
import { follow, unfollow } from "../../store/slice/userSlice";
import { useDispatch } from "react-redux";
import { settingsOutline } from "ionicons/icons";
import { ProfileEquityStats } from "../../components/Profile/ProfileEquityStats";
import { BuySellModal } from "./BuySellModal";
import { Chart, MinChart } from "../../components/Chart";

const useStyles = createStyles((theme) => ({
  statusLeft: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#DADADA",
    padding: "10px 20px",
    borderEndStartRadius: 20,
    borderTopLeftRadius: 20,
  },
  statusSquare: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#DADADA",
    padding: "10px 20px",
    borderLeft: 0,
  },
  statusRight: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#DADADA",
    padding: "10px 20px",
    borderLeft: 0,
    borderTopRightRadius: 20,
    borderEndEndRadius: 20,
  },
}));

const Status = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className: any;
}) => (
  <Flex
    wrap={"wrap"}
    direction={"column"}
    justify={"center"}
    className={className}
  >
    <Text
      weight={400}
      size={"sm"}
      align="center"
      color="gray"
      style={{ lineHeight: 1 }}
    >
      {label}
    </Text>
    <Text weight={600} align="center" pt={"xs"} style={{ lineHeight: 0.8 }}>
      {value}
    </Text>
  </Flex>
);

export function PublicProfile() {
  const { classes } = useStyles();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserDetails(userId),
  });

  const fetchPostQry = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPosts(userQuery.data.id),
    refetchOnWindowFocus: false,
    placeholderData: [] as any,
    enabled: false,
  });

  const followMut = useMutation({
    mutationFn: followUser,
    onSuccess({ data }) {
      userQuery.refetch();
      dispatch(follow(userId));
      queryClient.invalidateQueries(["feeds"]);
      queryClient.invalidateQueries(["suggestions"]);
    },
  });

  const unfollowMut = useMutation({
    mutationFn: unFollowUser,
    onSuccess({ data }) {
      userQuery.refetch();
      dispatch(unfollow(userId));
      queryClient.invalidateQueries(["feeds"]);
      queryClient.invalidateQueries(["suggestions"]);
    },
  });

  const fetchRoomFromDorm = async (targetUserId: string) => {
    await createDorm(user.id, targetUserId);

    history.push(`/app/chat/${targetUserId}`);
  };

  useEffect(() => {
    if (userQuery.data?.id) fetchPostQry.refetch();
  }, [userQuery.data?.id]);

  const userFollowUnfollow = () => {
    if (user.followingIDs.includes(userId)) unfollowMut.mutate(userId);
    else followMut.mutate(userId);
  };

  if (!userId) return history.goBack();
  if (userQuery.isLoading) return <>Loading...</>;

  const chartsData = userQuery?.data?.graphData?.map((item: any) => ({
    x: new Date(item.date),
    y: item.price,
  }));

  const CharHOC = (
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

  return (
    <IonPage style={{ display: "block" }}>
      <IonHeader>
        <IonToolbar style={{ padding: "2px 10px", "--background": "white" }}>
          <Flex justify={"space-between"} style={{ alignItems: "center" }}>
            <Title order={5} mr={"auto"}>
              Profile
            </Title>
            <IonIcon
              icon={settingsOutline}
              onClick={() => history.push("/app/chats")}
              style={{ fontSize: 25, marginLeft: "auto" }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Flex p={"lg"} pb={0} justify={"space-between"} align={"centers"}>
          <Flex direction={"column"} gap={"xs"} p={"sm"}>
            <Avatar
              src={
                userQuery.data?.avatarPath
                  ? `${config.STATIC_FILE_BASE_URL}${userQuery.data.avatarPath}?alt=media`
                  : null
              }
              size="xl"
              radius="md"
              style={{ width: 100, height: 100 }}
              alt="it's me"
            />
            <div>
              <Title order={4} weight={500}>
                {userQuery.data?.username}
              </Title>
              <Flex gap={"md"}>
                <Text weight={500} size={"sm"}>
                  ₹{userQuery.data?.price?.toFixed(2)}
                </Text>
                <Text weight={400} size={"sm"}>
                  EQ {userQuery.data?.equity}%
                </Text>
              </Flex>
            </div>

            <Text size={"sm"}>{userQuery.data?.bio}</Text>
          </Flex>
          <div style={{ height: "150px", width: "100%", marginTop: "10px" }}>
            <MinChart
              data={[
                {
                  id: 1,
                  color: "hsl(140, 70%, 50%)",
                  data: chartsData,
                },
              ]}
            />
          </div>
        </Flex>

        <ProfileEquityStats
          stats={[
            { label: "Total Shares", value: userQuery.data.shares },
            {
              label: "Market Cap",
              value: `₹${userQuery.data.shares * userQuery.data.price}`,
            },
            { label: "INR Locked", value: userQuery.data.equity },
          ]}
        />

        <Container p={"lg"} pt={0}>
          <SimpleGrid
            cols={3}
            spacing={"xs"}
            w={"100%"}
            mt={"sm"}
            style={{
              borderStyle: "solid",
              borderWidth: 1,
              borderColor: "#DADADA",
              borderRadius: 20,
            }}
          >
            <Status
              label="Followers"
              value={user.followersIDs?.length || 0}
              className={classes.statusLeft}
            />
            <Status
              label="Following"
              value={user.followingIDs?.length || 0}
              className={classes.statusSquare}
            />
            <Status
              label="Posts"
              value={fetchPostQry.data?.length || 0}
              className={classes.statusRight}
            />
          </SimpleGrid>
          <Flex gap={"lg"}>
            <Button
              w={"100%"}
              mt={"md"}
              variant="white"
              style={{ borderColor: "black", color: "black" }}
              onClick={() => userFollowUnfollow()}
            >
              {user.followingIDs?.includes(userId) ? "Following" : "Follow"}
            </Button>
            <Button
              w={"100%"}
              mt={"md"}
              variant="white"
              style={{ borderColor: "black", color: "black" }}
              onClick={() => fetchRoomFromDorm(userId)}
            >
              Message
            </Button>
          </Flex>
        </Container>

        <SimpleGrid
          cols={3}
          style={{
            gap: 0,
            borderColor: "#DADADA",
            borderStyle: "solid",
            borderWidth: 1,
            borderBottom: "none",
            boxSizing: "border-box",
          }}
        >
          {Array.isArray(fetchPostQry.data) &&
            fetchPostQry.data.map((post, i) => (
              <Image
                height={150}
                onClick={() =>
                  history.push(`/app/feed/${userQuery.data.username}?post=${i}`)
                }
                src={`${config.STATIC_FILE_BASE_URL}${post.path}?alt=media`}
                alt="Random image"
              />
            ))}
        </SimpleGrid>
        <BuySellModal userData={userQuery.data} CharHOC={CharHOC} />
      </IonContent>
    </IonPage>
  );
}
