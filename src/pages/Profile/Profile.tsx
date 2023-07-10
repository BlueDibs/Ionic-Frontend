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
  Group,
} from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import { EditProfile } from "./EditProfile";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./profile.api";
import { config } from "../../config";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { imgUrl } from "../../utils/media";
import { chatbubbleEllipsesOutline, settingsOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { ProfileEquityStats } from "../../components/Profile/ProfileEquityStats";
import { auth } from "../../utils/firebase";
import { SelfSellModal } from "./SelfSell";
import { getFormattedSmallPrice } from "../../utils";

const useStyles = createStyles((theme) => ({
  statusLeft: {},
  statusSquare: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderTop: 0,
    borderBottom: 0,
  },
  statusRight: {},
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
    style={{
      padding: "15px 0px",
    }}
  >
    <Text
      weight={400}
      size={"sm"}
      align="center"
      color="gray"
      style={{ lineHeight: 0.5 }}
    >
      {label}
    </Text>
    <Text weight={600} align="center" pt={"xs"} style={{ lineHeight: 0.5 }}>
      {value}
    </Text>
  </Flex>
);

export function Profile() {
  const { classes } = useStyles();
  const history = useHistory();
  const user = useAppSelector((state) => state.user);

  const [editMdlOpn, setEdtMdlOpn] = useState(false);
  const [isSelfSellModalOpen, setSelfSellModalOpen] = useState(false);

  const fetchPostQry = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(user.id),
    refetchOnWindowFocus: false,
    placeholderData: [] as any,
    enabled: false,
  });

  useEffect(() => {
    if (user.id) fetchPostQry.refetch();
  }, [user.id]);

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
              onClick={() => auth.signOut()}
              style={{ fontSize: 25, marginLeft: "auto" }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Container p={"lg"} pb={0}>
          <EditProfile open={editMdlOpn} setModalOpen={setEdtMdlOpn} />

          <SelfSellModal
            opened={isSelfSellModalOpen}
            onClose={() => setSelfSellModalOpen(false)}
          />

          <Flex direction={"column"} gap={"xs"} p={"sm"}>
            <Avatar
              src={user.avatarPath ? imgUrl(user.avatarPath) : null}
              size="xl"
              radius="md"
              style={{ width: 100, height: 100 }}
              alt="it's me"
            />
            <div>
              <Title order={4} weight={500}>
                {user.username}
              </Title>
              <Flex justify={"space-between"} gap={"md"}>
                <Flex gap={"md"}>
                  <Text weight={500} size={"sm"}>
                    ₹{user.price?.toFixed(2)}
                  </Text>

                  <Text weight={400} size={"sm"}>
                    EQ {user?.userEquity?.toFixed(2)}%
                  </Text>
                </Flex>

                <Text
                  size={"xs"}
                  sx={(theme) => ({
                    background: theme.colors.violet[3],
                    padding: "2px 4px",
                    borderRadius: theme.radius.md,
                    display: "flex",
                    alignItems: "center",
                  })}
                >
                  Invite people to buy your shares
                </Text>
              </Flex>
            </div>

            <Text size={"sm"}>{user.bio}</Text>
          </Flex>
        </Container>

        <ProfileEquityStats
          stats={[
            { label: "Total Shares", value: user.shares },
            { label: "Market Cap", value: user.shares * user.price },
            {
              label: "INR Locked",
              value: getFormattedSmallPrice(user.price ?? 0),
            },
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
              value={fetchPostQry.data.length || 0}
              className={classes.statusRight}
            />
          </SimpleGrid>

          <Group noWrap>
            <Button
              w={"100%"}
              mt={"md"}
              variant="white"
              style={{ borderColor: "black", color: "black" }}
              onClick={() => setEdtMdlOpn(true)}
            >
              Edit Profile
            </Button>

            <Button
              mt={"md"}
              w={"100%"}
              variant="filled"
              color="green"
              onClick={() => setSelfSellModalOpen(true)}
            >
              Sell
            </Button>
          </Group>
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
                key={post.path}
                onClick={() =>
                  history.push(`/app/feed/${user.username}?post=${i}`)
                }
                height={150}
                src={`${config.STATIC_FILE_BASE_URL}${post.path}?alt=media`}
                alt="Random image"
              />
            ))}
        </SimpleGrid>
      </IonContent>
    </IonPage>
  );
}
