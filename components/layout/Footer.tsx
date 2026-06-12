import Image from "next/image";

const footerLinks = [
  { href: "#peta", label: "Peta Sebaran Budaya" },
  { href: "#cagar-budaya", label: "Cagar Budaya" },
  { href: "#wbtb", label: "Warisan Budaya Tak Benda" },
  { href: "#opk", label: "Objek Pemajuan Kebudayaan" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      role="contentinfo"
      className="bg-[#1C0F08] text-[#FAF5EE] py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand — logo on the left, text beside/below */}
          <div>
            {/* Logo + brand name row */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <Image
                    src="/assets/logos/Logo_Kabupaten_Probolinggo_-_Seal_of_Probolinggo_Regency.svg.png"
                    alt="Logo Kabupaten Probolinggo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="relative h-12 w-12">
                  <Image
                    src="/assets/logos/Coat_of_arms_of_the_City_of_Probolinggo.svg"
                    alt="Lambang Kota Probolinggo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h4
                  className="text-xl font-display font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  PetaBudaya Probolinggo
                </h4>
              </div>
            </div>
            <p className="text-sm text-[#DDD0C0] leading-relaxed">
              Dinas Kebudayaan dan Pariwisata
              <br />
              Kabupaten Probolinggo
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h5 className="text-sm font-semibold mb-3 text-[#D4A843]">
              Navigasi
            </h5>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block lightsweep text-[#DDD0C0] hover:text-white focus-visible:text-white focus-visible:underline transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Disclaimer */}
          <div>
            <h5 className="text-sm font-semibold mb-3 text-[#D4A843]">
              Sumber Data
            </h5>
            <p className="text-xs text-[#DDD0C0] leading-relaxed">
              Data bersumber dari dokumen resmi Dinas Kebudayaan dan Pariwisata
              Kabupaten Probolinggo. Beberapa data masih dalam proses validasi
              dan dapat diperbarui sewaktu-waktu. Koordinat presisi diambil dari
              geocoding OpenStreetMap/Nominatim.
            </p>
            <p className="text-xs text-[#6B4F3A] mt-3">
              Terakhir diperbarui: Juni 2026
            </p>
          </div>
        </div>

        <div className="border-t border-[#6B4F3A] mt-10 pt-6 text-center text-xs text-[#6B4F3A]">
          &copy; {new Date().getFullYear()} Dinas Kebudayaan dan Pariwisata
          Kabupaten Probolinggo. Seluruh konten dalam proses validasi.
        </div>
      </div>
    </footer>
  );
}
