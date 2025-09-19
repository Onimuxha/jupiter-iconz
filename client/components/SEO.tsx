import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  keywords?: string;
  author?: string;
  children?: React.ReactNode;
}

export function SEO({
  title = 'Jupiter Icons - Modern Icon Library for React',
  description = 'A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations.',
  image = '/jupiterDark.png',
  url = 'https://jupiter-iconz.vercel.app',
  type = 'website',
  canonical,
  keywords = 'icon library, react icons, developer icons, brand icons, jupiter iconz, svg icons, website icons, animated icons, accessible icons',
  author = 'Jupiter Icons',
  children,
}: SEOProps) {
  const siteTitle = title.includes('Jupiter Icons') ? title : `${title} | Jupiter Icons`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Jupiter Icons" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional metadata */}
      {/* Browser-specific metadata */}
      <meta name="theme-color" content="#94c748" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Search Engine Optimization */}
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Chrome, Firefox, Edge */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <link rel="icon" type="image/png" href="/jupiterLight.png" />
      <link rel="icon" type="image/png" href="/jupiterDark.png" media="(prefers-color-scheme: dark)" />
      
      {/* Microsoft Edge */}
      <meta name="msapplication-TileColor" content="#94c748" />
      <meta name="msapplication-TileImage" content="/jupiterLight.png" />
      
      {/* Safari */}
      <link rel="apple-touch-icon" href="/jupiterLight.png" />
      <meta name="apple-mobile-web-app-title" content="Jupiter Icons" />
      
      {/* Chrome for Android */}
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="manifest" href="/manifest.json" />

      {children}
    </Helmet>
  );
}