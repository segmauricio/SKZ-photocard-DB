const MembersSelect = ({ disabled = false, value, onChange }) => {
  const members = [
    "Bang Chan",
    "Changbin",
    "Felix",
    "Han",
    "Hyunjin",
    "I.N",
    "Lee Know",
    "Seungmin",
  ];

  return (
    <select
    disabled={disabled}
      className="form-select"
      aria-label="Default select example"
      onChange={({ target }) => onChange(target.value)}
      value={value}
    >
      <option value="default">
        Select a member
      </option>
      {members.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  )
}
export default MembersSelect