import { Helmet } from 'react-helmet-async';
import { useBoundStore } from '../store';

export function ReactHelmet() {
    const img1 = 'https://d3bmt85musy2ue.cloudfront.net/f4e1febd077f416535038ecff308dddb2dae70cdc38ab298dcaf1977c91751df';
  //   const link1 = 'https://dev.play.eion.gg/';

  const { meta } = useBoundStore();
  const { img, link } = meta;

  return (
    <div>
      <Helmet>
        {/* <title>Share</title> */}
        <meta name="description" content="Eion" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:url" content={link} />
        <meta property="og:image" content={img || img1} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    </div>
  );
}
