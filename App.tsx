import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Post from './components/Post'; // import your Post component
import { Session } from '@supabase/supabase-js';
export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? <Post key={session.user.id} /> : <Auth />}
    </View>
  );
}
