export type Role = 'team' | 'customer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'team';
  phone?: string;
  avatarColor?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface DecorationTheme {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  palette: string[];
  backdropType: string;
  balloonStyle: string;
  imageUrl: string;
  photoRefLabel: string;
}

export interface CakeItem {
  id: string;
  name: string;
  startingPrice: number;
  description: string;
  highlight: string;
  imageUrl: string;
  photoRefLabel: string;
}

export interface PartyPackage {
  id: string;
  name: string;
  price: number;
  capacity: number;
  durationHours: number;
  badge?: string;
  includes: string[];
}

export interface BookingAddon {
  id?: string;
  name: string;
  category?: 'cake' | 'candle' | 'goodie' | 'photo' | 'custom';
  subtotal: number;
  isStartingPrice: boolean;
  isConfirmed: boolean;
  notes?: string;
}

export type BookingStatus = 
  | 'Menunggu Konfirmasi'
  | 'Terkonfirmasi'
  | 'Sedang Berjalan'
  | 'Selesai'
  | 'Dibatalkan';

export type PaymentStatus = 
  | 'Belum Dibayar'
  | 'Menunggu Verifikasi'
  | 'Lunas'
  | 'Pengembalian Dana';

export interface Booking {
  id: string;
  referenceCode: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerWhatsapp: string;
  preferredContact: 'whatsapp' | 'email';
  childName: string;
  childAge: number;
  childBirthdate: string;
  eventDate: string;
  eventStartTime: string;
  guestCount: number;
  specialRequests?: string;
  venueName?: string;
  venueAddress: string;
  cityOrDistrict: string;
  distanceKm: number;
  transportFee: number;
  isTransportConfirmed: boolean;
  packageName: string;
  packagePrice: number;
  themeName: string;
  additionalChildrenCount: number;
  additionalChildrenFee: number;
  additionalDurationMinutes: number;
  additionalDurationFee: number;
  addons: BookingAddon[];
  confirmedTotal: number;
  estimatedTotal: number;
  hasUnconfirmedItems: boolean;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentProofUrl?: string;
  marketingConsent: boolean;
  assignedPIC: string; // Dina Alawiyah | Kirana Larasati | Fifi Feliana
  createdAt: string;
}

export type JournalType = 'PENDAPATAN' | 'BEBAN' | 'ASET_PERALATAN' | 'MODAL';

export interface JournalEntry {
  id: string;
  date: string;
  type: JournalType;
  category: string;
  description: string;
  amount: number;
  bookingRef?: string;
  recordedBy: string;
}

export type TaskStatus = 'Belum Dikerjakan' | 'Sedang Dikerjakan' | 'Selesai';

export interface TaskItem {
  id: string;
  title: string;
  bookingRef?: string;
  assignedTo: string; // Dina | Kirana | Fifi
  status: TaskStatus;
  dueDate?: string;
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  childName: string;
  childAge: number;
  rating: number; // 1 to 5
  eventTheme: string;
  packageName: string;
  reviewText: string;
  date: string;
  assignedPIC?: string;
  verifiedBooking?: boolean;
}

