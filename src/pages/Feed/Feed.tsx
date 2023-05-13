import { IonIcon, IonPage } from '@ionic/react';
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
} from 'ionicons/icons';

const SinglePost = ({ imagePath, likes, id, User }) => (
  <Paper withBorder>
    <Flex style={{ padding: '7px 10px' }} gap={10} align={'center'}>
      <Avatar src={imgUrl(User.avatarPath)} />
      <Text weight={500}>{User.username}</Text>
    </Flex>
    <Image
      mx="auto"
      height={300}
      style={{ backgroundColor: 'black' }}
      fit="scale-down"
      src={imgUrl(imagePath)}
      withPlaceholder
    />
    <Flex style={{ padding: '4px 15px' }} gap={'sm'} align={'center'}>
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
        {likes} likes
      </Text>
    </Flex>
  </Paper>
);

export function Feed() {
  const user = useAppSelector((state) => state.user);

  const getFeedQuery = useQuery({
    queryKey: ['feeds', user.id],
    queryFn: getFeed,
  });

  return (
    <IonPage>
      <Flex direction={'column'} style={{ overflow: 'auto' }}>
        {!!getFeedQuery.data &&
          getFeedQuery.data.map((post) => (
            <SinglePost
              User={post.User}
              id={post.id}
              imagePath={post.path}
              likes={post.likes}
            />
          ))}
      </Flex>
    </IonPage>
  );
}
