import Head from "next/head";

const Meta = ({title}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
    </div>
  )
}

Meta.defaultProps = {
  title: "Appostalic",
}

export default Meta