// client/src/components/seo/SEOHead.jsx
import React, { useEffect } from 'react';

export const SEOHead = ({
  title = "Inthugil – Affordable Elegant Women's Clothing Online",
  description = "Shop elegant, affordable women's clothing at Inthugil. Ethnic wear, western wear & loungewear crafted for everyday grace. Free shipping available.",
  canonicalUrl = "https://inthugil.in/",
  ogImage = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
  schemaType = "Organization", // 'Organization' | 'Product' | 'Breadcrumb' | 'FAQ'
  schemaData = null
}) => {
  useEffect(() => {
    // 1. Update Title Tag
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // 3. Update Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // 4. Update OpenGraph Tags
    const updateOG = (prop, content) => {
      let tag = document.querySelector(`meta[property="${prop}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', prop);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:url', canonicalUrl);
    updateOG('og:image', ogImage);

    // 5. Inject Structured JSON-LD Schema
    const scriptId = 'json-ld-structured-data';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    let jsonLd = null;

    if (schemaType === 'Organization') {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "ClothingStore",
        "name": "Inthugil",
        "url": "https://inthugil.in",
        "telephone": "+917708971359",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Somanur",
          "addressLocality": "Somanur",
          "addressRegion": "Coimbatore",
          "addressCountry": "IN"
        },
        "priceRange": "₹₹",
        "sameAs": [
          "https://instagram.com/inthugil",
          "https://facebook.com/inthugil",
          "https://pinterest.com/inthugil"
        ]
      };
    } else if (schemaType === 'Product' && schemaData) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": schemaData.name,
        "image": schemaData.images?.[0] || ogImage,
        "description": schemaData.description || schemaData.shortDescription,
        "brand": {
          "@type": "Brand",
          "name": "Inthugil"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": String(schemaData.price),
          "availability": schemaData.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": canonicalUrl
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": String(schemaData.rating || 4.9),
          "reviewCount": String(schemaData.reviewCount || 30)
        }
      };
    } else if (schemaType === 'FAQ' && schemaData) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (schemaData.faqs || []).map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      };
    }

    if (jsonLd) {
      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, canonicalUrl, ogImage, schemaType, schemaData]);

  return null;
};
