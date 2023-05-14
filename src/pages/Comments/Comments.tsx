import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import {
  Anchor,
  Avatar,
  Flex,
  Grid,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { addComment, getAllComments } from './comments.api';
import { imgUrl } from '../../utils/media';
import { addPost } from '../main.api';
import { useRef } from 'react';
import { queryClient } from '../../utils/queryClient';

const Comment = ({
  User,
  id,
  comment,
}: {
  User: any;
  id: string;
  comment: string;
}) => (
  <Flex gap={'md'} pr={'sm'}>
    <Avatar src={imgUrl(User?.avatarPath)} style={{ borderRadius: '25%' }} />
    <Flex direction={'column'}>
      <Title order={6} weight={500} style={{ lineHeight: 1 }}>
        {User?.username}
      </Title>
      <Text style={{ wordBreak: 'break-all' }} size={'sm'}>
        {comment}{' '}
      </Text>
    </Flex>
  </Flex>
);

export function CommentsPage() {
  const { postId } = useParams<{ postId: string }>();
  const commentInputBoxRef = useRef<HTMLInputElement>(null);

  const getCommentsQueries = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getAllComments(postId),
    placeholderData: [],
  });

  const addCommentMut = useMutation({
    mutationFn: async () => {
      if (!commentInputBoxRef.current) return;
      const resp = await addComment(postId, commentInputBoxRef.current?.value);
      commentInputBoxRef.current.value = '';
      return resp;
    },
    onSuccess({ data }: any) {
      queryClient.setQueryData(
        ['comments', postId],
        [...getCommentsQueries.data, data]
      );
    },
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Title order={5} mr={'auto'}>
              Comments
            </Title>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Flex direction={'column'} p={'sm'} gap={'sm'}>
          {getCommentsQueries.data.map(
            (comment: { User: any; content: string; id: string }) => (
              <Comment
                User={comment.User}
                comment={comment.content}
                id={comment.id}
              />
            )
          )}
        </Flex>
        <TextInput
          ref={commentInputBoxRef}
          onKeyDown={(e) => {}}
          size="md"
          style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
          }}
          styles={{
            root: {
              borderRadius: 0,
            },
          }}
          placeholder="Message..."
          rightSection={
            <Anchor
              onClick={() => addCommentMut.mutate()}
              weight={500}
              style={{ textDecoration: 'none' }}
              mr={30}
            >
              Post
            </Anchor>
          }
        />
      </IonContent>
    </IonPage>
  );
}
