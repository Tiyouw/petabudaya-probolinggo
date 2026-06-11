export default function Footer() {
  return (
    <footer
      id="footer"
      role="contentinfo"
      className="bg-[#1C0F08] text-[#FAF5EE] py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h4
              className="text-xl font-display font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PetaBudaya Probolinggo
            </h4>
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
              <li>
                <a
                  href="#peta"
                  className="text-[#DDD0C0] hover:text-white focus-visible:text-white focus-visible:underline transition-colors"
                >
                  Peta Sebaran Budaya
                </a>
              </li>
              <li>
                <a
                  href="#cagar-budaya"
                  className="text-[#DDD0C0] hover:text-white focus-visible:text-white focus-visible:underline transition-colors"
                >
                  Cagar Budaya
                </a>
              </li>
              <li>
                <a
                  href="#wbtb"
                  className="text-[#DDD0C0] hover:text-white focus-visible:text-white focus-visible:underline transition-colors"
                >
                  Warisan Budaya Tak Benda
                </a>
              </li>
              <li>
                <a
                  href="#opk"
                  className="text-[#DDD0C0] hover:text-white focus-visible:text-white focus-visible:underline transition-colors"
                >
                  Objek Pemajuan Kebudayaan
                </a>
              </li>
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
