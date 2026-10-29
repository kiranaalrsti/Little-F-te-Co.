import { CakeItem, DecorationTheme, JournalEntry, PartyPackage, TaskItem, TeamMember, Booking, Testimonial } from './types';

// 3 Staf Operasional Resmi Little Fête & Co.
export const OFFICIAL_TEAM: TeamMember[] = [
  { id: 'tm_dina', name: 'Dina Alawiyah', email: 'dina@littlefeat.id', role: 'team', phone: '0812-1100-2201', avatarColor: '#E8C9C7' },
  { id: 'tm_kirana', name: 'Kirana Larasati', email: 'kirana@littlefeat.id', role: 'team', phone: '0812-1100-2202', avatarColor: '#D8BCA5' },
  { id: 'tm_fifi', name: 'Fifi Feliana', email: 'fifi@littlefeat.id', role: 'team', phone: '0812-1100-2203', avatarColor: '#B0CBE9' }
];

// 4 Tema Dekorasi Sesuai Portofolio Asli
export const INITIAL_DECORATION_THEMES: DecorationTheme[] = [
  {
    id: 'sweet_pink',
    name: 'Sweet Pink',
    subtitle: 'Blush Pink & Peach Warmth',
    description: 'Paduan warna blush pink lembut, putih krem, dan sentuhan peach yang manis, hangat, dan sangat fotogenik. Cocok untuk si kecil yang ceria dan anggun.',
    palette: ['#E8C9C7', '#FDF8F5', '#F5D7C9', '#D4AF37'],
    backdropType: 'Arched White Backdrop dengan Custom Akrilik Nama',
    balloonStyle: 'Organic balloon garland blush pink, peach pastel & aksen chrome gold',
    imageUrl: '/assets/aistudio/dekor_3_f3336aaf.jpeg',
    photoRefLabel: 'Portofolio Dekor: Sweet Pink'
  },
  {
    id: 'sweet_cream',
    name: 'Sweet Cream',
    subtitle: 'Warm Beige & Nude Harmony',
    description: 'Palet abadi nan hangat dengan kombinasi soft cream murni, warm beige, dan aksen cokelat muda lembut serta sentuhan balon safari manis.',
    palette: ['#F7F1E8', '#D8BCA5', '#795B4B', '#FFFFFF'],
    backdropType: 'Arched Warm Nude/Beige Backdrop & Meja Kue Minimalis',
    balloonStyle: 'Balon organik nude latte, mocha cream & karakter foil lucu',
    imageUrl: '/assets/aistudio/dekor_4_a57d37df.jpeg',
    photoRefLabel: 'Portofolio Dekor: Sweet Cream'
  },
  {
    id: 'little_blue',
    name: 'Little Blue',
    subtitle: 'Pastel Blue & Chrome Silver Glow',
    description: 'Sentuhan biru pastel yang menyejukkan hati berpadu dengan aksen putih bersih, navy cerah, dan chrome silver berkilau elegan.',
    palette: ['#B0CBE9', '#4A6FA5', '#E2E8F0', '#FFFFFF'],
    backdropType: 'Vertical Paneled White Arched Backdrop & Pedestal Biru Pastel',
    balloonStyle: 'Cascading balloon garland baby blue, ocean blue & chrome silver',
    imageUrl: '/assets/aistudio/dekor_2_7487193c.jpeg',
    photoRefLabel: 'Portofolio Dekor: Little Blue'
  },
  {
    id: 'sage_garden',
    name: 'Sage Garden',
    subtitle: 'Botanical Sage & Ivory Elegance',
    description: 'Harmoni natural elegan dengan dominasi hijau sage lembut, ivory, dan aksen chrome gold mewah. Menghadirkan suasana pesta kebun yang segar dan modern.',
    palette: ['#9CAF88', '#F7F1E8', '#DFE6D8', '#D4AF37'],
    backdropType: 'Arched Ivory Backdrop dengan Typography Elegan',
    balloonStyle: 'Balon organik fresh sage green, pearl ivory & golden sparkle',
    imageUrl: '/assets/aistudio/dekor_1_6c36ba36.jpeg',
    photoRefLabel: 'Portofolio Dekor: Sage Garden'
  }
];

// 3 Produk Kue Asli Rekanan
export const INITIAL_CAKES: CakeItem[] = [
  {
    id: 'cake_classic',
    name: 'Sweet Classic',
    startingPrice: 100000,
    description: 'Kue bolu lembut khas Korea dengan lapisan buttercream halus, hiasan piping renda klasik manis, pita pastel, atau topping buah ceri segar.',
    highlight: 'Ukuran d10–d14 cm • Cocok untuk tiup lilin intim',
    imageUrl: '/assets/aistudio/minimalis_cake_9220b389.jpeg',
    photoRefLabel: 'Koleksi Minimalis Bento Cake'
  },
  {
    id: 'cake_character',
    name: 'Little Character',
    startingPrice: 150000,
    description: 'Kue bertema favorit si kecil dengan dekorasi ilustrasi hand-painted / 2D icing karakter kesukaan (Mario, Minecraft, Minion, Stitch, Bluey, dll).',
    highlight: 'Ukuran d16–d18 cm • Desain karakter custom sesuai request',
    imageUrl: '/assets/aistudio/character_cake_f35de648.jpeg',
    photoRefLabel: 'Koleksi Character Round Cake'
  },
  {
    id: 'cake_double',
    name: 'Double Delight (Multi-Tier)',
    startingPrice: 350000,
    description: 'Kue 2 atau 3 tingkat estetik dengan struktur kokoh dan hiasan topper 3D bertema khusus (Baby Shark, Lego, Roblox, Kuromi, Mermaid Ariel).',
    highlight: '2–3 Tingkat • Untuk perayaan pesta yang lebih megah dan meriah',
    imageUrl: '/assets/aistudio/double_cake_85fb64d1.jpeg',
    photoRefLabel: 'Koleksi Multi-Tier Themed Cake'
  }
];

// 3 Paket Pesta Resmi
export const INITIAL_PACKAGES: PartyPackage[] = [
  {
    id: 'little_moments',
    name: 'Little Moments',
    price: 399000,
    capacity: 15,
    durationHours: 2,
    badge: 'Paling Populer untuk Pesta Intim',
    includes: [
      'Standar dekorasi sweet arched backdrop nude/beige',
      'Balon organik 20–30 pcs di satu sisi lengkungan backdrop',
      'Balon foil angka penanda usia & nama si kecil',
      'Meja kue minimalis & taplak meja senada dengan palet',
      'MC profesional ramah anak berpengalaman',
      'Permainan interaktif (interactive party games & fun prizes rundown)',
      'Susunan acara (rundown) terstruktur rapi selama 2 jam penuh'
    ]
  },
  {
    id: 'happy_days',
    name: 'Happy Days',
    price: 699000,
    capacity: 30,
    durationHours: 2,
    badge: 'Terbaik untuk Teman Sekelas',
    includes: [
      'Standar dekorasi sweet arched backdrop nude/beige',
      'Balon organik 20–30 pcs di satu sisi lengkungan backdrop',
      'Balon foil angka penanda usia & nama si kecil',
      'Meja kue minimalis & taplak meja senada dengan palet',
      'MC profesional ramah anak berpengalaman',
      'Permainan interaktif kelompok seru & properti game lengkap',
      'Susunan acara (rundown) terstruktur rapi selama 2 jam penuh',
      'Manajemen koordinasi waktu pemotongan kue & sesi foto keluarga'
    ]
  },
  {
    id: 'dream_party',
    name: 'Dream Party',
    price: 1099000,
    capacity: 50,
    durationHours: 2,
    badge: 'Kapasitas Maksimal & Pesta Meriah',
    includes: [
      'Standar dekorasi sweet arched backdrop nude/beige',
      'Balon organik 20–30 pcs di satu sisi lengkungan backdrop',
      'Balon foil angka penanda usia & nama si kecil',
      'Meja kue minimalis & taplak meja senada dengan palet',
      'MC profesional ramah anak berpengalaman',
      'Penyusunan permainan bertingkat untuk hingga 50 anak',
      'Sound assist & mic set portable ramah anak',
      'Susunan acara (rundown) terstruktur komprehensif 2 jam'
    ]
  }
];

// Format Rupiah Indonesia
export function formatRupiah(num: number): string {
  return 'Rp' + Number(num || 0).toLocaleString('id-ID');
}

// Perhitungan Biaya Transportasi Otoritatif Berdasarkan Jarak
export function calculateTransport(distanceKm: number): { fee: number; isConfirmed: boolean; label: string } {
  if (distanceKm <= 5) {
    return { fee: 0, isConfirmed: true, label: 'Rp0 (0–5 km Bebas Biaya Transportasi)' };
  }
  if (distanceKm <= 10) {
    return { fee: 15000, isConfirmed: true, label: 'Rp15.000 (>5–10 km Biaya Standar)' };
  }
  if (distanceKm <= 15) {
    return { fee: 25000, isConfirmed: true, label: 'Rp25.000 (>10–15 km Biaya Jarak Menengah)' };
  }
  return { fee: 0, isConfirmed: false, label: 'Menunggu Konfirmasi Tim (>15 km Perlu Penyesuaian)' };
}

// Algoritma Penugasan PIC Berimbang (Round-robin balancing antar Dina, Kirana, & Fifi)
export function assignBalancedPIC(existingBookings: Booking[]): string {
  const counts: Record<string, number> = {
    'Dina Alawiyah': 0,
    'Kirana Larasati': 0,
    'Fifi Feliana': 0
  };

  existingBookings.forEach(b => {
    if (b.assignedPIC && counts[b.assignedPIC] !== undefined) {
      counts[b.assignedPIC]++;
    }
  });

  let selected = 'Dina Alawiyah';
  let minVal = Infinity;

  OFFICIAL_TEAM.forEach(tm => {
    if (counts[tm.name] < minVal) {
      minVal = counts[tm.name];
      selected = tm.name;
    }
  });

  return selected;
}

// Data Pesanan Awal Realistis
export const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 'bk_1',
    referenceCode: 'LF-2026-1024',
    customerName: 'Bunda Sarah Wijaya',
    customerEmail: 'sarah@example.com',
    customerWhatsapp: '081299998888',
    preferredContact: 'whatsapp',
    childName: 'Kimberly',
    childAge: 3,
    childBirthdate: '2023-11-04',
    eventDate: '2026-11-08',
    eventStartTime: '15:00',
    guestCount: 20,
    specialRequests: 'Area dekorasi di teras semi-outdoor berangin, siapkan perekat balon ekstra kuat.',
    venueName: 'Kediaman Pribadi',
    venueAddress: 'Jl. Melati No. 12, Gandaria, Kebayoran Baru',
    cityOrDistrict: 'Jakarta Selatan',
    distanceKm: 4,
    transportFee: 0,
    isTransportConfirmed: true,
    packageName: 'Little Moments',
    packagePrice: 399000,
    themeName: 'Sweet Pink',
    additionalChildrenCount: 5,
    additionalChildrenFee: 150000,
    additionalDurationMinutes: 0,
    additionalDurationFee: 0,
    addons: [
      { name: 'Cake: Sweet Classic', subtotal: 100000, isStartingPrice: true, isConfirmed: false, category: 'cake', notes: 'Desain bento buttercream pita pink' },
      { name: 'Lilin Angka (1 Buah)', subtotal: 10000, isStartingPrice: false, isConfirmed: true, category: 'candle' }
    ],
    confirmedTotal: 559000,
    estimatedTotal: 659000,
    hasUnconfirmedItems: true,
    bookingStatus: 'Menunggu Konfirmasi',
    paymentStatus: 'Belum Dibayar',
    marketingConsent: true,
    assignedPIC: 'Dina Alawiyah',
    createdAt: '2026-10-25T10:00:00Z'
  },
  {
    id: 'bk_2',
    referenceCode: 'LF-2026-1088',
    customerName: 'Mama Clarissa',
    customerEmail: 'clarissa.m@gmail.com',
    customerWhatsapp: '081388776655',
    preferredContact: 'whatsapp',
    childName: 'Azriel',
    childAge: 2,
    childBirthdate: '2024-10-15',
    eventDate: '2026-11-14',
    eventStartTime: '10:00',
    guestCount: 30,
    specialRequests: 'Tema safari lembut, balon lion di sisi kanan meja kue.',
    venueName: 'Restoran Rumah Daun',
    venueAddress: 'Jl. Bintaro Utama Sektor 3A No. 5',
    cityOrDistrict: 'Tangerang Selatan',
    distanceKm: 9,
    transportFee: 15000,
    isTransportConfirmed: true,
    packageName: 'Happy Days',
    packagePrice: 699000,
    themeName: 'Sweet Cream',
    additionalChildrenCount: 0,
    additionalChildrenFee: 0,
    additionalDurationMinutes: 30,
    additionalDurationFee: 75000,
    addons: [
      { name: 'Goodie: Happy Snacks (30 pcs)', subtotal: 300000, isStartingPrice: false, isConfirmed: true, category: 'goodie' },
      { name: 'Lilin Angka (1 Buah)', subtotal: 10000, isStartingPrice: false, isConfirmed: true, category: 'candle' }
    ],
    confirmedTotal: 1099000,
    estimatedTotal: 1099000,
    hasUnconfirmedItems: false,
    bookingStatus: 'Terkonfirmasi',
    paymentStatus: 'Lunas',
    marketingConsent: true,
    assignedPIC: 'Kirana Larasati',
    createdAt: '2026-10-26T14:30:00Z'
  }
];

// Jurnal Keuangan Sesuai Prinsip Akuntansi yang Ketat
// ASET_PERALATAN = Capital Assets / Fixed Assets (TIDAK boleh langsung dipotongkan sebagai beban pengurang laba operasional)
// BEBAN = Operating Expenses
// PENDAPATAN = Revenue
// MODAL = Owner Equity
export const SAMPLE_JOURNAL: JournalEntry[] = [
  {
    id: 'tx_1',
    date: '2026-10-01',
    type: 'MODAL',
    category: 'Modal Disetor',
    description: 'Penyetoran modal awal tunai pendiri Little Fête & Co.',
    amount: 15000000,
    recordedBy: 'Dina Alawiyah'
  },
  {
    id: 'tx_2',
    date: '2026-10-03',
    type: 'ASET_PERALATAN',
    category: 'Aset Tetap (Peralatan)',
    description: 'Pembelian 2 unit Portable Wooden Arched Backdrop Nude & Ivory',
    amount: 2400000,
    recordedBy: 'Kirana Larasati'
  },
  {
    id: 'tx_3',
    date: '2026-10-04',
    type: 'ASET_PERALATAN',
    category: 'Aset Tetap (Peralatan)',
    description: 'Pembelian 2 Silinder Pedestal Meja Kue (Pink Pastel & Baby Blue)',
    amount: 800000,
    recordedBy: 'Kirana Larasati'
  },
  {
    id: 'tx_4',
    date: '2026-10-05',
    type: 'ASET_PERALATAN',
    category: 'Aset Tetap (Peralatan)',
    description: 'Pembelian 2 Unit Pompa Balon Elektrik Double Nozzle',
    amount: 350000,
    recordedBy: 'Fifi Feliana'
  },
  {
    id: 'tx_5',
    date: '2026-10-12',
    type: 'BEBAN',
    category: 'Bahan Baku & Konsumabel',
    description: 'Stok balon latex pastel tebal 500 pcs & lem balon dot tape',
    amount: 280000,
    recordedBy: 'Fifi Feliana'
  },
  {
    id: 'tx_6',
    date: '2026-10-15',
    type: 'BEBAN',
    category: 'Bahan Baku & Konsumabel',
    description: 'Pembelian stiker vinyl custom lettering nama si kecil & pita satin',
    amount: 110000,
    recordedBy: 'Dina Alawiyah'
  },
  {
    id: 'tx_7',
    date: '2026-10-26',
    type: 'PENDAPATAN',
    category: 'Pendapatan Paket Pesta',
    description: 'Pelunasan Paket Happy Days Acara LF-2026-1088 (Azriel)',
    amount: 1099000,
    bookingRef: 'LF-2026-1088',
    recordedBy: 'Kirana Larasati'
  }
];

// Daftar Tugas Operasional
export const SAMPLE_TASKS: TaskItem[] = [
  {
    id: 'tsk_1',
    title: 'Konfirmasi desain bento cake pita pink ke vendor rekanan',
    bookingRef: 'LF-2026-1024',
    assignedTo: 'Dina Alawiyah',
    status: 'Sedang Dikerjakan',
    dueDate: '2026-11-01',
    createdAt: '2026-10-25'
  },
  {
    id: 'tsk_2',
    title: 'Siapkan backdrop nude & rakit 30 balon tema Sweet Cream',
    bookingRef: 'LF-2026-1088',
    assignedTo: 'Kirana Larasati',
    status: 'Selesai',
    dueDate: '2026-11-13',
    createdAt: '2026-10-26'
  },
  {
    id: 'tsk_3',
    title: 'Packing 30 paket goodie bag Happy Snacks + pita beige',
    bookingRef: 'LF-2026-1088',
    assignedTo: 'Fifi Feliana',
    status: 'Selesai',
    dueDate: '2026-11-13',
    createdAt: '2026-10-26'
  },
  {
    id: 'tsk_4',
    title: 'Cek stok balon chrome gold & pastel blue untuk persiapan acara',
    assignedTo: 'Fifi Feliana',
    status: 'Belum Dikerjakan',
    dueDate: '2026-11-03',
    createdAt: '2026-10-28'
  }
];

// Testimoni & Rating Asli dari Orang Tua
export const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi_1',
    parentName: 'Bunda Sarah Wijaya',
    childName: 'Kimberly',
    childAge: 3,
    rating: 5,
    eventTheme: 'Sweet Pink',
    packageName: 'Little Moments',
    reviewText: 'Dekorasi sweet pink beneran cantik banget persis di portofolio! Balon organiknya rapi, warnanya pastel hangat dan sangat fotogenik. Kak Dina gercep banget koordinasinya dari H-3. Kimberly dan teman-temannya hepi banget tiup lilin bento cake-nya!',
    date: '28 Oktober 2026',
    assignedPIC: 'Dina Alawiyah',
    verifiedBooking: true
  },
  {
    id: 'testi_2',
    parentName: 'Mama Clarissa',
    childName: 'Azriel',
    childAge: 2,
    rating: 5,
    eventTheme: 'Sweet Cream',
    packageName: 'Happy Days',
    reviewText: 'Tema sweet cream warm nude-nya elegan dan aesthetic pol buat foto keluarga. Balon lion-nya menggemaskan! MC profesionalnya sangat sabar dan interaktif ngajak main anak-anak balita. Sukses terus buat Little Fête & Co.!',
    date: '25 Oktober 2026',
    assignedPIC: 'Kirana Larasati',
    verifiedBooking: true
  },
  {
    id: 'testi_3',
    parentName: 'Bunda Jessica Tan',
    childName: 'Nathan',
    childAge: 4,
    rating: 5,
    eventTheme: 'Little Blue',
    packageName: 'Dream Party',
    reviewText: 'Gak nyangka dengan harga yang sangat transparan dan tanpa biaya tersembunyi bisa dapat setup semegah ini. Balon organik baby blue dan chrome silver-nya super rapi dan kuat. Kak Fifi standby dari awal instalasi sampai pesta selesai.',
    date: '19 Oktober 2026',
    assignedPIC: 'Fifi Feliana',
    verifiedBooking: true
  },
  {
    id: 'testi_4',
    parentName: 'Ayah Raditya Pratama',
    childName: 'Aruna',
    childAge: 1,
    rating: 5,
    eventTheme: 'Sage Garden',
    packageName: 'Little Moments',
    reviewText: 'Buat 1st birthday Aruna, tema sage garden-nya adem banget dan fresh. Sangat direkomendasikan buat orang tua yang gak mau ribet tapi tetap ingin pesta ulang tahun si kecil istimewa dan memorable. Top markotop!',
    date: '12 Oktober 2026',
    assignedPIC: 'Dina Alawiyah',
    verifiedBooking: true
  }
];
