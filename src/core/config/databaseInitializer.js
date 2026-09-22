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
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // 1. Create recipes table (without ingredients column)
    await client.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL DEFAULT 'Filipino',
        time VARCHAR(50) NOT NULL DEFAULT '—',
        image TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // 2. Create recipe_ingredients table
    await client.query(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id SERIAL PRIMARY KEY,
        recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        amount VARCHAR(100),
        UNIQUE(recipe_id, name)
      );
    `)

    // 3. Create recipe_steps table
    await client.query(`
      CREATE TABLE IF NOT EXISTS recipe_steps (
        id SERIAL PRIMARY KEY,
        recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
        step_number INTEGER NOT NULL,
        instruction TEXT NOT NULL,
        UNIQUE(recipe_id, step_number)
      );
    `)

    // 4. Seed default recipes, ingredients, and steps
    for (const recipe of defaultRecipes) {
      const result = await client.query(
        `
        INSERT INTO recipes (
          title,
          description,
          category,
          time,
          image
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (title)
        DO UPDATE SET
          description = EXCLUDED.description,
          category = EXCLUDED.category,
          time = EXCLUDED.time,
          image = EXCLUDED.image
        RETURNING id
        `,
        [
          recipe.title,
          recipe.description,
          recipe.category,
          recipe.time,
          recipe.image,
        ],
      )

      const recipeId = result.rows[0].id

      // Insert ingredients into recipe_ingredients table
      for (const ingredient of recipe.ingredients) {
        await client.query(
          `
          INSERT INTO recipe_ingredients (recipe_id, name)
          VALUES ($1, $2)
          ON CONFLICT (recipe_id, name) DO NOTHING
          `,
          [recipeId, ingredient],
        )
      }

      // Insert steps into recipe_steps table
      for (let i = 0; i < recipe.steps.length; i++) {
        await client.query(
          `
          INSERT INTO recipe_steps (recipe_id, step_number, instruction)
          VALUES ($1, $2, $3)
          ON CONFLICT (recipe_id, step_number)
          DO UPDATE SET instruction = EXCLUDED.instruction
          `,
          [recipeId, i + 1, recipe.steps[i]],
        )
      }
    }

    await client.query('COMMIT')
    console.log('Database initialized successfully')
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Error initializing database:', error)
  } finally {
    client.release()
  }
}