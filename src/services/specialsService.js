import { supabase } from '../core/supabase/client';

export const getTodaysSpecial = async () => {
  const { data } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_special', true)
    .eq('is_available', true)
    .limit(1)
    .maybeSingle();
  
  if (data) {
    return {
      id: data.id,
      title: data.name,
      description: data.description,
      price: data.price,
      image: data.image_url || ""
    };
  }
  return null;
};

export const getPopularItems = async () => {
  const { data } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_popular', true)
    .eq('is_available', true);
  
  return (data || []).map(item => ({
    id: item.id,
    title: item.name,
    price: item.price
  }));
};

export const getPromoCombos = async () => {
  const { data } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_combo', true)
    .eq('is_available', true);
  
  return (data || []).map(item => ({
    id: item.id,
    title: item.name,
    description: item.description,
    price: item.price
  }));
};
