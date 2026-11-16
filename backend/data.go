package main

// Program represents one learning path offered by the tutoring center.
type Program struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Level       string `json:"level"`
	Price       string `json:"price"`
	Duration    string `json:"duration"`
	Description string `json:"description"`
	Accent      string `json:"accent"`
}

type Testimonial struct {
	Quote  string `json:"quote"`
	Name   string `json:"name"`
	Role   string `json:"role"`
	Result string `json:"result"`
}

type Tutor struct {
	Name     string `json:"name"`
	Subject  string `json:"subject"`
	Bio      string `json:"bio"`
	Initials string `json:"initials"`
	Color    string `json:"color"`
}

type Stat struct {
	Value  int    `json:"value"`
	Suffix string `json:"suffix"`
	Label  string `json:"label"`
}

var programs = []Program{
	{ID: "sd", Name: "Teman SD", Level: "Kelas 1–6", Price: "Rp 320k", Duration: "8 sesi / bulan", Description: "Belajar dasar dengan cara yang seru, sabar, dan terasa dekat.", Accent: "mustard"},
	{ID: "smp", Name: "Laju SMP", Level: "Kelas 7–9", Price: "Rp 420k", Duration: "8 sesi / bulan", Description: "Pondasi kuat untuk matematika, sains, dan percaya diri di sekolah.", Accent: "tomato"},
	{ID: "sma", Name: "Ngebut SMA", Level: "Kelas 10–12", Price: "Rp 520k", Duration: "8 sesi / bulan", Description: "Strategi belajar yang lebih tajam untuk target nilai dan jurusan.", Accent: "sage"},
	{ID: "utbk", Name: "Sprint UTBK", Level: "Kelas 12 & gap year", Price: "Rp 680k", Duration: "12 sesi / bulan", Description: "Latihan terarah, bedah soal, dan simulasi yang bikin siap tempur.", Accent: "mustard"},
	{ID: "english", Name: "English Club", Level: "Semua usia", Price: "Rp 390k", Duration: "8 sesi / bulan", Description: "Ngobrol lebih pede dengan kelas kecil dan praktik yang hidup.", Accent: "tomato"},
}

var testimonials = []Testimonial{
	{Quote: "Dulu harus disuruh. Sekarang malah minta tambah sesi.", Name: "Nadia Pratama", Role: "Orang tua siswa SD", Result: "Nilai Matematika 72 → 94"},
	{Quote: "Tutor-nya ngerti cara jelasin sampai aku benar-benar paham.", Name: "Raka Wijaya", Role: "Siswa SMP", Result: "Peringkat 18 → 5"},
	{Quote: "Simulasi UTBK-nya bikin aku tahu harus fokus di mana.", Name: "Alya Safitri", Role: "Siswa kelas 12", Result: "Target skor tercapai"},
	{Quote: "Bukan cuma les. Anak saya jadi punya rutinitas belajar.", Name: "Dimas & Sari", Role: "Orang tua siswa SMA", Result: "Konsisten 8 bulan"},
	{Quote: "Kelas English Club bikin saya berani presentasi tanpa teks.", Name: "Kevin Hartono", Role: "Siswa SMP", Result: "Speaking makin pede"},
	{Quote: "Update perkembangan anaknya jelas dan enak diajak diskusi.", Name: "Maya Lestari", Role: "Orang tua siswa SD", Result: "Komunikasi selalu nyambung"},
}

var tutors = []Tutor{
	{Name: "Kak Naya", Subject: "Matematika", Bio: "Suka mengubah soal rumit jadi langkah kecil yang masuk akal.", Initials: "NY", Color: "tomato"},
	{Name: "Kak Bima", Subject: "Fisika", Bio: "Membawa eksperimen kecil dan rasa penasaran ke setiap sesi.", Initials: "BM", Color: "mustard"},
	{Name: "Kak Citra", Subject: "English", Bio: "Percakapan sehari-hari dulu, grammar menyusul dengan natural.", Initials: "CR", Color: "sage"},
	{Name: "Kak Reza", Subject: "UTBK", Bio: "Coach strategi yang tahu kapan harus gas dan kapan harus jeda.", Initials: "RZ", Color: "forest"},
}

var stats = []Stat{
	{Value: 1200, Suffix: "+", Label: "siswa aktif"},
	{Value: 95, Suffix: "%", Label: "nilai naik"},
	{Value: 40, Suffix: "+", Label: "tutor pilihan"},
	{Value: 8, Suffix: " th", Label: "menemani belajar"},
}
