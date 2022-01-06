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
        postedBy {
          id
          name
        }
        votes {
          link {
            url
          }
        }
      }
    }
  }
`;

export default function LinkList() {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: any, index: number) => (
          <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};
