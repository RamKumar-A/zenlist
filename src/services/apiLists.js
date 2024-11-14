import supabase from './supabase.js';

export async function getLists(userId) {
  let { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('userId', userId);
  if (error) {
    console.error(error);
    throw new Error('List could not be loaded');
  }
  return data;
}

export async function addList(list) {
  let { data, error } = await supabase.from('lists').insert([list]).select();
  if (error) {
    console.log(error);
    throw new Error('List could not be created!');
  }
  return data;
}
