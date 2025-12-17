import TileRenderer from "./TileRenderer.js";

export default function Desktop() {
  const tiles = [{ type: "DAYS_TOGETHER" }];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
      {tiles.map((t, i) => <TileRenderer key={i} tile={t} />)}
    </div>
  );
}
