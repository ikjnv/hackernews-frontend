import { useQuery, gql } from '@apollo/client';
import Link   from "./Link";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;
export default function LinkList() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: any) => (
          <Link key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};
