import { validateFullAmenities } from "./helpers";
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
  Listing: {
    amenities: ({ id, amenities }, _, { dataSources }) => {
      return validateFullAmenities(amenities)
        ? amenities
        : dataSources.listingAPI.getAmenities(id);
    },
  },
  Mutation: {
    createListing: async (_, { input }, { dataSources }) => {
      try {
        const response = await dataSources.listingAPI.createListing(input);
        return {
          code: 200,
          success: true,
          message: "Listing successfully created!",
          listing: response,
        };
      } catch (err) {
        console.log(err);

        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err.extensions.response.body}`,
          listing: null,
        };
      }
    },
  },
};
