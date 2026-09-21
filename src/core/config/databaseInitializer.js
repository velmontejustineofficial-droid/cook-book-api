import pool from './database.js'

const defaultRecipes = [
  {
    title: 'Sinigang',
    category: 'Filipino',
    time: '60 min',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80',
    description: 'A sour Filipino soup with vegetables and meat.',
    ingredients: ['pork', 'tamarind', 'tomato', 'onion', 'kangkong'],
    steps: [
      'Boil the pork until tender.',
      'Add tomato and onion.',
      'Add tamarind and simmer.',
      'Add the vegetables.',
      'Serve hot with rice.',
    ],
  },

  {
    title: 'Adobo',
    category: 'Filipino',
    time: '45 min',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80',
    description:
      'A Filipino dish of meat braised in soy sauce, vinegar, garlic, and peppercorns.',
    ingredients: [
      'chicken',
      'soy sauce',
      'vinegar',
      'garlic',
      'bay leaves',
      'black peppercorns',
    ],
    steps: [
      'Marinate the chicken in soy sauce and garlic.',
      'Brown the chicken in a pan.',
      'Add vinegar, bay leaves, and black pepper.',
      'Simmer until the chicken is tender.',
      'Serve with rice.',
    ],
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
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipe_steps (
      id SERIAL PRIMARY KEY,
      recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      step_number INTEGER NOT NULL,
      instruction TEXT NOT NULL,
      UNIQUE(recipe_id, step_number)
    )
  `)

  for (const recipe of defaultRecipes) {
    const result = await pool.query(
      `
      INSERT INTO recipes (
        title,
        description,
        ingredients,
        category,
        time,
        image
      )
      VALUES ($1, $2, $3::jsonb, $4, $5, $6)
      ON CONFLICT (title)
      DO UPDATE SET
        description = EXCLUDED.description,
        ingredients = EXCLUDED.ingredients,
        category = EXCLUDED.category,
        time = EXCLUDED.time,
        image = EXCLUDED.image
      RETURNING id
      `,
      [
        recipe.title,
        recipe.description,
        JSON.stringify(recipe.ingredients),
        recipe.category,
        recipe.time,
        recipe.image,
      ],
    )

    const recipeId = result.rows[0].id

    for (let i = 0; i < recipe.steps.length; i++) {
      await pool.query(
        `
        INSERT INTO recipe_steps (
          recipe_id,
          step_number,
          instruction
        )
        VALUES ($1, $2, $3)
        ON CONFLICT (recipe_id, step_number)
        DO UPDATE SET instruction = EXCLUDED.instruction
        `,
        [recipeId, i + 1, recipe.steps[i]],
      )
    }
  }

  console.log('Database initialized successfully')
}