import { TripService } from "@/src/services/trip-services";
import TrendingSectionClient from "./trending-section-client";

export default async function TrendingSection() {
  // 1. 在 Server 端極速獲取資料 (零延遲、不佔用瀏覽器資源)
  const trips = await TripService.getTrendingTrip();

  // 2. 把撈到的乾淨資料 (MarketingTripCardData[]) 當作 prop 往下傳
  return <TrendingSectionClient trips={trips} />;
}
