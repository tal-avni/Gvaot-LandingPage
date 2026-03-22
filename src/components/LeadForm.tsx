import { useState } from 'react';
import { APPS_SCRIPT_URL } from '../config';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const ROOM_OPTIONS = [
  { value: '3',         label: '3 חד׳'   },
  { value: '4',         label: '4 חד׳'   },
  { value: '5',         label: '5 חד׳'   },
  { value: 'penthouse', label: 'פנטהאוס' },
  { value: 'garden',    label: 'דירת גן' },
];

export default function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [owner, setOwner] = useState<'yes' | 'no' | null>(null);
  const [rooms, setRooms] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const PHONE_RE = /^0[5-9]\d{8}$/;
  const isPhoneValid = PHONE_RE.test(phone.replace(/[-\s]/g, ''));
  const isValid = name && email && phone && isPhoneValid && owner !== null && rooms !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // Bot trap: real users never fill the hidden field
    if (honeypot) {
      setFormState('success');
      return;
    }

    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          owner: owner === 'yes' ? 'כן' : 'לא',
          rooms,
        }),
        mode: 'no-cors',
      });

      // no-cors returns opaque response – treat reaching here as success
      void res;
      setFormState('success');
    } catch {
      setErrorMsg('שגיאה בשליחה, אנא נסו שוב.');
      setFormState('error');
    }
  };

  if (formState === 'success') {
    return (
      <section
        id="lead-form"
        className="py-24 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/form-bg.png')" }}
      >
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-[#c9a84c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">תודה רבה!</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            קיבלנו את פרטיכם. נציג מטעמנו יצור אתכם קשר בהקדם.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="lead-form"
      className="py-20 px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/form-bg.png')" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#c9a84c]/10 text-[#c9a84c] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider">
            צרו קשר
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
            השאירו פרטים
            <br />
            <span className="text-[#c9a84c]">ונחזור אליכם</span>
          </h2>
          <p className="text-gray-500 mt-4 text-lg">מלאו את הטופס ונציג מומחה יצור אתכם קשר תוך 24 שעות</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 space-y-7"
          noValidate
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              שם מלא <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ישראל ישראלי"
              required
              maxLength={100}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all duration-200 text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              כתובת מייל <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
              maxLength={254}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all duration-200 text-base"
              dir="ltr"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
              מספר טלפון <span className="text-[#c9a84c]">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="05X-XXX-XXXX"
              required
              maxLength={15}
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 transition-all duration-200 text-base"
              dir="ltr"
            />
            {phone && !isPhoneValid && (
              <p className="text-red-500 text-xs mt-1.5">יש להזין מספר טלפון ישראלי תקין (לדוגמה: 0521234567)</p>
            )}
          </div>

          {/* Owner toggle */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-3">
              כיום אני בעל/ת דירה? <span className="text-[#c9a84c]">*</span>
            </label>
            <div className="flex gap-3">
              {(['yes', 'no'] as const).map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setOwner(val)}
                  className={`flex-1 py-3.5 rounded-xl font-semibold text-base border-2 transition-all duration-200 ${
                    owner === val
                      ? 'bg-[#c9a84c] border-[#c9a84c] text-white shadow-lg scale-[1.02]'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#c9a84c]/50'
                  }`}
                >
                  {val === 'yes' ? 'כן' : 'לא'}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms pill-select */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a2e] mb-3">
              בכמה חדרים מעוניין/ת? <span className="text-[#c9a84c]">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {ROOM_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRooms(value)}
                  className={`px-6 py-3 rounded-full font-semibold text-base border-2 transition-all duration-200 ${
                    rooms === value
                      ? 'bg-[#1a1a2e] border-[#1a1a2e] text-[#c9a84c] shadow-lg scale-[1.05]'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#1a1a2e]/40'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Honeypot — hidden from real users, filled only by bots */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1 } as React.CSSProperties}>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          {/* Error message */}
          {formState === 'error' && (
            <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || formState === 'loading'}
            className="w-full bg-[#c9a84c] hover:bg-[#e0c16e] disabled:opacity-50 disabled:cursor-not-allowed text-[#1a1a2e] font-bold text-lg py-4.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex items-center justify-center gap-3"
          >
            {formState === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-[#1a1a2e]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                שולח...
              </>
            ) : (
              'לקבלת הפרטים לחץ כאן'
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-2">
            פרטיכם ישמרו בסודיות מוחלטת ולא יועברו לצד שלישי
          </p>
        </form>
      </div>
    </section>
  );
}
