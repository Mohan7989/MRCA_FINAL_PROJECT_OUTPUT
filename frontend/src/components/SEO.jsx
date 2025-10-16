import React, { useEffect } from 'react';

export default function SEO({ title, description, name, type }) {
	// set title + meta description at runtime (client-side)
	useEffect(() => {
		if (title) document.title = title;
		if (description) {
			let meta = document.querySelector('meta[name="description"]');
			if (!meta) {
				meta = document.createElement('meta');
				meta.name = 'description';
				document.head.appendChild(meta);
			}
			meta.content = description;
		}
		// optional open graph tags
		if (name) {
			let ogSite = document.querySelector('meta[property="og:site_name"]');
			if (!ogSite) {
				ogSite = document.createElement('meta');
				ogSite.setAttribute('property', 'og:site_name');
				document.head.appendChild(ogSite);
			}
			ogSite.content = name;
		}
		if (type) {
			let ogType = document.querySelector('meta[property="og:type"]');
			if (!ogType) {
				ogType = document.createElement('meta');
				ogType.setAttribute('property', 'og:type');
				document.head.appendChild(ogType);
			}
			ogType.content = type;
		}
	}, [title, description, name, type]);

	return null;
}