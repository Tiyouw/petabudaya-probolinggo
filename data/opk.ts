// ===== OPK — Objek Pemajuan Kebudayaan (10 Kategori, 127 item) =====
import { OPKCategory, OPKItem, SourceRef } from './types';

const source: SourceRef = { document: 'OBJEK PEMAJUAN KEBUDAYAAN KAB PROBOLINGGO.pdf' };

const manuskripItems: OPKItem[] = [
  { id: 'opk-m-001', name: 'Hikayat Nabi Yusuf', categoryId: 'manuskrip', description: 'Manuskrip kuno bercerita tentang Nabi Yusuf', locationText: 'Kabupaten Probolinggo' },
];

const tradisiLisanItems: OPKItem[] = [
  { id: 'opk-tl-001', name: 'Cerita Rakyat Asal Usul Nama Probolinggo', categoryId: 'tradisi-lisan', description: 'Cerita rakyat tentang asal usul nama daerah Probolinggo', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tl-002', name: 'Cerita Rakyat Gunung Bromo', categoryId: 'tradisi-lisan', description: 'Legenda asal mula Gunung Bromo', locationText: 'Sukapura' },
  { id: 'opk-tl-003', name: 'Cerita Rakyat Asal Usul Desa', categoryId: 'tradisi-lisan', description: 'Cerita asal mula desa-desa di Probolinggo', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tl-004', name: 'Pantun Tradisional', categoryId: 'tradisi-lisan', description: 'Pantun tradisional masyarakat Probolinggo', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tl-005', name: 'Mite Masyarakat Tengger', categoryId: 'tradisi-lisan', description: 'Mite dan cerita lisan masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-tl-006', name: 'Legenda Roro Anteng Joko Seger', categoryId: 'tradisi-lisan', description: 'Legenda leluhur masyarakat Tengger', locationText: 'Sukapura' },
];

const adatIstiadatItems: OPKItem[] = [
  { id: 'opk-ai-001', name: 'Upacara Kasada', categoryId: 'adat-istiadat', description: 'Upacara adat masyarakat Tengger di Gunung Bromo', locationText: 'Sukapura, Sumber' },
  { id: 'opk-ai-002', name: 'Upacara Karo', categoryId: 'adat-istiadat', description: 'Perayaan hari raya Karo masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-ai-003', name: 'Upacara Unan-unan', categoryId: 'adat-istiadat', description: 'Upacara adat masyarakat Tengger', locationText: 'Sukapura' },
  { id: 'opk-ai-004', name: 'Upacara Entas-Entas', categoryId: 'adat-istiadat', description: 'Upacara kematian masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-ai-005', name: 'Upacara Barikan', categoryId: 'adat-istiadat', description: 'Upacara syukuran masyarakat pesisir', locationText: 'Pesisir Probolinggo' },
  { id: 'opk-ai-006', name: 'Upacara Sedekah Bumi', categoryId: 'adat-istiadat', description: 'Upacara syukuran hasil bumi', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ai-007', name: 'Upacara Petik Laut', categoryId: 'adat-istiadat', description: 'Upacara syukuran nelayan', locationText: 'Pesisir utara Probolinggo' },
  { id: 'opk-ai-008', name: 'Upacara Tingkeban', categoryId: 'adat-istiadat', description: 'Upacara tujuh bulan kehamilan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ai-009', name: 'Upacara Tedak Siten', categoryId: 'adat-istiadat', description: 'Upacara bayi pertama kali menyentuh tanah', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ai-010', name: 'Upacara Selamatan', categoryId: 'adat-istiadat', description: 'Upacara selamatan tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ai-011', name: 'Tradisi Maulid Nabi', categoryId: 'adat-istiadat', description: 'Perayaan Maulid Nabi Muhammad SAW', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ai-012', name: 'Tradisi Rajaban', categoryId: 'adat-istiadat', description: 'Perayaan Isra Miraj', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ai-013', name: 'Tradisi Ruwatan', categoryId: 'adat-istiadat', description: 'Upacara ruwatan tradisional', locationText: 'Kabupaten Probolinggo' },
];

const ritusItems: OPKItem[] = [
  { id: 'opk-r-001', name: 'Upacara Kasada', categoryId: 'ritus', description: 'Ritual utama masyarakat Tengger di Bromo', locationText: 'Sukapura, Sumber' },
  { id: 'opk-r-002', name: 'Upacara Unan-unan', categoryId: 'ritus', description: 'Ritual adat Tengger', locationText: 'Sukapura' },
  { id: 'opk-r-003', name: 'Upacara Karo', categoryId: 'ritus', description: 'Ritual hari raya masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-r-004', name: 'Upacara Liliwet', categoryId: 'ritus', description: 'Ritual makan bersama', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-005', name: 'Upacara Pujan', categoryId: 'ritus', description: 'Ritual pujan masyarakat Tengger', locationText: 'Sukapura' },
  { id: 'opk-r-006', name: 'Upacara Tugel Kuncung', categoryId: 'ritus', description: 'Ritual potong rambut pertama', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-007', name: 'Ritual Sesajen', categoryId: 'ritus', description: 'Ritual persembahan sesajen', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-008', name: 'Ritual Selamatan Laut', categoryId: 'ritus', description: 'Ritual syukuran laut', locationText: 'Pesisir utara' },
  { id: 'opk-r-009', name: 'Ritual Hajat Bumi', categoryId: 'ritus', description: 'Ritual syukuran bumi', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-010', name: 'Ritual Nyadran', categoryId: 'ritus', description: 'Ritual ziarah kubur', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-011', name: 'Ritual Tahlilan', categoryId: 'ritus', description: 'Ritual doa bersama', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-012', name: 'Ritual Yasinan', categoryId: 'ritus', description: 'Pembacaan surat Yasin', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-r-013', name: 'Ritual Syukuran', categoryId: 'ritus', description: 'Ritual syukuran tradisional', locationText: 'Kabupaten Probolinggo' },
];

const pengetahuanItems: OPKItem[] = [
  { id: 'opk-pt-001', name: 'Pengobatan Tradisional Tengger', categoryId: 'pengetahuan-tradisional', description: 'Sistem pengobatan tradisional masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-pt-002', name: 'Pengobatan Tradisional Pijat', categoryId: 'pengetahuan-tradisional', description: 'Teknik pijat tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-003', name: 'Jamu Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan ramuan jamu tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-004', name: 'Pertanian Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Sistem pertanian tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-005', name: 'Pranata Mangsa', categoryId: 'pengetahuan-tradisional', description: 'Sistem penanggalan musim tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-006', name: 'Ramuan Obat Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan ramuan obat herbal', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-007', name: 'Kuliner Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan memasak kuliner tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-008', name: 'Rawon Nguling', categoryId: 'pengetahuan-tradisional', description: 'Kuliner rawon khas Nguling', locationText: 'Tongas' },
  { id: 'opk-pt-009', name: 'Nasi Jagung', categoryId: 'pengetahuan-tradisional', description: 'Makanan khas berbahan jagung', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-010', name: 'Wedang Secang', categoryId: 'pengetahuan-tradisional', description: 'Minuman tradisional khas', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-011', name: 'Brem Probolinggo', categoryId: 'pengetahuan-tradisional', description: 'Minuman fermentasi tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-012', name: 'Tape Ketan', categoryId: 'pengetahuan-tradisional', description: 'Makanan fermentasi tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-013', name: 'Kerajinan Anyaman', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan menganyam', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-014', name: 'Batik Probolinggo', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan membatik', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-015', name: 'Tenun Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan menenun', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-016', name: 'Pengolahan Hasil Laut', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan mengolah hasil laut', locationText: 'Pesisir utara' },
  { id: 'opk-pt-017', name: 'Budidaya Tanaman', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan budidaya tanaman', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-018', name: 'Peternakan Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Sistem peternakan tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-019', name: 'Perikanan Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Teknik penangkapan ikan tradisional', locationText: 'Pesisir utara' },
  { id: 'opk-pt-020', name: 'Arsitektur Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan membangun rumah adat', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-021', name: 'Kalender Tengger', categoryId: 'pengetahuan-tradisional', description: 'Sistem kalender masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-pt-022', name: 'Pengetahuan Astronomi Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan astronomi tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-023', name: 'Ramalan Cuaca Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan meramal cuaca', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-024', name: 'Pengawetan Makanan Tradisional', categoryId: 'pengetahuan-tradisional', description: 'Teknik pengawetan makanan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-025', name: 'Pengolahan Gula Kelapa', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan mengolah gula kelapa', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-026', name: 'Pengolahan Kopi', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan mengolah kopi', locationText: 'Pegunungan Probolinggo' },
  { id: 'opk-pt-027', name: 'Pengolahan Mangga', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan mengolah mangga', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-028', name: 'Pengolahan Anggur', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan mengolah anggur', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-029', name: 'Pembuatan Gula Merah', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan membuat gula merah', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-030', name: 'Pembuatan Kerupuk', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan membuat kerupuk tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pt-031', name: 'Pembuatan Tempe', categoryId: 'pengetahuan-tradisional', description: 'Pengetahuan membuat tempe', locationText: 'Kabupaten Probolinggo' },
];

const teknologiItems: OPKItem[] = [
  { id: 'opk-tt-001', name: 'Alat Pertanian Tradisional', categoryId: 'teknologi-tradisional', description: 'Peralatan pertanian tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-002', name: 'Alat Penangkap Ikan Tradisional', categoryId: 'teknologi-tradisional', description: 'Peralatan nelayan tradisional', locationText: 'Pesisir utara' },
  { id: 'opk-tt-003', name: 'Alat Tenun', categoryId: 'teknologi-tradisional', description: 'Peralatan tenun tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-004', name: 'Alat Memasak Tradisional', categoryId: 'teknologi-tradisional', description: 'Peralatan memasak tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-005', name: 'Alat Pembuat Jamu', categoryId: 'teknologi-tradisional', description: 'Peralatan membuat jamu', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-006', name: 'Arsitektur Rumah Adat Tengger', categoryId: 'teknologi-tradisional', description: 'Teknologi bangunan rumah adat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-tt-007', name: 'Pembuatan Perahu Tradisional', categoryId: 'teknologi-tradisional', description: 'Teknologi pembuatan perahu', locationText: 'Pesisir utara' },
  { id: 'opk-tt-008', name: 'Alat Musik Tradisional', categoryId: 'teknologi-tradisional', description: 'Pembuatan alat musik tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-009', name: 'Anyaman Bambu', categoryId: 'teknologi-tradisional', description: 'Teknologi anyaman bambu', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-010', name: 'Pandai Besi Tradisional', categoryId: 'teknologi-tradisional', description: 'Teknologi pandai besi', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-011', name: 'Pembuatan Gerabah', categoryId: 'teknologi-tradisional', description: 'Teknologi pembuatan gerabah', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-012', name: 'Pembuatan Batik', categoryId: 'teknologi-tradisional', description: 'Teknologi pembuatan batik', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-013', name: 'Pembuatan Gula Kelapa', categoryId: 'teknologi-tradisional', description: 'Teknologi pembuatan gula kelapa', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-014', name: 'Pembuatan Minyak Kelapa', categoryId: 'teknologi-tradisional', description: 'Teknologi pembuatan minyak kelapa', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-015', name: 'Sistem Irigasi Tradisional', categoryId: 'teknologi-tradisional', description: 'Teknologi pengairan tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-016', name: 'Alat Transportasi Tradisional', categoryId: 'teknologi-tradisional', description: 'Teknologi transportasi tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-tt-017', name: 'Pembuatan Genteng', categoryId: 'teknologi-tradisional', description: 'Teknologi pembuatan genteng', locationText: 'Kabupaten Probolinggo' },
];

const seniItems: OPKItem[] = [
  { id: 'opk-s-001', name: 'Tari Glipang', categoryId: 'seni', description: 'Tarian tradisional khas Probolinggo', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-002', name: 'Jaran Bodhag', categoryId: 'seni', description: 'Kesenian kuda lumping khas', locationText: 'Lumbang' },
  { id: 'opk-s-003', name: 'Tari Lengger', categoryId: 'seni', description: 'Tarian tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-004', name: 'Tari Topeng', categoryId: 'seni', description: 'Tarian topeng tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-005', name: 'Ludruk', categoryId: 'seni', description: 'Seni pertunjukan ludruk', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-006', name: 'Wayang Kulit', categoryId: 'seni', description: 'Seni pertunjukan wayang kulit', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-007', name: 'Wayang Orang', categoryId: 'seni', description: 'Seni pertunjukan wayang orang', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-008', name: 'Ketoprak', categoryId: 'seni', description: 'Seni pertunjukan ketoprak', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-009', name: 'Musik Patrol', categoryId: 'seni', description: 'Musik tradisional patrol', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-010', name: 'Musik Terbangan', categoryId: 'seni', description: 'Musik tradisional terbangan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-011', name: 'Hadrah', categoryId: 'seni', description: 'Seni musik hadrah', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-012', name: 'Samroh', categoryId: 'seni', description: 'Seni musik samroh', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-013', name: 'Tarian Tradisional Tengger', categoryId: 'seni', description: 'Tarian masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-s-014', name: 'Musik Gamelan', categoryId: 'seni', description: 'Seni musik gamelan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-015', name: 'Seni Lukis', categoryId: 'seni', description: 'Seni lukis tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-016', name: 'Seni Ukir', categoryId: 'seni', description: 'Seni ukir tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-017', name: 'Pencak Silat', categoryId: 'seni', description: 'Seni bela diri tradisional', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-018', name: 'Tari Remo', categoryId: 'seni', description: 'Tarian penyambutan khas Jawa Timur', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-019', name: 'Bantengan', categoryId: 'seni', description: 'Kesenian bantengan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-020', name: 'Reog', categoryId: 'seni', description: 'Kesenian reog', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-s-021', name: 'Kuntulan', categoryId: 'seni', description: 'Kesenian kuntulan', locationText: 'Kabupaten Probolinggo' },
];

const bahasaItems: OPKItem[] = [
  { id: 'opk-b-001', name: 'Bahasa Madura Dialek Probolinggo', categoryId: 'bahasa', description: 'Dialek bahasa Madura di Probolinggo', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-b-002', name: 'Bahasa Jawa Dialek Probolinggo', categoryId: 'bahasa', description: 'Dialek bahasa Jawa di Probolinggo', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-b-003', name: 'Bahasa Tengger', categoryId: 'bahasa', description: 'Bahasa khas masyarakat Tengger', locationText: 'Sukapura, Sumber' },
  { id: 'opk-b-004', name: 'Sastra Lisan Tengger', categoryId: 'bahasa', description: 'Sastra lisan masyarakat Tengger', locationText: 'Sukapura, Sumber' },
];

const permainanRakyatItems: OPKItem[] = [
  { id: 'opk-pr-001', name: 'Egrang', categoryId: 'permainan-rakyat', description: 'Permainan tradisional egrang', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-002', name: 'Gasing', categoryId: 'permainan-rakyat', description: 'Permainan tradisional gasing', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-003', name: 'Congklak', categoryId: 'permainan-rakyat', description: 'Permainan tradisional congklak', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-004', name: 'Layangan', categoryId: 'permainan-rakyat', description: 'Permainan tradisional layang-layang', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-005', name: 'Kelereng', categoryId: 'permainan-rakyat', description: 'Permainan tradisional kelereng', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-006', name: 'Petak Umpet', categoryId: 'permainan-rakyat', description: 'Permainan tradisional petak umpet', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-007', name: 'Gobak Sodor', categoryId: 'permainan-rakyat', description: 'Permainan tradisional gobak sodor', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-008', name: 'Bentengan', categoryId: 'permainan-rakyat', description: 'Permainan tradisional bentengan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-009', name: 'Jaranan', categoryId: 'permainan-rakyat', description: 'Permainan tradisional jaranan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-010', name: 'Bakiak', categoryId: 'permainan-rakyat', description: 'Permainan tradisional bakiak', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-011', name: 'Dakon', categoryId: 'permainan-rakyat', description: 'Permainan tradisional dakon', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-012', name: 'Engklek', categoryId: 'permainan-rakyat', description: 'Permainan tradisional engklek', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-013', name: 'Lompat Tali', categoryId: 'permainan-rakyat', description: 'Permainan tradisional lompat tali', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-014', name: 'Bola Bekel', categoryId: 'permainan-rakyat', description: 'Permainan tradisional bola bekel', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-015', name: 'Sumpitan', categoryId: 'permainan-rakyat', description: 'Permainan tradisional sumpitan', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-016', name: 'Ketapel', categoryId: 'permainan-rakyat', description: 'Permainan tradisional ketapel', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-017', name: 'Ular Naga', categoryId: 'permainan-rakyat', description: 'Permainan tradisional ular naga', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-pr-018', name: 'Cublak-cublak Suweng', categoryId: 'permainan-rakyat', description: 'Permainan tradisional cublak-cublak suweng', locationText: 'Kabupaten Probolinggo' },
];

const olahragaTradisionalItems: OPKItem[] = [
  { id: 'opk-ot-001', name: 'Karapan Sapi', categoryId: 'olahraga-tradisional', description: 'Olahraga tradisional karapan sapi khas Madura', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ot-002', name: 'Pencak Silat', categoryId: 'olahraga-tradisional', description: 'Seni bela diri tradisional pencak silat', locationText: 'Kabupaten Probolinggo' },
  { id: 'opk-ot-003', name: 'Panahan Tradisional', categoryId: 'olahraga-tradisional', description: 'Olahraga panahan tradisional', locationText: 'Kabupaten Probolinggo' },
];

export const opkCategories: OPKCategory[] = [
  { id: 'manuskrip',               name: 'Manuskrip',               count: manuskripItems.length,             description: 'Naskah kuno dan dokumen bersejarah yang tersimpan di masyarakat', accentColor: '#8B6914', items: manuskripItems, source },
  { id: 'tradisi-lisan',           name: 'Tradisi Lisan',           count: tradisiLisanItems.length,           description: 'Cerita rakyat, legenda, mite, dan pantun yang diwariskan turun-temurun', accentColor: '#C0392B', items: tradisiLisanItems, source },
  { id: 'adat-istiadat',           name: 'Adat Istiadat',           count: adatIstiadatItems.length,           description: 'Upacara adat dan tradisi yang mengatur kehidupan bermasyarakat', accentColor: '#1A7A4A', items: adatIstiadatItems, source },
  { id: 'ritus',                   name: 'Ritus',                   count: ritusItems.length,                 description: 'Ritual dan upacara sakral yang masih dijalankan masyarakat', accentColor: '#6B3FA0', items: ritusItems, source },
  { id: 'pengetahuan-tradisional', name: 'Pengetahuan Tradisional', count: pengetahuanItems.length,           description: 'Kearifan lokal dalam pengobatan, kuliner, pertanian, dan kehidupan sehari-hari', accentColor: '#D4A843', items: pengetahuanItems, source },
  { id: 'teknologi-tradisional',   name: 'Teknologi Tradisional',   count: teknologiItems.length,             description: 'Alat, teknik, dan teknologi warisan leluhur yang masih digunakan', accentColor: '#4A6B8A', items: teknologiItems, source },
  { id: 'seni',                    name: 'Seni',                    count: seniItems.length,                  description: 'Seni pertunjukan, tari, musik, dan seni rupa tradisional', accentColor: '#C0392B', items: seniItems, source },
  { id: 'bahasa',                  name: 'Bahasa',                  count: bahasaItems.length,                description: 'Bahasa daerah dan dialek lokal yang hidup di masyarakat', accentColor: '#2E6B3E', items: bahasaItems, source },
  { id: 'permainan-rakyat',        name: 'Permainan Rakyat',        count: permainanRakyatItems.length,       description: 'Permainan tradisional yang dimainkan lintas generasi', accentColor: '#E07B39', items: permainanRakyatItems, source },
  { id: 'olahraga-tradisional',    name: 'Olahraga Tradisional',    count: olahragaTradisionalItems.length,   description: 'Olahraga dan keterampilan fisik warisan budaya', accentColor: '#8B2020', items: olahragaTradisionalItems, source },
];
