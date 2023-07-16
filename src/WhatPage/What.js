function What() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center">What?</h1>
      <p className="text-xl text-center mb-2 tracking-wider">
        <span className="text-blue-500 font-medium">SoloDo</span>
        adalah aplikasi manajemen tugas yang didesain untuk pemula yang belum
        pernah melakukan manajemen pada tugasnya. Tanpa login dan fitur yang
        berlebihan kamu bisa langsung menulis apa saja yang ingin kamu
        cari/kerjakan di browser.
      </p>
      <p className="text-xl text-center mb-2 tracking-wider">
        Cukup ketikkan tugasmu, edit hapus, atur daftar tugasmu, mulai fokus dan
        kerjakan. Kamu juga bisa bookmark atau pin tab ini agar mudah diakses di
        kemudian hari.
      </p>
      <p className="text-xl text-center mb-8 tracking-wider">
        Jalani rutinitas manajemen tugas dan kamu akan terbiasa!
      </p>
    </div>
  );
}

export default What;
