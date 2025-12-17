import { DaysTogetherTile } from "../tiles/DaysTogetherTile.js";

const registry = {
  DAYS_TOGETHER: DaysTogetherTile
};

export default function TileRenderer({ tile }) {
  const Tile = registry[tile.type];
  return <Tile />;
}
