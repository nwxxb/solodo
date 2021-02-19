const DATA = {
  tasks: {
    "task-1": {
      id: "task-1",
      content:
        "1. Mulai ketik tugas yang ingin kamu kerjakan pada kotak di atas 👆",
      isCompleted: false,
    },
    "task-2": {
      id: "task-2",
      content:
        "2. 👷‍♀️ Kamu juga bisa klik tulisan ini untuk mengedit, atau klik tanda silang di kanan untuk menghapus",
      isCompleted: false,
    },
    "task-3": {
      id: "task-3",
      content:
        "3. 😱 Waduh, urutannya tidak benar, kamu bisa ubah posisi tugas ini dengan menggeser ke atas/bawah icon di samping kiri",
      isCompleted: false,
    },
    "task-4": {
      id: "task-4",
      content:
        "4. 🎬 Tanpa basa-basi, mulai tulis & atur tugasmu, dan mulai kerjakan dengan mengklik tombol fokus di bawah!",
      isCompleted: false,
    },
  },

  editColumn: {
    id: "editColumn",
    taskOrder: ["task-1", "task-3", "task-2", "task-4"],
  },

  completedTasks: [],
};

export default DATA