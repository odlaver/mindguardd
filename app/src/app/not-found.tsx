import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full min-h-[70vh] p-4 text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
        Tujuan tidak ditemukan
      </h2>
      <p className="text-lg text-ink-soft mb-8 max-w-md">
        Maaf, halaman atau laporan yang Anda cari tidak dapat ditemukan. Alamat mungkin salah ketik atau data telah dihapus.
      </p>
      <Link href="/" className="button-primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
