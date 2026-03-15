import {createClient} from '@supabase/supabase-js';

const URL = "https://blxisidyeizcdruhuiue.supabase.co";
const API_KEY ="sb_publishable_6AM6WFzz8smzP3zo0FucEQ_lkYi7GqH";

export const supabase = createClient(URL, API_KEY);