import { useEffect, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import ModalAddNewColor from "./ModalAddNewColor";

interface Props {
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
}


export default function Config({
  colors,
  setColors
}: Props) {
  const defaultColors: string[] = [
    "#6366f1",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
  ];

  const [showAddNewColorModal, setShowAddNewColorModal] =
    useState<boolean>(false);

//   Sync to localStorage & parent component
//   useEffect(() => {
//     localStorage.setItem("colors", JSON.stringify(colors));
//   }, [colors]);



  const addColor = (newColor: string) => {
    setColors((prev) => [...prev, newColor]);
  };

  const removeColor = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const updateColor = (index: number, newColor: string) => {
    setColors((prev) => {
      const updated = [...prev];
      updated[index] = newColor;
      return updated;
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "30px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            Color Configuration
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", marginTop: "8px" }}>
            Click a color to edit, hover to remove
          </p>
        </div>

        <div style={{ padding: "40px" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              borderRadius: "16px",
              padding: "40px",
              border: "2px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget.querySelector(
                      ".remove-btn"
                    ) as HTMLElement;
                    if (btn) btn.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget.querySelector(
                      ".remove-btn"
                    ) as HTMLElement;
                    if (btn) btn.style.opacity = "0";
                  }}
                >
                  {/* COLOR BLOCK */}
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "12px",
                      backgroundColor: color,
                      border: "3px solid white",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transition: "0.3s",
                    }}
                    onClick={() => {
                      const picker = document.createElement("input");
                      picker.type = "color";
                      picker.value = color;
                      picker.onchange = (e) =>
                        updateColor(
                          index,
                          (e.target as HTMLInputElement).value
                        );
                      picker.click();
                    }}
                  />

                  {/* DELETE BUTTON */}
                  <button
                    className="remove-btn"
                    onClick={() => removeColor(index)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      opacity: 0,
                      border: "none",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                  >
                    <BiX size={14} />
                  </button>

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6b7280",
                    }}
                  >
                    {color}
                  </div>
                </div>
              ))}

              {/* ADD BUTTON */}
              <button
                onClick={() => setShowAddNewColorModal(true)}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "3px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <BiPlus size={28} />
              </button>
              <ModalAddNewColor
                show={showAddNewColorModal}
                onClose={() => setShowAddNewColorModal(false)}
                onAddColor={(newColor) => {
                  addColor(newColor);
                  setShowAddNewColorModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
