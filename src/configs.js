// Methods

// Actions
export const resultsMatch = () => {
  if (
    matchesList.value.length === 1 &&
    matchStatistic.value.status === 'draw'
  ) {
    // debugger;
  } else {
    switch (matchStatistic.value.status) {
      case 'win':
        teamWon(teamPlays.teamHost);
        teamLose(teamPlays.teamGuest);
        break;
      case 'lose':
        teamWon(teamPlays.teamGuest);
        teamLose(teamPlays.teamHost);
        break;
      default:
        results[teamPlays.teamHost].draw++;
        results[teamPlays.teamGuest].draw++;
    }
  }

  // debugger;
  const scoreHost = matchStatistic.value.score[0];
  const scoreGuest = matchStatistic.value.score[2];
  results[teamPlays.teamHost].ballsIn += +scoreHost;
  results[teamPlays.teamGuest].ballsIn += +scoreGuest;
  results[teamPlays.teamHost].ballsOut += +scoreGuest;
  results[teamPlays.teamGuest].ballsOut += +scoreHost;
};