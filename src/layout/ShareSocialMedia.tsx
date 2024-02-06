import {
  // TwitterShareButton,
  //   EmailShareButton,
  FacebookShareButton,
  //   HatenaShareButton,
  //   InstapaperShareButton,
  //   LineShareButton,
  //   LinkedinShareButton,
  //   LivejournalShareButton,
  //   MailruShareButton,
  //   OKShareButton,
  //   PinterestShareButton,
  //   PocketShareButton,
  //   RedditShareButton,
  //   TelegramShareButton,
  //   TumblrShareButton,
  //   ViberShareButton,
  //   VKShareButton,
  //   WhatsappShareButton,
  //   WorkplaceShareButton,
} from 'react-share';

import {
  // TwitterIcon,
  //   EmailIcon,
  FacebookIcon,
  //   FacebookMessengerIcon,
  //   HatenaIcon,
  //   InstapaperIcon,
  //   LineIcon,
  //   LinkedinIcon,
  //   LivejournalIcon,
  //   MailruIcon,
  //   OKIcon,
  //   PinterestIcon,
  //   PocketIcon,
  //   RedditIcon,
  //   TelegramIcon,
  //   TumblrIcon,
  //   ViberIcon,
  //   VKIcon,
  //   WeiboIcon,
  //   WhatsappIcon,
  //   WorkplaceIcon,
} from 'react-share';

export function ShareSocialMedia({ url }: { url: string }) {
  return (
    <div className="flex">
      {/* <TwitterShareButton url={url}>
        <TwitterIcon round={true} />
      </TwitterShareButton> */}
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} />
      </FacebookShareButton>
    </div>
  );
}
