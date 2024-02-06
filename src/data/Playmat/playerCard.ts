import izanamiUp from '/assets/images/Player/MY/Izanami Up.png';
// import leixiaUp from '/assets/images/Player/MY/Leixia Up.png';
// import linkEzaaUp from '/assets/images/Player/MY/LinkEzaa Up.png';
// import loleazUp from '/assets/images/Player/MY/LoleaLz Up.png';
// import rippoUp from '/assets/images/Player/MY/Rippo Up.png';

// import emannUp from '/assets/images/Player/PH/Emann Up.png';
// import exortUp from '/assets/images/Player/PH/Exort Up.png';
// import H2WOUp from '/assets/images/Player/PH/H2WO Up.png';
// import lightUp from '/assets/images/Player/PH/Light Up.png';
// import nathzzUp from '/assets/images/Player/PH/Nathzz Up.png';
// import irradup from '/assets/images/Player/PH/Irrad Up.png';

// import brayyyUp from '/assets/images/Player/SG/Brayyy Up.png';
// import diabloUp from '/assets/images/Player/SG/Diablo Up.png';
// import lucianqtUp from '/assets/images/Player/SG/Lucianqt Up.png';
// import okkyUp from '/assets/images/Player/SG/Okky Up.png';
// import royUp from '/assets/images/Player/SG/Roy Up.png';
import { UserCardInterface } from '../../interface';
import { CardTypes } from '../../types';

export const playerCards: UserCardInterface[] = [
  {
    currentExp: 0,
    id: 'string',
    premiumPoint: 0,
    refinementLevel: 0,
    inventoryId: 'string',
    deletedAt: null,
    favourite: false,
    singleUseOnly: false,

    skins: [],
    card: {
      id: 'string',
      type: CardTypes.COMBO,
      fp: 0,
      country: null,
      details: {
        id: '0739',
        name: 'Izanami',
        image: izanamiUp,
        team: {
          country: 'MY',
        },
      },
    },
  },

  // {
  //   id: '0745',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Leixia',
  //     image: leixiaUp,
  //     team: {
  //       country: 'MY',
  //     },
  //   },
  // },
  // {
  //   id: '0731',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'LinkEzaa',
  //     image: linkEzaaUp,
  //     team: {
  //       country: 'MY',
  //     },
  //   },
  // },
  // {
  //   id: '0735',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'LoleaLz',
  //     image: loleazUp,
  //     team: {
  //       country: 'MY',
  //     },
  //   },
  // },
  // {
  //   id: '0737',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'RIPPO',
  //     image: rippoUp,
  //     team: {
  //       country: 'MY',
  //     },
  //   },
  // },
  // {
  //   id: '0721',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Emann',
  //     image: emannUp,
  //     team: {
  //       country: 'PH',
  //     },
  //   },
  // },
  // {
  //   id: '0725',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Exort',
  //     image: exortUp,
  //     team: {
  //       country: 'PH',
  //     },
  //   },
  // },
  // {
  //   id: '0717',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'H2WO',
  //     image: H2WOUp,
  //     team: {
  //       country: 'PH',
  //     },
  //   },
  // },
  // {
  //   id: '0719',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Light',
  //     image: lightUp,
  //     team: {
  //       country: 'PH',
  //     },
  //   },
  // },
  // {
  //   id: '0723',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Nathzz',
  //     image: nathzzUp,
  //     team: {
  //       country: 'PH',
  //     },
  //   },
  // },
  // {
  //   id: '0747',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Irrad',
  //     image: irradup,
  //     team: {
  //       country: 'PH',
  //     },
  //   },
  // },
  // {
  //   id: '071',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Brayyy',
  //     image: brayyyUp,
  //     team: {
  //       country: 'SG',
  //     },
  //   },
  // },
  // {
  //   id: '077',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Diablo',
  //     image: diabloUp,
  //     team: {
  //       country: 'SG',
  //     },
  //   },
  // },
  // {
  //   id: '073',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Lucianqt',
  //     image: lucianqtUp,
  //     team: {
  //       country: 'SG',
  //     },
  //   },
  // },
  // {
  //   id: '075',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Okky',
  //     image: okkyUp,
  //     team: {
  //       country: 'SG',
  //     },
  //   },
  // },
  // {
  //   id: '079',
  //   type: CardTypes.PLAYER,
  //   details: {
  //     name: 'Roy',
  //     image: royUp,
  //     team: {
  //       country: 'SG',
  //     },
  //   },
  // },
];
