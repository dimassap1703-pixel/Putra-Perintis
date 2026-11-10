import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const { user, isAdmin, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!authLoading && user && isAdmin) {
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/admin/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Email dan kata sandi wajib diisi.');
      return;
    }

    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);

    if (error) {
      setErrorMsg(error);
      return;
    }
    navigate('/admin/dashboard', { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-black px-4">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-charcoal p-8 shadow-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-heading text-xl font-bold text-off-white">
          Masuk ke Dasbor Admin
        </h1>
        <p className="mt-1 text-center text-sm text-off-white/50">
          Khusus untuk administrator PUTRA PERINTIS
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-off-white/80">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-off-white/40" size={18} />
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-deep-black py-2.5 pl-10 pr-3 text-sm text-off-white placeholder:text-off-white/30 focus:border-pp-yellow focus:outline-none"
                placeholder="admin@putraperintis.co.id"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-off-white/80">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-off-white/40" size={18} />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-white/15 bg-deep-black py-2.5 pl-10 pr-3 text-sm text-off-white placeholder:text-off-white/30 focus:border-pp-yellow focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="rounded-md bg-danger-red/10 px-3 py-2 text-sm text-danger-red">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-pp-yellow py-3 text-sm font-bold uppercase tracking-wide text-deep-black disabled:opacity-60"
          >
            {submitting && <Loader2 className="animate-spin" size={16} />}
            {submitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-off-white/35">
          Akun admin dibuat melalui proses provisioning oleh pemilik sistem, bukan pendaftaran
          mandiri.
        </p>
      </div>
    </div>
  );
}
