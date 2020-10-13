// todo: remove extras, make "extrasWithPoints" the new "extras"
export const extras = {
  doppelkopf: "doppelkopf",
  fox: "fox",
  win: "win",
  beat_re: "beat_re",
  no_90: "no_90",
  no_60: "no_60",
  no_30: "no_30",
  no_points: "no_points",

  announced_re: "announced_re",
  announced_kontra: "announced_kontra",
  announced_no_90: "announced_no_90",
  announced_no_60: "announced_no_60",
  announced_no_30: "announced_no_30",
  announced_no_points: "announced_no_points",
};

export const extraThresholds = {
  90: extras.no_90,
  60: extras.no_60,
  30: extras.no_30,
  1: extras.no_points
};

export const extrasWithPoints = {
  doppelkopf: { i18nKey: "doppelkopf", points: 1 },
  fox: { i18nKey: "fox", points: 1 },
  win: { i18nKey: "win", points: 1 },
  beat_re: { i18nKey: "beat_re", points: 1 },
  no_90: { i18nKey: "no_90", points: 1 },
  no_60: { i18nKey: "no_60", points: 1 },
  no_30: { i18nKey: "no_30", points: 1 },
  no_points: { i18nKey: "no_points", points: 1 },
  announced_re: { i18nKey: "announced_re", points: 2 },
  announced_kontra: { i18nKey: "announced_kontra", points: 2 },
  announced_no_90: { i18nKey: "announced_no_90", points: 1 },
  announced_no_60: { i18nKey: "announced_no_60", points: 1 },
  announced_no_30: { i18nKey: "announced_no_30", points: 1 },
  announced_no_points: { i18nKey: "announced_no_points", points: 1 },
};
