import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../components/API/PostService';
import { useFetching } from '../components/hooks/useFetching';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [coms, setComs] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const [fetchComments, isComLoading, errorCom] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComs(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id)
    }, [])

    return (
        <div className='postFlex'>
            <h1>Вы открыли страницу поста c ID{params.id}</h1>
            {isLoading
                ? <Loader />
                : <div className='com'>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {coms.map((el) => (
                        <div key={el.id} style={{marginTop: 15}}>
                            <h5>{el.email}</h5>
                            <div className='comWidth'>{el.body}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default PostIdPage;