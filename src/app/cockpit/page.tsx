import type { Metadata } from "next";
import CockpitPage from "./CockpitPage";

export const metadata: Metadata = {
  title: "数据驾驶舱",
  description: "基于本地模拟数据的可视化驾驶舱。",
};

export default function CockpitRoute() {
  return <CockpitPage />;
}
