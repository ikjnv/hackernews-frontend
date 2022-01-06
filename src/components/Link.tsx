import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import { timeDifferenceForDate } from '../utils';

export interface LinkProps {
  link: {
    id: number
    description: string
    url: string
    createdAt: Date
    postedBy: {
      name: string
    }
    votes: {
      length: number
    }
  }
  index: number
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export default function Link(props: LinkProps) {
  const navigate = useNavigate();
  const { link, index } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: { linkId: link.id }
  });

  return (
    <div className='flex mt2 items-start'>
      <div className='flex items-center'>
        <span className='gray'>{index + 1}.</span>
        {authToken && (
          <div
            className='ml1 gray f11'
            style={{ cursor: 'pointer' }}
            // @ts-ignore
            onClick={vote}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{' '}
            {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};
