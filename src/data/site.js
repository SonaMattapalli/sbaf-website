// Central site configuration — update placeholders here.
export const SITE = {
  name: 'SBAF',
  tagline: 'SB Asset Finance',
  legalName: 'SB Asset Finance Private Limited',
  slogan: 'Finance That Moves You Forward',
  branch: 'Rajahmundry',
  phone: '+919154496699',
  whatsapp: '919154496699',
  whatsappMessage: 'Hi SBAF, నాకు టూ-వీలర్ లోన్ గురించి వివరాలు కావాలి.',
  phoneDisplay: '+91 91544 96699',
  email: 'support@sbaf.in',
  office: '87-1-21/2, Ward No. 31, Ayyappa Nagar, Rajahmundry, Andhra Pradesh',
  hours: '10:00 AM – 6:00 PM',
  social: { facebook: '#', instagram: '#', twitter: '#', linkedin: '#' },
};

// WhatsApp chat link that opens with the pre-filled greeting.
export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const IMAGES = {
  hero: 'https://images.pexels.com/photos/36874550/pexels-photo-36874550.jpeg?auto=compress&cs=tinysrgb&w=1200',
  newBike: 'https://images.pexels.com/photos/28281984/pexels-photo-28281984.jpeg?auto=compress&cs=tinysrgb&w=1200',
  preOwned: 'https://images.pexels.com/photos/5622296/pexels-photo-5622296.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/faq', label: 'FAQ' },
  { to: '/grievance-redressal', label: 'Grievance Redressal' },
  { to: '/contact', label: 'Contact Us' },
];

export const CITIES = [
  'Vijayawada', 'Visakhapatnam', 'Guntur', 'Tirupati', 'Nellore', 'Rajahmundry', 'Kakinada',
  'Kurnool', 'Kadapa', 'Anantapur', 'Eluru', 'Vizianagaram', 'Ongole', 'Chittoor', 'Other',
];

export const JOURNEY = [
  { title: 'Choose Your Two-Wheeler', text: 'Pick your new or pre-owned motorcycle or scooter from a dealer.' },
  { title: 'Check Your Eligibility', text: 'Share a few details and our team helps you understand your options.' },
  { title: 'Submit Required Documents', text: 'Provide the basic documents — we keep the list short and clear.' },
  { title: 'Complete the Financing Process', text: 'Finish the formalities and ride home on your two-wheeler.' },
];

export const PRODUCTS = [
  {
    id: 'new',
    badge: 'Brand New Ride',
    title: 'New Two-Wheeler Finance',
    image: IMAGES.newBike,
    alt: 'Customer with a brand new motorcycle at a dealership',
    summary: 'Financing for customers purchasing a new motorcycle or scooter through our dealer network.',
    features: [
      'Financing through our dealer partner network',
      'Flexible repayment tenures',
      'Simple, transparent documentation',
      'Support at every step of the journey',
    ],
    whoFor: ['Customers purchasing a new motorcycle or scooter through our dealer partner network.'],
    documents: [
      'Identity proof (Aadhaar / PAN / Voter ID)',
      'Address proof',
      'Income proof / bank statements',
      'Passport-size photographs',
      'Vehicle quotation / proforma invoice',
    ],
  },
  {
    id: 'pre-owned',
    badge: 'Smart Value',
    title: 'Pre-Owned Two-Wheeler Finance',
    image: IMAGES.preOwned,
    alt: 'Customer inspecting a pre-owned two-wheeler',
    summary: 'Financing for customers purchasing an eligible used / pre-owned motorcycle or scooter.',
    features: [
      'Financing for eligible pre-owned vehicles',
      'Fair vehicle assessment process',
      'Flexible EMI options',
      'Guidance on transfer documentation',
    ],
    whoFor: [
      'Customers purchasing an eligible used / pre-owned motorcycle or scooter who want simple, transparent financing.',
      'Vehicle eligibility depends on condition, age and documentation. [Vehicle eligibility criteria to be updated]',
    ],
    documents: [
      'Identity proof (Aadhaar / PAN / Voter ID)',
      'Address proof',
      'Income proof / bank statements',
      'Passport-size photographs',
      'Vehicle Registration Certificate (RC)',
      'Valid insurance copy and transfer documents',
    ],
  },
];

export const FAQS = [
  { cat: 'General', items: [
    ['What does SBAF do?', 'SBAF (SB Asset Finance Private Limited) is a finance company providing two-wheeler loans. We finance both new and eligible pre-owned motorcycles and scooters, working closely with dealer partners across Andhra Pradesh.'],
    ['What types of vehicles can be financed?', 'We finance motorcycles and scooters — both brand-new vehicles purchased through our dealer network and eligible pre-owned (used) two-wheelers.'],
    ['Where does SBAF operate?', 'Our branch is in Rajahmundry, and we work with dealer partners across Andhra Pradesh. Visit our Contact page for details.'],
  ]},
  { cat: 'New Two-Wheeler Finance', items: [
    ['Can I finance a brand-new motorcycle or scooter?', 'Yes. We provide financing for new motorcycles and scooters purchased through our dealer partner network.'],
    ['How much of the vehicle price can be financed?', 'The loan amount depends on the vehicle and your profile. Our team will share the exact details when you apply. [Funding limits to be updated]'],
    ['How do I apply for new two-wheeler finance?', 'You can contact us through our Contact page, apply through a dealer partner, or visit our Rajahmundry branch.'],
  ]},
  { cat: 'Pre-Owned Two-Wheeler Finance', items: [
    ['Do you finance used or second-hand bikes?', 'Yes. We finance eligible pre-owned motorcycles and scooters, subject to assessment of the vehicle and the applicant.'],
    ['Which pre-owned vehicles are eligible?', "Eligibility depends on factors such as the vehicle's condition, age and documentation. Each vehicle is assessed individually. [Detailed vehicle criteria to be updated]"],
    ['Do you help with RC transfer for pre-owned vehicles?', 'Our team guides you through the transfer documentation process as part of the financing journey.'],
  ]},
  { cat: 'Eligibility', items: [
    ['Who can apply for two-wheeler finance?', 'Individuals looking to purchase a new or eligible pre-owned two-wheeler can apply — including salaried, self-employed and other applicants. [Detailed eligibility criteria to be updated]'],
    ['Is there a minimum income requirement?', 'Each application is assessed individually. Our team will explain the requirements when you apply. [Income criteria to be updated]'],
    ['Can first-time borrowers apply?', 'Yes, first-time borrowers are welcome to apply. Every application is assessed on its own merits.'],
  ]},
  { cat: 'Documents', items: [
    ['What documents are required?', 'Typically: identity proof, address proof, income proof or bank statements, and photographs. The final checklist is shared at the time of application.'],
    ['Are extra documents needed for pre-owned vehicles?', 'Yes — vehicle-related documents such as the Registration Certificate (RC) and insurance copy are required for pre-owned financing.'],
    ['Do I need to submit original documents?', 'Our team will explain the verification process and which originals are required when you apply.'],
  ]},
  { cat: 'Customer Support', items: [
    ['How do I contact SBAF?', 'You can call us, email us, message us on WhatsApp, or visit our Rajahmundry branch. Details are listed on our Contact page.'],
    ['How do I raise a complaint or grievance?', 'Visit our Grievance Redressal page for the step-by-step process and escalation structure.'],
    ['Where is your branch?', 'Our branch is in Rajahmundry. You can also reach us through our dealer partners across Andhra Pradesh, or through our Contact page.'],
  ]},
];

export const GRIEVANCE_LEVELS = [
  { level: 1, title: 'Customer Support', email: 'support@sbaf.in' },
  { level: 2, title: 'Nodal Officer', name: 'Krishna Aditya', designation: 'Nodal Officer', email: 'nodalofficer@sbaf.in' },
  { level: 3, title: 'Director', name: 'M Suresh Kumar', designation: 'Director', email: 'sureshkumar@sbaf.in' },
];
