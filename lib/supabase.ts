import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://owoqtaebjilqpshhgxco.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93b3F0YWViamlscXBzaGhneGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjQ4MzMsImV4cCI6MjAzMDE0MDgzM30.-GwxQZOzGlOEi48JAqEt-8xj4qYeJjgiTt9lDrBwnfM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})