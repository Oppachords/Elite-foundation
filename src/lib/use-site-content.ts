import { useEffect, useState } from "react";
import { getStore, subscribeStore, type SponsoredChild } from "./admin-store";
import { PROJECTS, GALLERY, type Project } from "./site-data";

export function useSiteContent() {
  const [store, setStore] = useState(getStore);

  useEffect(() => subscribeStore(() => setStore(getStore())), []);

  return {
    children: store.children,
    projects: store.projects.length ? store.projects : PROJECTS,
    gallery: store.gallery.length ? store.gallery : GALLERY,
    donations: store.donations,
    volunteers: store.volunteers,
  };
}

export function useSponsoredChildren(): SponsoredChild[] {
  const { children } = useSiteContent();
  return children;
}

export function useProjects(): Project[] {
  const { projects } = useSiteContent();
  return projects;
}

export function useGallery() {
  const { gallery } = useSiteContent();
  return gallery;
}
