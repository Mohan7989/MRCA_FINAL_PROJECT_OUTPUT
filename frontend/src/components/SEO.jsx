import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type }) {
  return (
    <Helmet>
      {/* Standard SEO Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* OpenGraph Tags (for social media sharing) */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      {/* Twitter Tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type === 'article' ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
}