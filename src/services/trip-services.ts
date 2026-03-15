import { CommonUrl, replaceUrlParams } from "../api/url";
import { MOCK_TRIPS } from "../mocks";
import { TripMapper } from "@/src/api/mapper";
import { apiClient } from "@/src/api/client";
import { TripResponseDto } from "../api/response";
import { MarketingTripCardData } from "../types/trip.type";

export const TripService = {
  async getTrendingTrip(): Promise<MarketingTripCardData[]> {
    const rawData: TripResponseDto[] =
      process.env.USE_MOCK_DATA === "true"
        ? MOCK_TRIPS
        : await apiClient<TripResponseDto[]>(CommonUrl.TRENDING_TRIPS);

    return rawData.map(TripMapper.toMarketingCard);
  },

  async getTripDetail(tripId: string): Promise<MarketingTripCardData | null> {
    const rawData =
      process.env.USE_MOCK_DATA === "true"
        ? MOCK_TRIPS.find((t) => t.id === tripId)
        : await apiClient<TripResponseDto>(replaceUrlParams(CommonUrl.TRIP_DETAIL, { id: tripId }));

    if (!rawData) return null;

    return TripMapper.toMarketingCard(rawData);
  },
};
