import GithubLogo from "../GitHub-Mark-32px.png";

function What() {
  const solodoText = <span className="text-blue-500 font-medium">SoloDo</span>
    return (
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">What?</h1>
        <p className="text-xl text-center mb-1">
          {solodoText} adalah aplikasi manajemen tugas yang didesain untuk
          pemula yang belum pernah melakukan manajemen pada tugasnya. Tanpa
          login dan fitur yang berlebihan kamu bisa langsung menulis apa saja
          yang ingin kamu cari/kerjakan di browser.
        </p>
        <p className="text-xl text-center mb-1">
          Cukup ketikkan tugasmu, edit hapus, atur daftar tugasmu, mulai fokus
          dan kerjakan. Kamu bisa bookmark, pin pada tab, atau jadikan{" "}
          {solodoText} sebagai aplikasi di browser kesayangan anda
        </p>
        <p className="text-xl text-center mb-8">
          Jalani rutinitas manajemen tugas dan kamu akan terbiasa!
        </p>
        <div className="flex flex-col sm:flex-row justify-center">
          <a
            href="https://github.com/nawwab/solodo"
            className="p-4 flex items-center border rounded-md hover:bg-gray-100 cursor-pointer select-none mb-2 sm:mb-0 sm:mr-2"
          >
            <img className="w-4 h-4 inline mr-2" src={GithubLogo} alt="github" />
            <span>Github</span>
          </a>
          <a
            href="https://www.instagram.com/p/CLVhQ3rJcDJ/?utm_source=ig_web_button_share_sheet"
            className="p-4 flex items-center border text-white bg-red-400 self-center rounded-md hover:bg-red-500 cursor-pointer select-none"
          >
            <svg
              className="w-4 h-4 flex-shrink-0 stroke-current mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>
            Beri Like di Instagram untuk Mendukung Project Ini
          </a>
        </div>
      </div>
    );
}

export default What