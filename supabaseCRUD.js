import { supabase } from "./supabaseClient.js";

/* === CREATE === */
export async function saveHolidayToSupabase(holiday) {
  const { data, error } = await supabase
    .from("holidays_favorites")
    .insert([holiday]);

  if (error) console.error("Error guardando en Supabase:", error);
  else console.log("✅ Guardado en Supabase:", data);
}

/* === READ === */
export async function getSavedHolidays() {
  const { data, error } = await supabase.from("holidays_favorites").select("*");
  if (error) console.error("Error al leer:", error);
  return data;
}

/* === DELETE === */
export async function deleteHoliday(id) {
  const { error } = await supabase.from("holidays_favorites").delete().eq("id", id);
  if (error) console.error("Error al borrar:", error);
  else console.log("🗑️ Eliminado correctamente");
}
