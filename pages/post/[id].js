import layoutStyles from "../../styles/Home.module.css"
import Link from "next/link";
import Meta from "../../components/Meta";
import { useRouter } from 'next/router'



const Post = ({post}) => {
  return (
      <div className={layoutStyles.main}>
        <Meta title={post.title}/>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <br />
        <Link href="/">
          Go Back
        </Link>
      </div>
  
  );
};

const dev = false
const local = "http://127.0.01:8000/api/v1/"
const heroku = "https://ihop-blog-api.herokuapp.com/api/v1/"
const url = dev ? local : heroku
const token = 'ebe0b03ab76f86f3c2c892f38628ee79ba70d88b'
const data = { method: 'GET', headers: { Authorization: `Token ${token}`}}

export const getStaticProps = async (id) => {
  const id_url = `${url}${id.params.id}`
  const res = await fetch(id_url, data);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(url, data)
  
  const posts = await res.json()

  const ids = posts.map(post => post.id)
  const paths = ids.map(id => ({ params: {id: id.toString() }}))

  return {
    paths,
    fallback: false
  }
}

export default Post;


