import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getTags } from '../redux/slises/posts'

export const Home = () => {

  const dispatch = useDispatch()
  const { posts, tags } = useSelector((state) => state.posts)

  useEffect(() => {

    dispatch(getPosts())
    dispatch(getTags())

  }, [])

  const isPostLoading = posts.status == 'loading'
  const isTagsLoading = tags.status == 'loading'
  console.log(posts)

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, i) => isPostLoading ? (<Post key={i} isLoading={true} />) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Супер Класний Пацанчик',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Це тестовий коментар',
              },
              {
                user: {
                  fullName: 'Цікава Персона',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
