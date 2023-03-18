const AlbumsSelect = ({ disabled = false, value, onChange }) => {
  const albums = [
    "Mixtape",
    "I Am NOT",
    "I am WHO",
    "I am YOU",
    "Clé 1: Miroh",
    "Clé 2: Yellow Wood",
    "Clé: Levanter",
    "Go Live",
    "NOEASY",
    "Christmas EveL",
    "Oddinary",
    "MAXIDENT",
    "All In",
    "Circus",
    "The Sound",
    "SKZ2020",
    "SKZ2021",
    "SKZ-REPLAY",
  ];

  return (
    <select
    disabled={disabled}
      className="form-select"
      aria-label="Default select example"
      onChange={({ target }) => onChange(target.value)}
      value={value}
    >
      <option disabled value="default">
        Select Album
      </option>
      {albums.map((albumcito) => (
        <option key={albumcito} value={albumcito}>
          {albumcito}
        </option>
      ))}
    </select>
  )
}
export default AlbumsSelect