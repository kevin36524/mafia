import * as React from 'react';
import { List, Candidate, VoterList } from './voteList.style';

interface Props {
  votes: { [userId: string]: string };
}

export const VoteList: React.FC<Props> = ({ votes }) => {
  // Get a list of all unique candidate IDs
  const candidates = [...new Set(Object.values(votes))];

  // Count the number of votes for each candidate
  const voteCounts = candidates.reduce((counts, candidate) => {
    counts[candidate] = (counts[candidate] || 0) + 1;
    return counts;
  }, {} as { [candidate: string]: number });

  // Sort the candidates by the number of votes they received
  candidates.sort((a, b) => voteCounts[b] - voteCounts[a]);

  return (
    <List>
      {candidates.map((candidate) => (
        <Candidate key={candidate}>
          {candidate}
          <VoterList>
            {Object.entries(votes)
              .filter(([, votedFor]) => votedFor === candidate)
              .map(([key, _]) => key )
              .join(", ")}
         </VoterList>
         </Candidate>
      ))
    }
    </List>
)
}
