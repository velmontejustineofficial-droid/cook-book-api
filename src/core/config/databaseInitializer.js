import pool from './database.js'

const defaultRecipes = [
  {
    title: 'Sinigang',
    category: 'Filipino',
    time: '60 min',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'A sour Filipino soup with vegetables and meat.',
    ingredients: ['pork', 'tamarind', 'tomato', 'onion', 'kangkong'],
  },
  {
    title: 'Adobo',
    category: 'Filipino',
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'A Filipino dish of meat braised in soy sauce, vinegar, garlic, and peppercorns.',
    ingredients: ['chicken', 'soy sauce', 'vinegar', 'garlic', 'bay leaves', 'black peppercorns'],
  },
  {
    title: 'Pakbet',
    category: 'Filipino',
    time: '35 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'A Filipino vegetable dish cooked with pork, shrimp paste, and local vegetables.',
    ingredients: ['pork', 'shrimp paste', 'bitter melon', 'eggplant', 'okra', 'squash', 'tomato'],
  },
  {
    title: 'Chicken Bowl',
    category: 'Healthy',
    time: '20 min',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'A balanced bowl with tender chicken, vegetables, and rice.',
    ingredients: ['chicken', 'rice', 'carrot', 'cucumber', 'soy sauce'],
  },
  {
    title: 'Salad Bowl',
    category: 'Healthy',
    time: '12 min',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'A fresh salad bowl with crisp greens and colorful vegetables.',
    ingredients: ['lettuce', 'tomato', 'cucumber', 'carrot', 'olive oil'],
  },
  {
    title: 'Pasta',
    category: 'Comfort',
    time: '18 min',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'A comforting pasta dish for a quick homemade meal.',
    ingredients: ['pasta', 'tomato sauce', 'garlic', 'onion', 'parmesan'],
  },
  {
    title: 'Avocado Toast',
    category: 'Breakfast',
    time: '8 min',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'Toasted bread topped with creamy avocado and simple seasonings.',
    ingredients: ['bread', 'avocado', 'salt', 'black pepper', 'lemon'],
  },
  {
    title: 'Creamy Pasta',
    category: 'Comfort',
    time: '30 min',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'Creamy pasta with a rich sauce and herbs.',
    ingredients: ['pasta', 'cream', 'garlic', 'butter', 'parmesan'],
  },
  {
    title: 'Berry Pancakes',
    category: 'Breakfast',
    time: '16 min',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=700&q=80',
    ownerId: 'community',
    description: 'Soft pancakes topped with fresh berries.',
    ingredients: ['flour', 'milk', 'egg', 'berries', 'maple syrup'],
  },
  {
    title: "Jane's Garden Pasta",
    category: 'Comfort',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80',
    ownerId: 'jane',
    description: 'A homemade pasta dish filled with fresh garden vegetables.',
    ingredients: ['pasta', 'zucchini', 'tomato', 'basil', 'olive oil'],
  },
]

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
      category VARCHAR(100) NOT NULL DEFAULT 'Filipino',
      time VARCHAR(50) NOT NULL DEFAULT '—',
      image TEXT,
      owner_id VARCHAR(255) NOT NULL DEFAULT 'community',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(`ALTER TABLE recipes ADD COLUMN IF NOT EXISTS category VARCHAR(100) NOT NULL DEFAULT 'Filipino'`)
  await pool.query(`ALTER TABLE recipes ADD COLUMN IF NOT EXISTS time VARCHAR(50) NOT NULL DEFAULT '—'`)
  await pool.query('ALTER TABLE recipes ADD COLUMN IF NOT EXISTS image TEXT')
  await pool.query(`ALTER TABLE recipes ADD COLUMN IF NOT EXISTS owner_id VARCHAR(255) NOT NULL DEFAULT 'community'`)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipe_favorites (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (user_id, recipe_id)
    )
  `)

  for (const recipe of defaultRecipes) {
    await pool.query(
      `INSERT INTO recipes (title, description, ingredients, category, time, image, owner_id)
       VALUES ($1, $2, $3::jsonb, $4, $5, $6, $7)
      ON CONFLICT DO NOTHING`,
      [recipe.title, recipe.description, JSON.stringify(recipe.ingredients), recipe.category, recipe.time, recipe.image, recipe.ownerId],
    )
  }

  await pool.query(`
    INSERT INTO recipe_favorites (user_id, recipe_id)
    SELECT 'jane', id FROM recipes WHERE title IN ('Salad Bowl', 'Chicken Bowl')
    ON CONFLICT (user_id, recipe_id) DO NOTHING
  `)

  console.log('Database initialized: recipes table is ready')
}