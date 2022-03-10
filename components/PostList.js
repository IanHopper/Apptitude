import postsStyles from '../styles/Posts.module.css'
import PostItem from './PostItem'


const PostList = ({posts}) => {
  return (
    <div className={postsStyles.grid}>
      {posts.map((post) => (<PostItem post={post} key={post.id}>
      </PostItem>)).reverse()}
    </div>
  )
}

export default PostList