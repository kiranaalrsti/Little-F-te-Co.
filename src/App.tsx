import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Clock, MapPin, Phone, Mail, CheckCircle2, AlertCircle,
  ShieldCheck, Lock, Sparkles, Heart, ChevronRight, ChevronLeft,
  DollarSign, Package, Users, Palette, Cake, Camera, Gift, FileText,
  Download, RefreshCw, Plus, Search, Filter, ExternalLink, ArrowRight,
  UserCheck, Building2, Truck, Check, HelpCircle, LogOut, Star, Quote, MessageSquare, ThumbsUp
} from 'lucide-react';

import {
  Booking, BookingStatus, CakeItem, DecorationTheme, JournalEntry,
  JournalType, PartyPackage, PaymentStatus, TaskItem, TaskStatus,
  TeamMember, UserSession, BookingAddon, Testimonial
} from './types';

import {
  OFFICIAL_TEAM, INITIAL_DECORATION_THEMES, INITIAL_CAKES,
  INITIAL_PACKAGES, formatRupiah, calculateTransport,
  assignBalancedPIC, SAMPLE_BOOKINGS, SAMPLE_JOURNAL, SAMPLE_TASKS,
  SAMPLE_TESTIMONIALS
} from './data';

export default function App() {
  const [page, setPage] = useState<string>('home');
  const [viewingRef, setViewingRef] = useState<string>('');
  const [plannerPreselectedPkg, setPlannerPreselectedPkg] = useState<string>('little_moments');
  const [plannerPreselectedTheme, setPlannerPreselectedTheme] = useState<string>('sweet_pink');

  // State Pesanan (LocalStorage Persistent)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('lf_bookings_v3');
      return saved ? JSON.parse(saved) : SAMPLE_BOOKINGS;
    } catch {
      return SAMPLE_BOOKINGS;
    }
  });

  // State Jurnal Keuangan Akuntansi (LocalStorage Persistent)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('lf_journal_v3');
      return saved ? JSON.parse(saved) : SAMPLE_JOURNAL;
    } catch {
      return SAMPLE_JOURNAL;
    }
  });

  // State Tugas Operasional (LocalStorage Persistent)
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('lf_tasks_v3');
      return saved ? JSON.parse(saved) : SAMPLE_TASKS;
    } catch {
      return SAMPLE_TASKS;
    }
  });

  // State Testimoni & Rating (LocalStorage Persistent)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('lf_testimonials_v1');
      return saved ? JSON.parse(saved) : SAMPLE_TESTIMONIALS;
    } catch {
      return SAMPLE_TESTIMONIALS;
    }
  });

  // State Sesi Pengguna (Staf Tim atau Pelanggan)
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('lf_user_session_v3');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast Notification System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    localStorage.setItem('lf_bookings_v3', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('lf_journal_v3', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('lf_tasks_v3', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('lf_testimonials_v1', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('lf_user_session_v3');
    showToast('Berhasil keluar dari akun.');
    setPage('home');
  };

  const navigateToPlannerWithPackage = (pkgId: string) => {
    setPlannerPreselectedPkg(pkgId);
    setPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPlannerWithTheme = (themeId: string) => {
    setPlannerPreselectedTheme(themeId);
    setPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Styling Dinamis Latar & Aksen Per Halaman Sesuai Palet Resmi Little Fête & Co.
  const getPageThemeClasses = () => {
    switch (page) {
      case 'home':
        return 'bg-[#F7F1E8]'; // Core Soft Cream
      case 'packages':
        return 'bg-[#FAF4EC]'; // Core Warm Beige lembut
      case 'themes':
        return 'bg-[#F4F7FB]'; // Pastel Blue lembut (#B0CBE9 tone)
      case 'addons':
        return 'bg-[#F9F3EE]'; // Blush Pink & Warm Beige
      case 'status':
        return 'bg-[#F3F7FA]'; // Pastel Blue tint
      case 'team_portal':
        return 'bg-[#F5EFE6]'; // Cocoa & Warm Cream
      case 'customer_portal':
        return 'bg-[#FAF5EF]';
      default:
        return 'bg-[#F7F1E8]';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${getPageThemeClasses()} text-[#795B4B] transition-colors duration-300 font-sans`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#795B4B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 text-xs border border-white/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#E8C9C7]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Ribbon */}
      <div className="bg-[#EFE7DC] border-b border-[#E3D7C8] text-[11px] py-2 px-4 text-center tracking-wide text-[#795B4B] font-medium flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C89B99]" />
        <span>Little Fête & Co. — Your Little Party, Your Way. Spesialis Pesta Ulang Tahun Anak Usia 0–12 Tahun di Jakarta & Sekitarnya.</span>
      </div>

      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F1E8]/95 backdrop-blur-md border-b border-[#EBE1D4] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo Resmi Little Fête & Co. */}
          <div onClick={() => setPage('home')} className="cursor-pointer flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border border-[#C89B99]/40 group-hover:scale-105 transition-transform flex items-center justify-center p-0.5 shrink-0">
              <img
                src="/assets/aistudio/logo_7b9a2f08.jpeg"
                alt="Logo Little Fête & Co."
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#795B4B] block leading-none">
                Little Fête & Co.
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-[#C4A58D] mt-1 block">
                Children's Party Specialist
              </span>
            </div>
          </div>

          {/* Menu Navigasi Publik */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold tracking-wide">
            <button
              onClick={() => setPage('home')}
              className={`hover:text-[#C89B99] transition pb-1 ${page === 'home' ? 'text-[#C89B99] font-bold border-b-2 border-[#C89B99]' : 'text-[#795B4B]'}`}
            >
              HOME
            </button>
            <button
              onClick={() => setPage('packages')}
              className={`hover:text-[#C4A58D] transition pb-1 ${page === 'packages' ? 'text-[#C4A58D] font-bold border-b-2 border-[#C4A58D]' : 'text-[#795B4B]'}`}
            >
              OUR PACKAGES
            </button>
            <button
              onClick={() => setPage('themes')}
              className={`hover:text-[#4A6FA5] transition pb-1 ${page === 'themes' ? 'text-[#4A6FA5] font-bold border-b-2 border-[#4A6FA5]' : 'text-[#795B4B]'}`}
            >
              DECORATION THEMES
            </button>
            <button
              onClick={() => setPage('addons')}
              className={`hover:text-[#C89B99] transition pb-1 ${page === 'addons' ? 'text-[#C89B99] font-bold border-b-2 border-[#C89B99]' : 'text-[#795B4B]'}`}
            >
              ADD-ONS
            </button>
            <button
              onClick={() => setPage('planner')}
              className="px-5 py-2.5 rounded-full bg-[#E8C9C7] hover:bg-[#C89B99] text-[#795B4B] hover:text-white transition shadow-sm font-bold border border-[#C89B99]/40 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLAN YOUR PARTY</span>
            </button>
            <button
              onClick={() => setPage('status')}
              className={`transition font-bold flex items-center space-x-1 ${page === 'status' ? 'text-[#4A6FA5] border-b-2 border-[#4A6FA5]' : 'text-[#795B4B] hover:text-[#4A6FA5]'}`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>BOOKING STATUS</span>
            </button>
          </nav>

          {/* Akun & Akses Staf / Pelanggan */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs pl-1.5 pr-3 py-1 rounded-full bg-white/90 border border-[#E0D4C5] text-[#795B4B] font-medium flex items-center space-x-2 shadow-2xs">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-white border border-[#C89B99]/40 shrink-0">
                    <img src="/assets/aistudio/logo_7b9a2f08.jpeg" alt="Foto Profil" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span>{currentUser.role === 'team' ? 'Staf' : 'Bunda/Ayah'}: {currentUser.name.split(' ')[0]}</span>
                </span>
                {currentUser.role === 'team' ? (
                  <button
                    onClick={() => setPage('team_portal')}
                    className="text-xs bg-[#795B4B] text-white px-3.5 py-1.5 rounded-full hover:bg-black font-semibold transition flex items-center space-x-1 shadow-sm"
                  >
                    <Lock className="w-3 h-3 text-[#E8C9C7]" />
                    <span>Portal Tim</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setPage('customer_portal')}
                    className="text-xs bg-[#E8C9C7] text-[#795B4B] px-3.5 py-1.5 rounded-full font-semibold border border-[#C89B99]/50 hover:bg-[#C89B99] hover:text-white transition"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  title="Keluar"
                  className="p-1.5 rounded-full hover:bg-red-50 text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage('customer_login')}
                  className="text-xs font-semibold px-3 py-2 text-[#795B4B] hover:text-[#C89B99] transition"
                >
                  Masuk
                </button>
                <button
                  onClick={() => setPage('team_login')}
                  className="text-xs px-3.5 py-1.5 rounded-full border border-[#795B4B]/40 text-[#795B4B] hover:bg-white/70 font-medium transition flex items-center space-x-1.5"
                >
                  <Lock className="w-3 h-3 text-[#795B4B]" />
                  <span>Team Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden border-t border-[#EBE1D4] px-4 py-2 flex items-center justify-around text-[10px] font-bold overflow-x-auto">
          <button onClick={() => setPage('home')} className={`px-2 py-1 ${page === 'home' ? 'text-[#C89B99]' : 'text-[#795B4B]'}`}>HOME</button>
          <button onClick={() => setPage('packages')} className={`px-2 py-1 ${page === 'packages' ? 'text-[#C4A58D]' : 'text-[#795B4B]'}`}>PACKAGES</button>
          <button onClick={() => setPage('themes')} className={`px-2 py-1 ${page === 'themes' ? 'text-[#4A6FA5]' : 'text-[#795B4B]'}`}>THEMES</button>
          <button onClick={() => setPage('addons')} className={`px-2 py-1 ${page === 'addons' ? 'text-[#C89B99]' : 'text-[#795B4B]'}`}>ADD-ONS</button>
          <button onClick={() => setPage('planner')} className="px-3 py-1 rounded-full bg-[#E8C9C7] text-[#795B4B]">PLANNER</button>
          <button onClick={() => setPage('status')} className={`px-2 py-1 ${page === 'status' ? 'text-[#4A6FA5]' : 'text-[#795B4B]'}`}>STATUS</button>
        </div>
      </header>

      {/* Konten Halaman Aktif */}
      <main className="flex-1">
        {page === 'home' && (
          <HomePage
            onNavigate={setPage}
            onSelectPackage={navigateToPlannerWithPackage}
            onSelectTheme={navigateToPlannerWithTheme}
            testimonials={testimonials}
            onAddTestimonial={(newT) => {
              setTestimonials([newT, ...testimonials]);
              showToast('Terima kasih! Ulasan & rating Anda berhasil ditambahkan.');
            }}
          />
        )}
        {page === 'packages' && (
          <PackagesPage
            onSelectPackage={navigateToPlannerWithPackage}
          />
        )}
        {page === 'themes' && (
          <ThemesPage
            onSelectTheme={navigateToPlannerWithTheme}
          />
        )}
        {page === 'addons' && (
          <AddonsPage
            onNavigate={setPage}
          />
        )}
        {page === 'planner' && (
          <PlannerWizard
            existingBookings={bookings}
            preselectedPkg={plannerPreselectedPkg}
            preselectedTheme={plannerPreselectedTheme}
            onBookingCreated={(newBk) => {
              setBookings([newBk, ...bookings]);
              setViewingRef(newBk.referenceCode);
              showToast(`Pemesanan ${newBk.referenceCode} berhasil diajukan! PIC resmi Anda: ${newBk.assignedPIC}`);
              setPage('status');
            }}
          />
        )}
        {page === 'status' && (
          <StatusLookupPage
            bookings={bookings}
            initialRef={viewingRef}
            onUpdatePaymentStatus={(ref, newStatus) => {
              setBookings(prev => prev.map(b => b.referenceCode === ref ? { ...b, paymentStatus: newStatus } : b));
              showToast(`Status pembayaran ${ref} diperbarui menjadi: ${newStatus}`);
            }}
          />
        )}
        {page === 'team_login' && (
          <TeamLoginPage
            onSuccess={(user) => {
              setCurrentUser(user);
              localStorage.setItem('lf_user_session_v3', JSON.stringify(user));
              showToast(`Selamat datang di Team Portal, ${user.name}!`);
              setPage('team_portal');
            }}
          />
        )}
        {page === 'customer_login' && (
          <CustomerLoginPage
            onSuccess={(user) => {
              setCurrentUser(user);
              localStorage.setItem('lf_user_session_v3', JSON.stringify(user));
              showToast(`Selamat datang Bunda/Ayah ${user.name}!`);
              setPage('customer_portal');
            }}
          />
        )}
        {page === 'team_portal' && currentUser?.role === 'team' && (
          <TeamPortal
            currentUser={currentUser}
            bookings={bookings}
            journalEntries={journalEntries}
            tasks={tasks}
            onUpdateBookings={setBookings}
            onUpdateJournal={setJournalEntries}
            onUpdateTasks={setTasks}
            onShowToast={showToast}
          />
        )}
        {page === 'customer_portal' && (
          <CustomerPortal
            user={currentUser}
            bookings={bookings.filter(b => currentUser ? (b.customerEmail.toLowerCase() === currentUser.email.toLowerCase() || b.customerName.toLowerCase().includes(currentUser.name.toLowerCase())) : false)}
            onViewBooking={(ref) => {
              setViewingRef(ref);
              setPage('status');
            }}
            onNavigatePlanner={() => setPage('planner')}
          />
        )}
      </main>

      {/* Footer Konsisten & Transparan */}
      <footer className="bg-[#EFE8DF] border-t border-[#DFD3C4] pt-14 pb-8 text-xs text-[#795B4B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-2xs border border-[#C89B99]/40 flex items-center justify-center p-0.5 shrink-0">
                <img
                  src="/assets/aistudio/logo_7b9a2f08.jpeg"
                  alt="Logo Little Fête & Co."
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-serif text-xl font-bold text-[#795B4B]">Little Fête & Co.</span>
            </div>
            <p className="italic text-[11px] text-[#C89B99] font-medium">"Your Little Party, Your Way."</p>
            <p className="mt-3 leading-relaxed text-[11px] text-[#694E40]">
              Penyelenggara pesta ulang tahun anak usia 0–12 tahun dengan konsep estetik, transparan, dan terpercaya. Kami menghadirkan momen hangat tak terlupakan bagi keluarga Anda.
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#795B4B] mb-3 text-[11px]">Pilihan Paket & Tema</h4>
            <ul className="space-y-2 text-[11px] text-[#694E40]">
              <li>• <b>Little Moments</b> (s.d 15 Anak, Rp399.000)</li>
              <li>• <b>Happy Days</b> (s.d 30 Anak, Rp699.000)</li>
              <li>• <b>Dream Party</b> (s.d 50 Anak, Rp1.099.000)</li>
              <li>• <b>4 Tema Pastel:</b> Sweet Pink, Sweet Cream, Little Blue, Sage Garden</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#795B4B] mb-3 text-[11px]">Kontak & Operasional</h4>
            <p className="text-[11px] leading-relaxed text-[#694E40] space-y-1">
              <span><b>Layanan:</b> On-Site Party Organizer (Langsung ke Lokasi Acara)</span><br />
              <span><b>Wilayah Operasional:</b> Jakarta & Sekitarnya (Jadetabek)</span><br />
              <span><b>Jam Layanan:</b> Setiap Hari 08.00 – 18.00 WIB</span><br />
              <span><b>WhatsApp Hotline:</b> 0812-9999-8888</span><br />
              <span><b>Email Resmi:</b> littlefeat.co@gmail.com</span>
            </p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#795B4B] mb-3 text-[11px]">Standar Layanan & Keamanan</h4>
            <ul className="space-y-2 text-[11px] text-[#694E40]">
              <li className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Penetapan otomatis 1 PIC resmi (Dina, Kirana, atau Fifi)</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Proteksi verifikasi 4-digit nomor WhatsApp untuk privasi data</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Prinsip akuntansi transparan & pemisahan aset tetap peralatan</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Portal Staf dilindungi 2FA TOTP mandatori</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-[#DFD3C4] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#694E40] gap-3">
          <div>
            &copy; {new Date().getFullYear()} Little Fête & Co. Seluruh hak cipta dilindungi. Mata uang resmi Rupiah (IDR).
          </div>
          <div className="flex space-x-4">
            <span className="hover:underline cursor-pointer" onClick={() => setPage('home')}>Beranda</span>
            <span className="hover:underline cursor-pointer" onClick={() => setPage('packages')}>Paket</span>
            <span className="hover:underline cursor-pointer" onClick={() => setPage('status')}>Lacak Pesanan</span>
            <span className="hover:underline cursor-pointer" onClick={() => setPage('team_login')}>Akses Staf</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// =========================================================================
// 1. HALAMAN UTAMA (HOME PAGE)
// =========================================================================
interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectPackage: (pkgId: string) => void;
  onSelectTheme: (themeId: string) => void;
  testimonials: Testimonial[];
  onAddTestimonial: (t: Testimonial) => void;
}

function HomePage({ onNavigate, onSelectPackage, onSelectTheme, testimonials, onAddTestimonial }: HomePageProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newParentName, setNewParentName] = useState('');
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState<number>(3);
  const [newRating, setNewRating] = useState<number>(5);
  const [newEventTheme, setNewEventTheme] = useState('Sweet Pink');
  const [newPackageName, setNewPackageName] = useState('Little Moments');
  const [newAssignedPIC, setNewAssignedPIC] = useState('Dina Alawiyah');
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');
    if (!newParentName.trim()) return setReviewError('Nama Bunda / Ayah wajib diisi.');
    if (!newChildName.trim()) return setReviewError('Nama si kecil wajib diisi.');
    if (!newReviewText.trim()) return setReviewError('Ulasan / kesan pengalaman pesta wajib diisi.');

    const newTestimonial: Testimonial = {
      id: `testi_${Date.now()}`,
      parentName: newParentName.trim(),
      childName: newChildName.trim(),
      childAge: newChildAge,
      rating: newRating,
      eventTheme: newEventTheme,
      packageName: newPackageName,
      assignedPIC: newAssignedPIC,
      reviewText: newReviewText.trim(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      verifiedBooking: true
    };

    onAddTestimonial(newTestimonial);
    setShowReviewModal(false);
    setNewParentName('');
    setNewChildName('');
    setNewReviewText('');
    setNewRating(5);
  };
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#E8C9C7]/70 rounded-full text-xs font-semibold text-[#795B4B] border border-[#C89B99]/40 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B99]" />
              <span>Children's Birthday Party Specialist (Usia 0–12 Tahun)</span>
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#795B4B] leading-tight tracking-tight">
              Your Little Party, <br />
              <span className="italic font-normal text-[#C89B99]">Your Way.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#694E40] leading-relaxed max-w-xl">
              Momen kecil, kenangan abadi. Kami membantu Bunda dan Ayah mewujudkan pesta ulang tahun si kecil dengan dekorasi arched backdrop estetik, balon organik manis, MC profesional ramah anak, dan transparansi biaya tanpa kejutan.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-3">
              <button
                onClick={() => onNavigate('planner')}
                className="px-8 py-3.5 rounded-full bg-[#E8C9C7] hover:bg-[#C89B99] text-[#795B4B] hover:text-white font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition border border-[#C89B99]/40 flex items-center justify-center space-x-2"
              >
                <span>PLAN YOUR PARTY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="px-8 py-3.5 rounded-full bg-white/95 border border-[#D8C7B5] hover:bg-white text-[#795B4B] font-semibold text-xs tracking-wider transition shadow-2xs text-center"
              >
                EXPLORE OUR PACKAGES
              </button>
            </div>

            {/* Rating Ringkas di Bawah Tombol Plan Your Party */}
            <div className="flex items-center space-x-2 pt-1">
              <div className="flex space-x-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-xs text-[#795B4B]">4.9 / 5.0</span>
              <span className="text-[#694E40] text-[11px] font-medium">• Rating Terpercaya dari Bunda & Ayah</span>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EBE1D4] text-[11px]">
              <div>
                <p className="font-bold text-[#795B4B]">Mulai Rp399.000</p>
                <p className="text-[#694E40]">Paket pesta lengkap</p>
              </div>
              <div>
                <p className="font-bold text-[#795B4B]">1 PIC Khusus</p>
                <p className="text-[#694E40]">Didampingi tim resmi</p>
              </div>
              <div>
                <p className="font-bold text-[#795B4B]">0–5 km Bebas Ongkir</p>
                <p className="text-[#694E40]">Radius terdekat</p>
              </div>
            </div>
          </div>

          {/* Showcase Dekorasi Utama */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EFE8DF] relative group">
              <img
                src={INITIAL_DECORATION_THEMES[0].imageUrl}
                alt="Little Fête & Co. Dekorasi Pesta Anak"
                className="w-full h-full balanced-photo group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wide uppercase">
                  Portofolio Asli Little Fête & Co.
                </span>
                <h3 className="font-serif text-lg font-bold mt-1 text-white">Sweet Pink Backdrop & Organic Balloons</h3>
                <p className="text-[11px] text-white/90">Tema terfavorit dengan warna blush pink, putih krem, dan sentuhan peach.</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/95 p-4 rounded-2xl shadow-xl border border-[#E2D5C4] max-w-xs hidden sm:block">
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-bold text-[#795B4B]">Standar Dekorasi Termasuk</p>
              </div>
              <p className="text-[11px] text-[#694E40] leading-snug">
                Semua paket sudah termasuk portable arched backdrop, 20–30 balon organik di satu sisi, foil nama si kecil & meja kue minimalis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEKSI RATING & TESTIMONI ORANG TUA (Ditempatkan di Bagian Paling Atas) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#EBE1D4] pb-6">
          <div>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF3EC] border border-[#DECFC0] rounded-full text-[10px] font-bold text-[#795B4B] uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Rating 4.9 / 5.0 (150+ Pesta Ulang Tahun Anak)</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#795B4B]">
              Rating & Kata Bunda & Ayah
            </h2>
            <p className="text-xs sm:text-sm text-[#694E40] mt-1 max-w-xl leading-relaxed">
              Keluarga bahagia adalah bukti dedikasi kami. Simak ulasan nyata dari orang tua yang merayakan momen berharga si kecil bersama Little Fête & Co.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#E8C9C7] hover:bg-[#C89B99] text-[#795B4B] hover:text-white font-bold text-xs tracking-wider transition shadow-sm flex items-center space-x-1.5 border border-[#C89B99]/40"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>+ Tulis Ulasan & Rating</span>
            </button>
          </div>
        </div>

        {/* Highlight Score & Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-serif font-bold text-xl shrink-0">
              4.9
            </div>
            <div>
              <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-[#795B4B]">Rata-rata Kepuasan Klien</p>
              <p className="text-[10px] text-[#694E40]">Berdasarkan 150+ ulasan terverifikasi</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#795B4B]">100% On-Time Setup</p>
              <p className="text-[10px] text-[#694E40]">Tim hadir 1.5–2 jam sebelum acara</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold shrink-0">
              <UserCheck className="w-6 h-6 text-[#C89B99]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#795B4B]">1 Dedicated PIC Resmi</p>
              <p className="text-[10px] text-[#694E40]">Didampingi langsung oleh staf Little Fête</p>
            </div>
          </div>
        </div>

        {/* Grid Kartu Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DECFC0] shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= testi.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-[#795B4B] ml-1.5">{testi.rating}.0</span>
                  </div>

                  {testi.verifiedBooking && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Verifikasi Pemesanan</span>
                    </span>
                  )}
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-[#E8C9C7]/50 absolute -top-1 -left-1" />
                  <p className="text-xs text-[#694E40] leading-relaxed pt-3 italic relative z-10">
                    "{testi.reviewText}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0E5D8] flex flex-col sm:flex-row justify-between sm:items-end gap-2 text-[11px]">
                <div>
                  <h4 className="font-bold text-[#795B4B]">{testi.parentName}</h4>
                  <p className="text-[#694E40]">
                    Pesta Si Kecil <b>{testi.childName}</b> ({testi.childAge} Thn) • {testi.packageName}
                  </p>
                  {testi.assignedPIC && (
                    <p className="text-[10px] text-[#C4A58D] font-semibold mt-0.5">
                      Didampingi PIC: Kak {testi.assignedPIC}
                    </p>
                  )}
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF3EC] text-[#795B4B] border border-[#DECFC0] mb-1">
                    Tema: {testi.eventTheme}
                  </span>
                  <p className="text-[10px] text-gray-500">{testi.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Langkah Pemesanan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#C4A58D]">Langkah Mudah</span>
          <h2 className="font-serif text-3xl font-bold text-[#795B4B] mt-1">Bagaimana Cara Kerjanya?</h2>
          <p className="text-xs text-[#694E40] mt-2">Empat langkah transparan untuk merencanakan perayaan ulang tahun istimewa si kecil.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              no: '01',
              title: 'Choose Your Package',
              desc: 'Pilih kuota tamu anak yang tepat: Little Moments (15 anak), Happy Days (30 anak), atau Dream Party (50 anak).',
              icon: Package
            },
            {
              no: '02',
              title: 'Customize Celebration',
              desc: 'Tentukan dari 4 tema pastel estetik, tambahkan kue rekanan (Bento/Character/Tiered), goodie bag, dan fotografer.',
              icon: Palette
            },
            {
              no: '03',
              title: 'Confirm & Assigned PIC',
              desc: 'Dapatkan 1 Personal in Charge (PIC) resmi (Dina, Kirana, atau Fifi) yang siap mengawal koordinasi acara Anda.',
              icon: UserCheck
            },
            {
              no: '04',
              title: 'Get Ready to Celebrate!',
              desc: 'Tim Little Fête & Co. hadir tepat waktu mempersiapkan dekorasi arched backdrop dan memandu keceriaan si kecil.',
              icon: Sparkles
            }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="bg-white/90 p-7 rounded-3xl border border-[#E5DACD] shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-[#C89B99]">{step.no}</span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F7F1E8] flex items-center justify-center text-[#795B4B]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-[#795B4B] mb-2">{step.title}</h3>
                  <p className="text-[11px] text-[#694E40] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Showcase 4 Tema Dekorasi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#4A6FA5]">Galeri Tema</span>
            <h2 className="font-serif text-3xl font-bold text-[#795B4B] mt-1">4 Pilihan Tema Pastel Estetik</h2>
            <p className="text-xs text-[#694E40] mt-1">Dirancang khusus untuk melengkapi foto keluarga nan hangat dan manis.</p>
          </div>
          <button
            onClick={() => onNavigate('themes')}
            className="text-xs font-bold text-[#4A6FA5] hover:underline flex items-center space-x-1"
          >
            <span>Lihat Rincian Palet & Backdrop</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_DECORATION_THEMES.map(theme => (
            <div key={theme.id} className="bg-white rounded-3xl overflow-hidden border border-[#E0D4C5] shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] bg-[#EAF0F8] overflow-hidden relative">
                  <img src={theme.imageUrl} alt={theme.name} className="w-full h-full balanced-photo" />
                  <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-[#795B4B]">
                    {theme.subtitle}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#795B4B]">{theme.name}</h3>
                  <p className="text-[11px] text-[#694E40] mt-1 line-clamp-2 leading-relaxed">{theme.description}</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-[10px] font-bold text-[#795B4B]">Palet:</span>
                    <div className="flex space-x-1.5">
                      {theme.palette.map((color, idx) => (
                        <span key={idx} className="w-4 h-4 rounded-full border border-black/10 shadow-2xs" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectTheme(theme.id)}
                  className="w-full py-2.5 rounded-full bg-[#FAF3EC] hover:bg-[#E8C9C7] text-[#795B4B] font-bold text-xs transition border border-[#DECFC0]"
                >
                  Pilih Tema Ini
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Kue Rekanan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF3EC] p-8 sm:p-12 rounded-3xl border border-[#EBE0D2]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#C89B99]">Kue Ulang Tahun Rekanan</span>
            <h2 className="font-serif text-3xl font-bold text-[#795B4B] mt-1">Birthday Cake Catalog</h2>
            <p className="text-xs text-[#694E40] mt-2">Dibuat khusus oleh vendor rekanan terbaik kami untuk melengkapi momen tiup lilin si kecil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_CAKES.map(cake => (
              <div key={cake.id} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCCF] shadow-sm flex flex-col justify-between">
                <div className="aspect-[4/3] bg-[#F7F1E8] overflow-hidden">
                  <img src={cake.imageUrl} alt={cake.name} className="w-full h-full balanced-photo" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#795B4B]">{cake.name}</h3>
                    <p className="text-[11px] text-[#694E40] mt-1 leading-relaxed">{cake.description}</p>
                    <p className="text-[10px] text-[#C4A58D] font-semibold mt-2">{cake.highlight}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F0E5D8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#694E40] block">Estimasi Mulai</span>
                      <span className="font-bold text-sm text-[#795B4B]">{formatRupiah(cake.startingPrice)}*</span>
                    </div>
                    <button
                      onClick={() => onNavigate('planner')}
                      className="text-xs font-bold text-[#C89B99] hover:underline"
                    >
                      Pesan via Planner →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Tulis Ulasan & Testimoni */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowReviewModal(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl text-xs max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="text-center pb-2 border-b border-[#F0E5D8]">
              <div className="w-12 h-12 rounded-full bg-[#FAF3EC] text-[#795B4B] mx-auto flex items-center justify-center mb-1">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#795B4B]">Bagikan Pengalaman Pesta Anda</h3>
              <p className="text-[#694E40] mt-0.5">Ulasan Bunda & Ayah sangat berarti bagi kami dan keluarga lainnya.</p>
            </div>

            {reviewError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{reviewError}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-3.5">
              {/* Star Rating Selector */}
              <div>
                <label className="block font-semibold mb-1 text-center text-[#795B4B]">Beri Rating Bintang *</label>
                <div className="flex justify-center space-x-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center font-bold text-[#795B4B] text-[11px] mt-0.5">
                  {newRating === 5 ? 'Sangat Memuaskan (5.0)' :
                   newRating === 4 ? 'Memuaskan (4.0)' :
                   newRating === 3 ? 'Cukup Baik (3.0)' :
                   newRating === 2 ? 'Perlu Ditingkatkan (2.0)' : 'Kurang (1.0)'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Nama Bunda / Ayah *</label>
                  <input
                    type="text"
                    value={newParentName}
                    onChange={e => setNewParentName(e.target.value)}
                    placeholder="Contoh: Bunda Sarah Wijaya"
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Nama Si Kecil & Usia *</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newChildName}
                      onChange={e => setNewChildName(e.target.value)}
                      placeholder="Nama si kecil"
                      className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs outline-hidden"
                    />
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={newChildAge}
                      onChange={e => setNewChildAge(parseInt(e.target.value) || 1)}
                      className="w-16 p-2.5 rounded-xl border border-[#DECFC0] text-xs text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Tema Pesta</label>
                  <select
                    value={newEventTheme}
                    onChange={e => setNewEventTheme(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
                  >
                    <option value="Sweet Pink">Sweet Pink</option>
                    <option value="Sweet Cream">Sweet Cream</option>
                    <option value="Little Blue">Little Blue</option>
                    <option value="Sage Garden">Sage Garden</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Paket Pesta</label>
                  <select
                    value={newPackageName}
                    onChange={e => setNewPackageName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
                  >
                    <option value="Little Moments">Little Moments</option>
                    <option value="Happy Days">Happy Days</option>
                    <option value="Dream Party">Dream Party</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">PIC Pendamping</label>
                  <select
                    value={newAssignedPIC}
                    onChange={e => setNewAssignedPIC(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
                  >
                    {OFFICIAL_TEAM.map(tm => (
                      <option key={tm.id} value={tm.name}>{tm.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Cerita & Ulasan Pengalaman Pesta *</label>
                <textarea
                  rows={3}
                  value={newReviewText}
                  onChange={e => setNewReviewText(e.target.value)}
                  placeholder="Ceritakan pengalaman Bunda/Ayah mengenai ketepatan waktu, kualitas balon backdrop, keramahan PIC & MC..."
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs outline-hidden"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-[#DECFC0] text-[#795B4B] hover:bg-[#FAF3EC] font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-[#795B4B] hover:bg-black text-white font-bold transition shadow-sm"
                >
                  Kirim Ulasan Saya
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Ajakan Perayaan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#795B4B] text-white p-8 sm:p-14 rounded-3xl shadow-xl relative overflow-hidden text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center border border-white/20">
            <Sparkles className="w-8 h-8 text-[#E8C9C7]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight text-white">
            Siap Merencanakan Pesta Ulang Tahun Impian Si Kecil?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
            Hanya butuh 3 menit untuk memilih paket, tema pastel, dan add-on. Dapatkan penugasan PIC resmi yang langsung menghubungi Bunda/Ayah.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('planner')}
              className="px-10 py-4 rounded-full bg-[#E8C9C7] hover:bg-white text-[#795B4B] font-bold text-xs tracking-wider shadow-lg transition"
            >
              MULAI RENCANAKAN PESTA SEKARANG
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// =========================================================================
// 2. HALAMAN PAKET (PACKAGES PAGE)
// =========================================================================
interface PackagesPageProps {
  onSelectPackage: (pkgId: string) => void;
}

function PackagesPage({ onSelectPackage }: PackagesPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C4A58D]">Transparan & Ramah Keluarga</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#795B4B] mt-1">Our Party Packages</h1>
        <p className="text-xs sm:text-sm text-[#694E40] mt-3 leading-relaxed">
          Semua paket menyajikan standar estetika backdrop yang sama cantiknya. Perbedaan utama terletak pada kapasitas kuota anak yang diikutsertakan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INITIAL_PACKAGES.map(pkg => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl p-8 border-2 border-[#D8BCA5]/70 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative"
          >
            {pkg.badge && (
              <span className="absolute -top-3 left-8 bg-[#E8C9C7] text-[#795B4B] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C89B99]/40 shadow-xs">
                {pkg.badge}
              </span>
            )}

            <div>
              <div className="border-b border-[#F0E5D8] pb-5">
                <h2 className="font-serif text-2xl font-bold text-[#795B4B]">{pkg.name}</h2>
                <div className="text-2xl sm:text-3xl font-bold text-[#795B4B] mt-2 mb-1 tracking-tight">{formatRupiah(pkg.price)}</div>
                <div className="flex items-center space-x-2 text-xs text-[#694E40] mt-2">
                  <span className="font-bold">Kapasitas: s.d {pkg.capacity} Anak</span>
                  <span>•</span>
                  <span>Durasi: {pkg.durationHours} Jam</span>
                </div>
                <div className="mt-2 text-[11px] text-[#C4A58D] font-bold bg-[#FAF3EC] px-3 py-1.5 rounded-xl inline-block">
                  Tambahan Anak: Rp30.000 / anak
                </div>
              </div>

              {/* Rincian Termasuk */}
              <div className="mt-6 space-y-3 text-xs">
                <p className="font-bold text-[11px] uppercase tracking-wider text-[#795B4B]">Sudah Termasuk Dalam Paket:</p>
                {pkg.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C89B99] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed text-[#694E40]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#F0E5D8]">
              <button
                onClick={() => onSelectPackage(pkg.id)}
                className="w-full py-3.5 rounded-full bg-[#D8BCA5] hover:bg-[#C4A58D] text-[#795B4B] font-bold text-xs tracking-wider transition shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
              >
                <span>PILIH {pkg.name.toUpperCase()}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ketentuan Tambahan */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DECFC0] shadow-2xs space-y-3 text-xs text-[#694E40]">
        <h3 className="font-bold text-sm text-[#795B4B] flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-[#C89B99]" />
          <span>Informasi & Ketentuan Tambahan</span>
        </h3>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Durasi acara standar adalah <b>2 jam</b>. Tambahan waktu dapat dipesan dengan biaya <b>Rp75.000 per 30 menit</b>.</li>
          <li>Biaya transportasi: <b>0–5 km Bebas Biaya (Rp0)</b>, <b>&gt;5–10 km Rp15.000</b>, <b>&gt;10–15 km Rp25.000</b> berdasarkan jarak tempuh ke lokasi acara. Jarak &gt;15 km menunggu konfirmasi tim.</li>
          <li>Semua perlengkapan backdrop, silinder meja kue, dan taplak meja berstatus disewakan dan akan dibongkar rapi oleh tim kami usai acara.</li>
        </ul>
      </div>
    </div>
  );
}

// =========================================================================
// 3. HALAMAN TEMA DEKORASI (THEMES PAGE)
// =========================================================================
interface ThemesPageProps {
  onSelectTheme: (themeId: string) => void;
}

function ThemesPage({ onSelectTheme }: ThemesPageProps) {
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<DecorationTheme | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#4A6FA5]">Estetika Visual Terkoordinasi</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#795B4B] mt-1">Decoration Themes</h1>
        <p className="text-xs sm:text-sm text-[#694E40] mt-3 leading-relaxed">
          Empat tema warna pastel yang dirancang harmonis untuk backdrop lengkung manis, balon organik berkualitas tinggi, dan silinder meja kue si kecil.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INITIAL_DECORATION_THEMES.map(theme => (
          <div
            key={theme.id}
            className="bg-white rounded-3xl overflow-hidden border-2 border-[#B0CBE9]/60 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div
                className="aspect-[4/3] bg-[#EAF0F8] overflow-hidden relative cursor-pointer group"
                onClick={() => setSelectedPhotoModal(theme)}
              >
                <img src={theme.imageUrl} alt={theme.name} className="w-full h-full balanced-photo group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                  Klik untuk Memperbesar
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-[#4A6FA5]">
                  {theme.photoRefLabel}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#795B4B]">{theme.name}</h3>
                <p className="text-[11px] text-[#694E40] leading-relaxed">{theme.description}</p>

                <div className="pt-2 border-t border-[#F0E5D8] space-y-2 text-[11px]">
                  <div>
                    <span className="font-bold text-[#795B4B] block">Backdrop:</span>
                    <span className="text-[#694E40]">{theme.backdropType}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#795B4B] block">Balon:</span>
                    <span className="text-[#694E40]">{theme.balloonStyle}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-[#795B4B] block mb-1.5">Harmoni Palet Warna:</span>
                  <div className="flex space-x-2">
                    {theme.palette.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full border border-black/15 shadow-2xs" style={{ backgroundColor: color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectTheme(theme.id)}
                className="w-full py-3 rounded-full bg-[#B0CBE9] hover:bg-[#4A6FA5] text-[#795B4B] hover:text-white font-bold text-xs transition shadow-2xs"
              >
                PILIH TEMA INI
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview Foto */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelectedPhotoModal(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-[4/3] bg-black">
              <img src={selectedPhotoModal.imageUrl} alt={selectedPhotoModal.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex justify-between items-center bg-[#FAF4EC]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#795B4B]">{selectedPhotoModal.name}</h3>
                <p className="text-xs text-[#694E40]">{selectedPhotoModal.photoRefLabel}</p>
              </div>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="px-4 py-2 rounded-full bg-[#795B4B] text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 4. HALAMAN ADD-ONS (ADD-ON CATALOG)
// =========================================================================
interface AddonsPageProps {
  onNavigate: (page: string) => void;
}

function AddonsPage({ onNavigate }: AddonsPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-12">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C89B99]">Layanan Tambahan Lengkap</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#795B4B] mt-1">Add-on Catalog</h1>
        <p className="text-xs sm:text-sm text-[#694E40] mt-2">
          Lengkapi pesta si kecil dengan kue ulang tahun rekanan, paket goodie bag anak, lilin estetik, dan dokumentasi foto profesional.
        </p>
      </div>

      <div className="space-y-10">
        {/* 3 Produk Kue Asli Rekanan */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#C89B99]/40 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Birthday Cakes (Vendor Rekanan)</h2>
              <p className="text-xs text-[#694E40] mt-0.5">
                Dibuat segar sesuai pesanan. Harga awal bersifat estimasi dan disesuaikan dengan kerumitan desain karakter/tambahan ukuran.
              </p>
            </div>
            <span className="text-[10px] bg-[#FAF3EC] text-[#795B4B] font-bold px-3 py-1 rounded-full border border-[#DECFC0]">
              Harga Mulai (Estimasi)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_CAKES.map(cake => (
              <div key={cake.id} className="rounded-2xl border border-[#EFE4DA] overflow-hidden bg-[#FAF4ED] flex flex-col justify-between shadow-2xs">
                <div className="aspect-[4/3] bg-white overflow-hidden relative">
                  <img src={cake.imageUrl} alt={cake.name} className="w-full h-full balanced-photo" />
                  <span className="absolute top-2 left-2 bg-white/90 text-[9px] font-bold px-2 py-0.5 rounded-full text-[#795B4B]">
                    {cake.photoRefLabel}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-[#795B4B]">{cake.name}</h3>
                    <p className="text-[11px] text-[#694E40] mt-1 leading-relaxed">{cake.description}</p>
                    <p className="text-[10px] text-[#C4A58D] font-medium mt-1">{cake.highlight}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#EFE4DA] flex justify-between items-center">
                    <span className="text-xs font-bold text-[#795B4B]">Mulai {formatRupiah(cake.startingPrice)}*</span>
                    <span className="text-[10px] text-amber-800 italic">Perlu finalisasi tim</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goodie Bags & Lilin Angka & Dokumentasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {/* Goodie Bag Options */}
          <div className="bg-white p-7 rounded-3xl border border-[#C89B99]/30 shadow-xs space-y-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#795B4B]">Goodie Bags Anak</h3>
              <p className="text-[11px] text-[#694E40] mt-0.5">Dikemas cantik dengan pouch estetik dan pita pastel senada.</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#FAF3EC] rounded-2xl flex justify-between items-center border border-[#EFE2D4]">
                <div>
                  <b className="text-[#795B4B]">Happy Snacks</b>
                  <p className="text-[10px] text-[#694E40]">5 jenis snack ringan favorit anak (biskuit, susu kotak, wafer, jelly, permen lunak).</p>
                </div>
                <span className="font-bold text-[#795B4B] shrink-0 ml-2">Rp10.000 / anak</span>
              </div>

              <div className="p-3.5 bg-[#FAF3EC] rounded-2xl flex justify-between items-center border border-[#EFE2D4]">
                <div>
                  <b className="text-[#795B4B]">Little Treats</b>
                  <p className="text-[10px] text-[#694E40]">Snack pilihan + mini stationary suvenir lucu (crayon/buku gambar mini).</p>
                </div>
                <span className="font-bold text-[#795B4B] shrink-0 ml-2">Rp15.000 / anak</span>
              </div>

              <div className="p-3.5 bg-[#FAF3EC] rounded-2xl flex justify-between items-center border border-[#EFE2D4]">
                <div>
                  <b className="text-[#795B4B]">Party Treats</b>
                  <p className="text-[10px] text-[#694E40]">Snack premium + mainan edukatif mini puzzle / playdough ramah anak.</p>
                </div>
                <span className="font-bold text-[#795B4B] shrink-0 ml-2">Rp20.000 / anak</span>
              </div>
            </div>
          </div>

          {/* Fotografi & Lilin */}
          <div className="bg-white p-7 rounded-3xl border border-[#C89B99]/30 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#795B4B]">Party Memories Photography</h3>
                <p className="text-[#694E40] text-[11px] leading-relaxed mt-1">
                  1 Fotografer profesional berdurasi hingga 2 jam penuh, menangkap setiap senyum hangat si kecil bersama keluarga. Seluruh file foto digital (minimal 50 foto) telah diedit rapi dan diserahkan melalui Google Drive.
                </p>
                <div className="mt-3 text-2xl font-bold text-[#795B4B]">
                  Rp650.000 <span className="text-xs font-normal text-[#694E40]">/ event</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0E5D8]">
                <h4 className="font-bold text-[#795B4B]">Lilin Angka Estetik</h4>
                <p className="text-[#694E40] text-[11px] mt-0.5">Lilin angka emas/pastel berulir elegan.</p>
                <div className="flex space-x-4 mt-1.5 text-[11px] font-semibold text-[#795B4B]">
                  <span>• 1 Buah: Rp10.000</span>
                  <span>• Sepasang (2 Angka): Rp20.000</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('planner')}
                className="w-full py-3 rounded-full bg-[#E8C9C7] hover:bg-[#C89B99] text-[#795B4B] hover:text-white font-bold text-xs tracking-wider transition shadow-sm"
              >
                KUSTOMISASI SEMUANYA DI PLANNER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 5. PARTY PLANNER WIZARD (10 LANGKAH DENGAN PENUGASAN PIC OTOMATIS)
// =========================================================================
interface PlannerWizardProps {
  existingBookings: Booking[];
  preselectedPkg?: string;
  preselectedTheme?: string;
  onBookingCreated: (newBooking: Booking) => void;
}

function PlannerWizard({ existingBookings, preselectedPkg, preselectedTheme, onBookingCreated }: PlannerWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string>('');

  // Step 1: Info Pemesan
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [contactPref, setContactPref] = useState<'whatsapp' | 'email'>('whatsapp');

  // Step 2: Data Si Kecil & Waktu Acara
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(3);
  const [childBirthdate, setChildBirthdate] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('14:00');
  const [guestCount, setGuestCount] = useState<number>(15);
  const [notes, setNotes] = useState('');

  // Step 3: Lokasi Acara & Transportasi
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [city, setCity] = useState('Jakarta Selatan');
  const [distanceKm, setDistanceKm] = useState<number>(4);

  // Step 4: Paket Utama
  const initialPkgIdx = INITIAL_PACKAGES.findIndex(p => p.id === preselectedPkg);
  const [selectedPkgIndex, setSelectedPkgIndex] = useState<number>(initialPkgIdx >= 0 ? initialPkgIdx : 0);

  // Step 5: Tema Dekorasi
  const [selectedThemeId, setSelectedThemeId] = useState<string>(preselectedTheme || 'sweet_pink');

  // Step 6: Ekstra Durasi
  const [extraDurationMin, setExtraDurationMin] = useState<number>(0);

  // Step 7: Add-ons
  const [cakeType, setCakeType] = useState<string>('none');
  const [cakeNotes, setCakeNotes] = useState<string>('');
  const [candleType, setCandleType] = useState<string>('none');
  const [goodieType, setGoodieType] = useState<string>('none');
  const [goodieQty, setGoodieQty] = useState<number>(15);
  const [photoService, setPhotoService] = useState<boolean>(false);

  // Step 9: Persetujuan
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);

  // Auto-sync goodie bag quantity with guest count if not modified
  useEffect(() => {
    if (goodieType !== 'none') {
      setGoodieQty(guestCount);
    }
  }, [guestCount, goodieType]);

  // Kalkulasi Otoritatif Transparan
  const pkg = INITIAL_PACKAGES[selectedPkgIndex];
  const extraChildren = Math.max(0, guestCount - pkg.capacity);
  const extraChildrenFee = extraChildren * 30000;
  const extraDurationFee = Math.max(0, Math.floor(extraDurationMin / 30)) * 75000;
  const transport = calculateTransport(distanceKm);

  const addonsList: BookingAddon[] = [];
  if (cakeType === 'classic') {
    addonsList.push({ name: 'Cake: Sweet Classic', subtotal: 100000, isStartingPrice: true, isConfirmed: false, category: 'cake', notes: cakeNotes || 'Bento minimalist buttercream' });
  } else if (cakeType === 'character') {
    addonsList.push({ name: 'Cake: Little Character', subtotal: 150000, isStartingPrice: true, isConfirmed: false, category: 'cake', notes: cakeNotes || 'Custom character request' });
  } else if (cakeType === 'double') {
    addonsList.push({ name: 'Cake: Double Delight (Multi-Tier)', subtotal: 350000, isStartingPrice: true, isConfirmed: false, category: 'cake', notes: cakeNotes || '2-3 tier theme cake' });
  }

  if (candleType === 'single') {
    addonsList.push({ name: 'Lilin Angka (1 Buah)', subtotal: 10000, isStartingPrice: false, isConfirmed: true, category: 'candle' });
  } else if (candleType === 'pair') {
    addonsList.push({ name: 'Lilin Angka (Sepasang)', subtotal: 20000, isStartingPrice: false, isConfirmed: true, category: 'candle' });
  }

  if (goodieType === 'happy') {
    addonsList.push({ name: `Goodie Bag: Happy Snacks (${goodieQty} pcs)`, subtotal: 10000 * goodieQty, isStartingPrice: false, isConfirmed: true, category: 'goodie' });
  } else if (goodieType === 'treats') {
    addonsList.push({ name: `Goodie Bag: Little Treats (${goodieQty} pcs)`, subtotal: 15000 * goodieQty, isStartingPrice: false, isConfirmed: true, category: 'goodie' });
  } else if (goodieType === 'party') {
    addonsList.push({ name: `Goodie Bag: Party Treats (${goodieQty} pcs)`, subtotal: 20000 * goodieQty, isStartingPrice: false, isConfirmed: true, category: 'goodie' });
  }

  if (photoService) {
    addonsList.push({ name: 'Party Memories Photography (2 Jam)', subtotal: 650000, isStartingPrice: false, isConfirmed: true, category: 'photo' });
  }

  const confirmedAddonsTotal = addonsList.filter(a => a.isConfirmed).reduce((s, a) => s + a.subtotal, 0);
  const startingAddonsTotal = addonsList.filter(a => a.isStartingPrice).reduce((s, a) => s + a.subtotal, 0);

  const confirmedTotal = pkg.price + extraChildrenFee + extraDurationFee + (transport.isConfirmed ? transport.fee : 0) + confirmedAddonsTotal;
  const estimatedTotal = confirmedTotal + startingAddonsTotal;
  const hasUnconfirmed = !transport.isConfirmed || addonsList.some(a => !a.isConfirmed);

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!name.trim()) return setError('Nama pemesan / orang tua wajib diisi.');
      if (!email.includes('@')) return setError('Email aktif valid wajib diisi.');
      if (whatsapp.replace(/\D/g, '').length < 9) return setError('Nomor WhatsApp valid wajib diisi minimal 9 digit.');
    }
    if (step === 2) {
      if (!childName.trim()) return setError('Nama si kecil wajib diisi.');
      if (!childBirthdate) return setError('Tanggal lahir si kecil wajib diisi.');
      if (!eventDate) return setError('Tanggal pelaksanaan acara wajib diisi.');
      if (guestCount < 1) return setError('Jumlah tamu anak minimal 1 orang.');
    }
    if (step === 3) {
      if (!venueAddress.trim()) return setError('Alamat lengkap acara wajib diisi.');
    }
    setStep(prev => Math.min(10, prev + 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (!agreeTerms) return setError('Anda wajib mencentang persetujuan Syarat & Ketentuan Pemesanan.');

    const refCode = `LF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedThemeObj = INITIAL_DECORATION_THEMES.find(t => t.id === selectedThemeId) || INITIAL_DECORATION_THEMES[0];

    // Penugasan PIC Resmi yang Berimbang (Dina, Kirana, atau Fifi)
    const assignedPIC = assignBalancedPIC(existingBookings);

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      referenceCode: refCode,
      customerName: name,
      customerEmail: email,
      customerWhatsapp: whatsapp,
      preferredContact: contactPref,
      childName,
      childAge,
      childBirthdate,
      eventDate,
      eventStartTime: eventTime,
      guestCount,
      specialRequests: notes,
      venueName,
      venueAddress,
      cityOrDistrict: city,
      distanceKm,
      transportFee: transport.fee,
      isTransportConfirmed: transport.isConfirmed,
      packageName: pkg.name,
      packagePrice: pkg.price,
      themeName: selectedThemeObj.name,
      additionalChildrenCount: extraChildren,
      additionalChildrenFee: extraChildrenFee,
      additionalDurationMinutes: extraDurationMin,
      additionalDurationFee: extraDurationFee,
      addons: addonsList,
      confirmedTotal,
      estimatedTotal,
      hasUnconfirmedItems: hasUnconfirmed,
      bookingStatus: 'Menunggu Konfirmasi',
      paymentStatus: 'Belum Dibayar',
      marketingConsent: promoConsent,
      assignedPIC, // Disimpan persisten
      createdAt: new Date().toISOString()
    };

    onBookingCreated(newBooking);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Step Indicator Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-bold text-[#795B4B] mb-2">
          <span className="uppercase tracking-wider">LANGKAH {step} DARI 10</span>
          <span className="text-[#C89B99]">PARTY PLANNER LITTLE FÊTE & CO.</span>
        </div>
        <div className="w-full bg-[#E5DACD] h-2.5 rounded-full overflow-hidden shadow-inner">
          <div
            className="bg-[#C89B99] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 10) * 100}%` }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DACD] shadow-sm text-xs space-y-6">
        {/* Step 1: Info Kontak */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 1</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Informasi Kontak Orang Tua</h2>
              <p className="text-[#694E40] mt-1">PIC resmi kami akan menggunakan data ini untuk konfirmasi pesanan.</p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Nama Lengkap Orang Tua / Pemesan *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Bunda Sarah Wijaya"
                  className="w-full p-3 rounded-xl border border-[#DECFC0] focus:ring-2 focus:ring-[#E8C9C7] outline-hidden text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Email Aktif *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full p-3 rounded-xl border border-[#DECFC0] focus:ring-2 focus:ring-[#E8C9C7] outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Nomor WhatsApp (Aktif) *</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="Contoh: 081299998888"
                    className="w-full p-3 rounded-xl border border-[#DECFC0] focus:ring-2 focus:ring-[#E8C9C7] outline-hidden text-xs"
                  />
                  <span className="text-[10px] text-[#694E40]">4 digit terakhir akan digunakan untuk verifikasi status acara.</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Preferensi Kontak Utama</label>
                <select
                  value={contactPref}
                  onChange={e => setContactPref(e.target.value as 'whatsapp' | 'email')}
                  className="w-full p-3 rounded-xl border border-[#DECFC0] bg-white outline-hidden text-xs"
                >
                  <option value="whatsapp">WhatsApp (Rekomendasi Cepat & Responsif)</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Data Si Kecil */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 2</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Data Si Kecil & Waktu Acara</h2>
              <p className="text-[#694E40] mt-1">Nama dan usia si kecil akan dipasang pada backdrop akrilik/foil.</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Nama Panggilan Si Kecil *</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={e => setChildName(e.target.value)}
                    placeholder="Contoh: Kimberly / Azriel"
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Ulang Tahun Ke (Usia Si Kecil) *</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={childAge}
                    onChange={e => setChildAge(parseInt(e.target.value) || 1)}
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Tanggal Lahir Si Kecil *</label>
                  <input
                    type="date"
                    value={childBirthdate}
                    onChange={e => setChildBirthdate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Tanggal Pelaksanaan Pesta *</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Jam Mulai Acara (WIB) *</label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={e => setEventTime(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Estimasi Tamu Anak *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={guestCount}
                    onChange={e => setGuestCount(parseInt(e.target.value) || 1)}
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Catatan Khusus / Request Lokasi</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Contoh: Acara di teras rumah berangin, si kecil menyukai tema lion..."
                  className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Lokasi & Transportasi */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 3</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Lokasi Acara & Perhitungan Transportasi</h2>
              <p className="text-[#694E40] mt-1">Estimasi jarak pengantaran dan tim dekorasi menuju lokasi acara Anda.</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Nama Tempat / Venue (Opsional)</label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={e => setVenueName(e.target.value)}
                    placeholder="Contoh: Rumah Pribadi / Restoran Daun"
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#795B4B]">Kota / Wilayah *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Contoh: Jakarta Selatan / Bintaro"
                    className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Alamat Lengkap Acara *</label>
                <textarea
                  rows={2}
                  value={venueAddress}
                  onChange={e => setVenueAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, patokan lokasi..."
                  className="w-full p-3 rounded-xl border border-[#DECFC0] text-xs"
                />
              </div>

              {/* Slider Jarak Real-Time */}
              <div className="bg-[#FAF3EC] p-5 rounded-2xl border border-[#EFE2D4] space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-bold text-[#795B4B]">
                    Perkiraan Jarak Tempuh Pengantaran: <span className="text-[#C89B99] text-base">{distanceKm} km</span>
                  </label>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white text-[#795B4B] border border-[#DECFC0]">
                    {transport.label}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="25"
                  value={distanceKm}
                  onChange={e => setDistanceKm(parseInt(e.target.value))}
                  className="w-full cursor-pointer accent-[#C89B99]"
                />

                <div className="flex justify-between text-[10px] text-[#694E40] border-t border-[#DECFC0] pt-2">
                  <span>0–5 km: Rp0 (Free)</span>
                  <span>&gt;5–10 km: Rp15.000</span>
                  <span>&gt;10–15 km: Rp25.000</span>
                  <span>&gt;15 km: Perlu Konfirmasi Tim</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Paket Utama */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 4</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Pilih Paket Pesta Utama</h2>
              <p className="text-[#694E40] mt-1">Pilih sesuai estimasi kuota anak yang diundang.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {INITIAL_PACKAGES.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPkgIndex(idx)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPkgIndex === idx
                      ? 'border-[#795B4B] bg-[#FAF3EC] ring-2 ring-[#795B4B]/20 shadow-md'
                      : 'border-[#DECFC0] hover:border-[#D8BCA5] bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-[#795B4B]">{p.name}</h3>
                    {selectedPkgIndex === idx && <CheckCircle2 className="w-4 h-4 text-[#795B4B]" />}
                  </div>
                  <div className="font-bold text-base text-[#795B4B]">{formatRupiah(p.price)}</div>
                  <p className="text-[11px] text-[#694E40] mt-1">s.d {p.capacity} Anak • {p.durationHours} Jam Acara</p>
                  <div className="mt-3 text-[10px] text-[#C4A58D] font-medium border-t border-[#F0E5D8] pt-2">
                    Termasuk backdrop, balon organik, MC ramah anak, dan games.
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Tema Dekorasi */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 5</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Pilih Tema Warna Pastel</h2>
              <p className="text-[#694E40] mt-1">Warna balon organik dan backdrop akan disesuaikan dengan tema ini.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {INITIAL_DECORATION_THEMES.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedThemeId(t.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center space-x-3 transition-all ${
                    selectedThemeId === t.id
                      ? 'border-[#795B4B] bg-[#FAF3EC] ring-2 ring-[#795B4B]/20 shadow-md'
                      : 'border-[#DECFC0] hover:border-[#D8BCA5] bg-white'
                  }`}
                >
                  <img src={t.imageUrl} alt={t.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#795B4B]">{t.name}</h4>
                      {selectedThemeId === t.id && <CheckCircle2 className="w-4 h-4 text-[#795B4B]" />}
                    </div>
                    <p className="text-[10px] text-[#694E40] line-clamp-1 mt-0.5">{t.subtitle}</p>
                    <div className="flex space-x-1 mt-2">
                      {t.palette.map((c, i) => (
                        <span key={i} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Anak Tambahan & Ekstra Durasi */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 6</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Penyesuaian Kuota & Tambahan Durasi</h2>
              <p className="text-[#694E40] mt-1">Perhitungan otomatis tanpa biaya tersembunyi.</p>
            </div>

            <div className="bg-[#FAF3EC] p-5 rounded-2xl border border-[#EFE2D4] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <b className="text-[#795B4B]">Kapasitas Paket: {pkg.capacity} Anak vs Tamu Anda: {guestCount} Anak</b>
                <p className="text-[11px] text-[#694E40] mt-0.5">
                  Setiap anak tambahan di atas kuota paket dikenakan Rp30.000 / anak.
                </p>
              </div>
              <div className="sm:text-right">
                <span className="font-bold text-[#795B4B] block">+{extraChildren} Anak Tambahan</span>
                <span className="font-bold text-[#C89B99] text-sm">{formatRupiah(extraChildrenFee)}</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#795B4B]">
                Tambahan Durasi Acara (Standar 2 Jam • Tambahan Rp75.000 / 30 Menit)
              </label>
              <select
                value={extraDurationMin}
                onChange={e => setExtraDurationMin(parseInt(e.target.value))}
                className="w-full p-3 rounded-xl border border-[#DECFC0] bg-white outline-hidden text-xs"
              >
                <option value={0}>Tidak ada tambahan durasi (Standar 2 Jam)</option>
                <option value={30}>+30 Menit (+Rp75.000, Total 2.5 Jam)</option>
                <option value={60}>+60 Menit (+Rp150.000, Total 3 Jam)</option>
                <option value={90}>+90 Menit (+Rp225.000, Total 3.5 Jam)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 7: Layanan Tambahan (Add-ons) */}
        {step === 7 && (
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 7</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Layanan Tambahan (Add-ons)</h2>
              <p className="text-[#694E40] mt-1">Pilih perlengkapan opsional untuk melengkapi pesta.</p>
            </div>

            {/* Kue Rekanan */}
            <div className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] space-y-2">
              <label className="block font-bold text-[#795B4B]">Kue Ulang Tahun Rekanan</label>
              <select
                value={cakeType}
                onChange={e => setCakeType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
              >
                <option value="none">Tanpa Kue Rekanan (Bawa Sendiri)</option>
                <option value="classic">Sweet Classic Bento Cake (Mulai Rp100.000* - Konfirmasi Desain)</option>
                <option value="character">Little Character Round Cake (Mulai Rp150.000* - Konfirmasi Desain)</option>
                <option value="double">Double Delight Multi-Tier Cake (Mulai Rp350.000* - Konfirmasi Desain)</option>
              </select>
              {cakeType !== 'none' && (
                <input
                  type="text"
                  value={cakeNotes}
                  onChange={e => setCakeNotes(e.target.value)}
                  placeholder="Catatan desain kue (karakter / warna / ucapan di atas kue)..."
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs mt-1.5"
                />
              )}
            </div>

            {/* Lilin Angka */}
            <div className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4]">
              <label className="block font-bold text-[#795B4B] mb-1">Lilin Angka Estetik</label>
              <select
                value={candleType}
                onChange={e => setCandleType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
              >
                <option value="none">Tanpa Lilin</option>
                <option value="single">1 Buah Lilin Angka (Rp10.000)</option>
                <option value="pair">Sepasang Lilin Angka / 2 Digit (Rp20.000)</option>
              </select>
            </div>

            {/* Goodie Bags */}
            <div className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4]">
              <label className="block font-bold text-[#795B4B] mb-1">Goodie Bag Anak</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <select
                    value={goodieType}
                    onChange={e => setGoodieType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
                  >
                    <option value="none">Tanpa Goodie Bag</option>
                    <option value="happy">Happy Snacks (Rp10.000 / anak)</option>
                    <option value="treats">Little Treats (Rp15.000 / anak)</option>
                    <option value="party">Party Treats (Rp20.000 / anak)</option>
                  </select>
                </div>
                {goodieType !== 'none' && (
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={goodieQty}
                      onChange={e => setGoodieQty(parseInt(e.target.value) || 1)}
                      placeholder="Jumlah pcs"
                      className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs text-center"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Fotografi */}
            <div className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] flex justify-between items-center">
              <div>
                <b className="text-[#795B4B]">Party Memories Photography (+Rp650.000)</b>
                <p className="text-[10px] text-[#694E40]">1 Fotografer profesional 2 jam + seluruh file foto digital diedit.</p>
              </div>
              <input
                type="checkbox"
                checked={photoService}
                onChange={e => setPhotoService(e.target.checked)}
                className="w-5 h-5 accent-[#C89B99] rounded-md cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Step 8: Rincian Biaya */}
        {step === 8 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 8</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Ringkasan Rincian Biaya Transparan</h2>
              <p className="text-[#694E40] mt-1">Periksa kembali setiap rincian sebelum mengajukan konfirmasi.</p>
            </div>

            <div className="bg-[#FAF3EC] p-6 rounded-2xl border border-[#EFE2D4] space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-[#795B4B] pb-2 border-b border-[#DECFC0]">
                <span>Paket {pkg.name} ({pkg.capacity} Anak):</span>
                <span>{formatRupiah(pkg.price)}</span>
              </div>

              {extraChildren > 0 && (
                <div className="flex justify-between text-[#694E40]">
                  <span>+{extraChildren} Anak Tambahan (Rp30.000/anak):</span>
                  <span>{formatRupiah(extraChildrenFee)}</span>
                </div>
              )}

              {extraDurationMin > 0 && (
                <div className="flex justify-between text-[#694E40]">
                  <span>+{extraDurationMin} Menit Tambahan Durasi:</span>
                  <span>{formatRupiah(extraDurationFee)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#694E40]">
                <span>Biaya Transportasi ({distanceKm} km):</span>
                <span>{transport.isConfirmed ? formatRupiah(transport.fee) : 'Menunggu Konfirmasi Tim'}</span>
              </div>

              {addonsList.map((a, i) => (
                <div key={i} className="flex justify-between text-[#694E40]">
                  <span>{a.name}:</span>
                  <span>{a.isStartingPrice ? `${formatRupiah(a.subtotal)}* (Estimasi Mulai)` : formatRupiah(a.subtotal)}</span>
                </div>
              ))}

              <div className="pt-3 border-t-2 border-[#DECFC0] flex justify-between items-center font-bold text-sm text-[#795B4B]">
                <span>Total Biaya Terkonfirmasi:</span>
                <span className="text-base text-[#795B4B]">{formatRupiah(confirmedTotal)}</span>
              </div>

              {hasUnconfirmed && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed mt-2">
                  <p className="font-bold">⚠️ Catatan Konfirmasi Tim:</p>
                  <p>
                    Beberapa rincian (seperti finalisasi desain kue rekanan atau jarak transportasi di atas 15 km) bertanda estimasi dan akan difinalkan bersama PIC resmi Anda sebelum tagihan diterbitkan.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 9: Syarat & Persetujuan */}
        {step === 9 && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89B99]">Langkah 9</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Syarat & Ketentuan Layanan</h2>
              <p className="text-[#694E40] mt-1">Harap membaca ketentuan penyelenggaraan pesta di bawah ini.</p>
            </div>

            <div className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] text-[11px] leading-relaxed max-h-44 overflow-y-auto space-y-2 text-[#694E40]">
              <p><b>1. Durasi Acara & Kedatangan:</b> Tim dekorasi Little Fête & Co. akan hadir 1.5 – 2 jam sebelum jam acara untuk instalasi backdrop dan balon organik.</p>
              <p><b>2. Properti Sewa:</b> Seluruh properti backdrop, standing meja silinder, taplak meja, dan properti games berstatus sewa dan akan dirapikan kembali oleh tim usai acara berakhir.</p>
              <p><b>3. Pembatalan & Reschedule:</b> Perubahan jadwal (reschedule) dapat dilakukan bebas biaya maksimal H-7 sebelum hari acara sesuai ketersediaan jadwal tim.</p>
              <p><b>4. Kebersihan & Keamanan:</b> Kami menggunakan balon latex tebal berkualitas ramah anak dan perekat dinding non-destruktif untuk menjaga dinding lokasi acara tetap aman.</p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#C89B99] rounded-md shrink-0 cursor-pointer"
                />
                <span className="font-semibold text-[#795B4B]">
                  Saya menyetujui seluruh Syarat & Ketentuan Pemesanan Little Fête & Co. *
                </span>
              </label>

              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={promoConsent}
                  onChange={e => setPromoConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#C89B99] rounded-md shrink-0 cursor-pointer"
                />
                <span className="text-[#694E40]">
                  (Opsional) Saya bersedia menerima informasi dan penawaran promo istimewa dari Little Fête & Co.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 10: Konfirmasi & Kirim */}
        {step === 10 && (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white mx-auto border-2 border-[#C89B99]/40 shadow-sm p-0.5">
              <img
                src="/assets/aistudio/logo_7b9a2f08.jpeg"
                alt="Logo Little Fête & Co."
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Siap Mengajukan Pemesanan</h2>
              <p className="text-[#694E40] max-w-md mx-auto mt-1 leading-relaxed">
                Setelah tombol ditekan, sistem kami akan langsung membuat Kode Booking unik dan menetapkan <b>1 Personal in Charge (PIC) resmi</b> (Dina, Kirana, atau Fifi) yang akan mendampingi pesta Anda.
              </p>
            </div>

            <div className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] max-w-sm mx-auto text-left space-y-1">
              <p><b>Pemesan:</b> {name}</p>
              <p><b>Si Kecil:</b> {childName} ({childAge} thn)</p>
              <p><b>Tanggal:</b> {eventDate} pukul {eventTime} WIB</p>
              <p><b>Paket:</b> {pkg.name} • Tema {selectedThemeId}</p>
              <p><b>Total Terkonfirmasi:</b> {formatRupiah(confirmedTotal)}</p>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="px-10 py-3.5 rounded-full bg-[#E8C9C7] hover:bg-[#C89B99] text-[#795B4B] hover:text-white font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition border border-[#C89B99]/40"
              >
                KIRIM PENGAJUAN BOOKING SEKARANG
              </button>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="pt-4 border-t border-[#F0E5D8] flex justify-between items-center text-xs font-semibold">
          {step > 1 ? (
            <button
              onClick={() => setStep(prev => prev - 1)}
              className="px-5 py-2.5 rounded-full border border-[#DECFC0] text-[#795B4B] hover:bg-[#FAF3EC] transition flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          ) : <div />}

          {step < 10 && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full bg-[#795B4B] text-white hover:bg-black transition flex items-center space-x-1"
            >
              <span>Lanjutkan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 6. STATUS LOOKUP PAGE (DENGAN TAMPILAN PIC RESMI & SIMULASI PEMBAYARAN)
// =========================================================================
interface StatusLookupPageProps {
  bookings: Booking[];
  initialRef?: string;
  onUpdatePaymentStatus: (ref: string, newStatus: PaymentStatus) => void;
}

function StatusLookupPage({ bookings, initialRef, onUpdatePaymentStatus }: StatusLookupPageProps) {
  const [ref, setRef] = useState<string>(initialRef || '');
  const [phoneLast4, setPhoneLast4] = useState<string>('');
  const [matchedBooking, setMatchedBooking] = useState<Booking | null>(() => {
    return bookings.find(b => b.referenceCode.toUpperCase() === (initialRef || '').toUpperCase()) || null;
  });
  const [error, setError] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    const found = bookings.find(b => b.referenceCode.trim().toUpperCase() === ref.trim().toUpperCase());
    if (!found) {
      setError('Kode pesanan tidak ditemukan. Periksa kembali format LF-2026-XXXX.');
      setMatchedBooking(null);
      return;
    }

    const cleanWhatsapp = found.customerWhatsapp.replace(/\D/g, '');
    if (phoneLast4.trim() && cleanWhatsapp.slice(-4) !== phoneLast4.trim()) {
      setError('4 digit terakhir nomor WhatsApp tidak cocok demi privasi data acara.');
      setMatchedBooking(null);
      return;
    }

    setMatchedBooking(found);
  };

  // PIC Info Helper
  const picInfo = OFFICIAL_TEAM.find(t => t.name === matchedBooking?.assignedPIC) || OFFICIAL_TEAM[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-8">
      <div className="text-center max-w-md mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#4A6FA5]">Pelacakan Transparan</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#795B4B] mt-1">Status Pemesanan Acara</h1>
        <p className="text-xs text-[#694E40] mt-1">
          Masukkan Kode Referensi dan 4 digit terakhir nomor WhatsApp pemesan untuk verifikasi keamanan.
        </p>
      </div>

      {/* Form Pencarian */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#B0CBE9]/60 shadow-sm max-w-md mx-auto text-xs space-y-3">
        <form onSubmit={handleLookup} className="space-y-3">
          <div>
            <label className="block font-semibold mb-1 text-[#795B4B]">Kode Referensi Booking</label>
            <input
              type="text"
              value={ref}
              onChange={e => setRef(e.target.value)}
              placeholder="Contoh: LF-2026-1024"
              className="w-full p-2.5 rounded-xl border border-[#DECFC0] uppercase font-mono tracking-wider text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-[#795B4B]">4 Digit Terakhir No. WhatsApp</label>
            <input
              type="password"
              maxLength={4}
              value={phoneLast4}
              onChange={e => setPhoneLast4(e.target.value)}
              placeholder="****"
              className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-center font-mono tracking-widest text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#795B4B] hover:bg-black text-white font-semibold transition flex items-center justify-center space-x-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Cari & Verifikasi Pesanan</span>
          </button>
        </form>

        {error && <p className="text-center text-red-600 font-semibold pt-1">{error}</p>}

        <p className="text-[10px] text-[#694E40] text-center italic">
          Contoh kode demo: <b>LF-2026-1024</b> (4 digit WA: <b>8888</b>) atau <b>LF-2026-1088</b> (4 digit WA: <b>6655</b>)
        </p>
      </div>

      {/* Tampilan Detail Pesanan Terverifikasi */}
      {matchedBooking && (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#B0CBE9]/80 shadow-md space-y-8 text-xs">
          {/* BANNER PIC BOOKING RESMI */}
          <div className="p-5 bg-[#F2F6FA] border-2 border-[#B0CBE9] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#4A6FA5] uppercase tracking-wider block">
                ✓ Booking Berhasil Terverifikasi
              </span>
              <h3 className="font-serif text-lg font-bold text-[#795B4B]">
                PIC Booking Anda: <span className="text-[#4A6FA5] underline decoration-[#B0CBE9]">{matchedBooking.assignedPIC}</span>
              </h3>
              <p className="text-[11px] text-[#694E40] leading-relaxed max-w-xl">
                PIC Anda akan menjadi kontak utama untuk koordinasi rundown, konfirmasi detail kue, dan penyambutan pesta ulang tahun si kecil.
              </p>
            </div>

            <a
              href={`https://wa.me/62${picInfo.phone?.replace(/\D/g, '') || '81211002201'}?text=Halo%20${encodeURIComponent(matchedBooking.assignedPIC)},%20saya%20${encodeURIComponent(matchedBooking.customerName)}%20terkait%20pesanan%20${encodeURIComponent(matchedBooking.referenceCode)}%20pesta%20si%20kecil%20${encodeURIComponent(matchedBooking.childName)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#4A6FA5] hover:bg-[#3B5982] text-white font-bold text-xs shrink-0 flex items-center space-x-1.5 transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi PIC via WhatsApp</span>
            </a>
          </div>

          {/* Header Ringkasan Pesanan */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#F0E5D8] pb-6 gap-3">
            <div>
              <span className="font-mono font-bold text-[#4A6FA5] text-sm tracking-wider">{matchedBooking.referenceCode}</span>
              <h2 className="font-serif text-2xl font-bold text-[#795B4B] mt-0.5">
                Pesta Si Kecil {matchedBooking.childName} (Ke-{matchedBooking.childAge} Tahun)
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-[#694E40] mt-1">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C89B99]" />
                  <span>{matchedBooking.eventDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#C89B99]" />
                  <span>{matchedBooking.eventStartTime} WIB</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Package className="w-3.5 h-3.5 text-[#C89B99]" />
                  <span>{matchedBooking.packageName}</span>
                </span>
              </div>
            </div>

            <div className="text-right flex flex-col items-end space-y-1.5">
              <span className="px-3 py-1 bg-[#F4F7FB] border border-[#B0CBE9] rounded-full font-bold text-xs text-[#795B4B]">
                Status Booking: {matchedBooking.bookingStatus}
              </span>
              <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                matchedBooking.paymentStatus === 'Lunas' ? 'bg-emerald-100 text-emerald-800' :
                matchedBooking.paymentStatus === 'Menunggu Verifikasi' ? 'bg-amber-100 text-amber-800' :
                'bg-red-50 text-red-800 border border-red-200'
              }`}>
                Pembayaran: {matchedBooking.paymentStatus}
              </span>
            </div>
          </div>

          {/* Detail Pesta & Lokasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF3EC] p-5 rounded-2xl border border-[#EFE2D4] space-y-2">
              <h4 className="font-bold text-[#795B4B] uppercase tracking-wider text-[11px]">Rincian Lokasi & Tamu</h4>
              <p><b>Venue:</b> {matchedBooking.venueName || 'Kediaman Pribadi'}</p>
              <p><b>Alamat:</b> {matchedBooking.venueAddress}, {matchedBooking.cityOrDistrict}</p>
              <p><b>Jarak Tempuh Pengantaran:</b> {matchedBooking.distanceKm} km</p>
              <p><b>Estimasi Tamu Anak:</b> {matchedBooking.guestCount} Anak</p>
              {matchedBooking.specialRequests && (
                <p><b>Catatan Khusus:</b> <i>"{matchedBooking.specialRequests}"</i></p>
              )}
            </div>

            <div className="bg-[#FAF3EC] p-5 rounded-2xl border border-[#EFE2D4] space-y-2">
              <h4 className="font-bold text-[#795B4B] uppercase tracking-wider text-[11px]">Tema & Dekorasi</h4>
              <p><b>Tema Pilihan:</b> {matchedBooking.themeName}</p>
              <p><b>Durasi Acara:</b> 2 Jam {matchedBooking.additionalDurationMinutes > 0 ? `+ ${matchedBooking.additionalDurationMinutes} Menit` : ''}</p>
              <p><b>MC & Rundown:</b> Sudah Termasuk</p>
              <p><b>PIC Terjadwal:</b> {matchedBooking.assignedPIC} ({picInfo.phone})</p>
            </div>
          </div>

          {/* Rincian Finansial Transparan */}
          <div className="bg-[#FAF3EC] p-6 rounded-2xl border border-[#EFE2D4] space-y-2.5">
            <h4 className="font-bold text-[#795B4B] uppercase tracking-wider text-[11px] mb-2">Rincian Finansial Lengkap</h4>
            <div className="flex justify-between">
              <span>Paket Utama ({matchedBooking.packageName}):</span>
              <span className="font-semibold">{formatRupiah(matchedBooking.packagePrice)}</span>
            </div>
            {matchedBooking.additionalChildrenFee > 0 && (
              <div className="flex justify-between text-[#694E40]">
                <span>+{matchedBooking.additionalChildrenCount} Anak Tambahan:</span>
                <span>{formatRupiah(matchedBooking.additionalChildrenFee)}</span>
              </div>
            )}
            {matchedBooking.additionalDurationFee > 0 && (
              <div className="flex justify-between text-[#694E40]">
                <span>+{matchedBooking.additionalDurationMinutes} Menit Ekstra:</span>
                <span>{formatRupiah(matchedBooking.additionalDurationFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#694E40]">
              <span>Ongkir Transportasi ({matchedBooking.distanceKm} km):</span>
              <span>{matchedBooking.isTransportConfirmed ? formatRupiah(matchedBooking.transportFee) : 'Menunggu Konfirmasi Tim'}</span>
            </div>
            {matchedBooking.addons.map((a, i) => (
              <div key={i} className="flex justify-between text-[#694E40]">
                <span>{a.name}:</span>
                <span>{a.isStartingPrice ? `${formatRupiah(a.subtotal)}* (Estimasi Mulai)` : formatRupiah(a.subtotal)}</span>
              </div>
            ))}

            <div className="pt-3 border-t-2 border-[#DECFC0] flex justify-between items-center text-sm font-bold text-[#795B4B]">
              <span>Total Biaya Terkonfirmasi:</span>
              <span className="text-base text-[#795B4B]">{formatRupiah(matchedBooking.confirmedTotal)}</span>
            </div>

            {matchedBooking.hasUnconfirmedItems && (
              <p className="text-[10px] text-amber-800 italic mt-1">
                ⚠️ Pesanan Anda memiliki item bertanda * yang sedang difinalisasi oleh tim sebelum faktur akhir diterbitkan.
              </p>
            )}
          </div>

          {/* Tombol Aksi Pembayaran */}
          {matchedBooking.paymentStatus === 'Belum Dibayar' && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-8 py-3 rounded-full bg-[#795B4B] hover:bg-black text-white font-bold transition shadow-md flex items-center justify-center space-x-2 mx-auto"
              >
                <DollarSign className="w-4 h-4 text-[#E8C9C7]" />
                <span>Simulasi Bayar Sekarang (Midtrans / QRIS Sandbox)</span>
              </button>
            </div>
          )}

          {matchedBooking.paymentStatus === 'Menunggu Verifikasi' && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center text-amber-900">
              <p className="font-bold">Pembayaran Anda Sedang Diverifikasi oleh Tim Keuangan Little Fête</p>
              <p className="text-[11px] mt-0.5">PIC {matchedBooking.assignedPIC} akan segera memperbarui status menjadi Lunas dalam 1x24 jam.</p>
            </div>
          )}

          {matchedBooking.paymentStatus === 'Lunas' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-900">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-bold">Pembayaran Telah Lunas</p>
                  <p className="text-[11px] text-emerald-800">Kwitansi resmi telah diterbitkan secara otomatis.</p>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-semibold hover:bg-emerald-50 transition"
              >
                Cetak / Simpan PDF
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal Simulasi Pembayaran Sandbox */}
      {showPaymentModal && matchedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowPaymentModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl text-xs" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF3EC] text-[#795B4B] mx-auto flex items-center justify-center font-bold text-lg mb-2">
                💳
              </div>
              <h3 className="font-serif text-xl font-bold text-[#795B4B]">Simulasi Pembayaran Pesta</h3>
              <p className="text-[#694E40]">Pesanan: {matchedBooking.referenceCode}</p>
            </div>

            <div className="bg-[#FAF3EC] p-4 rounded-2xl border border-[#EFE2D4] space-y-1.5">
              <div className="flex justify-between font-bold text-[#795B4B]">
                <span>Total Ditagihkan:</span>
                <span>{formatRupiah(matchedBooking.confirmedTotal)}</span>
              </div>
              <p className="text-[10px] text-[#694E40]">Metode: QRIS / Virtual Account BCA / Mandiri</p>
            </div>

            <div className="text-center space-y-2 py-2">
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-dashed border-[#795B4B] flex items-center justify-center">
                <div className="text-[10px] text-gray-500 font-mono">
                  [QRIS DEMO SIMULATOR]
                  <br />
                  Scan to Pay
                </div>
              </div>
              <p className="text-[10px] text-gray-500 italic">Ini adalah simulasi sandbox pengujian pembayaran.</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onUpdatePaymentStatus(matchedBooking.referenceCode, 'Menunggu Verifikasi');
                  setShowPaymentModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#795B4B] hover:bg-black text-white font-semibold transition"
              >
                Simulasikan: Bukti Transfer Terkirim (Verifikasi)
              </button>

              <button
                onClick={() => {
                  onUpdatePaymentStatus(matchedBooking.referenceCode, 'Lunas');
                  setShowPaymentModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition"
              >
                Simulasikan: Pembayaran Langsung Lunas (Instant Settlement)
              </button>

              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-2 rounded-xl text-[#694E40] hover:bg-gray-100"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 7. TEAM LOGIN (2FA MANDATORI TOTP)
// =========================================================================
interface TeamLoginPageProps {
  onSuccess: (user: UserSession) => void;
}

function TeamLoginPage({ onSuccess }: TeamLoginPageProps) {
  const [email, setEmail] = useState('dina@littlefeat.id');
  const [password, setPassword] = useState('password123');
  const [step2FA, setStep2FA] = useState(false);
  const [totp, setTotp] = useState('');
  const [matchedUser, setMatchedUser] = useState<TeamMember | null>(null);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = OFFICIAL_TEAM.find(t => t.email.toLowerCase() === email.toLowerCase());
    if (!user) return setError('Email staf tidak terdaftar. Gunakan akun salah satu dari 3 staf resmi.');
    if (password.length < 6) return setError('Password minimal 6 karakter.');
    setMatchedUser(user);
    setStep2FA(true);
  };

  const handleVerifyTOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (totp.trim() === '123456' || totp.trim().length === 6) {
      if (matchedUser) {
        onSuccess({
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: 'team'
        });
      }
    } else {
      setError('Kode TOTP 6-digit tidak valid. Gunakan kode bypass testing: 123456.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-[#DECFC0] shadow-sm space-y-5 text-xs">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-white border border-[#C89B99]/40 shadow-sm mx-auto p-0.5 mb-2">
            <img
              src="/assets/aistudio/logo_7b9a2f08.jpeg"
              alt="Logo Little Fête & Co."
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#795B4B]">Little Fête Team Portal</h2>
          <p className="text-[#694E40] mt-0.5">Khusus 3 Anggota Tim Operasional & Keuangan</p>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-center">{error}</div>}

        {!step2FA ? (
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block font-semibold mb-1 text-[#795B4B]">Email Staf Resmi</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#795B4B]">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#795B4B] text-white font-semibold hover:bg-black transition"
            >
              Lanjut ke Verifikasi 2FA Mandatori
            </button>
            <div className="p-3 bg-[#FAF3EC] rounded-xl text-[10px] text-[#694E40] space-y-1">
              <p className="font-bold text-[#795B4B]">Akun 3 Staf Resmi:</p>
              <p>• dina@littlefeat.id (Dina Alawiyah)</p>
              <p>• kirana@littlefeat.id (Kirana Larasati)</p>
              <p>• fifi@littlefeat.id (Fifi Feliana)</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyTOTP} className="space-y-4">
            <div className="p-3 bg-[#FAF3EC] rounded-xl border border-[#EFE2D4] text-[11px] text-[#694E40]">
              🔐 <b>2FA Mandatori Aktif</b> untuk <b>{matchedUser?.name}</b>. Masukkan 6-digit TOTP dari aplikasi autentikasi Anda (Gunakan kode demo <b>123456</b>).
            </div>
            <div>
              <label className="block font-semibold mb-1 text-center text-[#795B4B]">6-Digit Authenticator Code</label>
              <input
                type="text"
                maxLength={6}
                value={totp}
                onChange={e => setTotp(e.target.value)}
                placeholder="123456"
                className="w-full p-3 rounded-xl border border-[#DECFC0] text-center font-mono text-xl tracking-widest text-[#795B4B]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#795B4B] text-white font-semibold hover:bg-black transition"
            >
              Verifikasi & Masuk ke Portal
            </button>
            <button
              type="button"
              onClick={() => setStep2FA(false)}
              className="w-full text-center text-[11px] text-[#694E40] hover:underline"
            >
              ← Kembali ke input login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// 8. CUSTOMER LOGIN & CUSTOMER PORTAL
// =========================================================================
interface CustomerLoginPageProps {
  onSuccess: (user: UserSession) => void;
}

function CustomerLoginPage({ onSuccess }: CustomerLoginPageProps) {
  const [email, setEmail] = useState('sarah@example.com');
  const [name, setName] = useState('Bunda Sarah Wijaya');

  const handleCustLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSuccess({
      id: `cust_${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      role: 'customer'
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-[#DECFC0] shadow-sm space-y-4 text-xs">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-white border border-[#C89B99]/40 shadow-sm mx-auto p-0.5">
          <img
            src="/assets/aistudio/logo_7b9a2f08.jpeg"
            alt="Logo Little Fête & Co."
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#795B4B] text-center">Masuk Akun Pelanggan</h2>
        <p className="text-center text-[#694E40]">Kelola pesanan pesta si kecil dan pantau konfirmasi PIC.</p>
        <form onSubmit={handleCustLogin} className="space-y-3 pt-2">
          <div>
            <label className="block font-semibold mb-1 text-[#795B4B]">Nama Orang Tua</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Sarah Wijaya"
              className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-[#795B4B]">Email Pemesan</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#795B4B] text-white font-semibold hover:bg-black transition"
          >
            Masuk ke Dashboard Pelanggan
          </button>
        </form>
      </div>
    </div>
  );
}

interface CustomerPortalProps {
  user: UserSession | null;
  bookings: Booking[];
  onViewBooking: (ref: string) => void;
  onNavigatePlanner: () => void;
}

function CustomerPortal({ user, bookings, onViewBooking, onNavigatePlanner }: CustomerPortalProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-xs">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DECFC0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-white border-2 border-[#C89B99]/40 shadow-sm shrink-0 p-0.5">
            <img
              src="/assets/aistudio/logo_7b9a2f08.jpeg"
              alt="Foto Profil Pelanggan"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#C89B99] uppercase tracking-wider">Dashboard Keluarga</span>
            <h1 className="font-serif text-2xl font-bold text-[#795B4B]">Selamat Datang, {user?.name || 'Bunda/Ayah'}!</h1>
            <p className="text-[#694E40] mt-0.5">Email: {user?.email} • Riwayat Pesanan: {bookings.length} Acara</p>
          </div>
        </div>
        <button
          onClick={onNavigatePlanner}
          className="px-5 py-2.5 rounded-full bg-[#E8C9C7] hover:bg-[#C89B99] text-[#795B4B] hover:text-white font-bold transition shadow-xs"
        >
          + Rencanakan Pesta Baru
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl border border-[#DECFC0] text-center space-y-3">
          <p className="text-sm font-semibold text-[#795B4B]">Belum ada pesanan yang terdaftar dengan email ini.</p>
          <p className="text-[#694E40]">Mulai rancang pesta ulang tahun si kecil sekarang dengan paket terjangkau kami.</p>
          <button
            onClick={onNavigatePlanner}
            className="px-6 py-2.5 rounded-full bg-[#795B4B] text-white font-bold transition mt-2"
          >
            Mulai Rencanakan Pesta
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#795B4B]">Daftar Pesanan Pesta Anda</h2>
          <div className="grid grid-cols-1 gap-4">
            {bookings.map(bk => (
              <div
                key={bk.id}
                className="bg-white p-6 rounded-3xl border border-[#DECFC0] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#795B4B] transition"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-[#4A6FA5]">{bk.referenceCode}</span>
                    <span className="px-2 py-0.5 bg-[#FAF3EC] text-[#795B4B] rounded-md font-semibold text-[10px]">
                      {bk.packageName}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#795B4B] mt-1">
                    Pesta Si Kecil {bk.childName} (Ke-{bk.childAge} Thn)
                  </h3>
                  <p className="text-[#694E40] mt-0.5">
                    {bk.eventDate} pukul {bk.eventStartTime} WIB • Tema {bk.themeName}
                  </p>
                  <p className="text-[11px] text-[#795B4B] font-medium mt-1">
                    PIC Resmi: <b>{bk.assignedPIC}</b>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end space-y-2">
                  <div className="text-right">
                    <span className="text-[10px] text-[#694E40] block">Status:</span>
                    <span className="font-bold text-[#795B4B]">{bk.bookingStatus} • {bk.paymentStatus}</span>
                  </div>
                  <div className="font-bold text-sm text-[#795B4B]">{formatRupiah(bk.confirmedTotal)}</div>
                  <button
                    onClick={() => onViewBooking(bk.referenceCode)}
                    className="px-4 py-1.5 rounded-full bg-[#795B4B] text-white font-semibold hover:bg-black transition text-xs"
                  >
                    Buka Rincian & Status →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// 9. TEAM PORTAL (AKUNTANSI, PESANAN & PIC, TUGAS, DAN PENGATURAN)
// =========================================================================
interface TeamPortalProps {
  currentUser: UserSession;
  bookings: Booking[];
  journalEntries: JournalEntry[];
  tasks: TaskItem[];
  onUpdateBookings: (b: Booking[]) => void;
  onUpdateJournal: (j: JournalEntry[]) => void;
  onUpdateTasks: (t: TaskItem[]) => void;
  onShowToast: (msg: string) => void;
}

function TeamPortal({
  currentUser, bookings, journalEntries, tasks,
  onUpdateBookings, onUpdateJournal, onUpdateTasks, onShowToast
}: TeamPortalProps) {
  const [tab, setTab] = useState<'dashboard' | 'bookings' | 'finance' | 'tasks' | 'settings'>('dashboard');

  // Search & Filter Pesanan
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('ALL');

  // Form Transaksi Akuntansi
  const [txType, setTxType] = useState<JournalType>('BEBAN');
  const [txCategory, setTxCategory] = useState('Bahan Baku & Konsumabel');
  const [txDesc, setTxDesc] = useState('');
  const [txAmount, setTxAmount] = useState<number>(0);

  // Form Tugas Baru
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('Dina Alawiyah');
  const [taskBookingRef, setTaskBookingRef] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  // Perhitungan Keuangan Sesuai Prinsip Akuntansi yang Benar:
  // 1. Pendapatan (Revenue)
  const totalRevenue = journalEntries
    .filter(j => j.type === 'PENDAPATAN')
    .reduce((s, j) => s + j.amount, 0);

  // 2. Beban Operasional (Operating Expenses: bahan baku konsumabel, stiker, pita, transport, dll)
  const totalExpenses = journalEntries
    .filter(j => j.type === 'BEBAN')
    .reduce((s, j) => s + j.amount, 0);

  // 3. Aset Peralatan (ASET_PERALATAN = Capital Fixed Assets - TIDAK langsung dipotongkan dari laba operasional)
  const totalEquipmentAssets = journalEntries
    .filter(j => j.type === 'ASET_PERALATAN')
    .reduce((s, j) => s + j.amount, 0);

  // 4. Modal Disetor & Utang
  const totalEquity = journalEntries
    .filter(j => j.type === 'MODAL')
    .reduce((s, j) => s + j.amount, 0);

  // 5. Laba Bersih Operasional = Total Pendapatan - Total Beban Operasional
  const netOperatingProfit = totalRevenue - totalExpenses;

  // Handler Tambah Jurnal
  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDesc.trim() || txAmount <= 0) {
      alert('Harap isi keterangan transaksi dan nominal valid di atas 0.');
      return;
    }

    const newEntry: JournalEntry = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: txType,
      category: txCategory,
      description: txDesc,
      amount: txAmount,
      recordedBy: currentUser.name
    };

    onUpdateJournal([newEntry, ...journalEntries]);
    onShowToast(`Transaksi "${txDesc}" berhasil dicatat sebagai ${txType}.`);
    setTxDesc('');
    setTxAmount(0);
  };

  // Handler Tambah Tugas
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: TaskItem = {
      id: `tsk_${Date.now()}`,
      title: taskTitle,
      assignedTo: taskAssignee,
      bookingRef: taskBookingRef.trim() || undefined,
      status: 'Belum Dikerjakan',
      dueDate: taskDueDate || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onUpdateTasks([newTask, ...tasks]);
    onShowToast(`Tugas baru ditugaskan kepada ${taskAssignee}.`);
    setTaskTitle('');
    setTaskBookingRef('');
  };

  // Handler Ganti Status Tugas
  const handleToggleTaskStatus = (taskId: string) => {
    onUpdateTasks(tasks.map(t => {
      if (t.id === taskId) {
        const nextStatus: TaskStatus =
          t.status === 'Belum Dikerjakan' ? 'Sedang Dikerjakan' :
          t.status === 'Sedang Dikerjakan' ? 'Selesai' : 'Belum Dikerjakan';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Handler Update Pesanan (PIC / Status / Payment)
  const handleUpdateBookingPIC = (bookingId: string, newPIC: string) => {
    onUpdateBookings(bookings.map(b => b.id === bookingId ? { ...b, assignedPIC: newPIC } : b));
    onShowToast(`PIC pesanan berhasil diubah menjadi ${newPIC}.`);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    onUpdateBookings(bookings.map(b => b.id === bookingId ? { ...b, bookingStatus: newStatus } : b));
    onShowToast(`Status pesanan diperbarui menjadi ${newStatus}.`);
  };

  const handleUpdateBookingPayment = (bookingId: string, newPayment: PaymentStatus) => {
    onUpdateBookings(bookings.map(b => b.id === bookingId ? { ...b, paymentStatus: newPayment } : b));
    onShowToast(`Status pembayaran diperbarui menjadi ${newPayment}.`);
  };

  // Finalisasi Item Belum Terkonfirmasi (Harga Kue / Ongkir >15km)
  const handleConfirmItem = (bookingId: string, itemType: 'transport' | 'cake', finalPrice: number) => {
    onUpdateBookings(bookings.map(b => {
      if (b.id === bookingId) {
        if (itemType === 'transport') {
          const diff = finalPrice - b.transportFee;
          return {
            ...b,
            transportFee: finalPrice,
            isTransportConfirmed: true,
            confirmedTotal: b.confirmedTotal + diff,
            hasUnconfirmedItems: b.addons.some(a => !a.isConfirmed)
          };
        } else if (itemType === 'cake') {
          const updatedAddons = b.addons.map(a => {
            if (a.category === 'cake') {
              return { ...a, subtotal: finalPrice, isStartingPrice: false, isConfirmed: true };
            }
            return a;
          });
          const cakeOldSubtotal = b.addons.find(a => a.category === 'cake')?.subtotal || 0;
          const diff = finalPrice - cakeOldSubtotal;
          return {
            ...b,
            addons: updatedAddons,
            confirmedTotal: b.confirmedTotal + finalPrice, // tambahkan ke total terkonfirmasi
            hasUnconfirmedItems: !b.isTransportConfirmed || updatedAddons.some(a => !a.isConfirmed)
          };
        }
      }
      return b;
    }));
    onShowToast('Item berhasil difinalkan & total biaya diperbarui.');
  };

  // Export CSV Jurnal Keuangan
  const handleExportCSV = () => {
    const rows = [
      ['Tanggal', 'Klasifikasi Akun', 'Kategori', 'Keterangan', 'Jumlah (IDR)', 'Dicatat Oleh'],
      ...journalEntries.map(e => [
        e.date,
        e.type,
        `"${e.category}"`,
        `"${e.description.replace(/"/g, '""')}"`,
        e.amount,
        `"${e.recordedBy}"`
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jurnal-keuangan-little-fete-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('File CSV Jurnal Keuangan berhasil diunduh.');
  };

  // Filter Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch =
        b.referenceCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.childName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
        b.assignedPIC.toLowerCase().includes(bookingSearch.toLowerCase());
      const matchStatus = bookingStatusFilter === 'ALL' || b.bookingStatus === bookingStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, bookingSearch, bookingStatusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-xs">
      {/* Header Team Portal */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DECFC0] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-white border-2 border-[#C89B99]/40 shadow-sm shrink-0 p-0.5">
            <img
              src="/assets/aistudio/logo_7b9a2f08.jpeg"
              alt="Foto Profil Tim"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-[#C4A58D] uppercase tracking-widest">
                Workspace Operasional & Keuangan
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#795B4B] mt-1">
              Little Fête & Co. Team Portal
            </h1>
            <p className="text-[#694E40] mt-0.5">
              Staf Bertugas: <b>{currentUser.name}</b> ({currentUser.email}) • Hak Akses Operasional Penuh
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTab('dashboard')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              tab === 'dashboard' ? 'bg-[#795B4B] text-white shadow-xs' : 'bg-[#FAF3EC] text-[#795B4B] hover:bg-[#E8C9C7]'
            }`}
          >
            Ringkasan
          </button>
          <button
            onClick={() => setTab('bookings')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              tab === 'bookings' ? 'bg-[#795B4B] text-white shadow-xs' : 'bg-[#FAF3EC] text-[#795B4B] hover:bg-[#E8C9C7]'
            }`}
          >
            Pesanan & PIC ({bookings.length})
          </button>
          <button
            onClick={() => setTab('finance')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              tab === 'finance' ? 'bg-[#795B4B] text-white shadow-xs' : 'bg-[#FAF3EC] text-[#795B4B] hover:bg-[#E8C9C7]'
            }`}
          >
            Keuangan & Aset
          </button>
          <button
            onClick={() => setTab('tasks')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              tab === 'tasks' ? 'bg-[#795B4B] text-white shadow-xs' : 'bg-[#FAF3EC] text-[#795B4B] hover:bg-[#E8C9C7]'
            }`}
          >
            Tugas ({tasks.filter(t => t.status !== 'Selesai').length})
          </button>
          <button
            onClick={() => setTab('settings')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              tab === 'settings' ? 'bg-[#795B4B] text-white shadow-xs' : 'bg-[#FAF3EC] text-[#795B4B] hover:bg-[#E8C9C7]'
            }`}
          >
            Pengaturan
          </button>
        </div>
      </div>

      {/* TAB 1: RINGKASAN (DASHBOARD) */}
      {tab === 'dashboard' && (
        <div className="space-y-6">
          {/* 4 Financial & Operational Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs">
              <span className="text-[#694E40] text-[11px] block">Total Pendapatan Terverifikasi</span>
              <div className="text-2xl font-bold text-[#795B4B] mt-1">{formatRupiah(totalRevenue)}</div>
              <p className="text-[10px] text-emerald-700 mt-1">Dari pelunasan pesanan acara</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs">
              <span className="text-[#694E40] text-[11px] block">Total Beban Operasional</span>
              <div className="text-2xl font-bold text-red-700 mt-1">{formatRupiah(totalExpenses)}</div>
              <p className="text-[10px] text-[#694E40] mt-1">Bahan balon, lem & konsumabel</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs">
              <span className="text-[#694E40] text-[11px] block">Laba Bersih Operasional</span>
              <div className="text-2xl font-bold text-[#795B4B] mt-1">{formatRupiah(netOperatingProfit)}</div>
              <p className="text-[10px] text-[#694E40] mt-1">Pendapatan dikurangi beban operasional</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DECFC0] shadow-2xs">
              <span className="text-[#694E40] text-[11px] block">Aset Tetap Peralatan Terdaftar</span>
              <div className="text-2xl font-bold text-[#C4A58D] mt-1">{formatRupiah(totalEquipmentAssets)}</div>
              <p className="text-[10px] text-[#C4A58D] font-medium mt-1">Backdrop & pedestal (Aset Modal)</p>
            </div>
          </div>

          {/* Beban Kerja PIC & Jadwal Mendatang */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Beban Kerja 3 Staf PIC */}
            <div className="bg-white p-6 rounded-3xl border border-[#DECFC0] shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#795B4B]">Beban Tugas 3 PIC Resmi</h3>
              <p className="text-[11px] text-[#694E40]">Sistem penugasan otomatis menjaga distribusi acara tetap seimbang.</p>

              <div className="space-y-3 pt-1">
                {OFFICIAL_TEAM.map(member => {
                  const memberBookings = bookings.filter(b => b.assignedPIC === member.name);
                  const memberPendingTasks = tasks.filter(t => t.assignedTo === member.name && t.status !== 'Selesai');
                  return (
                    <div key={member.id} className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#795B4B]">{member.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#795B4B]">
                          {memberBookings.length} Pesanan Aktif
                        </span>
                      </div>
                      <p className="text-[10px] text-[#694E40]">
                        Email: {member.email} • WA: {member.phone}
                      </p>
                      <div className="mt-2 text-[10px] text-[#C89B99] font-semibold">
                        {memberPendingTasks.length} Tugas Operasional Tertunda
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kalender Acara Mendatang */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#DECFC0] shadow-2xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-lg font-bold text-[#795B4B]">Jadwal Acara Terdekat</h3>
                <span className="text-[11px] text-[#694E40]">{bookings.length} Total Terjadwal</span>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 4).map(bk => (
                  <div
                    key={bk.id}
                    className="p-4 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#4A6FA5]">{bk.referenceCode}</span>
                        <span className="text-[10px] font-semibold text-[#694E40]">({bk.packageName})</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#795B4B] mt-0.5">
                        {bk.childName} (Ke-{bk.childAge} Thn) • {bk.venueName || bk.cityOrDistrict}
                      </h4>
                      <p className="text-[11px] text-[#694E40]">
                        {bk.eventDate} pukul {bk.eventStartTime} WIB • PIC: <b>{bk.assignedPIC}</b>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        bk.bookingStatus === 'Terkonfirmasi' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {bk.bookingStatus}
                      </span>
                      <button
                        onClick={() => {
                          setBookingSearch(bk.referenceCode);
                          setTab('bookings');
                        }}
                        className="px-3 py-1 rounded-full bg-[#795B4B] text-white text-[10px] font-semibold hover:bg-black"
                      >
                        Kelola
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PESANAN & PIC (BOOKING MANAGEMENT) */}
      {tab === 'bookings' && (
        <div className="space-y-5">
          {/* Controls: Search & Status Filter */}
          <div className="bg-white p-4 rounded-2xl border border-[#DECFC0] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#C4A58D]" />
              <input
                type="text"
                value={bookingSearch}
                onChange={e => setBookingSearch(e.target.value)}
                placeholder="Cari kode (LF-...), nama pemesan, si kecil, atau PIC..."
                className="w-full p-2 rounded-xl border border-[#DECFC0] text-xs outline-hidden"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#C4A58D]" />
              <select
                value={bookingStatusFilter}
                onChange={e => setBookingStatusFilter(e.target.value)}
                className="p-2 rounded-xl border border-[#DECFC0] text-xs bg-white"
              >
                <option value="ALL">Semua Status Booking</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Terkonfirmasi">Terkonfirmasi</option>
                <option value="Sedang Berjalan">Sedang Berjalan</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Cards / Table of Bookings */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-[#DECFC0] text-center text-[#694E40]">
                Tidak ada pesanan yang sesuai dengan filter pencarian.
              </div>
            ) : (
              filteredBookings.map(bk => (
                <div
                  key={bk.id}
                  className="bg-white p-6 rounded-3xl border border-[#DECFC0] shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#F0E5D8] pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#4A6FA5] text-sm">{bk.referenceCode}</span>
                        <span className="px-2.5 py-0.5 bg-[#FAF3EC] text-[#795B4B] rounded-full text-[10px] font-bold">
                          {bk.packageName}
                        </span>
                        <span className="text-[10px] text-[#694E40]">Tema: {bk.themeName}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#795B4B] mt-0.5">
                        Pesta Si Kecil {bk.childName} (Ke-{bk.childAge} Thn) • Pemesan: {bk.customerName}
                      </h3>
                      <p className="text-[11px] text-[#694E40]">
                        {bk.eventDate} ({bk.eventStartTime} WIB) • {bk.venueAddress}, {bk.cityOrDistrict} ({bk.distanceKm} km)
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-base text-[#795B4B]">{formatRupiah(bk.confirmedTotal)}</div>
                      <span className="text-[10px] text-[#694E40]">
                        WA: <a href={`https://wa.me/62${bk.customerWhatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="underline font-bold text-[#4A6FA5]">{bk.customerWhatsapp}</a>
                      </span>
                    </div>
                  </div>

                  {/* Actions Row: Assign PIC, Status Booking, Payment Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF3EC] p-4 rounded-2xl border border-[#EFE2D4]">
                    {/* Reassign PIC */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#795B4B] uppercase tracking-wider mb-1">
                        Personal in Charge (PIC)
                      </label>
                      <select
                        value={bk.assignedPIC}
                        onChange={e => handleUpdateBookingPIC(bk.id, e.target.value)}
                        className="w-full p-2 rounded-xl border border-[#DECFC0] bg-white font-semibold text-xs"
                      >
                        {OFFICIAL_TEAM.map(tm => (
                          <option key={tm.id} value={tm.name}>{tm.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Booking Status */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#795B4B] uppercase tracking-wider mb-1">
                        Status Pelaksanaan
                      </label>
                      <select
                        value={bk.bookingStatus}
                        onChange={e => handleUpdateBookingStatus(bk.id, e.target.value as BookingStatus)}
                        className="w-full p-2 rounded-xl border border-[#DECFC0] bg-white font-semibold text-xs"
                      >
                        <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                        <option value="Terkonfirmasi">Terkonfirmasi</option>
                        <option value="Sedang Berjalan">Sedang Berjalan</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </div>

                    {/* Payment Status */}
                    <div>
                      <label className="block text-[10px] font-bold text-[#795B4B] uppercase tracking-wider mb-1">
                        Status Pembayaran
                      </label>
                      <select
                        value={bk.paymentStatus}
                        onChange={e => handleUpdateBookingPayment(bk.id, e.target.value as PaymentStatus)}
                        className="w-full p-2 rounded-xl border border-[#DECFC0] bg-white font-semibold text-xs"
                      >
                        <option value="Belum Dibayar">Belum Dibayar</option>
                        <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                        <option value="Lunas">Lunas</option>
                        <option value="Pengembalian Dana">Pengembalian Dana</option>
                      </select>
                    </div>
                  </div>

                  {/* Tool Finalisasi Jika Ada Item Belum Terkonfirmasi */}
                  {bk.hasUnconfirmedItems && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                      <p className="font-bold text-amber-900 text-[11px] flex items-center space-x-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Item Menunggu Finalisasi Staf:</span>
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {!bk.isTransportConfirmed && (
                          <button
                            onClick={() => {
                              const feeStr = prompt(`Masukkan biaya ongkir transportasi terkonfirmasi untuk jarak ${bk.distanceKm} km:`, '35000');
                              if (feeStr && !isNaN(Number(feeStr))) {
                                handleConfirmItem(bk.id, 'transport', Number(feeStr));
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 text-[11px]"
                          >
                            Konfirmasi Ongkir Jarak &gt;15km
                          </button>
                        )}

                        {bk.addons.some(a => a.category === 'cake' && !a.isConfirmed) && (
                          <button
                            onClick={() => {
                              const cakeItem = bk.addons.find(a => a.category === 'cake');
                              const priceStr = prompt(`Masukkan harga final kue rekanan "${cakeItem?.name}":`, '120000');
                              if (priceStr && !isNaN(Number(priceStr))) {
                                handleConfirmItem(bk.id, 'cake', Number(priceStr));
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 text-[11px]"
                          >
                            Konfirmasi Harga Final Kue Rekanan
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* WhatsApp Quick Message Link */}
                  <div className="flex justify-between items-center pt-2 text-[11px]">
                    <span className="text-[#694E40]">
                      PIC Terpilih: <b>{bk.assignedPIC}</b>
                    </span>
                    <a
                      href={`https://wa.me/62${bk.customerWhatsapp.replace(/\D/g, '')}?text=Halo%20Bunda%2FAyah%20${encodeURIComponent(bk.customerName)},%20saya%20${encodeURIComponent(bk.assignedPIC)}%20dari%20Little%20F%C3%AAte%20%26%20Co.%20selaku%20PIC%20resmi%20pesta%20si%20kecil%20${encodeURIComponent(bk.childName)}%20(Kode:%20${encodeURIComponent(bk.referenceCode)}).`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4A6FA5] font-bold hover:underline flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Kirim WhatsApp ke Pemesan</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: KEUANGAN & ASET (ACCOUNTING & ASSET JOURNAL) */}
      {tab === 'finance' && (
        <div className="space-y-6">
          {/* Header & CSV Download */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#795B4B]">Jurnal Keuangan & Daftar Aset Peralatan</h2>
              <p className="text-[#694E40]">
                Menerapkan prinsip akuntansi: Pemisahan tegas antara <b>Beban Operasional</b> dan <b>Aset Peralatan Tetap</b>.
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-full bg-[#795B4B] hover:bg-black text-white font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <Download className="w-4 h-4 text-[#E8C9C7]" />
              <span>Ekspor Jurnal CSV</span>
            </button>
          </div>

          {/* Form Catat Transaksi Baru */}
          <div className="bg-white p-6 rounded-3xl border border-[#DECFC0] shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#795B4B] flex items-center space-x-2">
              <Plus className="w-4 h-4 text-[#C89B99]" />
              <span>Catat Transaksi Keuangan Baru</span>
            </h3>

            <form onSubmit={handleAddJournal} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Klasifikasi Akun</label>
                <select
                  value={txType}
                  onChange={e => {
                    const val = e.target.value as JournalType;
                    setTxType(val);
                    if (val === 'PENDAPATAN') setTxCategory('Pendapatan Paket Pesta');
                    if (val === 'BEBAN') setTxCategory('Bahan Baku & Konsumabel');
                    if (val === 'ASET_PERALATAN') setTxCategory('Aset Tetap (Peralatan)');
                    if (val === 'MODAL') setTxCategory('Modal Disetor');
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs font-semibold"
                >
                  <option value="BEBAN">BEBAN (Operating Expense)</option>
                  <option value="PENDAPATAN">PENDAPATAN (Revenue)</option>
                  <option value="ASET_PERALATAN">ASET PERALATAN (Fixed Asset)</option>
                  <option value="MODAL">MODAL (Equity)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Kategori</label>
                <input
                  type="text"
                  value={txCategory}
                  onChange={e => setTxCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-[#795B4B]">Keterangan Transaksi</label>
                <input
                  type="text"
                  value={txDesc}
                  onChange={e => setTxDesc(e.target.value)}
                  placeholder="Contoh: Beli 2 unit portable backdrop nude..."
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Jumlah (IDR)</label>
                <div className="flex space-x-1">
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={txAmount || ''}
                    onChange={e => setTxAmount(parseInt(e.target.value) || 0)}
                    placeholder="Rp"
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#795B4B] hover:bg-black text-white font-bold shrink-0 transition"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Tabel Jurnal Transaksi */}
          <div className="bg-white rounded-3xl border border-[#DECFC0] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#F0E5D8] flex justify-between items-center">
              <span className="font-bold text-sm text-[#795B4B]">Buku Transaksi Jurnal ({journalEntries.length})</span>
              <span className="text-[11px] text-[#694E40]">Format Resmi Akuntansi Little Fête</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF3EC] border-b border-[#DECFC0] text-[#795B4B]">
                  <tr>
                    <th className="p-3.5 font-bold">Tanggal</th>
                    <th className="p-3.5 font-bold">Klasifikasi</th>
                    <th className="p-3.5 font-bold">Kategori</th>
                    <th className="p-3.5 font-bold">Keterangan</th>
                    <th className="p-3.5 font-bold text-right">Jumlah</th>
                    <th className="p-3.5 font-bold">Dicatat Oleh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E5D8]">
                  {journalEntries.map(entry => (
                    <tr key={entry.id} className="hover:bg-[#FAF6F0] transition">
                      <td className="p-3.5 font-mono text-[#694E40]">{entry.date}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          entry.type === 'PENDAPATAN' ? 'bg-emerald-100 text-emerald-800' :
                          entry.type === 'BEBAN' ? 'bg-red-100 text-red-800' :
                          entry.type === 'ASET_PERALATAN' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {entry.type}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-[#795B4B]">{entry.category}</td>
                      <td className="p-3.5 text-[#694E40]">{entry.description}</td>
                      <td className="p-3.5 font-bold text-right font-mono text-[#795B4B]">{formatRupiah(entry.amount)}</td>
                      <td className="p-3.5 text-[#694E40]">{entry.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TUGAS OPERASIONAL (OPERATIONAL TASKS) */}
      {tab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#795B4B]">Tugas Operasional Tim</h2>
              <p className="text-[#694E40]">Delegasikan dan koordinasikan persiapan dekorasi, pemesanan kue, dan rundown.</p>
            </div>
          </div>

          {/* Form Tambah Tugas */}
          <div className="bg-white p-6 rounded-3xl border border-[#DECFC0] shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-[#795B4B] flex items-center space-x-2">
              <Plus className="w-4 h-4 text-[#C89B99]" />
              <span>Tambah Tugas Baru</span>
            </h3>

            <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1 text-[#795B4B]">Judul / Instruksi Tugas</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder="Contoh: Rakit 30 balon pastel sage garden..."
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Ditugaskan Kepada</label>
                <select
                  value={taskAssignee}
                  onChange={e => setTaskAssignee(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#DECFC0] bg-white text-xs"
                >
                  {OFFICIAL_TEAM.map(tm => (
                    <option key={tm.id} value={tm.name}>{tm.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#795B4B]">Kode Booking Terkait (Opsional)</label>
                <div className="flex space-x-1">
                  <input
                    type="text"
                    value={taskBookingRef}
                    onChange={e => setTaskBookingRef(e.target.value)}
                    placeholder="LF-2026-..."
                    className="w-full p-2.5 rounded-xl border border-[#DECFC0] text-xs font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#795B4B] hover:bg-black text-white font-bold shrink-0 transition"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Task Board / List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Belum Dikerjakan', 'Sedang Dikerjakan', 'Selesai'] as TaskStatus[]).map(statusCategory => {
              const categoryTasks = tasks.filter(t => t.status === statusCategory);
              return (
                <div key={statusCategory} className="bg-white p-5 rounded-3xl border border-[#DECFC0] shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#F0E5D8]">
                    <span className="font-bold text-xs text-[#795B4B] uppercase tracking-wider">{statusCategory}</span>
                    <span className="w-5 h-5 rounded-full bg-[#FAF3EC] text-[#795B4B] flex items-center justify-center font-bold text-[10px]">
                      {categoryTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {categoryTasks.length === 0 ? (
                      <p className="text-[11px] text-[#694E40] italic py-2 text-center">Tidak ada tugas pada kolom ini.</p>
                    ) : (
                      categoryTasks.map(tsk => (
                        <div
                          key={tsk.id}
                          className="p-3.5 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] space-y-2"
                        >
                          <p className="font-semibold text-xs text-[#795B4B]">{tsk.title}</p>
                          <div className="flex justify-between items-center text-[10px] text-[#694E40]">
                            <span>PIC: <b>{tsk.assignedTo}</b></span>
                            {tsk.bookingRef && <span className="font-mono text-[#4A6FA5]">{tsk.bookingRef}</span>}
                          </div>
                          <div className="pt-2 border-t border-[#DECFC0]/60 flex justify-between items-center">
                            <button
                              onClick={() => handleToggleTaskStatus(tsk.id)}
                              className="text-[10px] font-bold text-[#4A6FA5] hover:underline"
                            >
                              Ganti Status →
                            </button>
                            <button
                              onClick={() => onUpdateTasks(tasks.filter(t => t.id !== tsk.id))}
                              className="text-[10px] text-red-600 hover:underline"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: PENGATURAN (SETTINGS) */}
      {tab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#DECFC0] shadow-sm space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#795B4B]">Pengaturan & Kebijakan Operasional</h2>
            <p className="text-[#694E40] mt-0.5">Konfigurasi tim dan tarif layanan Little Fête & Co.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] space-y-2">
              <h3 className="font-bold text-[#795B4B]">Cakupan Layanan Operasional</h3>
              <p><b>Wilayah Layanan:</b> Jadetabek (0 – 25 km panggilan ke lokasi)</p>
              <p><b>Sistem Layanan:</b> Langsung ke lokasi acara pemesan (tanpa kantor fisik publik)</p>
              <p><b>Standar Tarif Ongkir:</b></p>
              <ul className="list-disc pl-5 text-[11px] space-y-1">
                <li>0 – 5 km: Rp0 (Bebas Biaya)</li>
                <li>&gt;5 – 10 km: Rp15.000</li>
                <li>&gt;10 – 15 km: Rp25.000</li>
                <li>&gt;15 km: Perlu Konfirmasi Tim</li>
              </ul>
            </div>

            <div className="p-5 bg-[#FAF3EC] rounded-2xl border border-[#EFE2D4] space-y-2">
              <h3 className="font-bold text-[#795B4B]">Tim Staf Resmi (3 Anggota)</h3>
              {OFFICIAL_TEAM.map(tm => (
                <div key={tm.id} className="text-[11px] pb-1 border-b border-[#DECFC0] last:border-0">
                  <b>{tm.name}</b> • {tm.email} • {tm.phone}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0E5D8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="font-bold text-[#795B4B]">Reset Data Demo</p>
              <p className="text-[11px] text-[#694E40]">Kembalikan pesanan dan catatan keuangan ke data awal default.</p>
            </div>
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mengatur ulang data pesanan dan keuangan ke data default?')) {
                  onUpdateBookings(SAMPLE_BOOKINGS);
                  onUpdateJournal(SAMPLE_JOURNAL);
                  onUpdateTasks(SAMPLE_TASKS);
                  onShowToast('Data demo berhasil direset ke pengaturan awal.');
                }
              }}
              className="px-4 py-2 rounded-full border border-red-300 text-red-700 hover:bg-red-50 font-semibold text-xs"
            >
              Reset Sample Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
