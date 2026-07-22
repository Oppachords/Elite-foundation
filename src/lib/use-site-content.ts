import { useQuery } from "@tanstack/react-query";
import { getGallery, getProjects, getSponsoredChildren } from "./api/cms.functions";
import { GALLERY, PROJECTS } from "./site-data";

async function safeQuery<T>(queryFn: () => Promise<T>, fallback: T) {
  try {
    return await queryFn();
  } catch {
    return fallback;
  }
}

export function useSponsoredChildren() {
  const { data } = useQuery({
    queryKey: ["sponsored-children"],
    queryFn: () => safeQuery(() => getSponsoredChildren(), []),
    retry: false,
  });
  return data ?? [];
}

export function useProjects() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => safeQuery(() => getProjects(), []),
    retry: false,
  });
  return data?.length ? data : PROJECTS;
}

export function useGallery() {
  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => safeQuery(() => getGallery(), []),
    retry: false,
  });
  return data?.length ? data : GALLERY;
}
