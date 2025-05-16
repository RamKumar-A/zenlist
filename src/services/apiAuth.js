import supabase from './supabase';

export async function signup({ fullName, email, password }) {
  const { data: signupData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return signupData;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
}

function setSessionInStorage(session) {
  if (session) {
    sessionStorage.setItem('supabaseSession', JSON.stringify(session));
  } else {
    sessionStorage.removeItem('supabaseSession');
  }
}

function getSessionInStorage() {
  const session = sessionStorage.getItem('supabaseSession');
  return session ? JSON.parse(session) : null;
}

export async function getCurrentUser() {
  let session = getSessionInStorage();
  if (!session) {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      console.error('Error retrieving session:', error || 'No session');
      return null;
    }
    session = data.session;
    setSessionInStorage(session);
  }
  if (!session) return null;

  const { data: user, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  sessionStorage.removeItem('supabaseSession');
}

export async function updateCurrentUser({
  password,
  fullName,
  email,
  oldPassword,
}) {
  let updateData;
  if (password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: oldPassword,
    });

    if (error) {
      // Current password is incorrect
      console.error('Invalid current password');
      throw new Error('Invalid current password');
    }
    updateData = { password };
  }
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  return data;
}

export async function deleteUser(userId) {
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);
  if (authError) throw new Error(authError.message);
}
