import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDiscord,
  faTwitter,
  faFacebook,
  faSnapchat,
  faInstagram,
  faTwitch,
  faSteam,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDollarSign,
  faTrash,
  faTrashAlt,
  faPenAlt,
  faCheck,
  faGamepad,
  faCaretRight,
  faMoon,
  faToolbox,
  faDoorOpen,
  faRunning,
  faTrophy,
  faCouch,
  faStar,
  faCoins,
  faBars,
  faSearch,
  faMars,
  faVenus,
  faTransgender,
  faImages,
  faStarHalf as faSolidStarHalf,
  faStarHalfAlt,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faPlus,
  faMinus,
  faMoneyCheck,
  faCommentDots,
  // faCaretSquareRight,
  faAngleRight,
  faInfoCircle,
  faShare,
  faThumbsDown as faSolidThumbsDown,
  faThumbsUp as faSolidThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCaretSquareRight,
  faClock,
  faStarHalf as faRegularStarHalf,
  faThumbsDown as faRegularThumbsDown,
  faThumbsUp as faRegularThumbsUp,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faShare,
  faClock,
  faInfoCircle,
  faAngleRight,
  faCaretSquareRight,
  faSolidThumbsDown,
  faRegularThumbsDown,
  faRegularThumbsUp,
  faSolidThumbsUp,
  faSolidStarHalf,
  faRegularStarHalf,
  faCommentDots,
  faMoneyCheck,
  faPlus,
  faMinus,
  faStarHalfAlt,
  faImages,
  faMars,
  faVenus,
  faTransgender,
  faSearch,
  faBars,
  faCoins,
  faStar,
  faCouch,
  faTrophy,
  faRunning,
  faDoorOpen,
  faToolbox,
  faMoon,
  faCaretRight,
  faGamepad,
  faCheck,
  faPenAlt,
  faTrashAlt,
  faTrash,
  faDiscord,
  faTwitter,
  faFacebook,
  faSnapchat,
  faInstagram,
  faTwitch,
  faSteam,
  faTiktok,
  faDollarSign,
  faAngleDoubleRight,
  faAngleDoubleLeft
);

export const genderIcon = (gender: string | undefined) => {
  switch (gender) {
    case 'Male':
      return 'mars';
    case 'Female':
      return 'venus';
    case 'Other':
      return 'transgender';
    default:
      return 'star';
  }
};
