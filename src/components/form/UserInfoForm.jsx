import { usePortfolioStore } from "../../store/portfolioStore";

export default function UserInfoForm() {
  const user = usePortfolioStore((state) => state.user);
  const updateUser = usePortfolioStore((state) => state.updateUser);
  const updateProfilePicture = usePortfolioStore((state) => state.updateProfilePicture);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfilePicture(reader.result); // save as base64 string
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>User Information</h3>

      {/* Profile Picture Upload */}
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: "10px" }} />

      <input
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateUser("name", e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      <input
        placeholder="Title"
        value={user.title}
        onChange={(e) => updateUser("title", e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />

      <textarea
        placeholder="Bio"
        value={user.bio}
        onChange={(e) => updateUser("bio", e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
    </div>
  );
}
