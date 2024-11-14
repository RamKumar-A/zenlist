import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nyqymskbkrkekqpgyjeg.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cXltc2tia3JrZWtxcGd5amVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MTY3NjksImV4cCI6MjA0NTA5Mjc2OX0.WJabCW0-vhHgju2CntUm0XK4IfR0SGje_9WCKfVa144';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
