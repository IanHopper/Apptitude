import postsStyles from '../styles/Posts.module.css'
import Link from 'next/link'

const PostItem = ({post}) => {
  return (
    <Link href="post/[id]" as={`/post/${post.id}`}>
      <a className={postsStyles.card}>
        <h3>{post.title}</h3>
        <p className={postsStyles.author}><span>{post.get_author_name}</span> </p>
        <p className={postsStyles.date}>{new Date(post.created_at).toString().slice(4,15)}</p>
      </a>
    </Link>
  )
}

export default PostItem