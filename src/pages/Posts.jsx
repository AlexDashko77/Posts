import React, { useMemo, useRef } from 'react';
import { useState } from 'react';
import { usePosts } from '../components/hooks/usePosts';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal.jsx/MyModal';
import "../styles/App.css"
import { useEffect } from 'react';
import PostService from '../components/API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../components/hooks/useFetching';
import { getPagesCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../components/hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', searchQuery: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.searchQuery);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));

  })
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  }

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit])

  const changePage = (page) => {
    setPage(page);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'}

        ]}
      />
      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchPosts} title={"Cписок постов "} />
      <div ref={lastElement} style={{ height: 20}}></div>
      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Loader />
        </div>
      }
    </div>

  );
}


export default Posts;
