export const liveMatch = {
  teamA: {
    name: "Royal Challengers Bengaluru",
    short: "RCB",
    flag: "🦁",
    color: "#EC1C24",
    score: 161,
    wickets: 5,
    overs: "18.0",
  },
  teamB: {
    name: "Gujarat Titans",
    short: "GT",
    flag: "🛡️",
    color: "#1B3A6F",
    score: 155,
    wickets: 8,
    overs: "20.0",
  },
  status: "Match Complete",
  result: "RCB won by 5 wickets",
  venue: "Narendra Modi Stadium, Ahmedabad",
  league: "IPL 2026 Final",
  winProb: { a: 100, b: 0 },
  projected: 161,
  momentum: 100,
  summary:
    "2026 Final (May 31): RCB restricted GT to 155/8 in 20 overs. RCB chased the target to score 161/5 in 18 overs. Washington Sundar top-scored for GT with 50 not out. Qualifier 1 (May 26): RCB posted a massive total of 254/5 thanks to Rajat Patidar's unbeaten 93 off 33 balls. GT was bowled out for 162. Team Viewership: RCB was one of the most-watched teams in the tournament, averaging about 303 million viewers per match.",
};

// Realistic RCB innings: aggressive PP, stable middle, strong finish (peaks at 10, 12, 18)
const rcbRuns = [9, 12, 8, 14, 11, 16, 7, 9, 8, 15, 10, 17, 9, 8, 10, 13, 11, 19, 16, 13];
export const runRateData = rcbRuns.map((r, i) => {
  const total = rcbRuns.slice(0, i + 1).reduce((a, b) => a + b, 0);
  return { over: i + 1, runs: r, rr: +(total / (i + 1)).toFixed(2) };
});

export const winProbTrend = Array.from({ length: 40 }, (_, i) => {
  const over = i + 1;
  // Start even, RCB climbs as they post 205, GT chase fades after 17.3 wicket
  let rcb;
  if (over <= 10) rcb = 50 + over * 1.8 + Math.sin(over / 2) * 4;
  else if (over <= 20) rcb = 62 + (over - 10) * 1.2 + Math.sin(over / 2) * 3;
  else if (over <= 30) rcb = 55 + Math.sin(over / 3) * 8;
  else if (over <= 35) rcb = 70 + (over - 30) * 3;
  else rcb = 85 + (over - 35) * 2;
  rcb = Math.max(30, Math.min(96, rcb));
  return { over, RCB: +rcb.toFixed(1), GT: +(100 - rcb).toFixed(1) };
});

const momentumValues = [
  10, 18, 12, 25, 20, 35, 15, 22, 18, 42, 28, 48, 22, 18, 30, 38, 32, 55, 45, 40,
];
export const momentumData = momentumValues.map((m, i) => ({ over: i + 1, momentum: m }));

export const ballByBall = [
  { over: 6.2, event: "FOUR", text: "Virat Kohli drives through covers", impact: 9 },
  { over: 10.4, event: "SIX", text: "Rajat Patidar launches over long-on", impact: 14 },
  { over: 12.5, event: "SIX", text: "Kohli pulls past deep mid-wicket", impact: 13 },
  { over: 15.3, event: "WICKET", text: "Patidar 52 (28) c Rashid b Noor", impact: -8 },
  { over: 17.3, event: "WICKET", text: "Rashid Khan dismissed — chase derailed", impact: -22 },
  { over: 18.4, event: "SIX", text: "Kohli launches Mohit straight", impact: 16 },
  { over: 19.2, event: "WICKET", text: "Siraj nails yorker — crucial death over", impact: 18 },
];

export const players = [
  {
    id: "kohli",
    name: "Virat Kohli",
    team: "RCB",
    role: "Batter",
    avg: 39.6,
    sr: 132.8,
    runs: 8504,
    hundreds: 8,
    fifties: 61,
    boundaryPct: 49,
    consistency: 92,
    powerplay: 78,
    chase: 94,
    form: "Hot",
  },
  {
    id: "gill",
    name: "Shubman Gill",
    team: "GT",
    role: "Batter",
    avg: 38.4,
    sr: 137.2,
    runs: 3560,
    hundreds: 4,
    fifties: 24,
    boundaryPct: 53,
    consistency: 84,
    powerplay: 88,
    chase: 82,
    form: "Hot",
  },
  {
    id: "patidar",
    name: "Rajat Patidar",
    team: "RCB",
    role: "Batter",
    avg: 32.1,
    sr: 148.5,
    runs: 980,
    hundreds: 1,
    fifties: 6,
    boundaryPct: 55,
    consistency: 76,
    powerplay: 70,
    chase: 78,
    form: "Hot",
  },
  {
    id: "sudharsan",
    name: "Sai Sudharsan",
    team: "GT",
    role: "Batter",
    avg: 41.2,
    sr: 134.6,
    runs: 890,
    hundreds: 1,
    fifties: 8,
    boundaryPct: 48,
    consistency: 82,
    powerplay: 80,
    chase: 86,
    form: "Hot",
  },
  {
    id: "siraj",
    name: "Mohammed Siraj",
    team: "RCB",
    role: "Bowler",
    avg: 26.4,
    sr: 22.1,
    runs: 0,
    hundreds: 0,
    fifties: 0,
    boundaryPct: 0,
    consistency: 88,
    powerplay: 90,
    chase: 84,
    form: "Hot",
  },
  {
    id: "rashid",
    name: "Rashid Khan",
    team: "GT",
    role: "Bowler",
    avg: 21.3,
    sr: 18.5,
    runs: 0,
    hundreds: 0,
    fifties: 0,
    boundaryPct: 0,
    consistency: 94,
    powerplay: 82,
    chase: 92,
    form: "Hot",
  },
];

export const teamStats = {
  RCB: { powerplay: 84, middle: 76, death: 88, batting: 90, bowling: 82, home: 92, away: 74 },
  GT: { powerplay: 78, middle: 82, death: 72, batting: 84, bowling: 80, home: 86, away: 76 },
};

export const milestones = [
  {
    player: "Virat Kohli",
    team: "RCB",
    needs: "46 Runs",
    target: "9,000 IPL Runs",
    progress: 99,
    type: "Record",
  },
  {
    player: "Shubman Gill",
    team: "GT",
    needs: "32 Runs",
    target: "4,000 IPL Runs",
    progress: 96,
    type: "Century Watch",
  },
  {
    player: "Mohammed Siraj",
    team: "RCB",
    needs: "3 Wickets",
    target: "100 IPL Wickets",
    progress: 97,
    type: "Wicket Milestone",
  },
  {
    player: "Rashid Khan",
    team: "GT",
    needs: "2 Wickets",
    target: "175 T20 Wickets",
    progress: 98,
    type: "Wicket Milestone",
  },
  {
    player: "RCB",
    team: "RCB",
    needs: "18 Runs",
    target: "Highest Team Total vs GT",
    progress: 92,
    type: "Team Record",
  },
];

export const fantasyPicks = {
  captains: [
    {
      name: "Virat Kohli",
      team: "RCB",
      pts: 94,
      risk: 12,
      form: 9.6,
      owned: 78,
      role: "BAT",
      badge: "🔥 Hot Form",
    },
    {
      name: "Shubman Gill",
      team: "GT",
      pts: 90,
      risk: 15,
      form: 9.4,
      owned: 72,
      role: "BAT",
      badge: "⚡ Match Winner",
    },
  ],
  viceCaptains: [
    {
      name: "Sai Sudharsan",
      team: "GT",
      pts: 82,
      risk: 20,
      form: 8.8,
      owned: 54,
      role: "BAT",
      badge: "📈 Improving",
    },
    {
      name: "Rajat Patidar",
      team: "RCB",
      pts: 79,
      risk: 22,
      form: 8.6,
      owned: 48,
      role: "BAT",
      badge: "🔥 Hot Form",
    },
  ],
  differentials: [
    {
      name: "Jitesh Sharma",
      team: "RCB",
      pts: 68,
      risk: 32,
      form: 7.8,
      owned: 14,
      role: "WK",
      badge: "📈 Improving",
    },
    {
      name: "Rahul Tewatia",
      team: "GT",
      pts: 66,
      risk: 34,
      form: 7.6,
      owned: 16,
      role: "AR",
      badge: "⚡ Match Winner",
    },
  ],
  bowlers: [
    {
      name: "Rashid Khan",
      team: "GT",
      pts: 80,
      risk: 18,
      form: 9.0,
      owned: 68,
      role: "BWL",
      badge: "⚡ Match Winner",
    },
    {
      name: "Mohammed Siraj",
      team: "RCB",
      pts: 76,
      risk: 20,
      form: 8.8,
      owned: 62,
      role: "BWL",
      badge: "🔥 Hot Form",
    },
  ],
};

export const formData = Array.from({ length: 10 }, (_, i) => ({
  match: `M${i + 1}`,
  Kohli: Math.round(30 + Math.random() * 80),
  Gill: Math.round(25 + Math.random() * 80),
}));

export const venues = [
  { name: "Wankhede", matches: 24, winPct: 68, avgScore: 188 },
  { name: "MCG", matches: 18, winPct: 55, avgScore: 172 },
  { name: "Lord's", matches: 15, winPct: 60, avgScore: 165 },
  { name: "Eden Gardens", matches: 21, winPct: 72, avgScore: 195 },
];

export const aiInsights = [
  {
    title: "Death Overs Surge",
    body: "RCB scored 63 runs in the last 5 overs — their best finish at Chinnaswamy this season.",
    tag: "Batting",
  },
  {
    title: "Kohli's Share",
    body: "Virat Kohli contributed 38% of RCB's total with a 169.5 strike rate across 46 balls.",
    tag: "Player",
  },
  {
    title: "Momentum Shift",
    body: "GT lost momentum after losing two wickets in consecutive overs around the 17th over.",
    tag: "Trend",
  },
  {
    title: "Bowling Discipline",
    body: "RCB's death-over economy rate stayed below 8 — Siraj conceded just 6 in the 19th.",
    tag: "Bowling",
  },
  {
    title: "Turning Point",
    body: "Rashid Khan's wicket at 17.3 swung win probability by 22% in RCB's favour.",
    tag: "Matchup",
  },
];
