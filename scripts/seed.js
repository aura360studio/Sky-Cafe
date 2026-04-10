import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🚀 Starting Supabase Seeding...');

  try {
    // 1. Clear existing data (Optional, be careful)
    // await supabase.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Load Local Data
    const menuData = JSON.parse(fs.readFileSync('./src/data/menu.json', 'utf8'));
    const eventsData = JSON.parse(fs.readFileSync('./src/data/events.json', 'utf8'));

    // 3. Seed Categories
    console.log('📦 Seeding Categories...');
    const allCategories = [
      ...menuData.dineInCategories.map(c => ({ ...c, mode: 'DINE_IN' })),
      ...menuData.deliveryCategories.map(c => ({ ...c, mode: 'DELIVERY' }))
    ];

    // Deduplicate by ID
    const uniqueCats = [];
    const catMap = new Map();
    for (const cat of allCategories) {
      if (!catMap.has(cat.id)) {
        const { data, error } = await supabase
          .from('categories')
          .insert({ name: cat.name, icon: cat.icon, mode: cat.mode })
          .select()
          .single();
        
        if (error) throw error;
        catMap.set(cat.id, data.id); // Map old local ID to new Supabase UUID
        console.log(`   ✅ Created category: ${cat.name} (${cat.mode})`);
      }
    }

    // 4. Seed Menu Items
    console.log('🍔 Seeding Menu Items...');
    const allItems = [
      ...menuData.dineInItems.map(i => ({ ...i, mode: 'DINE_IN' })),
      ...menuData.deliveryItems.map(i => ({ ...i, mode: 'DELIVERY' }))
    ];

    const menuInsertData = allItems.map(item => ({
      category_id: catMap.get(item.categoryId),
      name: item.title,
      price: item.price,
      description: item.description || '',
      is_veg: item.isVegetarian || false,
      is_available: item.isAvailable !== undefined ? item.isAvailable : true
    })).filter(item => item.category_id); // Ensure we only insert if category exists

    const { error: menuError } = await supabase.from('menu_items').insert(menuInsertData);
    if (menuError) throw menuError;
    console.log(`   ✅ Inserted ${menuInsertData.length} menu items.`);

    // 5. Seed Events
    console.log('🎉 Seeding Events...');
    const eventInsertData = eventsData.map(event => ({
      title: event.title,
      subtitle: event.date,
      date: event.time,
      image_url: '' // Add default or placeholder if needed
    }));

    const { error: eventError } = await supabase.from('events').insert(eventInsertData);
    if (eventError) throw eventError;
    console.log(`   ✅ Inserted ${eventInsertData.length} events.`);

    console.log('\n✨ Seeding Completed Successfully!');
  } catch (err) {
    console.error('\n❌ Seeding Failed:', err.message);
  }
}

seed();
