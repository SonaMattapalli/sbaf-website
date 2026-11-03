# SBAF — Two-Wheeler Finance Website

React + Vite + Tailwind CSS. Pages: Home, About Us, Products, FAQ, Contact Us, Grievance Redressal.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

- Edit phone, email, address, social links, FAQs and grievance officers in `src/data/site.js`.
- Forms (enquiry, dealer partner, contact) are in `src/components/Forms.jsx` — they currently show a success toast; connect them to your backend (e.g. Supabase) in the `submit` handler.
- SPA rewrites included for Vercel (`vercel.json`) and Netlify (`public/_redirects`).
