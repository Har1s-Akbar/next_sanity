import { createClient } from "next-sanity";

const projectId = "2hdzu35m";
const dataset = "production";
const apiVersion = "2023-01-01";
const token = process.env.NEXT_PUBLIC_SANITY_EDITOR_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  ignoreBrowserTokenWarning: true,  
});

