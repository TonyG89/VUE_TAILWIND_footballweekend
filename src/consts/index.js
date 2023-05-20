const teamsData = ['without', 'yellow', 'red'];

const scoreData = ['0:0', '1:0', '0:1', '1:1', '2:1', '1:2', '2:0', '0:2'];

const teamNames = {
  without: 'Без манишек',
  yellow: 'Желтая',
  red: 'Красная',
}

const colorTeam = {
  without: 'bg-slate-700',
  yellow: 'bg-amber-700',
  red: 'bg-red-700',
}

const defaultResults = {
  without: {
    lose: 0,
    draw: 0,
    win: 0,
    ballsIn: 0,
    ballsOut: 0,
  },
  yellow: {
    lose: 0,
    draw: 0,
    win: 0,
    ballsIn: 0,
    ballsOut: 0,
  },
  red: {
    lose: 0,
    draw: 0,
    win: 0,
    ballsIn: 0,
    ballsOut: 0,
  },
};

export { teamsData, scoreData, teamNames, colorTeam, defaultResults };