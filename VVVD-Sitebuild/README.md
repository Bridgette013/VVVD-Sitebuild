# VVVDigitals Website

> Commanding Motion with Pure Language

A high-performance, cinematic web presence engineered for content velocity and linguistic artistry.

## 🚀 Quick Start

### Direct Deployment
Upload the entire `/vvvdigitals` folder to your web server's root directory.

### Local Development
```bash
# Clone or download the repository
cd vvvdigitals

# Open in browser (use a local server for best results)
python3 -m http.server 8000
# or
npx serve
```

## 📁 Project Structure

```
vvvdigitals/
├── index.html              # Landing page
├── about.html              # Brand manifesto & philosophy
├── services.html           # Service architecture showcase
├── contact.html            # Contact & inquiry forms
│
├── assets/
│   ├── css/
│   │   ├── vvv-theme.css  # Master theme (CSS variables, components)
│   │   └── custom.css     # Page-specific styles
│   │
│   ├── js/
│   │   └── main.js        # Navigation, animations, interactions
│   │
│   └── img/               # (Add your images here)
│       ├── logo.svg
│       ├── favicon.ico
│       └── hero/
│
└── blog/                   # (Optional blog structure)
    ├── index.html
    └── posts/
```

## 🎨 Brand System

### Color Palette
```css
--vvv-purple: #6246EA    /* Primary brand color */
--vvv-coral: #E9622D     /* Accent & CTA color */
--vvv-charcoal: #0C0C0E  /* Dark background */
--vvv-surface: #141418   /* Card backgrounds */
--vvv-text: #E9E9E9      /* Primary text */
--vvv-muted: #B9B9C0     /* Secondary text */
--vvv-divider: #24242A   /* Borders & dividers */
```

### Typography
- **Primary Font**: Inter (400, 500, 600, 700, 800, 900)
- **Display Font**: Space Grotesk (optional, 700)
- **Fallbacks**: system-ui, -apple-system, Segoe UI

### Gradient
```css
--vvv-grad: linear-gradient(90deg, #E9622D 0%, #6246EA 100%)
```

## ⚡ Performance Features

- **Optimized Loading**: Lazy loading for images
- **Smooth Animations**: GPU-accelerated transforms
- **Mobile First**: Fully responsive design
- **Accessibility**: ARIA labels, semantic HTML
- **SEO Ready**: Meta tags, structured data ready
- **Performance**: < 500ms TTFB target

## 🛠 Customization

### Adding New Pages
1. Copy the structure from `about.html`
2. Update navigation links in header
3. Add page-specific styles to `custom.css`
4. Include common header/footer

### Updating Content
- Edit HTML files directly
- Modify text in semantic sections
- Images go in `/assets/img/`
- Keep file sizes optimized

### Styling Changes
- Global variables in `vvv-theme.css`
- Page-specific in `custom.css`
- Component styles are modular

## 🔧 WordPress Integration

If deploying on WordPress with Blocksy theme:

1. Create child theme folder: `/wp-content/themes/blocksy-vvv-child/`
2. Add `style.css` with theme header:
```css
/*
Theme Name: Blocksy VVV Child
Template: blocksy
*/
```
3. Copy CSS variables into child theme
4. Create page templates as needed

## 📦 Dependencies

### External (CDN)
- Google Fonts (Inter, Space Grotesk)
- None required for base functionality

### Optional Enhancements
- Analytics (GA4, Plausible)
- Form handler (Formspree, Netlify Forms)
- CDN (Cloudflare, Fastly)

## 🚀 Deployment Checklist

- [ ] Update meta descriptions
- [ ] Add favicon and touch icons
- [ ] Compress images (<100kb each)
- [ ] Set up SSL certificate
- [ ] Configure redirects
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Set up analytics
- [ ] Configure form endpoint
- [ ] Add robots.txt
- [ ] Create sitemap.xml
- [ ] Test all links
- [ ] Minify CSS/JS for production
- [ ] Set up monitoring

## 📈 Performance Targets

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Page Weight**: < 1MB

## 🔒 Security

- Content Security Policy headers
- XSS protection
- HTTPS enforcement
- Regular dependency updates
- Form validation & sanitization

## 📝 License

MIT License - See LICENSE file

## 🤝 Credits

**Built by VVVDigitals**
- Engineering content infrastructure
- Commanding motion with pure language
- Velocity without compromise

## 📧 Support

For questions or customization:
- Email: hello@vvvdigitals.com
- Response time: Within 24 hours

---

**VVVDigitals** - *Poetic Coding. Building the Highway.*
