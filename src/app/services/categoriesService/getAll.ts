import type { Categorie } from "../../entities/Categorie";
import { httpClient } from "../httpClient";

export async function getAll() {
  const { data } = await httpClient.get<Categorie[]>('/categories');

  return data;
}

