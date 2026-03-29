// Remplacez par vos identifiants Supabase
const SUPABASE_URL = 'https://VOTRE_PROJET.supabase.co';
const SUPABASE_KEY = 'VOTRE_ANON_KEY';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.supabaseClient = _supabase;