import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import clientPromise from "@/lib/db";

const client = await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(client.db("fixmyride"), { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CUSTOMER",
        input: true,
      },
    },
  },
});
