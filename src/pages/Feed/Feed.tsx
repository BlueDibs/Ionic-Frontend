import { IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../store/hooks';
import { getFeed } from './feed.api';
import { ActionIcon, Avatar, Flex, Image, Paper, Text } from '@mantine/core';
import { imgUrl } from '../../utils/media';
import {
  heartOutline,
  chatboxOutline,
  heart,
  paperPlaneOutline,
  chatbubbleEllipsesOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router';

export function Feed() {
  const history = useHistory();
  const user = useAppSelector((state) => state.user);

  const getFeedQuery = useQuery({
    queryKey: ['feeds', user.id],
    queryFn: getFeed,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Text weight={800} mr={'auto'}>
              Logo
            </Text>
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              onClick={() => history.push('/app/chats')}
              style={{ fontSize: 25, marginLeft: 'auto' }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <Flex direction={'column'} style={{ overflow: 'auto' }}>
        {!!getFeedQuery.data &&
          getFeedQuery.data.map(
            (post: { User: any; id: any; path: any; likes: any }) => (
              <Paper withBorder>
                <Flex style={{ padding: '7px 10px' }} gap={10} align={'center'}>
                  <Avatar src={imgUrl(post.User.avatarPath)} />
                  <Text weight={500}>{post.User.username}</Text>
                </Flex>
                <Image
                  mx="auto"
                  height={300}
                  style={{ backgroundColor: 'black' }}
                  fit="scale-down"
                  src={imgUrl(post.path)}
                  withPlaceholder
                />
                <Flex
                  style={{ padding: '4px 15px' }}
                  gap={'sm'}
                  align={'center'}
                >
                  <ActionIcon>
                    <IonIcon size="large" icon={heartOutline} />
                  </ActionIcon>{' '}
                  <ActionIcon>
                    <IonIcon size="large" icon={chatboxOutline} />
                  </ActionIcon>{' '}
                  <ActionIcon>
                    <IonIcon size="large" icon={paperPlaneOutline} />
                  </ActionIcon>{' '}
                  <Text ml={'auto'} size={'sm'} color="#5C5F66" weight={500}>
                    {post.likes} likes
                  </Text>
                </Flex>
              </Paper>
            )
          )}
      </Flex>
    </IonPage>
  );
}
