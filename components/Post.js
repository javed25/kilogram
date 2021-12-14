import React, { useEffect, useState } from 'react'
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import { HeartIcon as Heart } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { doc, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import Moment from 'react-moment';




function Post(props) {

    const { data: session } = useSession();
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)

    useEffect(() => {
       setLiked(likes.findIndex((like )=> like.id == session?.user?.uid) !== -1)
    }, [likes])

    useEffect(() => onSnapshot(query(collection(db, 'posts', props.id, 'comments'), orderBy('timestamp', 'desc')), snapshot => setComments(snapshot.docs)), [db,props.id])

    useEffect(() => onSnapshot(collection(db,"posts",props.id,"likes"),(snapshot)=>setLikes(snapshot.docs)), [db,props.id])

    const likePost = async () => {

        if(liked){
            await deleteDoc(doc(db,"posts",props.id,"likes",session.user.uid))
        } else{
            await setDoc(doc(db,"posts",props.id,"likes",session.user.uid),{
                username:session.user.username
            })
        }

      
    }

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");
        await addDoc(collection(db, "posts", props.id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()
        })

    }

    return (
        <div className='bg-white my-7 rounded-sm border'>

            {/* username and avatar of post  */}
            <div className='flex items-center p-5'>
                <img src={props.userImg} className='rounded-full h-12 w-12 object-contain border mr-3 p-1' alt="" />
                <p className='flex-1 font-bold'>{props.username}</p>
                <DotsHorizontalIcon className='h-5 cursor-pointer' />
            </div>


            {/* POST IMAGE  */}
            <img src={props.bodyImg} alt="" className='object-cover w-full' />

            {/* BUTTONS  */}

            {session && (
                <div className='flex justify-between px-4 pt-4'>
                    <div className='flex space-x-4'>

                    {
                        liked? (
                            <Heart onClick={likePost} className='text-red-600 cursor-pointer post__btns'/>
                        ) : (
                            <HeartIcon onClick={likePost} className='post__btns' />
                        )
                    }

                       
                        <ChatIcon className='post__btns' />
                        <PaperAirplaneIcon className='post__btns' />
                    </div>
                    <BookmarkIcon className='post__btns' />
                </div>
            )}



            {/* CAPTION  */}
            <p className='p-5 truncate'>
                    
                    {likes.length>0 && (
                        <p className='font-semibold -mt-3 mb-1'>{likes.length} likes</p>
                    )}

                <span className='font-bold mr-1'>{props.username} </span>
                {props.caption}
            </p>

            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map(comment => (
                        <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                            <img src={comment.data().userImage} alt="" className='h-7 rounded-full' />
                            <p className='text-m flex-1'><span className='font-bold'>{comment.data().username} </span>{comment.data().comment}</p>

                            <Moment fromNow className='text-sm pr-5'>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}

                </div>
            )}

            {session && (
                <form className='flex p-4 items-center'>
                    <EmojiHappyIcon className='h-7' />
                    <input className="border-none flex-1 focus:ring-0 outline-none"
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder='Add a Comment'
                    />
                    <button
                        disabled={!comment.trim()}
                        type="submit"
                        onClick={sendComment}
                        className='font-semibold text-blue-500'>
                        Post
                    </button>
                </form>
            )}
        </div >
    )
}

export default Post;
