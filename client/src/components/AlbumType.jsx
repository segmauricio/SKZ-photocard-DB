const AlbumType = ({ disabled = false, value, onChange }) => {
  const albumType = ["CD Booklet", "Jewel Case", "DVD", "Kihno"];

  return (
    <select
      disabled={disabled}
      className="form-select"
      aria-label="Default select example"
      onChange={({ target }) => onChange(target.value)}
      value={value}
    >
      <option disabled value="default">
        Select Album Type
      </option>
      {albumType.map((tipoDeAlbum) => (
        <option key={tipoDeAlbum} value={tipoDeAlbum}>
          {tipoDeAlbum}
        </option>
      ))}
    </select>
  );
};

export default AlbumType;
