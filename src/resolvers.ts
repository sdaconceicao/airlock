import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    featuredListings: async (_, __, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
    listing: async (_, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
};
