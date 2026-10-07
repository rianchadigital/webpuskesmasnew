export type TabType = 
  | 'beranda' 
  | 'profil' 
  | 'sambutan'
  | 'wilayah' 
  | 'pelayanan' 
  | 'ilp' 
  | 'dokumen-pelayanan'
  | 'jadwal' 
  | 'agenda'
  | 'berita' 
  | 'pengumuman'
  | 'edukasi' 
  | 'data'
  | 'data-kesehatan'
  | 'dokumentasi'
  | 'sdm'
  | 'unduhan' 
  | 'faq' 
  | 'kontak'
  | 'admin';

export interface ActivityPhoto {
  url: string;
  caption: string;
}

export interface ActivityAlbum {
  id: string;
  title: string;
  category: 'Posyandu & ILP' | 'Lansia & PTM' | 'UKS & Sekolah' | 'Pusling Apung' | 'Imunisasi & Gizi' | 'Kedaruratan & Pelatihan';
  date: string;
  island: string;
  location: string;
  coverImage: string;
  photos: ActivityPhoto[];
  description: string;
  organizer: string;
  participantCount: number;
  highlights: string[];
  googleDriveLink?: string;
  googleDriveFolder?: string;
}

export interface MorbidityItem {
  rank: number;
  code: string;
  name: string;
  category: string;
  cases: number;
  maleCases: number;
  femaleCases: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface FacilityMonthlyVisit {
  month: string; // 'Jan', 'Feb', etc.
  monthIndex: number; // 1-12
  monthName: string; // 'Januari', etc.
  puskesmasKecamatan: number; // P. Tidung
  pustuPari: number;
  pustuLancang: number;
  pustuUntungJawa: number;
  poskesPayung: number;
  total: number;
  bpjs: number;
  nonBpjs: number;
  rujukanRsud: number;
}

export type ServiceDocKey = 'standar' | 'maklumat' | 'hak-kewajiban';

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  unit: string;
  category: 'Medis' | 'Keperawatan' | 'Kebidanan' | 'Kefarmasian' | 'Gizi & Kesmas' | 'Penunjang & Manajemen';
  nip?: string;
  sipOrStr?: string;
  placement: string;
  photo: string;
  status: 'Aktif Bertugas' | 'Siaga On-Call' | 'Pelayanan Terjadwal';
  qualification: string;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
}

export interface IslandFacility {
  id: string;
  name: string;
  type: 'Puskesmas' | 'Pustu';
  islandName: string;
  address: string;
  operatingHours: string;
  emergencyService: string;
  services: string[];
  contactNumber: string;
  whatsapp: string;
  headOfficer: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  ambulanceBoat?: string;
}

export interface HealthService {
  id: string;
  name: string;
  category: 'Dalam Gedung' | 'Luar Gedung';
  clusterId: string;
  ilpCluster?: string;
  description: string;
  requirements: string[];
  flow: string[];
  fee: string;
  cost?: string;
  schedule: string;
  contact: string;
  icon: string;
  popular?: boolean;
}

export interface ILPCluster {
  id: string;
  clusterNumber: number | string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  objectives: string[];
  services: string[];
  targetAudience: string;
  serviceFlow: string;
  schedule: string;
  picName: string;
  relatedDocs: string[];
  faq: { q: string; a: string }[];
  contact: string;
}

export interface ServiceSchedule {
  id: string;
  day: string;
  serviceName: string;
  hours: string;
  location: string;
  cluster: string;
  doctorOrOfficer: string;
  status: 'Aktif' | 'Penyesuaian' | 'Panggilan Khusus';
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Kegiatan Puskesmas' | 'Pengumuman' | 'Kesehatan' | 'ILP' | 'Posyandu' | 'Program' | 'Informasi Masyarakat';
  summary: string;
  content: string;
  author: string;
  image: string;
  featured?: boolean;
}

export interface AgendaEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Rapat' | 'Posyandu' | 'Skrining' | 'Penyuluhan' | 'Kegiatan Masyarakat' | 'Kegiatan Lintas Sektor';
  description: string;
  organizer: string;
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Formulir pelayanan' | 'Informasi pelayanan' | 'SOP publik' | 'Brosur kesehatan' | 'Panduan' | 'Dokumen program' | 'Informasi lainnya';
  date: string;
  fileSize: string;
  fileType: string;
  downloadsCount: number;
  description: string;
  fileUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Umum' | 'Pelayanan' | 'ILP' | 'Rujukan & Layanan Medis' | 'Rujukan & Ambulans' | 'BPJS & Administrasi' | 'Pustu Kepulauan';
}

export type ScheduleItem = ServiceSchedule;
export type FAQItem = FaqItem;

export interface ServiceHoursRegulation {
  regulationTitle: string;
  regulationDesc: string;
  poliklinikMonThu: string;
  poliklinikFri: string;
  registrationMonThu: string;
  registrationFri: string;
  emergencyHours: string;
  seaAmbulanceHours: string;
  posyanduHours: string;
  extendedHours?: string;
  notes: string;
}

export interface PuskesmasProfile {
  headOfPuskesmas?: string;
  headOfPuskesmasName: string;
  headOfPuskesmasTitle: string;
  headOfPuskesmasNip: string;
  headOfPuskesmasPhoto: string;
  welcomeSpeech: string;
  welcomeSpeechHighlights: string[];
  about?: string;
  name: string;
  subtitle: string;
  motto: string;
  vision: string;
  missions: string[];
  values: { code: string; title: string; desc: string; detail?: string }[];
  history: string;
  workingAreaDescription: string;
  address: string;
  phone: string;
  emergencyHotline: string;
  seaAmbulanceHotline: string;
  whatsapp: string;
  email: string;
  operatingHours: string;
  emergencyHours: string;
  serviceHoursRegulation: ServiceHoursRegulation;
  organizationStructureImage: string;
  organizationStructureCaption: string;
  organizationStructureUpdated: string;
  websiteUrl: string;
  instagram: string;
  facebook?: string;
  youtube: string;
}

export interface OrgPerson {
  id: string;
  role: string;
  name: string;
  nip?: string;
  photo?: string;
  subRole?: string;
}

export interface OrgCluster {
  id: string;
  title: string;
  subtitle: string;
  coordinator: OrgPerson;
  members: OrgPerson[];
  color: string;
}

export interface SDMKItem {
  id: string;
  jabatan: string;
  kategori: 'Tenaga Medis' | 'Tenaga Keperawatan' | 'Tenaga Kebidanan' | 'Tenaga Kefarmasian' | 'Tenaga Gizi' | 'Tenaga Kesmas & Lingkungan' | 'Tenaga Biomedis & Lab' | 'Tenaga Keteknisian Medis' | 'Tenaga Administrasi & Penunjang';
  kualifikasi: string;
  standarABK: number;
  jumlahEksisting: number;
  statusPNS: number;
  statusPPPK: number;
  statusNonASN: number;
  lokasiPuskesmasInduk: number;
  lokasiPustuLancang: number;
  lokasiPustuPari: number;
  lokasiPustuUntungJawa: number;
  keterangan: string;
}
