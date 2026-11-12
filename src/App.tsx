import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Situs Tes Kecepatan Membaca</h1>
        <p className={styles.subtitle}>
          Pilih tingkat kesulitan, bacakan teks nyaring, dan lihat hasilnya.
        </p>
      </header>
    </div>
  )
}

export default App
