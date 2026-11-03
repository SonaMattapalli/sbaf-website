import { useState } from 'react';
import { Send, Handshake } from 'lucide-react';
import { toast } from 'sonner';
import { CITIES } from '../data/site';

// Hook up `onSubmit` to your backend (e.g. Supabase insert) — currently shows a success toast.
function useForm(initial) {
  const [values, setValues] = useState(initial);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const submit = (validate, msg) => async (e) => {
    e.preventDefault();
    const err = validate(values);
    if (err) return toast.error(err);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success(msg);
    setValues(initial);
  };
  return { values, set, setValues, submit, loading };
}

const mobileOk = (m) => /^[6-9]\d{9}$/.test((m || '').trim());

export function EnquiryForm() {
  const { values: v, set, setValues, submit, loading } = useForm({
    name: '', mobile: '', email: '', city: '', finance: 'new', vehicleType: '', model: '', price: '', loan: '', occupation: '', income: '', agree: false,
  });
  const validate = (x) => {
    if (!x.name.trim()) return 'Please enter your full name';
    if (!mobileOk(x.mobile)) return 'Please enter a valid 10-digit mobile number';
    if (!x.city) return 'Please select your city';
    if (!x.vehicleType) return 'Please select a vehicle type';
    if (!x.agree) return 'Please accept the Privacy Policy and Terms';
    return null;
  };
  return (
    <form onSubmit={submit(validate, 'Thank you! Our team will contact you shortly.')} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="field-label">Full Name</label><input className="field" placeholder="Your full name" value={v.name} onChange={set('name')} /></div>
        <div><label className="field-label">Mobile Number</label><input className="field" type="tel" maxLength={10} placeholder="10-digit mobile" value={v.mobile} onChange={set('mobile')} /></div>
        <div><label className="field-label">Email</label><input className="field" type="email" placeholder="you@example.com" value={v.email} onChange={set('email')} /></div>
        <div><label className="field-label">City</label>
          <select className="field" value={v.city} onChange={set('city')}><option value="">Select your city</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">I want to finance</label>
          <div className="grid grid-cols-2 gap-3">
            {[['new', 'New Two-Wheeler'], ['pre-owned', 'Pre-Owned Two-Wheeler']].map(([k, l]) => (
              <button type="button" key={k} onClick={() => setValues((x) => ({ ...x, finance: k }))}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${v.finance === k ? 'border-gold bg-gold-50 text-navy ring-1 ring-gold' : 'border-slate-200 text-navy/80 hover:border-gold/60'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div><label className="field-label">Vehicle Type</label>
          <select className="field" value={v.vehicleType} onChange={set('vehicleType')}>
            <option value="">Select type</option>{['Scooter', 'Commuter Motorcycle', 'Sports / Premium Bike', 'Electric Two-Wheeler'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div><label className="field-label">Vehicle Model <span className="normal-case tracking-normal text-slate-400">(optional)</span></label><input className="field" placeholder="e.g. make & model" value={v.model} onChange={set('model')} /></div>
        <div><label className="field-label">Approx. Vehicle Price (₹)</label><input className="field" type="number" placeholder="85000" value={v.price} onChange={set('price')} /></div>
        <div><label className="field-label">Desired Loan Amount (₹)</label><input className="field" type="number" placeholder="60000" value={v.loan} onChange={set('loan')} /></div>
        <div><label className="field-label">Occupation <span className="normal-case tracking-normal text-slate-400">(optional)</span></label>
          <select className="field" value={v.occupation} onChange={set('occupation')}>
            <option value="">Select occupation</option>{['Salaried', 'Self-Employed', 'Business Owner', 'Farmer / Agri', 'Other'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div><label className="field-label">Monthly Income (₹) <span className="normal-case tracking-normal text-slate-400">(optional)</span></label><input className="field" type="number" placeholder="25000" value={v.income} onChange={set('income')} /></div>
      </div>
      <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-slate-500">
        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-gold" checked={v.agree} onChange={set('agree')} />
        <span>I agree to the <a href="#" className="font-medium text-navy underline">Privacy Policy</a> and <a href="#" className="font-medium text-navy underline">Terms &amp; Conditions</a>, and authorize SBAF representatives to contact me regarding my enquiry.</span>
      </label>
      <button disabled={loading} className="btn-gold mt-6 w-full py-3.5 disabled:opacity-60" type="submit">
        <Send className="h-4 w-4" /> {loading ? 'Submitting…' : 'Submit Enquiry'}
      </button>
    </form>
  );
}

export function DealerForm() {
  const { values: v, set, submit, loading } = useForm({ dealer: '', person: '', mobile: '', email: '', city: '', message: '' });
  const validate = (x) => {
    if (!x.dealer.trim()) return 'Please enter the dealership name';
    if (!x.person.trim()) return 'Please enter the contact person';
    if (!mobileOk(x.mobile)) return 'Please enter a valid 10-digit mobile number';
    if (!x.city) return 'Please select a city';
    return null;
  };
  const lbl = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50';
  return (
    <form onSubmit={submit(validate, 'Thanks! Our partnerships team will reach out soon.')} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className={lbl}>Dealer Name</label><input className="field-dark" placeholder="Dealership name" value={v.dealer} onChange={set('dealer')} /></div>
        <div><label className={lbl}>Contact Person</label><input className="field-dark" placeholder="Your name" value={v.person} onChange={set('person')} /></div>
        <div><label className={lbl}>Mobile Number</label><input className="field-dark" type="tel" maxLength={10} placeholder="10-digit mobile" value={v.mobile} onChange={set('mobile')} /></div>
        <div><label className={lbl}>Email</label><input className="field-dark" type="email" placeholder="dealer@example.com" value={v.email} onChange={set('email')} /></div>
        <div><label className={lbl}>City</label>
          <select className="field-dark [&>option]:text-navy" value={v.city} onChange={set('city')}><option value="">Select city</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div><label className={lbl}>Message <span className="normal-case tracking-normal text-white/30">(optional)</span></label><input className="field-dark" placeholder="Brands handled, location..." value={v.message} onChange={set('message')} /></div>
      </div>
      <button disabled={loading} className="btn-gold mt-6 w-full py-3.5 disabled:opacity-60" type="submit">
        <Handshake className="h-4 w-4" /> {loading ? 'Submitting…' : 'Become a Partner'}
      </button>
    </form>
  );
}

export function ContactForm() {
  const { values: v, set, submit, loading } = useForm({ name: '', phone: '', email: '', subject: '', message: '' });
  const validate = (x) => {
    if (!x.name.trim()) return 'Please enter your name';
    if (!mobileOk(x.phone)) return 'Please enter a valid 10-digit mobile number';
    if (!x.message.trim()) return 'Please write a message';
    return null;
  };
  return (
    <form onSubmit={submit(validate, 'Message sent! We will get back to you soon.')} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-navy/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label className="field-label">Name</label><input className="field" placeholder="Your name" value={v.name} onChange={set('name')} /></div>
        <div><label className="field-label">Phone</label><input className="field" type="tel" maxLength={10} placeholder="10-digit mobile" value={v.phone} onChange={set('phone')} /></div>
        <div><label className="field-label">Email</label><input className="field" type="email" placeholder="you@example.com" value={v.email} onChange={set('email')} /></div>
        <div><label className="field-label">Subject</label><input className="field" placeholder="How can we help?" value={v.subject} onChange={set('subject')} /></div>
        <div className="sm:col-span-2"><label className="field-label">Message</label><textarea rows={4} className="field resize-none" placeholder="Write your message..." value={v.message} onChange={set('message')} /></div>
      </div>
      <button disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:opacity-60" type="submit">
        <Send className="h-4 w-4" /> {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
