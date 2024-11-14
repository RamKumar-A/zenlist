import supabase from './supabase';

export async function getTasks(userId) {
  let { data: tasks, error } = await supabase
    .from('tasks')
    .select('*,subtasks(id,title,isCompleted)')
    .eq('userId', userId); //populating subtasks
  if (error) {
    throw new Error(error);
  }
  return tasks;
}

export async function addTask(newTask) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([newTask])
    .select();
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}

export async function deleteTask(id) {
  const { error: subtaskError } = await supabase
    .from('subtasks')
    .delete()
    .eq('taskId', id);
  if (subtaskError) {
    console.log(subtaskError);
    throw new Error(subtaskError);
  }
  const { data, error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}

export async function updateTask(id, updateObj) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updateObj)
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}

export async function addSubtask(newSubtask) {
  const { data, error } = await supabase
    .from('subtasks')
    .insert([newSubtask])
    .select();

  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}

export async function updateSubtask(id, subtaskObj) {
  const { data, error } = await supabase
    .from('subtasks')
    .update(subtaskObj)
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}

export async function deleteSubtask(id) {
  const { data, error } = await supabase.from('subtasks').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}
