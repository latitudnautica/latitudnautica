import Link from "next/link";

const categoryMenuProps = (props) => {
  const { categories, isClient} = props;
  return (
categories ?
    <div className='catMenu'>
      {categories.map((user) => {
        return (
          <div key={user.id}>
            <Link href={`/lista/user/${user.id}/${isClient ? 'postsclient' :'posts'}`}>
              <a>{user.name}</a>
            </Link>
          </div>
        );
      })}
    </div>: 'menu error'
  );
};

export default categoryMenuProps;
